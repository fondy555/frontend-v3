<template>
  <div class="order-list">
    <div class="page-header">
      <h2 class="page-title">订单列表</h2>
    </div>

    <el-card>
      <el-table :data="orderData" stripe>
        <el-table-column prop="orderNo" label="订单号" width="200" />
        <el-table-column prop="customerName" label="客户姓名" width="120" />
        <el-table-column prop="amount" label="订单金额" width="120">
          <template #default="{ row }">
            <span class="amount">¥{{ row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" width="120">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ getStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="下单时间" width="180" />
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleView(row)">查看</el-button>
            <el-button type="success" size="small" @click="handleProcess(row)">处理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const orderData = ref([
  {
    id: 1,
    orderNo: 'ORD202401150001',
    customerName: '张三',
    amount: 9999.00,
    status: 1,
    createTime: '2024-01-15 10:30:00'
  },
  {
    id: 2,
    orderNo: 'ORD202401150002',
    customerName: '李四',
    amount: 1899.00,
    status: 2,
    createTime: '2024-01-15 11:20:00'
  },
  {
    id: 3,
    orderNo: 'ORD202401150003',
    customerName: '王五',
    amount: 19999.00,
    status: 3,
    createTime: '2024-01-15 14:15:00'
  }
])

const getStatusType = (status) => {
  const types = {
    1: 'warning',
    2: 'success',
    3: 'info',
    4: 'danger'
  }
  return types[status] || 'info'
}

const getStatusText = (status) => {
  const texts = {
    1: '待付款',
    2: '已付款',
    3: '已发货',
    4: '已取消'
  }
  return texts[status] || '未知'
}

const handleView = (row) => {
  ElMessage.info(`查看订单: ${row.orderNo}`)
}

const handleProcess = (row) => {
  ElMessage.info(`处理订单: ${row.orderNo}`)
}
</script>

<style scoped>
.order-list {
  height: 100%;
}

.page-header {
  margin-bottom: 24px;
}

.page-title {
  margin: 0;
  color: #333;
  font-weight: 500;
}

.amount {
  color: #f56c6c;
  font-weight: 600;
}
</style>
