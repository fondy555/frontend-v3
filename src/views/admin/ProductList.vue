<template>
  <div class="admin-panel">
    <div class="admin-header">
      <h1>商品管理</h1>
      <div class="admin-actions">
        <button class="btn btn-primary" @click="goToAddProduct">
          <i class="icon">➕</i> 添加商品
        </button>
      </div>
    </div>

    <div class="admin-content">
      <!-- 搜索和篩選區域 -->
      <div class="filter-section">
        <div class="search-box">
          <input 
            type="text" 
            v-model="filters.keyword" 
            placeholder="搜索商品名稱、型號或描述" 
            @input="debounceSearch"
          />
          <button class="search-button">
            <i class="icon">🔍</i>
          </button>
        </div>
        
        <div class="filter-options">
          <div class="filter-group">
            <label>分類</label>
            <select v-model="filters.category" @change="applyFilters">
              <option value="">全部分類</option>
              <option v-for="(Category, key) in CategoryMap" :key="key" :value="Category.NameEn">{{ Category.Name }}</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label>狀態</label>
            <select v-model="filters.status" @change="applyFilters">
              <option value="">全部狀態</option>
              <option value="1">已發布</option>
              <option value="0">草稿</option>
              <option value="2">隱藏</option>
            </select>
          </div>
          
          <!-- <div class="filter-group">
            <label>庫存</label>
            <select v-model="filters.stock" @change="applyFilters">
              <option value="">全部</option>
              <option value="instock">有庫存</option>
              <option value="lowstock">庫存緊張</option>
              <option value="outofstock">缺貨</option>
            </select>
          </div> -->
          
          <button class="btn btn-outline btn-sm" @click="resetFilters">
            重置篩選
          </button>
        </div>
      </div>

      <!-- 批量操作工具欄 -->
      <div class="bulk-actions" v-if="selectedProducts.length > 0">
        <div class="selected-count">
          已選擇 {{ selectedProducts.length }} 件商品
        </div>
        <div class="bulk-buttons">
          <button class="btn btn-sm" @click="bulkPublish">發布</button>
          <button class="btn btn-sm" @click="bulkHide">隱藏</button>
          <button class="btn btn-sm" @click="bulkSetFeatured">設為精選</button>
          <button class="btn btn-sm" @click="bulkRemoveFeatured">取消精選</button>
          <button class="btn btn-sm btn-danger" @click="confirmBulkDelete">刪除</button>
        </div>
      </div>

      <!-- 商品列表表格 -->
      <div class="product-table-container">
        <table class="product-table">
          <thead>
            <tr>
              <th class="checkbox-cell">
                <input 
                  type="checkbox" 
                  :checked="allSelected" 
                  :indeterminate="someSelected" 
                  @change="toggleSelectAll"
                />
              </th>
              <th class="image-cell">圖片</th>
              <th class="product-info-cell" @click="sortBy('name')">
                商品信息
                <span class="sort-icon" v-if="sortField === 'name'">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th @click="sortBy('price')" style="width: 10%;">
                價格
                <span class="sort-icon" v-if="sortField === 'price'">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th @click="sortBy('stock')">
                庫存
                <span class="sort-icon" v-if="sortField === 'stock'">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th @click="sortBy('status')">
                狀態
                <span class="sort-icon" v-if="sortField === 'status'">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th @click="sortBy('createdAt')">
                創建時間
                <span class="sort-icon" v-if="sortField === 'createdAt'">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th class="actions-cell">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in displayedProducts" :key="product.id" :class="{ 'selected-row': isSelected(product.id) }">
              <td class="checkbox-cell">
                <input 
                  type="checkbox" 
                  :checked="isSelected(product.id)" 
                  @change="toggleSelect(product.id)"
                />
              </td>
              <td class="image-cell">
                <div class="product-image">
                  <img :src="getImageSrc(product.coverImage)" :alt="product.name" />
                </div>
              </td>
              <td class="product-info-cell">
                <div class="product-name">{{ product.name }}</div>
                <!-- <div class="product-model">型號: {{ product.model }}</div> -->
                <!-- <div class="product-tags">
                  <span 
                    v-for="(tag, index) in product.tags" 
                    :key="index" 
                    class="tag"
                    :class="'tag-' + tag.toLowerCase()"
                  > -->
                    <!-- {{ tag }} -->
                  <!-- </span> -->
                <!-- </div> -->
              </td>
              <td>
                <div class="price-info">
                  <div class="current-price">{{ product.salePrice }}</div>
                  <!-- <div class="original-price" v-if="product.originalPrice">{{ product.originalPrice }}</div> -->
                </div>
              </td> 
              <td>
                <div class="stock-info" :class="getStockClass(product.stock)">
                  {{ getStockLabel(product.stockQuantity) }}
                </div>
              </td>
              <td>
                <div class="status-badge" :class="'status-' + product.status">
                  {{ getStatusLabel(product.status) }}
                </div>
              </td>
              <td>{{ formatDate(product.createTime) }}</td>
              <td class="actions-cell">
                <div class="action-buttons">
                  <button class="btn-icon" title="查看" @click="viewProduct(product.id)">
                    <i class="icon">👁️</i>
                  </button>
                  <button class="btn-icon" title="編輯" @click="editProduct(product.id)">
                    <i class="icon">✏️</i>
                  </button>
                  <button class="btn-icon" title="複製" @click="duplicateProduct(product.id)">
                    <i class="icon">📋</i>
                  </button>
                  <button class="btn-icon btn-danger" title="刪除" @click="confirmDelete(product.id)">
                    <i class="icon">🗑️</i>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="displayedProducts.length === 0">
              <td colspan="8" class="no-data">
                <div class="no-data-message">
                  <i class="icon large-icon">📦</i>
                  <p>沒有找到符合條件的商品</p>
                  <button class="btn btn-outline btn-sm" @click="resetFilters">清除篩選條件</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 分頁控制 -->
      <div class="pagination-container">
        <div class="pagination-info">
          顯示 {{ paginationInfo.from }}-{{ paginationInfo.to }} 條，共 {{ paginationInfo.total }} 條
        </div>
        <div class="pagination-controls">
          <button 
            class="btn-page" 
            :disabled="currentPage === 1" 
            @click="goToPage(1)"
          >
            <i class="icon">⏮️</i>
          </button>
          <button 
            class="btn-page" 
            :disabled="currentPage === 1" 
            @click="goToPage(currentPage - 1)"
          >
            <i class="icon">◀️</i>
          </button>
          
          <div class="page-numbers">
            <button 
              v-for="page in displayedPages" 
              :key="page" 
              class="btn-page" 
              :class="{ active: currentPage === page }"
              @click="goToPage(page)"
            >
              {{ page }}
            </button>
          </div>
          
          <button 
            class="btn-page" 
            :disabled="currentPage === totalPages" 
            @click="goToPage(currentPage + 1)"
          >
            <i class="icon">▶️</i>
          </button>
          <button 
            class="btn-page" 
            :disabled="currentPage === totalPages" 
            @click="goToPage(totalPages)"
          >
            <i class="icon">⏭️</i>
          </button>
        </div>
        <div class="pagination-size">
          <label>每頁顯示:</label>
          <select v-model="pageSize" @change="changePageSize">
            <option :value="10">10</option>
            <option :value="20">20</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 確認刪除彈窗 -->
    <div class="modal" v-if="showDeleteModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>確認刪除</h3>
          <button class="btn-close" @click="showDeleteModal = false">×</button>
        </div>
        <div class="modal-body">
          <p v-if="deleteMode === 'single'">
            確定要刪除商品 "{{ productToDelete ? productToDelete.name : '' }}" 嗎？此操作無法撤銷。
          </p>
          <p v-else>
            確定要刪除選中的 {{ selectedProducts.length }} 件商品嗎？此操作無法撤銷。
          </p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" @click="showDeleteModal = false">取消</button>
          <button class="btn btn-danger" @click="confirmDeleteAction">確認刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllProducts } from '@/api/index.js'
