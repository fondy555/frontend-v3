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
                },
                {
                path: '/productList',
                name: 'productList',
                component: () => import('@/views/admin/ProductList.vue'),
                    meta: {
                        title: '商品列表'
                    }
                },
                {
                    path: '/Product/:id',
                    name: 'product',
                    // component: () => import('@/views/front/components/ProductDetail.vue'),
                    component: () => import('@/views/admin/ProductInfo.vue'),
                        meta: {
                            title: '商品信息'
                        }
                },
                {
                    path: '/ProductEdit/:id?',
                    name: 'productEdit',
                    component: () => import('@/views/admin/ProductEdit.vue'),
                    meta: {
                        title: '編輯商品'
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