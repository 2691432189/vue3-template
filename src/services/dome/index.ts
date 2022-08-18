import Http from '@/axios'

const dome = new Http({
    baseURL: 'http://127.0.0.1:8000',
    timeout: 1000 * 60 * 5,
    withCredentials: true,
    interceptors: {
        // 请求拦截器
        requestInterceptors: config => {
            console.log('实例请求拦截器')
            return config
        },
        // 响应拦截器
        responseInterceptors: result => {
            console.log('实例响应拦截器')
            return result
        },
    },
})

export default dome