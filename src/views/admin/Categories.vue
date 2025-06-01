<template>
  <div class="category-list">
    <div class="page-header">
      <h2 class="page-title">分类管理</h2>
      <el-button type="primary" @click="handleAdd">
        <el-icon><Plus /></el-icon>
        添加分类
      </el-button>
    </div>

    <!-- 搜索筛选 -->
    <el-card class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="分类名称">
          <el-input v-model="searchForm.name" placeholder="请输入分类名称" clearable />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.is_enabled" placeholder="请选择状态" clearable style="width: 120px;">
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

    <!-- 分类表格 -->
    <el-card class="table-card">
      <el-table :data="tableData" v-loading="loading" stripe>
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="分类名称" min-width="150" />
        <el-table-column prop="name_en" label="英文分类名称" min-width="150" />
        <el-table-column prop="description" label="分类描述" min-width="200">
          <template #default="{ row }">
            <span v-if="row.description" class="description-text">{{ row.description }}</span>
            <span v-else class="text-muted">-</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.is_enabled === 1 ? 'success' : 'danger'" size="small">
              {{ row.is_enabled === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="productCount" label="商品数量" width="100">
          <template #default="{ row }">
            <el-link v-if="row.productCount > 0" type="primary" @click="viewProducts(row)">
              {{ row.productCount }}
            </el-link>
            <span v-else class="text-muted">0</span>
          </template>
        </el-table-column> -->
        <el-table-column prop="createTime" label="创建时间" width="180" />
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
          v-model:page-size="searchForm.page_size"
          :page-sizes="[10, 20, 50, 100]"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 分类添加/编辑弹窗 -->
    <CategoryAddModal
      v-model="modalVisible"
      :category-data="currentCategory"
      @success="handleModalSuccess"
      @cancel="handleModalCancel"
    />
  </div>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import CategoryAddModal from './components/CategoryModal.vue'
import { getCategoriesByPage, deleteCategory, updateCategory } from '@/api/categories'

export default {
  components: {
    CategoryAddModal,
    Plus
  },
  data() {
    return {
      loading: false,
      modalVisible: false,
      currentCategory: {},
      searchForm: {
        name: '',
        is_enabled: '',
        page: 1,
        page_size: 10,
      },
      pagination: {
        total: 0
      },
      tableData: [],
      mockData: [
        // {
        //   id: 1,
        //   name: '手机数码',
        //   description: '智能手机、平板电脑、数码配件等电子产品',
        //   sort: 1,
        //   is_enabled: 1,
        //   isShow: true,
        //   productCount: 156,
        //   seoTitle: '手机数码 - 智能设备专区',
        //   keywords: '手机,数码,智能设备,电子产品',
        //   seoDescription: '提供最新的智能手机、平板电脑和数码配件，品质保证，价格优惠',
        //   createTime: '2024-01-15 10:30:00'
        // },
        // {
        //   id: 2,
        //   name: '电脑办公',
        //   description: '笔记本电脑、台式机、办公设备及相关配件',
        //   sort: 2,
        //   is_enabled: 1,
        //   isShow: true,
        //   productCount: 89,
        //   seoTitle: '电脑办公 - 高效办公设备',
        //   keywords: '电脑,笔记本,办公设备,台式机',
        //   seoDescription: '专业的电脑办公设备，提升工作效率，满足各种办公需求',
        //   createTime: '2024-01-14 15:20:00'
        // },
        // {
        //   id: 3,
        //   name: '家用电器',
        //   description: '大家电、小家电、厨房电器等家庭必备电器',
        //   sort: 3,
        //   is_enabled: 0,
        //   isShow: false,
        //   productCount: 67,
        //   seoTitle: '家用电器 - 智能家居生活',
        //   keywords: '家电,大家电,小家电,厨房电器',
        //   seoDescription: '优质家用电器，让生活更便捷，打造智能家居环境',
        //   createTime: '2024-01-13 09:15:00'
        // },
        // {
        //   id: 4,
        //   name: '服装鞋帽',
        //   description: '男装、女装、童装、鞋类、帽子等时尚服饰',
        //   sort: 4,
        //   is_enabled: 1,
        //   isShow: true,
        //   productCount: 234,
        //   seoTitle: '服装鞋帽 - 时尚潮流服饰',
        //   keywords: '服装,鞋子,帽子,时尚,潮流',
        //   seoDescription: '时尚服装鞋帽，紧跟潮流趋势，展现个人魅力',
        //   createTime: '2024-01-12 14:45:00'
        // },
        // {
        //   id: 5,
        //   name: '美妆护肤',
        //   description: '化妆品、护肤品、香水、美容工具等美妆产品',
        //   sort: 5,
        //   is_enabled: 1,
        //   isShow: true,
        //   productCount: 178,
        //   seoTitle: '美妆护肤 - 美丽从这里开始',
        //   keywords: '美妆,护肤,化妆品,美容',
        //   seoDescription: '专业美妆护肤产品，让您焕发自然美丽',
        //   createTime: '2024-01-11 11:30:00'
        // }
      ]
    }
  },
  methods: {
    fetchData() {
      this.loading = true
      try {
        // 模拟API请求
        // setTimeout(() => {
        //   this.tableData = this.mockData
        //   this.pagination.total = this.mockData.length
        //   this.loading = false
        // }, 500)
        getCategoriesByPage(this.searchForm).then(response => {
          this.tableData = response.data.categories
          this.pagination.total = response.data.total 
        })
        this.loading = false
      } catch (error) {
        ElMessage.error('获取数据失败')
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
      this.currentCategory = {}
      this.modalVisible = true
    },
    handleEdit(row) {
      this.currentCategory = { ...row }
      this.modalVisible = true
    },
    async handleToggleStatus(row) {
      try {
        const action = row.is_enabled === 1 ? '禁用' : '启用'
        await ElMessageBox.confirm(`确定要${action}该分类吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        row.is_enabled = row.is_enabled === 1 ? 0 : 1
        await updateCategory(row).then(() => {
          // console.log(response.data)
          ElMessage.success(`${action}成功`)
        }).catch(error => {
          // console.error(' 品牌更新失敗:', error);
          ElMessage.success(`${action}失敗: `, error)
        })
        
      } catch {
        // 用户取消操作
      }
    },
    async handleDelete(row) {
      try {
        if (row.productCount > 0) {
          ElMessage.warning('该分类下还有商品，无法删除')
          return
        }
        await ElMessageBox.confirm('确定要删除该分类吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        await deleteCategory(row.id).then(() => {
          // console.log(response.data)
          // ElMessage.success('删除成功')
          const index = this.tableData.findIndex(item => item.id === row.id)
          if (index > -1) {
            this.tableData.splice(index, 1)
            ElMessage.success('删除成功')
          }
        }).catch(error => {
          // console.error(' 品牌刪除失敗:', error);
          ElMessage.success(`删除失敗: `, error)
        })

      } catch {
        // 用户取消操作
      }
    },
    viewProducts(row) {
      ElMessage.info(`查看分类"${row.name}"下的商品`)
      // 这里可以跳转到商品列表页面，并筛选该分类的商品
    },
    handleSizeChange(size) {
      this.pagination.size = size
      this.fetchData()
    },
    handleCurrentChange(page) {
      this.pagination.page = page
      this.fetchData()
    },
    handleModalSuccess(result) {
      ElMessage.success(result.action === 'create' ? '分类创建成功' : '分类更新成功')
      this.fetchData() // 重新加载数据
    },
    handleModalCancel() {
      this.currentCategory = {}
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>

<style scoped>
.category-list {
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

.description-text {
  color: #666;
  font-size: 13px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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
