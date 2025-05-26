<template>
  <div class="product-page">
    <el-container class="page-container">
      <!-- 左侧筛选面板 -->
      <el-aside width="280px" class="filter-sidebar">
        <div class="filter-panel">
          <div class="filter-header">
            <h3>商品筛选</h3>
            <el-button 
              link
              size="small" 
              @click="resetFilters"
              class="reset-btn"
            >
              重置
            </el-button>
          </div>

          <!-- 分类筛选 -->
          <div class="filter-section">
            <h4 class="filter-title">商品分类</h4>
            <el-checkbox-group v-model="filters.categories" @change="applyFilters">
              <el-checkbox 
                v-for="category in CategoryMap" 
                :key="category.id"
                :value="category.id"
                class="category-checkbox"
              >
                {{ category.name }}
              </el-checkbox>
            </el-checkbox-group>
          </div>


          <!-- 品牌筛选 -->
          <div class="filter-section">
            <h4 class="filter-title">品牌</h4>
            <el-checkbox-group v-model="filters.brands" @change="applyFilters">
              <el-checkbox 
                v-for="brand in brands" 
                :key="brand.id"
                :value="brand.id"
                class="brand-checkbox"
              >
                {{ brand.name }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
          
        </div>
      </el-aside>

      <!-- 右侧主内容区 -->
      <el-main class="main-content">
        <!-- 顶部工具栏 -->
        <div class="toolbar">
          <div class="toolbar-left">
            <span class="result-count">共找到 {{ filteredProducts.length }} 件商品</span>
            <el-tag 
              v-for="tag in activeFilterTags" 
              :key="tag.key"
              closable
              @close="removeFilter(tag.key, tag.label)"
              class="filter-tag"
            >
              {{ tag.label }}
            </el-tag>
          </div>
          
          <!-- <div class="toolbar-right">
            <span class="sort-label">排序：</span>
            <el-select v-model="sortBy" @change="applySorting" placeholder="选择排序方式" size="small" style="width: 90px;">
              <el-option label="默认排序" value="default" />
              <el-option label="价格从低到高" value="price_asc" />
              <el-option label="价格从高到低" value="price_desc" />
              <el-option label="评分从高到低" value="rating_desc" />
              <el-option label="销量从高到低" value="sales_desc" />
            </el-select>
          </div> -->
        </div>

        <!-- 商品网格 -->
        <el-row :gutter="20" class="product-grid">
          <el-col 
            v-for="product in paginatedProducts" 
            :key="product.id"
            :xs="24" 
            :sm="12" 
            :md="8" 
            :lg="6"
            class="product-col"
          >
            <el-card 
              class="product-card" 
              :body-style="{ padding: '0px' }"
              shadow="hover"
              @click="handleProductClick(product.id)"
            >
              <!-- 商品图片区域 -->
              <div class="image-container">
                <el-tag 
                  v-if="product.badge" 
                  :type="getBadgeType(product.badge)"
                  class="product-badge"
                >
                  {{ product.badge }}
                </el-tag>
                <img 
                  :src="product.coverImage" 
                  :alt="product.name"
                  class="product-image"
                />
              </div>

              <!-- 商品信息区域 -->
              <div class="product-info">
                <h3 class="product-name">{{ product.name }}</h3>
                <p class="product-description">{{ product.description }}</p>

                <!-- 评分区域 -->
                <!-- <div class="rating-section">
                  <el-rate 
                    v-model="product.rating" 
                    disabled 
                    show-score 
                    text-color="#ff9900"
                    score-template="{value}"
                    class="product-rating"
                  />
                  <span class="review-count">({{ product.reviews }})</span>
                </div> -->

                <!-- 价格区域 -->
                <!-- <div class="price-section">
                  <div class="price-container">
                    <span class="current-price">¥{{ product.price }}</span>
                    <span 
                      v-if="product.originalPrice" 
                      class="original-price"
                    >
                      ¥{{ product.originalPrice }}
                    </span>
                  </div>
                  <el-tag 
                    v-if="product.originalPrice" 
                    type="danger" 
                    size="small"
                    class="discount-tag"
                  >
                    省¥{{ product.originalPrice - product.price }}
                  </el-tag>
                </div> -->

                <!-- 操作按钮 -->
                <!-- <div class="action-section">
                  <el-button 
                    type="primary" 
                    size="small"
                    @click.stop="addToCart(product)"
                    class="add-cart-btn"
                  >
                    加入购物车
                  </el-button>
                </div> -->
              </div>
            </el-card>
          </el-col>
        </el-row>

        <!-- 分页 -->
        <div class="pagination-section">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[12, 24, 36, 48]"
            :total="filteredProducts.length"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// import { ref, reactive, computed } from 'vue'
import { getAllProducts } from '@/api/product'
import { getAllCategories } from '@/api/categories'
import { getAllBrands } from '@/api/brands'

export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 12,
      sortBy: 'default',

      filters: {
        categories: [],
        // priceRange: [0, 2000],
        brands: [],
        rating: 0,
        features: []
      },

      categories: [],

      brands: [],

      allProducts: [
        // {
        //   id: 1,
        //   name: "无线蓝牙耳机",
        //   description: "高品质音效，主动降噪功能",
        //   price: 299,
        //   originalPrice: 399,
        //   coverImage: "/placeholder.svg?height=300&width=300",
        //   rating: 4.8,
        //   reviews: 128,
        //   badge: "热销",
        //   category: 'digital',
        //   brand: 'sony',
        //   sales: 1200,
        //   features: ['free_shipping', 'on_sale']
        // },
        // Add other products here...
      ],
      CategoryMap: []
    }
  },
    mounted() {
        this.fetchProducts();
        this.fetchAllCategories();
        this.fetchAllBrands();
    },
  computed: {
    filteredProducts() {
      let products = [...this.allProducts]
      // console.log("product:", products)
      // 分类筛选
      if (this.filters.categories.length > 0) {
        products = products.filter(product => 
          this.filters.categories.includes(product.categoryId)
        )
      }


      // 品牌筛选
      if (this.filters.brands.length > 0) {
        products = products.filter(product => 
          this.filters.brands.includes(product.brandId)
        )
      }

      return products
    },

    sortedProducts() {
      let products = [...this.filteredProducts]

      switch (this.sortBy) {
        case 'price_asc':
          products.sort((a, b) => a.price - b.price)
          break
        case 'price_desc':
          products.sort((a, b) => b.price - a.price)
          break
        case 'rating_desc':
          products.sort((a, b) => b.rating - a.rating)
          break
        case 'sales_desc':
          products.sort((a, b) => b.sales - a.sales)
          break
        default:
          // Default sorting by product name or id
          products.sort((a, b) => a.name.localeCompare(b.name))
      }

      return products
    },

    paginatedProducts() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.sortedProducts.slice(start, end)
    },

    activeFilterTags() {
      const tags = []
      if (this.filters.categories.length > 0) {
        tags.push({
          key: 'categories',
          label: '分类: ' + this.filters.categories.map(category => this.getNameByID(this.CategoryMap, category)).join(', ')
        })
        // console.log("tags: ", tags)
      }
      if (this.filters.brands.length > 0) {
        tags.push({
          key: 'brands',
          label: '品牌: ' + this.filters.brands.map(brand => this.getNameByID(this.brands, brand)).join(', ')
        })
      }
      return tags
    }
  },

  methods: {
    resetFilters() {
      this.filters = {
        categories: [],
        brands: [],
      }
    },

    fetchProducts() {
        getAllProducts().then(response => {
            this.allProducts = response.data; // 访问response.data
        }).catch(error => {
            console.error('Failed to fetch products:', error);
        });
    },

    // 獲取所有分類
    fetchAllCategories() {
      getAllCategories().then(response => {
          this.CategoryMap = response.data; // 访问response.data
          // console.log(this.CategoryMap)
      }).catch(error => {
          console.error('Failed to fetch categories:', error);
      });
    },

    // 獲取所有brands
    fetchAllBrands() {
      getAllBrands().then(response => {
          this.brands = response.data; // 访问response.data
          // console.log(this.brands)
      }).catch(error => {
          console.error('Failed to fetch brands:', error);
      });
    },

    // 根據ID獲取名字
    getNameByID(ObjectMap, Id) {
      const obj = ObjectMap.find(obj => obj.id === Id)
      return obj ? obj.name : '未知'
    },

    applyFilters() {
      this.currentPage = 1
    },

    applySorting() {
      // Trigger sorting based on selected value
    },

    removeFilter(key, value) {

      if (key === 'categories') {
        this.filters.categories = this.filters.categories.filter(item => item !== value)
        this.filters.categories = []
        // this.applyFilters()
        // this.resetFilters()
      } else if (key === 'brands') {
        this.filters.brands = this.filters.brands.filter(item => item !== value)
        this.filters.brands = []
        // this.applyFilters()
        // this.resetFilters()
      }
    },

    handleSizeChange(size) {
      this.pageSize = size
    },

    handleCurrentChange(page) {
      this.currentPage = page
    },

    handleProductClick(id) {
      this.$router.push({ name: 'ProductDetail', params: { id } });
      // ElMessage.success(`你点击了商品ID: ${productId}`)
    },


  }
}

