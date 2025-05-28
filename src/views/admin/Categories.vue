<template>
  <div class="product-category">
    <div class="page-header">
      <h2 class="page-title">商品分类</h2>
      <el-button type="primary" @click="handleAdd">
        <el-icon><Plus /></el-icon>
        添加分类
      </el-button>
    </div>

    <el-card>
      <el-table :data="categoryData" row-key="id" default-expand-all>
        <el-table-column prop="name" label="分类名称" />
        <el-table-column prop="sort" label="排序" width="100" />
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'">
              {{ row.status === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const categoryData = ref([
  {
    id: 1,
    name: '手机数码',
    sort: 1,
    status: 1,
    createTime: '2024-01-15 10:30:00',
    children: [
      {
        id: 11,
        name: '手机',
        sort: 1,
        status: 1,
        createTime: '2024-01-15 10:31:00'
      },
      {
        id: 12,
        name: '平板电脑',
        sort: 2,
        status: 1,
        createTime: '2024-01-15 10:32:00'
      }
    ]
  },
  {
    id: 2,
    name: '电脑办公',
    sort: 2,
    status: 1,
    createTime: '2024-01-15 10:33:00',
    children: [
      {
        id: 21,
        name: '笔记本',
        sort: 1,
        status: 1,
        createTime: '2024-01-15 10:34:00'
      }
    ]
  }
])

const handleAdd = () => {
  ElMessage.info('添加分类功能')
}

const handleEdit = (row) => {
  ElMessage.info(`编辑分类: ${row.name}`)
}

const handleDelete = (row) => {
  ElMessage.info(`删除分类: ${row.name}`)
}
</script>

<style scoped>
.product-category {
  height: 100%;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-title {
  margin: 0;
  color: #333;
  font-weight: 500;
}
</style>
