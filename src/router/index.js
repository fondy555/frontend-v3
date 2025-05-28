import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/home',
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
                    path: 'info',
                    name: 'Info',
                    component: () => import('@/views/admin/Info.vue'),
                    meta: {
                        title: '基本信息'
                    }
                },
                {
                path: 'productList',
                name: 'adminProductList',
                component: () => import('@/views/admin/ProductList.vue'),
                    meta: {
                        title: '商品列表'
                    }
                },
                {
                    path: 'product/:id',
                    name: 'adminProduct',
                    // component: () => import('@/views/front/components/ProductDetail.vue'),
                    component: () => import('@/views/admin/ProductInfo.vue'),
                    meta: {
                        title: '商品信息'
                    }
                },
                {
                    path: 'productEdit/:id?',
                    name: 'adminProductEdit',
                    component: () => import('@/views/admin/ProductEdit.vue'),
                    meta: {
                        title: '編輯商品'
                    }
                },
                {
                    path: 'dashboard',
                    name: 'Dashboard',
                    component: () => import('@/views/admin/Dashboard.vue'), 
                    meta: {
                        title: '儀表盤'
                    }
                },
                {
                    path: 'orderList',
                    name: 'OrderList',
                    component: () => import('@/views/admin/OrderList.vue'),
                    meta: {
                        title: '訂單列表'
                    }
                },
                {
                    path: 'categories',
                    name: 'Categories',
                    component: () => import('@/views/admin/Categories.vue'),
                    meta: {
                        title: '商品分類' 
                    }
                },
                {
                    path: 'brandList',
                    name: 'BrandList',
                    component: () => import('@/views/admin/BrandList.vue'),
                    meta: {
                        title: '品牌管理' 
                    }
                },
                {
                    path: 'brandEdit/:id?',
                    name: 'BrandEdit',
                    component: () => import('@/views/admin/BrandEdit.vue'),
                    meta: {
                        title: '品牌編輯' 
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