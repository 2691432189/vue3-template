import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import admin from '@/router/admin/index'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        children: [
            admin
        ]
    }
]

export default createRouter( {
    history: createWebHashHistory(),
    routes,
} )