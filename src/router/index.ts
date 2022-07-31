import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

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
    history: createWebHistory(),
    routes,
} )