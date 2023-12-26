import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface RequestInterceptors {
    // 请求拦截
    requestInterceptors?: ( config: AxiosRequestConfig ) => any
    requestInterceptorsCatch?: ( err: any ) => any
    // 响应拦截
    responseInterceptors?: ( config: AxiosResponse ) => any
    responseInterceptorsCatch?: ( err: any ) => any
}

// 自定义传入的参数
export interface RequestConfig extends AxiosRequestConfig {
    interceptors?: RequestInterceptors
}