import { baseImageUrl } from '@/config';
import { getCategoryName, CategoryMap, getCategoryNameEn  } from '@/utils/utils';


export default {
  data() {
    return {
      // 商品列表數據
      products: [
        {
          id: 2,
          name: 'Ultra Tab 專業平板',
          // model: 'UT-2023',
          description: '',
          image: '',
          stock: 0,
          status: 1,
          category: '',
          createdAt: ''
        }
      ],
      
      // 篩選條件
      filters: {
        keyword: '',
        category: '',
        status: "",
        stock: '',
        tag: ''
      },

      CategoryMap,
      // 排序設置
      sortField: 'createdAt',
      sortDirection: 'desc',
      
      // 分頁設置
      currentPage: 1,
      pageSize: 10,
      
      // 選中的商品
      selectedProducts: [],
      
      // 刪除確認
      showDeleteModal: false,
      deleteMode: 'single', // 'single' 或 'bulk'
      productToDelete: null,
      
      // 搜索防抖計時器
      searchTimer: null
    };
  },
  computed: {
    // 過濾和排序後的商品列表
    filteredProducts() {
      let result = [...this.products];
      
      // 應用關鍵詞搜索
      if (this.filters.keyword) {
        const keyword = this.filters.keyword.toLowerCase();
        result = result.filter(product => 
          product.name.toLowerCase().includes(keyword) || 
          product.model.toLowerCase().includes(keyword)
        );
      }
      
      // 應用分類篩選
      if (this.filters.category) {
        console.log("this.filters.category: ", this.filters.category)
        result = result.filter(product => getCategoryNameEn(product.categoryId) === this.filters.category);
      }
      
      // 應用狀態篩選
      if (this.filters.status) {
        console.log("this.filters.status: ", this.filters.status)
        console.log("result: ", typeof(result[0].status),  typeof(this.filters.status))
        // console.log("this.product.status: ",  this.product.status)
        result = result.filter(product => product.status === this.filters.status);
        console.log("result: ", result)
      }
      
      // 應用庫存篩選
      if (this.filters.stock) {
        switch (this.filters.stock) {
          case 'instock':
            result = result.filter(product => product.stock > 10);
            break;
          case 'lowstock':
            result = result.filter(product => product.stock > 0 && product.stock <= 10);
            break;
          case 'outofstock':
            result = result.filter(product => product.stock === 0);
            break;
        }
      }
      
      // 應用標籤篩選
      if (this.filters.tag) {
        result = result.filter(product => 
          product.tags && product.tags.some(tag => 
            tag.toLowerCase() === this.filters.tag.toLowerCase()
          )
        );
      }
      
      // 應用排序
      result.sort((a, b) => {
        let valueA = a[this.sortField];
        let valueB = b[this.sortField];
        
        // 特殊處理某些字段
        if (this.sortField === 'price' || this.sortField === 'stock') {
          valueA = Number(valueA);
          valueB = Number(valueB);
        }
        
        if (this.sortDirection === 'asc') {
          return valueA > valueB ? 1 : -1;
        } else {
          return valueA < valueB ? 1 : -1;
        }
      });
      
      return result;
    },
    
    // 當前頁顯示的商品
    displayedProducts() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredProducts.slice(start, end);
    },
    
    // 總頁數
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.pageSize);
    },
    
    // 顯示的頁碼
    displayedPages() {
      const pages = [];
      const maxVisiblePages = 5;
      
      if (this.totalPages <= maxVisiblePages) {
        // 如果總頁數小於等於最大可見頁數，顯示所有頁碼
        for (let i = 1; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        // 否則，顯示當前頁附近的頁碼
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = startPage + maxVisiblePages - 1;
        
        if (endPage > this.totalPages) {
          endPage = this.totalPages;
          startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
      }
      
      return pages;
    },
    
    // 分頁信息
    paginationInfo() {
      const total = this.filteredProducts.length;
      const from = total === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
      const to = Math.min(this.currentPage * this.pageSize, total);
      
      return { from, to, total };
    },
    
    // 是否全部選中
    allSelected() {
      return this.displayedProducts.length > 0 && this.selectedProducts.length === this.displayedProducts.length;
    },
    
    // 是否部分選中
    someSelected() {
      return this.selectedProducts.length > 0 && !this.allSelected;
    }
  },
  mounted() {
    // 加載模擬數據
    this.fetchProducts();
  },
  methods: {
    // 加載商品數據
    loadProducts() {

      // 模擬從 API 獲取數據
      this.products = [
        {
          id: 1,
          name: 'Pro X 旗艦智能手機',
          // model: 'PX-2023',
          description: '頂級旗艦智能手機，搭載最新處理器和高清攝像頭',
          image: 'https://placehold.co/100x100/eee/999?text=Pro X',
          // price: 6999,
          // originalPrice: 7999,
          stock: 156,
          status: "1",
          category: 'smartphone',
          // tags: ['熱銷款', '精選'],
          createdAt: '2023-10-15T08:30:00Z'
        },
        {
          id: 2,
          name: 'Ultra Tab 專業平板',
          // model: 'UT-2023',
          description: '專業級平板電腦，適合創意工作者和專業人士',
          image: 'https://placehold.co/100x100/eee/999?text=Ultra Tab',
          // price: '-',
          // originalPrice: 5499,
          stock: 89,
          status: "1",
          category: 'tablet',
          // tags: ['新品'],
          createdAt: '2023-11-05T10:15:00Z'
        },
      ];
    },

    fetchProducts() {
      getAllProducts().then(response => {
            this.products = response.data; // 访问response.data
        }).catch(error => {
            console.error('Failed to fetch products:', error);
        });
    },
    getCategoryName(categoryId) {
        // 判断categoryId是否在CategoryMap中
        return  getCategoryName(categoryId) 
    },

    getImageSrc(image) {
      // 判断image是否是字符串
      if (typeof image !== 'string') {
        console.error("Invalid image type, expected string but got:", typeof image);
        return '';
      }
      // console.log("getImageSrc", image.startsWith('http'));
      return image.startsWith('http') ? image : baseImageUrl + image;
    },
    
    // 搜索防抖
    debounceSearch() {
      clearTimeout(this.searchTimer);
      this.searchTimer = setTimeout(() => {
        this.applyFilters();
      }, 300);
    },
    
    // 應用篩選
    applyFilters() {
      this.currentPage = 1; // 重置到第一頁
    },
    
    // 重置篩選條件
    resetFilters() {
      this.filters = {
        keyword: '',
        category: '',
        status: "",
        stock: '',
        tag: ''
      };
      this.applyFilters();
    },
    
    // 排序
    sortBy(field) {
      if (this.sortField === field) {
        // 如果已經按此字段排序，則切換排序方向
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        // 否則，設置新的排序字段，並默認為升序
        this.sortField = field;
        this.sortDirection = 'asc';
      }
    },
    
    // 分頁控制
    goToPage(page) {
      this.currentPage = page;
    },
    
    // 更改每頁顯示數量
    changePageSize() {
      this.currentPage = 1; // 重置到第一頁
    },
    
    // 選擇控制
    toggleSelectAll() {
      if (this.allSelected) {
        this.selectedProducts = [];
      } else {
        this.selectedProducts = this.displayedProducts.map(product => product.id);
      }
    },
    
    toggleSelect(productId) {
      const index = this.selectedProducts.indexOf(productId);
      if (index === -1) {
        this.selectedProducts.push(productId);
      } else {
        this.selectedProducts.splice(index, 1);
      }
    },
    
    isSelected(productId) {
      return this.selectedProducts.includes(productId);
    },
    
    // 批量操作
    bulkPublish() {
      this.products = this.products.map(product => {
        if (this.selectedProducts.includes(product.id)) {
          return { ...product, status: 'published' };
        }
        return product;
      });
      this.selectedProducts = [];
    },
    
    bulkHide() {
      this.products = this.products.map(product => {
        if (this.selectedProducts.includes(product.id)) {
          return { ...product, status: 'hidden' };
        }
        return product;
      });
      this.selectedProducts = [];
    },
    
    bulkSetFeatured() {
      this.products = this.products.map(product => {
        if (this.selectedProducts.includes(product.id)) {
          const tags = product.tags || [];
          if (!tags.includes('精選')) {
            return { ...product, tags: [...tags, '精選'] };
          }
        }
        return product;
      });
      this.selectedProducts = [];
    },
    
    bulkRemoveFeatured() {
      this.products = this.products.map(product => {
        if (this.selectedProducts.includes(product.id)) {
          const tags = product.tags || [];
          return { ...product, tags: tags.filter(tag => tag !== '精選') };
        }
        return product;
      });
      this.selectedProducts = [];
    },
    
    confirmBulkDelete() {
      this.deleteMode = 'bulk';
      this.showDeleteModal = true;
    },
    
    // 單個商品操作
    viewProduct(productId) {
      // 查看商品詳情
    //   alert(`查看商品 ID: ${productId}`);
        this.$router.push({ path: `/product/${productId}` });
    },
    
    editProduct(productId) {
      // 編輯商品
      alert(`編輯商品 ID: ${productId}`);
    },
    
    duplicateProduct(productId) {
      // 複製商品
      const product = this.products.find(p => p.id === productId);
      if (product) {
        const newProduct = {
          ...product,
          id: this.products.length + 1,
          name: `${product.name} (複製)`,
          status: "0",
          createdAt: new Date().toISOString()
        };
        this.products.push(newProduct);
        alert(`已複製商品: ${newProduct.name}`);
      }
    },
    
    confirmDelete(productId) {
      this.deleteMode = 'single';
      this.productToDelete = this.products.find(p => p.id === productId);
      this.showDeleteModal = true;
    },
    
    confirmDeleteAction() {
      if (this.deleteMode === 'single' && this.productToDelete) {
        // 刪除單個商品
        this.products = this.products.filter(p => p.id !== this.productToDelete.id);
      } else if (this.deleteMode === 'bulk') {
        // 批量刪除商品
        this.products = this.products.filter(p => !this.selectedProducts.includes(p.id));
        this.selectedProducts = [];
      }
      
      this.showDeleteModal = false;
      this.productToDelete = null;
    },
    
    // 跳轉到添加商品頁面
    goToAddProduct() {
      // 跳轉到添加商品頁面
      alert('跳轉到添加商品頁面');
    },
    
    // 輔助方法
    getStockClass(stock) {
      if (stock === 0) return 'out-of-stock';
      if (stock <= 10) return 'low-stock';
      return 'in-stock';
    },
    
    getStockLabel(stock) {
      if (stock === 0) return '缺貨';
      if (stock <= 10) return `庫存緊張 (${stock})`;
      return `有庫存 (${stock})`;
    },
    
    getStatusLabel(status) {
      switch (status) {
        case "1": return '已發布';
        case "0": return '草稿';
        case "2": return '隱藏';
        default: return status;
      }
    },
    
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
  }
};
</script>

