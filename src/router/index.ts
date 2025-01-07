import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import homeRouter from '@/router/homeRouter'
import exceptionRouter from '@/router/exceptionRouter'

const HomeModules = () => import('@/view/homeModules/index.vue')
const ExceptionModules = () => import('@/view/exceptionModules/index.vue')

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: "/home"
    },
    {
        path: '/:catchAll(.*)',
        redirect: "/exception"
    },
    {
        path: '/home',
        redirect: "/home/homePage",
        component: HomeModules,
        children:  homeRouter
    },
    {
        path: '/exception',
        redirect: "/exception/exception_404",
        component: ExceptionModules,
        children:  exceptionRouter
    }
]

export default createRouter( {
    history: createWebHistory(),
    routes,
} )