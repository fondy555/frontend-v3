<template>
  <div class="admin-panel">
    <div class="admin-header">
      <div class="header-left">
        <button class="btn btn-icon btn-back" @click="goBack">
          <i class="icon">←</i>
        </button>
        <h1>商品詳情</h1>
      </div>
      <div class="admin-actions">
        <button class="btn btn-outline" @click="editProduct">
          <i class="icon">✏️</i> 編輯商品
        </button>
        <button class="btn btn-primary" @click="goToList">
          返回列表
        </button>
      </div>
    </div>

    <div class="admin-content" v-if="product">
      <!-- 商品狀態橫幅 -->
      <div class="status-banner" :class="'status-' + product.status">
        <div class="status-icon">
          <i class="icon">{{ getStatusIcon(product.status) }}</i>
        </div>
        <div class="status-text">
          <span class="status-label">{{ getStatusLabel(product.status) }}</span>
          <span class="status-description">{{ getStatusDescription(product.status) }}</span>
        </div>
      </div>

      <!-- 商品基本信息和圖片 -->
      <div class="product-overview">
        <div class="product-gallery">
          <div class="main-image">
            <img :src="getImageSrc(currentImage)" :alt="product.name" />
          </div>
          <div class="thumbnail-list">
            <div 
              v-for="(image, index) in product.detailImages" 
              :key="index" 
              class="thumbnail" 
              :class="{ active: currentImageIndex === index }"
              @click="setCurrentImage(index)"
            >
              <img :src="getImageSrc(image)" :alt="`${product.name} - 圖片 ${index + 1}`" />
            </div>
          </div>
        </div>
        
        <div class="product-info">
          <div class="product-header">
            <h2 class="product-name">{{ product.name }}</h2>
            <!-- <div class="product-model">型號: {{ product.model }}</div>
            
            <div class="product-tags" v-if="product.tags && product.tags.length">
              <span 
                v-for="(tag, index) in product.tags" 
                :key="index" 
                class="tag"
                :class="'tag-' + tag.toLowerCase()"
              >
                {{ tag }}
              </span>
            </div> -->
          </div>
          
          <div class="info-section">
            <div class="info-label">分類</div>
            <div class="info-value">{{ getCategoryName(product.categoryId) }}</div>
          </div>
          
          <div class="info-section">
            <div class="info-label">價格</div>
            <div class="info-value price-info">
              <span class="current-price">HK${{ product.salePrice }}</span>
              <!-- <span class="original-price" v-if="product.originalPrice">¥{{ product.originalPrice }}</span>
              <span class="discount" v-if="product.originalPrice">
                ({{ calculateDiscount(product.price, product.originalPrice) }}% 折扣)
              </span> -->
            </div>
          </div>
          
          <div class="info-section">
            <div class="info-label">庫存</div>
            <div class="info-value stock-info" :class="getStockClass(product.stock)">
              {{ getStockLabel(product.stockQuantity) }}
            </div>
          </div>
          
          <div class="info-section">
            <div class="info-label">創建時間</div>
            <div class="info-value">{{ formatDate(product.createTime) }}</div>
          </div>
          
          <div class="info-section" v-if="product.updateTime">
            <div class="info-label">最後更新</div>
            <div class="info-value">{{ formatDate(product.updateTime) }}</div>
          </div>
        </div>
      </div>

      <!-- 商品描述和特點 -->
      <div class="content-section">
        <h3 class="section-title">商品描述</h3>
        <div class="section-content">
          <p class="product-description">{{ product.description }}</p>
        </div>
      </div>
      
      <div class="content-section" v-if="product.features && product.features.length">
        <h3 class="section-title">商品特點</h3>
        <div class="section-content">
          <ul class="features-list">
            <li v-for="(feature, index) in product.features" :key="index">
              {{ feature }}
            </li>
          </ul>
        </div>
      </div>

      <!-- 商品選項和變體 -->
      <div class="content-section" v-if="product.options && product.options.length">
        <h3 class="section-title">商品選項</h3>
        <div class="section-content">
          <div class="options-list">
            <div 
              v-for="(option, index) in product.options" 
              :key="index" 
              class="option-item"
            >
              <div class="option-name">{{ option.name }}</div>
              <div class="option-values">
                <span 
                  v-for="(value, vIndex) in option.values" 
                  :key="vIndex" 
                  class="option-value"
                >
                  {{ value }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="content-section" v-if="product.variants && product.variants.length">
        <h3 class="section-title">商品庫存</h3>
        <div class="section-content">
          <div class="variants-table-container">
            <table class="variants-table">
              <thead>
                <tr>
                  <th v-for="(option, index) in product.options" :key="index">
                    {{ option.name }}
                  </th>
                  <th>價格</th>
                  <!-- <th>原價</th> -->
                  <th>庫存</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(variant, index) in product.variants" :key="index">
                  <td v-for="(optionIndex, oIndex) in variant.options" :key="oIndex">
                    {{ product.options[oIndex].values[optionIndex] }}
                  </td>
                  <td class="price-cell">HK${{ variant.price }}</td>
                  <!-- <td class="original-price-cell">
                    <span v-if="variant.originalPrice">¥{{ variant.originalPrice }}</span>
                    <span v-else>-</span>
                  </td> -->
                  <td :class="getStockClass(variant.stock)">
                    {{ variant.stock }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- 規格參數 -->
      <div class="content-section" v-if="product.specifications && product.specifications.length">
        <h3 class="section-title">規格參數</h3>
        <div class="section-content">
          <div 
            v-for="(spec, index) in product.specifications" 
            :key="index" 
            class="spec-group"
          >
            <h4 class="spec-category">{{ spec.category }}</h4>
            <table class="spec-table">
              <tbody>
                <tr v-for="(item, itemIndex) in spec.items" :key="itemIndex">
                  <td class="spec-name">{{ item.name }}</td>
                  <td class="spec-value">{{ item.value }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      
    </div>

    <!-- 加載中狀態 -->
    <div class="loading-container" v-else>
      <div class="loading-spinner"></div>
      <p>加載商品信息...</p>
    </div>

    <!-- 底部操作按鈕 -->
    <div class="bottom-actions" v-if="product">
      <button class="btn btn-outline" @click="goBack">
        返回
      </button>
      <button class="btn btn-primary" @click="editProduct">
        編輯商品
      </button>
    </div>
  </div>
</template>

<script>
import { getProductById } from '@/api/product';
import { getCategoryName, getImageSrc } from '@/utils/utils';

export default {
  data() {
    return {
      product: null,
      currentImageIndex: 0
    };
  },
  computed: {
    currentImage() {
      if (!this.product || !this.product.detailImages || this.product.detailImages.length === 0) {
        return 'https://placehold.co/400x400/eee/999?text=無圖片';
      }
      return this.product.detailImages[this.currentImageIndex];
    }
  },
  mounted() {
    // 模擬從 API 獲取商品數據
    this.loadProductData();
  },
  methods: {
    async loadProductData() {
        try {
        const productId = this.$route.params.id;
        // const productId = 1;
        // console.log('Fetching product with ID:', productId);
        const response = await getProductById(productId);
        // console.log('Product data received:', response);
        
        if (response.code === 0) {
          this.product = response.data;
        } else {
            throw new Error(response.message || '获取产品详情失败');
        }
        } catch (error) {
        console.error('获取产品详情失败:', error);
        this.error = '获取产品详情失败，请稍后再试';
        // 可以添加更多的错误处理逻辑，比如显示一个错误提示
        }
    },
    setCurrentImage(index) {
      this.currentImageIndex = index;
    },

    getImageSrc(image) {
        return getImageSrc(image)
    },
    formatDescription(text) {
      if (!text) return '';
      return text.replace(/\n/g, '<br>');
    },
    calculateDiscount(price, originalPrice) {
      if (!originalPrice || originalPrice <= price) return 0;
      const discount = ((originalPrice - price) / originalPrice) * 100;
      return Math.round(discount);
    },
    getCategoryName(categoryId) {

      return getCategoryName(categoryId);
    },
    getStatusIcon(status) {
      switch (status) {
        case '1': return '✅';
        case '0': return '📝';
        case '2': return '👁️';
        default: return '❓';
      }
    },
    getStatusLabel(status) {
      switch (status) {
        case '1': return '已發布';
        case '0': return '草稿';
        case '2': return '隱藏';
        default: return status;
      }
    },
    getStatusDescription(status) {
      switch (status) {
        case '1': return '此商品已發布，對所有用戶可見';
        case '0': return '此商品處於草稿狀態，尚未發布';
        case '2': return '此商品已被隱藏，對用戶不可見';
        default: return '';
      }
    },
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
    goBack() {
      // 返回上一頁
      // alert('返回上一頁');
      this.$router.go(-1);
    },
    goToList() {
      // 返回商品列表頁
      alert('返回商品列表頁');
    },
    editProduct() {
      // 跳轉到編輯商品頁面
      // alert(`編輯商品 ID: ${this.product.id}`);
        this.$router.push({ 
          name: 'productEdit',
          params: { id: this.product.id }
        });
    }
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
  max-width: 1200px;
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

.header-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.admin-header h1 {
  font-size: 24px;
  color: #2c3e50;
}

.admin-actions {
  display: flex;
  gap: 10px;
}

.btn-back {
  background-color: #f1f5f9;
}

/* 內容區域 */
.admin-content {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 20px;
  margin-bottom: 20px;
}

/* 狀態橫幅 */
.status-banner {
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 20px;
}

.status-published {
  background-color: #f0fdf4;
  border-left: 4px solid #22c55e;
}

.status-draft {
  background-color: #f8fafc;
  border-left: 4px solid #64748b;
}

.status-hidden {
  background-color: #fef2f2;
  border-left: 4px solid #ef4444;
}

.status-icon {
  font-size: 20px;
  margin-right: 15px;
}

.status-text {
  display: flex;
  flex-direction: column;
}

.status-label {
  font-weight: 600;
  margin-bottom: 5px;
}

.status-description {
  font-size: 14px;
  color: #64748b;
}

/* 商品概覽區域 */
.product-overview {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 30px;
}

.product-gallery {
  flex: 1;
  min-width: 300px;
}

.main-image {
  width: 100%;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 15px;
  border: 1px solid #e2e8f0;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.thumbnail-list {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.thumbnail {
  width: 80px;
  height: 80px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.2s ease;
}

.thumbnail:hover {
  border-color: #3498db;
}

.thumbnail.active {
  border: 2px solid #3498db;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  flex: 1;
  min-width: 300px;
}

.product-header {
  margin-bottom: 20px;
}

.product-name {
  font-size: 24px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 5px;
}

.product-model {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 10px;
}

.product-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.tag {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: #e2e8f0;
  color: #4a5568;
}


.info-section {
  display: flex;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e2e8f0;
}

.info-section:last-child {
  border-bottom: none;
}

.info-label {
  width: 100px;
  font-weight: 500;
  color: #4a5568;
}

.info-value {
  flex: 1;
}

.price-info {
  display: flex;
  gap: 10px;
}

.current-price {
  font-size: 20px;
  font-weight: 600;
  color: #e53e3e;
}

.original-price {
  font-size: 16px;
  color: #a0aec0;
  text-decoration: line-through;
}

.discount {
  font-size: 14px;
  color: #e53e3e;
}

.stock-info {
  font-weight: 500;
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

/* 內容區塊 */
.content-section {
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #e2e8f0;
}

.content-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e2e8f0;
}

.section-content {
  padding: 0 10px;
}

.product-description {
  margin-bottom: 15px;
  color: #4a5568;
}

.product-long-description {
  color: #4a5568;
  line-height: 1.8;
}

.features-list {
  padding-left: 20px;
}

.features-list li {
  margin-bottom: 10px;
  color: #4a5568;
}

/* 選項和變體 */
.options-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
}

.option-item {
  flex: 1;
  min-width: 200px;
}

.option-name {
  font-weight: 500;
  margin-bottom: 10px;
  color: #2d3748;
}

.option-values {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.option-value {
  padding: 5px 10px;
  background-color: #f1f5f9;
  border-radius: 4px;
  font-size: 14px;
  color: #4a5568;
}

.variants-table-container {
  overflow-x: auto;
}

.variants-table {
  width: 100%;
  border-collapse: collapse;
}

.variants-table th,
.variants-table td {
  padding: 10px;
  border: 1px solid #e2e8f0;
  text-align: left;
}

.variants-table th {
  background-color: #f8fafc;
  font-weight: 500;
  color: #4a5568;
}

.price-cell {
  font-weight: 500;
  color: #e53e3e;
}

.original-price-cell {
  color: #a0aec0;
}

/* 規格參數 */
.spec-group {
  margin-bottom: 20px;
}

.spec-group:last-child {
  margin-bottom: 0;
}

.spec-category {
  font-size: 16px;
  font-weight: 500;
  color: #2d3748;
  margin-bottom: 10px;
}

.spec-table {
  width: 100%;
  border-collapse: collapse;
}

.spec-table tr:nth-child(even) {
  background-color: #f8fafc;
}

.spec-table td {
  padding: 8px 10px;
  border: 1px solid #e2e8f0;
}

.spec-name {
  width: 30%;
  font-weight: 500;
  color: #4a5568;
}

.spec-value {
  color: #4a5568;
}


/* 加載中狀態 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 底部操作按鈕 */
.bottom-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
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

.btn-icon {
  width: 36px;
  height: 36px;
  border: none;
  background: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
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

.btn-icon:hover {
  background-color: #f1f5f9;
}

/* 響應式調整 */
@media (max-width: 768px) {
  .product-overview {
    flex-direction: column;
  }
  
  .main-image {
    height: 300px;
  }
  
  .info-section {
    flex-direction: column;
  }
  
  .info-label {
    width: 100%;
    margin-bottom: 5px;
  }
  
  .settings-grid {
    grid-template-columns: 1fr;
  }
  
  .admin-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .admin-actions {
    width: 100%;
    justify-content: space-between;
  }
}
</style>