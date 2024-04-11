import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import type { RequestConfig, RequestInterceptors } from './type'

// 订阅发布相同请求
class EventEmitter {
    event: any
    reqKey: any

    constructor() {
        this.event = {}
    }

    on( type: string, cbres: ( value: any ) => void, cbrej: ( value: any ) => void ) {
        if ( !this.event[ type ] ) {
            this.event[ type ] = [ [ cbres, cbrej ] ]
        } else {
            this.event[ type ].push( [ cbres, cbrej ] )
        }
    }

    emit( type: string, res: any, ansType: string ) {
        if ( !this.event[ type ] ) return
        else {
            this.event[ type ].forEach( ( cbArr: any[] ) => {
                if ( ansType === 'resolve' ) {
                    cbArr[ 0 ]( res )
                } else {
                    cbArr[ 1 ]( res )
                }
            } )
        }
    }
}


// 存储已发送但未响应的请求
const pendingRequest = new Set();
// 发布订阅容器
const ev = new EventEmitter()

// 根据请求生成对应的key
function generateReqKey( config: InternalAxiosRequestConfig<any>, hash: string ) {
    const { method, url, params, data } = config;
    return [ method, url, JSON.stringify( params ), JSON.stringify( data ), hash ].join( "&" );
}

//是否为上传文件
function isFileUploadApi( config: InternalAxiosRequestConfig<any> ) {
    return Object.prototype.toString.call( config.data ) === "[object FormData]"
}

// 接口响应成功
function handleSuccessResponse_limit( response: AxiosResponse<any, any> ) {
    // @ts-ignore
    const reqKey = response.config.pendKey
    if ( pendingRequest.has( reqKey ) ) {
        let x = null
        try {
            x = JSON.parse( JSON.stringify( response ) )
        } catch ( e ) {
            x = response
        }
        pendingRequest.delete( reqKey )
        ev.emit( reqKey, x, 'resolve' )
        delete ev.reqKey
    }
}

// 接口走失败响应
function handleErrorResponse_limit( error: { type: string; val: any; config: { pendKey: any } } ) {
    if ( error.type && error.type === 'limitResSuccess' ) {
        return Promise.resolve( error.val )
    } else if ( error.type && error.type === 'limitResError' ) {
        return Promise.reject( error.val );
    } else {
        const reqKey = error.config.pendKey
        if ( pendingRequest.has( reqKey ) ) {
            let x = null
            try {
                x = JSON.parse( JSON.stringify( error ) )
            } catch ( e ) {
                x = error
            }
            pendingRequest.delete( reqKey )
            ev.emit( reqKey, x, 'reject' )
            delete ev.reqKey
        }
    }
    return Promise.reject( error );
}


class Http {
    // axios 实例
    instance: AxiosInstance
    // 拦截器对象
    interceptorsObj?: RequestInterceptors

    constructor( config: RequestConfig ) {
        this.instance = axios.create( config )
        this.interceptorsObj = config.interceptors
        // 实例请求→类请求→实例响应→类响应

        /**
         * @description 全局请求拦截器
         */
        this.instance.interceptors.request.use( async ( config ) => {
            let hash = location.hash
            // 生成请求Key
            let reqKey = generateReqKey( config, hash )

            if ( pendingRequest.has( reqKey ) && !isFileUploadApi( config ) ) {
                // 如果是相同请求,在这里将请求挂起，通过发布订阅来为该请求返回结果
                // 这里需注意，拿到结果后，无论成功与否，都需要return Promise.reject()来中断这次请求，否则请求会正常发送至服务器
                let res = null
                try {
                    // 接口成功响应
                    res = await new Promise( ( resolve, reject ) => {
                        ev.on( reqKey, resolve, reject )
                    } )
                    return Promise.reject( {
                        type: 'limitResSuccess',
                        val: res
                    } )
                } catch ( limitFunErr ) {
                    // 接口报错
                    return Promise.reject( {
                        type: 'limitResError',
                        val: limitFunErr
                    } )
                }
            } else {
                // 将请求的key保存在config
                // @ts-ignore
                config.pendKey = reqKey
                pendingRequest.add( reqKey )
            }

            return config;
        }, function ( error ) {
            return Promise.reject( error );
        } )

        /**
         * @description 使用实例请求拦截器
         */
        this.instance.interceptors.request.use(
            this.interceptorsObj?.requestInterceptors,
            this.interceptorsObj?.requestInterceptorsCatch,
        )

        /**
         * @description 全局响应拦截器,保证最后执行
         */
        this.instance.interceptors.response.use( function ( response ) {
            // 将拿到的结果发布给其他相同的接口
            handleSuccessResponse_limit( response )
            return response;
        }, function ( error ) {
            return handleErrorResponse_limit( error )
        } )

        /**
         * @description 使用实例响应拦截器
         */
        this.instance.interceptors.response.use(
            this.interceptorsObj?.responseInterceptors,
            this.interceptorsObj?.responseInterceptorsCatch,
        )
    }

    get<T = any>( config: AxiosRequestConfig ): Promise<T> {
        return this.request( { ...config, method: 'GET' } )
    }

    post<T = any>( config: AxiosRequestConfig ): Promise<T> {
        return this.request( { ...config, method: 'POST' } )
    }

    put<T = any>( config: AxiosRequestConfig ): Promise<T> {
        return this.request( { ...config, method: 'PUT' } )
    }

    delete<T = any>( config: AxiosRequestConfig ): Promise<T> {
        return this.request( { ...config, method: 'DELETE' } )
    }

    request<T = any>( config: AxiosRequestConfig ): Promise<T> {
        return new Promise( ( resolve, reject ) => {
            this.instance
                .request( config )
                .then( ( res: AxiosResponse ) => {
                    resolve( ( res as unknown ) as Promise<T> )
                } )
                .catch( ( e: Error ) => {
                    reject( e )
                } )
        } )
    }
}

export default Http