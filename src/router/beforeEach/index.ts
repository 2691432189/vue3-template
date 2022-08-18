import router from '@/router'

// 路由全局前置钩子
router.beforeEach( ( to, from ) => {
    // ...
    // 返回 false 以取消导航
    return
} )