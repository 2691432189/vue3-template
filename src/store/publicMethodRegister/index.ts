import { defineStore } from 'pinia'
import { RegisterDataInterface } from '@/interface/publicMethodRegister'

export const publicMethodRegister = defineStore( 'publicMethodRegister', {
    state: () => {
        return {
            publicMethodRegisterMap: {}, // 动态缓存列表
        }
    },
    actions: {
        publicMethodRegisterFn( registerData: RegisterDataInterface ) {
            this.publicMethodRegisterMap[ registerData.pageName ] = registerData.fnMap
        },
        getPublicMethodRegisterFn( pageName: string ) {
            return this.publicMethodRegisterMap[ pageName ]
        }
    }
} )