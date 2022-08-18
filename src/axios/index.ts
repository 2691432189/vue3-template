import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { RequestConfig, RequestInterceptors } from './type'

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
        this.instance.interceptors.request.use(
            ( res: AxiosRequestConfig ) => {
                console.log( '全局请求拦截器' )
                return res
            },
            ( err: any ) => err
        )

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
        this.instance.interceptors.response.use(
            // 因为我们接口的数据都在res.data下，所以我们直接返回res.data
            ( res: AxiosResponse ) => {
                console.log( '全局响应拦截器' )
                return res.data
            },
            ( err: any ) => err
        )

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