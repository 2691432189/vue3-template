import domeHttp from '@/services/home'

enum Api {
    user = '/'
}

/**
 * @description:测试相同请求发布订阅
 */
export const user = ( params: any ) => {
    return domeHttp.get( { url: Api.user, params } )
}