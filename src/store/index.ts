import { useDynamicCache } from '@/store/useDynamicCache'
import { publicMethodRegister } from '@/store/publicMethodRegister'


export const useState = () => ( {
    useDynamicCache: useDynamicCache(),
    publicMethodRegister: publicMethodRegister()
} )
