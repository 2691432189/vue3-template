import Http from '@/axios'
import getAppEnvConfig from '@/utils/getAppEnvConfig'

const domeHttp = new Http( {
    baseURL: getAppEnvConfig().VITE_DOME_API_URL,
    timeout: 1000 * 60 * 5,
    withCredentials: true,
    interceptors: {
        // 请求拦截器
        requestInterceptors: config => {
            console.log( '实例请求拦截器' )
            return config
        },
        // 响应拦截器
        responseInterceptors: result => {
            console.log( '实例响应拦截器' )
            return result
        },
    },
} )

export default domeHttp