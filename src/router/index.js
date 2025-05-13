import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/productService',
    },
    {
        path: '/productService',
        name: 'ProductService',
        component: () => import('@/views/front/ProductService.vue'),
        meta: {
            title: '产品与服务'
        }
    },
    {
        path: '/ProductDetail/:id',
        name: 'ProductDetail',
        component: () => import('@/views/front/components/ProductDetail.vue'),
        props: true
    },
    {
        path: '/login',
        component: () => import('@/views/login/login.vue'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import('@/views/admin/Index.vue'),
        meta: {
            title: '后台首页'
        },
        children: [
                        {
                path: '/info',
                name: 'Info',
                component: () => import('@/views/admin/Info.vue'),
                meta: {
                    title: '基本信息'
                }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})

export default router

export function resetRouter() {
    router.push({ path: '/login' })
}