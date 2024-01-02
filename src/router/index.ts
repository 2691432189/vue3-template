import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import home from '@/router/home'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: "/home/homePage",
        children: [
            home
        ]
    }
]

export default createRouter( {
    history: createWebHistory(),
    routes,
} )