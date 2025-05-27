import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/index',
    },
    // {
    //     path: '/productService',
    //     name: 'ProductService',
    //     component: () => import('@/views/front/ProductService.vue'),
    //     meta: {
    //         title: '产品与服务'
    //     }
    // },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/views/front/About.vue'),
        meta: {
            title: '關於我們'
        }
    },
    {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/front/Index.vue'),
        meta: {
            title: '主頁'
        },
        children: [
            {
                path: '/about',
                name: 'About',
                component: () => import('@/views/front/About.vue'),
                meta: {
                    title: '關於我們'
                }
            },
            {
                path: '/productList',
                name: 'productList',
                component: () => import('@/views/front/ProductList.vue'), 
            },
            {
                path: '/home',
                name: 'Home',
                component: () => import('@/views/front/Home.vue'), 
            },    
            {
                path: '/ProductDetail/:id',
                name: 'ProductDetail',
                component: () => import('@/views/front/components/ProductDetail.vue'),
                props: true
            },
        ]
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
                    path: '/admin/info',
                    name: 'Info',
                    component: () => import('@/views/admin/Info.vue'),
                    meta: {
                        title: '基本信息'
                    }
                },
                {
                path: '/admin/productList',
                name: 'adminProductList',
                component: () => import('@/views/admin/ProductList.vue'),
                    meta: {
                        title: '商品列表'
                    }
                },
                {
                    path: '/admin/Product/:id',
                    name: 'adminProduct',
                    // component: () => import('@/views/front/components/ProductDetail.vue'),
                    component: () => import('@/views/admin/ProductInfo.vue'),
                        meta: {
                            title: '商品信息'
                        }
                },
                {
                    path: '/admin/ProductEdit/:id?',
                    name: 'adminProductEdit',
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