<style>
/* 基本樣式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f5f7fa;
}

.admin-panel {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

/* 頭部樣式 */
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e1e4e8;
}

.admin-header h1 {
  font-size: 24px;
  color: #2c3e50;
}

.admin-actions {
  display: flex;
  gap: 10px;
}

/* 內容區域 */
.admin-content {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 20px;
}

/* 搜索和篩選區域 */
.filter-section {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e1e4e8;
}

.search-box {
  position: relative;
  max-width: 500px;
  margin-bottom: 15px;
}

.search-box input {
  width: 100%;
  padding: 10px 40px 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.search-button {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 40px;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-group label {
  font-size: 14px;
  color: #4a5568;
}

.filter-group select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-width: 120px;
}

/* 批量操作工具欄 */
.bulk-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8fafc;
  padding: 10px 15px;
  border-radius: 4px;
  margin-bottom: 15px;
}

.selected-count {
  font-weight: 500;
  color: #4a5568;
}

.bulk-buttons {
  display: flex;
  gap: 8px;
}

/* 商品表格 */
.product-table-container {
  overflow-x: auto;
  margin-bottom: 20px;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
}

.product-table th,
.product-table td {
  padding: 12px 15px;
  border-bottom: 1px solid #e1e4e8;
  text-align: left;
}

