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
            <img :src="currentImage" :alt="product.name" />
          </div>
          <div class="thumbnail-list">
            <div 
              v-for="(image, index) in product.images" 
              :key="index" 
              class="thumbnail" 
              :class="{ active: currentImageIndex === index }"
              @click="setCurrentImage(index)"
            >
              <img :src="image" :alt="`${product.name} - 圖片 ${index + 1}`" />
            </div>
          </div>
        </div>
        
        <div class="product-info">
          <div class="product-header">
            <h2 class="product-name">{{ product.name }}</h2>
            <div class="product-model">型號: {{ product.model }}</div>
            
            <div class="product-tags" v-if="product.tags && product.tags.length">
              <span 
                v-for="(tag, index) in product.tags" 
                :key="index" 
                class="tag"
                :class="'tag-' + tag.toLowerCase()"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          
          <div class="info-section">
            <div class="info-label">分類</div>
            <div class="info-value">{{ getCategoryName(product.category) }}</div>
          </div>
          
          <div class="info-section">
            <div class="info-label">價格</div>
            <div class="info-value price-info">
              <span class="current-price">¥{{ product.price }}</span>
              <span class="original-price" v-if="product.originalPrice">¥{{ product.originalPrice }}</span>
              <span class="discount" v-if="product.originalPrice">
                ({{ calculateDiscount(product.price, product.originalPrice) }}% 折扣)
              </span>
            </div>
          </div>
          
          <div class="info-section">
            <div class="info-label">庫存</div>
            <div class="info-value stock-info" :class="getStockClass(product.stock)">
              {{ getStockLabel(product.stock) }}
            </div>
          </div>
          
          <div class="info-section">
            <div class="info-label">創建時間</div>
            <div class="info-value">{{ formatDate(product.createdAt) }}</div>
          </div>
          
          <div class="info-section" v-if="product.updatedAt">
            <div class="info-label">最後更新</div>
            <div class="info-value">{{ formatDate(product.updatedAt) }}</div>
          </div>
        </div>
      </div>

      <!-- 商品描述和特點 -->
      <div class="content-section">
        <h3 class="section-title">商品描述</h3>
        <div class="section-content">
          <p class="product-description">{{ product.description }}</p>
          <div class="product-long-description" v-if="product.longDescription">
            <div v-html="formatDescription(product.longDescription)"></div>
          </div>
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
        <h3 class="section-title">商品變體</h3>
        <div class="section-content">
          <div class="variants-table-container">
            <table class="variants-table">
              <thead>
                <tr>
                  <th v-for="(option, index) in product.options" :key="index">
                    {{ option.name }}
                  </th>
                  <th>價格</th>
                  <th>原價</th>
                  <th>庫存</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(variant, index) in product.variants" :key="index">
                  <td v-for="(optionIndex, oIndex) in variant.options" :key="oIndex">
                    {{ product.options[oIndex].values[optionIndex] }}
                  </td>
                  <td class="price-cell">¥{{ variant.price }}</td>
                  <td class="original-price-cell">
                    <span v-if="variant.originalPrice">¥{{ variant.originalPrice }}</span>
                    <span v-else>-</span>
                  </td>
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

      <!-- SEO 信息 -->
      <div class="content-section">
        <h3 class="section-title">SEO 設置</h3>
        <div class="section-content">
          <div class="seo-info">
            <div class="info-row">
              <div class="info-label">Meta 標題</div>
              <div class="info-value">{{ product.seo?.title || product.name }}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Meta 關鍵詞</div>
              <div class="info-value">{{ product.seo?.keywords || '-' }}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Meta 描述</div>
              <div class="info-value">{{ product.seo?.description || product.description }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 其他設置 -->
      <div class="content-section">
        <h3 class="section-title">其他設置</h3>
        <div class="section-content">
          <div class="settings-grid">
            <div class="setting-item">
              <div class="setting-label">精選商品</div>
              <div class="setting-value">
                <span class="status-indicator" :class="{ active: product.featured }">
                  {{ product.featured ? '是' : '否' }}
                </span>
              </div>
            </div>
            <div class="setting-item">
              <div class="setting-label">新品上市</div>
              <div class="setting-value">
                <span class="status-indicator" :class="{ active: product.newArrival }">
                  {{ product.newArrival ? '是' : '否' }}
                </span>
              </div>
            </div>
            <div class="setting-item">
              <div class="setting-label">排序權重</div>
              <div class="setting-value">{{ product.sortOrder || 0 }}</div>
            </div>
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
export default {
  data() {
    return {
      product: null,
      currentImageIndex: 0
    };
  },
  computed: {
    currentImage() {
      if (!this.product || !this.product.images || this.product.images.length === 0) {
        return 'https://placehold.co/400x400/eee/999?text=無圖片';
      }
      return this.product.images[this.currentImageIndex];
    }
  },
  mounted() {
    // 模擬從 API 獲取商品數據
    this.loadProductData();
  },
  methods: {
    loadProductData() {
      // 模擬 API 請求延遲
      setTimeout(() => {
        // 模擬商品數據
        this.product = {
          id: 1,
          name: 'Pro X 旗艦智能手機',
          model: 'PX-2023',
          description: '頂級旗艦智能手機，搭載最新處理器和高清攝像頭',
          longDescription: `Pro X 旗艦智能手機是我們最新推出的頂級產品，代表了當前智能手機技術的巔峰水平。\n\n搭載最新一代的驍龍8處理器，配合12GB大內存和512GB超大存儲空間，無論是日常使用還是高強度遊戲，都能輕鬆應對。\n\n6.7英寸2K+超視網膜屏幕，120Hz自適應刷新率，HDR10+認證，帶來震撼的視覺體驗。\n\n後置四攝系統，包括一個108MP主攝、一個50MP超廣角、一個12MP長焦和一個ToF深感鏡頭，支持8K視頻錄製和專業模式拍攝。`,
          images: [
            'https://placehold.co/600x600/eee/999?text=Pro X 正面',
            'https://placehold.co/600x600/eee/999?text=Pro X 背面',
            'https://placehold.co/600x600/eee/999?text=Pro X 側面',
            'https://placehold.co/600x600/eee/999?text=Pro X 細節'
          ],
          price: 6999,
          originalPrice: 7999,
          stock: 156,
          status: 'published',
          category: 'smartphone',
          tags: ['熱銷款', '精選'],
          createdAt: '2023-10-15T08:30:00Z',
          updatedAt: '2023-11-20T14:45:00Z',
          features: [
            '6.7英寸2K+超視網膜屏幕，120Hz自適應刷新率',
            '最新一代驍龍8處理器，12GB+512GB大內存大存儲',
            '108MP主攝+50MP超廣角+12MP長焦+ToF深感四攝系統',
            '5000mAh大電池，支持65W超級快充和15W無線充電',
            'IP68防水防塵，支持人臉識別和屏下指紋識別'
          ],
          options: [
            {
              name: '顏色',
              values: ['星空黑', '極光銀', '暗夜綠']
            },
            {
              name: '存儲容量',
              values: ['128GB', '256GB', '512GB']
            }
          ],
          variants: [
            {
              options: [0, 0], // 星空黑, 128GB
              price: 5999,
              originalPrice: 6599,
              stock: 45
            },
            {
              options: [0, 1], // 星空黑, 256GB
              price: 6499,
              originalPrice: 7099,
              stock: 32
            },
            {
              options: [0, 2], // 星空黑, 512GB
              price: 6999,
              originalPrice: 7999,
              stock: 18
            },
            {
              options: [1, 0], // 極光銀, 128GB
              price: 5999,
              originalPrice: 6599,
              stock: 37
            },
            {
              options: [1, 1], // 極光銀, 256GB
              price: 6499,
              originalPrice: 7099,
              stock: 29
            },
            {
              options: [1, 2], // 極光銀, 512GB
              price: 6999,
              originalPrice: 7999,
              stock: 15
            },
            {
              options: [2, 0], // 暗夜綠, 128GB
              price: 5999,
              originalPrice: 6599,
              stock: 0
            },
            {
              options: [2, 1], // 暗夜綠, 256GB
              price: 6499,
              originalPrice: 7099,
              stock: 8
            },
            {
              options: [2, 2], // 暗夜綠, 512GB
              price: 6999,
              originalPrice: 7999,
              stock: 12
            }
          ],
          specifications: [
            {
              category: '基本規格',
              items: [
                { name: '型號', value: 'PX-2023' },
                { name: '上市日期', value: '2023年10月' },
                { name: '操作系統', value: 'Android 13' },
                { name: '處理器', value: '驍龍8處理器' },
                { name: '尺寸', value: '162.5 x 75.8 x 8.3 mm' },
                { name: '重量', value: '198g' }
              ]
            },
            {
              category: '顯示屏',
              items: [
                { name: '屏幕尺寸', value: '6.7英寸' },
                { name: '屏幕類型', value: 'AMOLED' },
                { name: '分辨率', value: '3200 x 1440 像素' },
                { name: '刷新率', value: '120Hz自適應' },
                { name: '亮度', value: '1500尼特（峰值）' },
                { name: '玻璃材質', value: '康寧大猩猩玻璃7' }
              ]
            },
            {
              category: '相機',
              items: [
                { name: '後置主攝', value: '108MP，f/1.8光圈，OIS光學防抖' },
                { name: '超廣角', value: '50MP，f/2.2光圈，120°視角' },
                { name: '長焦', value: '12MP，f/2.4光圈，3x光學變焦' },
                { name: '深感鏡頭', value: 'ToF 3D深感鏡頭' },
                { name: '前置攝像頭', value: '32MP，f/2.0光圈，自動對焦' },
                { name: '視頻錄製', value: '8K@24fps，4K@60fps，1080p@240fps' }
              ]
            },
            {
              category: '電池與充電',
              items: [
                { name: '電池容量', value: '5000mAh' },
                { name: '有線充電', value: '65W超級快充' },
                { name: '無線充電', value: '15W Qi無線充電' },
                { name: '反向無線充電', value: '支持，5W' }
              ]
            },
            {
              category: '連接與網絡',
              items: [
                { name: '5G', value: '支持SA/NSA雙模5G' },
                { name: 'Wi-Fi', value: 'Wi-Fi 6E' },
                { name: '藍牙', value: '藍牙5.3' },
                { name: 'NFC', value: '支持' },
                { name: 'GPS', value: 'GPS, GLONASS, BeiDou, Galileo' },
                { name: '接口', value: 'USB Type-C 3.2' }
              ]
            }
          ],
          seo: {
            title: 'Pro X 旗艦智能手機 - 2023年最新旗艦手機',
            keywords: '旗艦手機,Pro X,智能手機,高端手機,108MP相機,5G手機',
            description: 'Pro X 旗艦智能手機，搭載最新驍龍8處理器，108MP四攝系統，5000mAh大電池，帶來極致的性能體驗和攝影體驗。'
          },
          featured: true,
          newArrival: false,
          sortOrder: 100
        };
      }, 800);
    },
    setCurrentImage(index) {
      this.currentImageIndex = index;
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
    getCategoryName(categoryCode) {
      const categories = {
        'smartphone': '智能手機',
        'tablet': '平板電腦',
        'headphone': '無線耳機',
        'laptop': '筆記本電腦',
        'drone': '無人機',
        'jewelry': '珠寶首飾'
      };
      return categories[categoryCode] || categoryCode;
    },
    getStatusIcon(status) {
      switch (status) {
        case 'published': return '✅';
        case 'draft': return '📝';
        case 'hidden': return '👁️';
        default: return '❓';
      }
    },
    getStatusLabel(status) {
      switch (status) {
        case 'published': return '已發布';
        case 'draft': return '草稿';
        case 'hidden': return '隱藏';
        default: return status;
      }
    },
    getStatusDescription(status) {
      switch (status) {
        case 'published': return '此商品已發布，對所有用戶可見';
        case 'draft': return '此商品處於草稿狀態，尚未發布';
        case 'hidden': return '此商品已被隱藏，對用戶不可見';
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
      alert(`編輯商品 ID: ${this.product.id}`);
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
  align-items: center;
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

/* SEO 信息 */
.seo-info {
  background-color: #f8fafc;
  border-radius: 6px;
  padding: 15px;
}

.info-row {
  display: flex;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e2e8f0;
}

.info-row:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

/* 其他設置 */
.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.setting-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.setting-label {
  font-weight: 500;
  color: #4a5568;
}

.status-indicator {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  background-color: #e2e8f0;
  color: #4a5568;
}

.status-indicator.active {
  background-color: #c6f6d5;
  color: #38a169;
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