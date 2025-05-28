<template>
  <div class="dashboard">
    <h2 class="page-title">仪表盘</h2>
    
    <!-- 统计卡片 -->
    <el-row :gutter="20" class="stats-row">
      <el-col :xs="24" :sm="12" :md="6" v-for="stat in stats" :key="stat.title">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon" :style="{ backgroundColor: stat.color }">
              <el-icon :size="24">
                <component :is="stat.icon" />
              </el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-title">{{ stat.title }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 图表区域 -->
    <el-row :gutter="20" class="charts-row">
      <el-col :xs="24" :lg="16">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>销售趋势</span>
            </div>
          </template>
          <div class="chart-placeholder">
            <el-empty description="图表区域" />
          </div>
        </el-card>
      </el-col>
      
      <el-col :xs="24" :lg="8">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>热门商品</span>
            </div>
          </template>
          <div class="product-list">
            <div v-for="product in hotProducts" :key="product.id" class="product-item">
              <el-avatar :size="40" :src="product.image" />
              <div class="product-info">
                <div class="product-name">{{ product.name }}</div>
                <div class="product-sales">销量: {{ product.sales }}</div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Goods, User, ShoppingCart, Money } from '@element-plus/icons-vue'

// 统计数据
const stats = ref([
  {
    title: '总商品数',
    value: '1,234',
    icon: Goods,
    color: '#1890ff'
  },
  {
    title: '用户数量',
    value: '5,678',
    icon: User,
    color: '#52c41a'
  },
  {
    title: '订单数量',
    value: '2,345',
    icon: ShoppingCart,
    color: '#faad14'
  },
  {
    title: '总收入',
    value: '¥123,456',
    icon: Money,
    color: '#f5222d'
  }
])

// 热门商品
const hotProducts = ref([
  {
    id: 1,
    name: 'iPhone 15 Pro',
    sales: 1234,
    image: '/placeholder.svg?height=40&width=40'
  },
  {
    id: 2,
    name: 'MacBook Pro',
    sales: 987,
    image: '/placeholder.svg?height=40&width=40'
  },
  {
    id: 3,
    name: 'AirPods Pro',
    sales: 756,
    image: '/placeholder.svg?height=40&width=40'
  },
  {
    id: 4,
    name: 'iPad Air',
    sales: 543,
    image: '/placeholder.svg?height=40&width=40'
  }
])
</script>

<style scoped>
.dashboard {
  height: 100%;
}

.page-title {
  margin-bottom: 24px;
  color: #333;
  font-weight: 500;
}

.stats-row {
  margin-bottom: 24px;
}

.stat-card {
  height: 120px;
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 16px;
  height: 100%;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.stat-title {
  font-size: 14px;
  color: #666;
}

.charts-row {
  margin-bottom: 24px;
}

.chart-card {
  height: 400px;
}

.card-header {
  font-weight: 500;
  color: #333;
}

.chart-placeholder {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.product-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.product-item:hover {
  background-color: #f5f5f5;
}

.product-info {
  flex: 1;
}

.product-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}

.product-sales {
  font-size: 12px;
  color: #666;
}
</style>