.product-table th {
  background-color: #f8f9fa;
  font-weight: 500;
  color: #4a5568;
  cursor: pointer;
  user-select: none;
}

.product-table th:hover {
  background-color: #edf2f7;
}

.sort-icon {
  margin-left: 5px;
  font-size: 12px;
}

.product-table tbody tr:hover {
  background-color: #f8fafc;
}

.selected-row {
  background-color: #ebf5ff !important;
}

.checkbox-cell {
  width: 40px;
  text-align: center;
}

.image-cell {
  width: 80px;
}

.product-info-cell {
  min-width: 250px;
}

.actions-cell {
  width: 120px;
  text-align: center;
}

.product-image {
  width: 60px;
  height: 60px;
  border-radius: 4px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-name {
  font-weight: 500;
  margin-bottom: 5px;
}

.product-model {
  font-size: 12px;
  color: #718096;
  margin-bottom: 5px;
}

.product-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.tag {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 10px;
  background-color: #e2e8f0;
  color: #4a5568;
}

.tag-熱銷款 {
  background-color: #fed7d7;
  color: #e53e3e;
}

.tag-新品 {
  background-color: #c6f6d5;
  color: #38a169;
}

.tag-精選 {
  background-color: #bee3f8;
  color: #3182ce;
}

.tag-限量版 {
  background-color: #feebc8;
  color: #dd6b20;
}

.price-info {
  display: flex;
  flex-direction: column;
}

.current-price {
  font-weight: 500;
  color: #e53e3e;
}

.original-price {
  font-size: 12px;
  color: #a0aec0;
  text-decoration: line-through;
}

.stock-info {
  font-size: 13px;
}

.in-stock {
  color: #38a169;
}

.low-stock {
  color: #dd6b20;
}

.out-of-stock {
  color: #e53e3e;
}

.status-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.status-published {
  background-color: #c6f6d5;
  color: #38a169;
}

.status-draft {
  background-color: #e2e8f0;
  color: #4a5568;
}

.status-hidden {
  background-color: #fed7d7;
  color: #e53e3e;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 5px;
}

.no-data {
  text-align: center;
  padding: 40px 0;
}

.no-data-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.large-icon {
  font-size: 32px;
  margin-bottom: 10px;
  color: #a0aec0;
}

/* 分頁控制 */
.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid #e1e4e8;
}

