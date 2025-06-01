<template>
  <div class="admin-layout">
    <!-- 顶部导航栏 -->
    <el-header class="header">
      <div class="header-left">
        <el-button
          :icon="isCollapse ? Expand : Fold"
          @click="toggleCollapse"
          text
          class="collapse-btn"
        />
        <h1 class="logo">管理后台</h1>
        <!-- 添加返回首页按钮 -->
        <el-button
          :icon="House"
          @click="goToHome"
          text
          class="home-btn"
        >
          返回首页
        </el-button>
      </div>
      
      <div class="header-right">
        <el-dropdown @command="handleCommand">
          <div class="user-info">
            <el-avatar :size="32" :src="userAvatar" />
            <span class="username">管理员</span>
            <el-icon><ArrowDown /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>

    <!-- 主体容器 -->
    <el-container class="main-container">
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '240px'" class="sidebar">
        <el-menu
          :default-active="activeMenu"
          :collapse="isCollapse"
          :unique-opened="true"
          class="sidebar-menu"
          @select="handleMenuSelect"
          router
        >
          <el-menu-item index="/admin/dashboard" disabled>
            <el-icon><House /></el-icon>
            <template #title>仪表盘</template>
          </el-menu-item>
          
          <el-sub-menu index="products">
            <template #title>
              <el-icon><Goods /></el-icon>
              <span>商品管理</span>
            </template>
            <el-menu-item index="/admin/productList">商品列表</el-menu-item>
            <el-menu-item index="/admin/productEdit">商品编辑</el-menu-item>
            <el-menu-item index="/admin/categories">商品分类</el-menu-item>
            <el-menu-item index="/admin/brandList">品牌管理</el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="orders" disabled>
            <template #title>
              <el-icon><ShoppingCart /></el-icon>
              <span>订单管理</span>
            </template>
            <el-menu-item index="/admin/orderList">订单列表</el-menu-item>
            <el-menu-item index="/order-statistics">订单统计</el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="users" disabled>
            <template #title>
              <el-icon><User /></el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/user-list">用户列表</el-menu-item>
            <el-menu-item index="/user-roles">角色权限</el-menu-item>
          </el-sub-menu>

          <el-menu-item index="/admin/info">
            <el-icon><Setting /></el-icon>
            <template #title>信息設置</template>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 主内容区 -->
      <el-main class="main-content">
        <div class="content-wrapper">
          <!-- 面包屑导航 -->
          <el-breadcrumb class="breadcrumb" separator="/">
            <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.path" :to="item.path">
              {{ item.title }}
            </el-breadcrumb-item>
          </el-breadcrumb>
          
          <!-- 页面内容 -->
          <div class="page-content">
            <router-view />
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
  Fold,
  Expand,
  ArrowDown,
  House,
  Goods,
  ShoppingCart,
  User,
  Setting
} from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

// 响应式数据
const isCollapse = ref(false)
const userAvatar = ref('')

// 计算当前激活的菜单
const activeMenu = computed(() => route.path)

// 面包屑导航
const breadcrumbs = computed(() => {
  const matched = route.matched.filter(item => item.meta && item.meta.title)
  const first = matched[0]
  
  if (!first || first.name !== 'Dashboard') {
    matched.unshift({ path: '/admin/dashboard', meta: { title: '首页' } })
  }
  return matched.map(item => ({
    path: item.path,
    title: item.meta.title
  }))
})

// 方法
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

const handleMenuSelect = (index) => {
  if (route.path !== index) {
    router.push(index)
  }
}

const goToHome = () => {
  router.push('/') 
}

const handleCommand = (command) => {
  switch (command) {
    case 'profile':
      ElMessage.info('跳转到个人中心')
      break
    case 'settings':
      ElMessage.info('跳转到设置页面')
      break
    case 'logout':
      ElMessage.success('退出登录成功')
      router.push('/login')
      break
  }
}

// 监听路由变化
watch(route, (newRoute) => {
  console.log('当前路由:', newRoute.path)
})
</script>

<style scoped>
.admin-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: #fff;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.collapse-btn {
  font-size: 18px;
}

.logo {
  font-size: 20px;
  font-weight: 600;
  color: #1890ff;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background-color 0.3s;
}

.user-info:hover {
  background-color: #f5f5f5;
}

.username {
  font-size: 14px;
  color: #333;
}

.main-container {
  flex: 1;
  height: calc(100vh - 60px);
}

.sidebar {
  background: #fff;
  border-right: 1px solid #e6e6e6;
  transition: width 0.3s;
}

.sidebar-menu {
  height: 100%;
  border-right: none;
}

.main-content {
  background: #f0f2f5;
  padding: 0;
}

.content-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.breadcrumb {
  background: #fff;
  padding: 16px 24px;
  border-bottom: 1px solid #e6e6e6;
}

.page-content {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-left .logo {
    display: none;
  }
  
  .sidebar {
    position: fixed;
    left: 0;
    top: 60px;
    height: calc(100vh - 60px);
    z-index: 1000;
    transform: translateX(-100%);
    transition: transform 0.3s;
  }
  
  .sidebar.show {
    transform: translateX(0);
  }
  
  .main-content {
    margin-left: 0;
  }
}
</style>