</script>

<style scoped>
.product-page {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.page-container {
  max-width: 1400px;
  margin: 0 auto;
  background-color: white;
  min-height: 100vh;
}

/* 左侧筛选面板样式 */
.filter-sidebar {
  background-color: #fafafa;
  border-right: 1px solid #e4e7ed;
  padding: 0;
}

.filter-panel {
  padding: 20px;
  height: 100vh;
  overflow-y: auto;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e4e7ed;
}

.filter-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.reset-btn {
  color: #409eff;
  padding: 0;
}

.filter-section {
  margin-bottom: 30px;
}

.filter-title {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 15px 0;
}

.category-checkbox,
.brand-checkbox,
.feature-checkbox {
  display: block;
  margin-bottom: 8px;
  width: 100%;
}

.price-slider {
  margin: 15px 0;
}

.price-display {
  text-align: center;
  font-size: 14px;
  color: #606266;
  margin-top: 10px;
}

.rating-filters {
  display: flex;
  flex-direction: column;
}

.rating-radio {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
}

.rating-text {
  margin-left: 8px;
  font-size: 14px;
}

/* 右侧主内容区样式 */
.main-content {
  padding: 20px;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.result-count {
  font-size: 14px;
  color: #606266;
  margin-right: 10px;
}

.filter-tag {
  margin-right: 5px;
  margin-bottom: 5px;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sort-label {
  font-size: 14px;
  color: #606266;
}

/* 商品网格样式 */
.product-grid {
  margin-bottom: 30px;
}

.product-col {
  margin-bottom: 20px;
}

.product-card {
  height: 100%;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.product-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-info {
  padding: 16px;
  min-width: none;
}

.product-name {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 8px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-description {
  font-size: 13px;
  color: #606266;
  margin: 0 0 12px 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.rating-section {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.product-rating {
  margin-right: 8px;
}

.review-count {
  font-size: 12px;
  color: #909399;
}

.price-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.price-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.current-price {
  font-size: 18px;
  font-weight: bold;
  color: #f56c6c;
}

.original-price {
  font-size: 13px;
  color: #909399;
  text-decoration: line-through;
}

.discount-tag {
  font-size: 12px;
}

.action-section {
  display: flex;
  gap: 8px;
}

.add-cart-btn {
  flex: 1;
}

/* 分页样式 */
.pagination-section {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  padding: 20px 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-container {
    flex-direction: column;
  }
  
  .filter-sidebar {
    width: 100% !important;
    height: auto;
  }
  
  .filter-panel {
    height: auto;
    padding: 15px;
  }
  
  .toolbar {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .toolbar-right {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>