.pagination-info {
  color: #718096;
  font-size: 14px;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 5px;
}

.page-numbers {
  display: flex;
  gap: 5px;
}

.btn-page {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  background-color: #fff;
  color: #4a5568;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-page:hover:not(:disabled) {
  background-color: #edf2f7;
}

.btn-page.active {
  background-color: #3498db;
  color: white;
  border-color: #3498db;
}

.btn-page:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-size {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pagination-size label {
  font-size: 14px;
  color: #718096;
}

.pagination-size select {
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

/* 按鈕樣式 */
.btn {
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 5px;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 12px;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-outline {
  background-color: transparent;
  color: #3498db;
  border: 1px solid #3498db;
}

.btn-outline:hover {
  background-color: #ebf8ff;
}

.btn-danger {
  background-color: #e53e3e;
  color: white;
}

.btn-danger:hover {
  background-color: #c53030;
}

.btn-icon {
  width: 30px;
  height: 30px;
  border: none;
  background: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-icon:hover {
  background-color: #f1f1f1;
}

.btn-icon.btn-danger:hover {
  background-color: #fed7d7;
  color: #e53e3e;
}

/* 彈窗樣式 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #e1e4e8;
}

.modal-header h3 {
  font-size: 18px;
  color: #2c3e50;
}

.btn-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #718096;
}

.modal-body {
  padding: 20px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 15px 20px;
  border-top: 1px solid #e1e4e8;
}

/* 響應式調整 */
@media (max-width: 768px) {
  .filter-options {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .filter-group {
    width: 100%;
  }
  
  .filter-group select {
    width: 100%;
  }
  
  .bulk-actions {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
  
  .pagination-container {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
  
  .product-table th,
  .product-table td {
    padding: 8px;
  }
  
  .action-buttons {
    flex-wrap: wrap;
  }
}
</style>