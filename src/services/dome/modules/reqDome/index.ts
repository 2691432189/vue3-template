import domeHttp from '@/services/dome'

enum Api {
    user = '/user'
}

/**
 * @description:医学类别
 */
export const user = ( params: any ) => {
    return domeHttp.post( { url: Api.user, params, headers: { 'Content-Type': 'application/json;charset=UTF-8' } } )
}