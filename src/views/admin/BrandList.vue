<template>
  <div class="brand-list">
    <div class="page-header">
      <h2 class="page-title">品牌管理</h2>
      <el-button type="primary" @click="handleAdd">
        <el-icon><Plus /></el-icon>
        添加品牌
      </el-button>
    </div>

    <!-- 搜索筛选 -->
    <el-card class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="品牌名称">
          <el-input v-model="searchForm.name" placeholder="请输入品牌名称" clearable />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.is_enabled" placeholder="请选择状态" clearable style="width: 130px;">
            <el-option label="启用" value="1" />
            <el-option label="禁用" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 品牌表格 -->
    <el-card class="table-card">
      <el-table :data="tableData" v-loading="loading" stripe>
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="品牌名称" min-width="150" />
        <el-table-column prop="name_en" label="英文名称" min-width="150" />
        <el-table-column label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.is_enabled === 1 ? 'success' : 'danger'" size="small">
              {{ row.is_enabled === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="website" label="官网" width="120">
          <template #default="{ row }">
            <el-link v-if="row.website" :href="row.website" target="_blank" type="primary">
              访问官网
            </el-link>
            <span v-else class="text-muted">-</span>
          </template>
        </el-table-column>
          <el-table-column label="创建时间" width="180">
            <template #default="{ row }">
              {{ formatDate(row.create_time) }}
            </template>
          </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button 
              :type="row.is_enabled === 1 ? 'warning' : 'success'" 
              size="small" 
              @click="handleToggleStatus(row)"
            >
              {{ row.is_enabled === 1 ? '禁用' : '启用' }}
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          v-model:current-page="searchForm.page"
          v-model:page-size="searchForm.size"
          :page-sizes="[10, 20, 50, 100]"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 品牌添加/编辑弹窗 -->
    <BrandAddModal
      v-model="modalVisible"
      :brand-data="currentBrand"
      @success="handleModalSuccess"
      @cancel="handleModalCancel"
    />
  </div>
</template>

<script>
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import BrandAddModal from './components/BrandAddModal.vue'
import { updateBrand, deleteBrand, getBrandsByPage } from '@/api/brands'

export default {
  components: {
    BrandAddModal,Plus
  },
  data() {
    return {
      loading: false,
      modalVisible: false,
      currentBrand: {},
      searchForm: {
        name: '',
        is_enabled: "",
        page: 1,
        page_size: 10,
      },
      pagination: {
        page: 1,
        size: 10,
        total: 0
      },
      tableData: [],
      mockData: []
    }
  },
  methods: {
    async fetchData() {
      this.loading = true
      try {
        // 模拟API请求
        // await new Promise(resolve => setTimeout(resolve, 500))
        // await getAllBrands().then(response => {
        //     // this.brands = response.data; // 访问response.data
        //     this.tableData = response.data
        //     this.pagination.total = this.tableData.length
        //     // console.log(this.brands)
        // }).catch(error => {
        //     console.error('Failed to fetch brands:', error);
        // });

        await getBrandsByPage(this.searchForm).then(response => {
          this.tableData = response.data.brands
          this.pagination.total = response.data.total
        })

      } catch (error) {
        ElMessage.error('获取数据失败')
      } finally {
        this.loading = false
      }
    },
    handleSearch() {
      this.searchForm.page = 1
      this.fetchData()
    },
    handleReset() {
      this.searchForm.name = ''
      this.searchForm.is_enabled = ''
      this.handleSearch()
    },
    handleAdd() {
      this.currentBrand = {}
      this.modalVisible = true
    },
    handleEdit(row) {
      this.currentBrand = { ...row }
      this.modalVisible = true
    },
    async handleToggleStatus(row) {
      try {
        // console.log("row: ", row)
        const action = row.is_enabled === 1 ? '禁用' : '启用'
        await ElMessageBox.confirm(`确定要${action}该品牌吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // console.log("row: ", row)
        row.is_enabled = row.is_enabled === 1 ? 0 : 1

        updateBrand(row).then(() => {
            // this.brands = response.data; // 访问response.data
            // console.log(response.data) 
        }).catch(error => {
            console.error('Failed to fetch brands:', error); 
        })
        console.log("row: ", row)
        // row.is_enabled = row.is_enabled === 1 ? 0 : 1
        ElMessage.success(`${action}成功`)
      } catch {
        // 用户取消操作
      }
    },
    async handleDelete(row) {
      try {
        await ElMessageBox.confirm('确定要删除该品牌吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        deleteBrand(row.id).then(response => {
            // this.brands = response.data; // 访问response.data
            console.log(response.data) 
        }).catch(error => {
            console.error(' 品牌刪除失敗:', error);
        })
        const index = this.tableData.findIndex(item => item.id === row.id)
        if (index > -1) {
          this.tableData.splice(index, 1)
          ElMessage.success('删除成功')
        }
      } catch {
        // 用户取消操作
      }
    },
    handleSizeChange(size) {
      this.searchForm.size = size
      this.fetchData()
    },
    handleCurrentChange(page) {
      this.searchForm.page = page
      this.fetchData()
    },
    handleModalSuccess(result) {
      ElMessage.success(result.action === 'create' ? '品牌创建成功' : '品牌更新成功')
      this.fetchData() // 重新加载数据
    },
    handleModalCancel() {
      this.currentBrand = {}
    },

    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toISOString().replace('T', ' ').split('.')[0]
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>

<style scoped>
.brand-list {
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

.search-card {
  margin-bottom: 24px;
}

.table-card {
  flex: 1;
}

.text-muted {
  color: #999;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
}
</style>
