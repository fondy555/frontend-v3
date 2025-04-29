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