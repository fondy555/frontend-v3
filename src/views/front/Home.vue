<template>
  <div class="product-showcase">
    <!-- 頂部橫幅 -->
    <!-- 產品分類展示 -->
    <section class="category-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">產品分類</h2>
          <p class="section-subtitle">探索我們的三大產品線</p>
        </div>
        
        <div class="category-grid">
          <div 
            class="category-card"
            v-for="category in categories"
            :key="category.id"
            @click="handleCategoryClick(category)"
          >
            <div class="category-image">
              <el-image 
                :src="category.image"
                :alt="category.name"
                fit="cover"
              ></el-image>
            </div>
            <div class="category-content">
              <h3 class="category-title">{{ category.name }}</h3>
              <p class="category-description">{{ category.description }}</p>
              <div class="category-info">
                <span class="product-count">{{ category.productCount }}+ 款產品</span>
                <span class="view-more">查看詳情 →</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 精選產品展示 -->
    <section class="featured-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">精選產品</h2>
          <p class="section-subtitle">我們的明星產品展示</p>
        </div>
        
        <div class="featured-tabs">
          <el-tabs v-model="activeTab" @tab-click="handleTabClick">
            <el-tab-pane label="蘋果產品" name="apple">
              <div class="products-grid">
                <div 
                  class="product-item"
                  v-for="product in appleProducts"
                  :key="product.id"
                  @click="viewProduct(product)"
                >
                  <div class="product-image">
                    <el-image 
                      :src="product.image"
                      :alt="product.name"
                      fit="cover"
                    ></el-image>
                    <div class="product-overlay">
                      <el-button type="primary" icon="el-icon-view">查看詳情</el-button>
                    </div>
                  </div>
                  <div class="product-info">
                    <h4 class="product-name">{{ product.name }}</h4>
                    <p class="product-specs">{{ product.specs }}</p>
                    <div class="product-features">
                      <el-tag 
                        v-for="feature in product.features" 
                        :key="feature"
                        size="small"
                        class="feature-tag"
                      >
                        {{ feature }}
                      </el-tag>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            
            <el-tab-pane label="DJI" name="drones">
              <div class="products-grid">
                <div 
                  class="product-item"
                  v-for="product in DJIProducts"
                  :key="product.id"
                  @click="viewProduct(product)"
                >
                  <div class="product-image">
                    <el-image 
                      :src="product.image"
                      :alt="product.name"
                      fit="cover"
                    ></el-image>
                    <div class="product-overlay">
                      <el-button type="primary" icon="el-icon-view">查看詳情</el-button>
                    </div>
                  </div>
                  <div class="product-info">
                    <h4 class="product-name">{{ product.name }}</h4>
                    <p class="product-specs">{{ product.specs }}</p>
                    <div class="product-features">
                      <el-tag 
                        v-for="feature in product.features" 
                        :key="feature"
                        size="small"
                        class="feature-tag"
                      >
                        {{ feature }}
                      </el-tag>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            
            <el-tab-pane label="珠寶首飾" name="jewelry">
              <div class="products-grid">
                <div 
                  class="product-item"
                  v-for="product in jewelryProducts"
                  :key="product.id"
                  @click="viewProduct(product)"
                >
                  <div class="product-image">
                    <el-image 
                      :src="product.image"
                      :alt="product.name"
                      fit="cover"
                    ></el-image>
                    <div class="product-overlay">
                      <el-button type="primary" icon="el-icon-view">查看詳情</el-button>
                    </div>
                  </div>
                  <div class="product-info">
                    <h4 class="product-name">{{ product.name }}</h4>
                    <p class="product-specs">{{ product.specs }}</p>
                    <div class="product-features">
                      <el-tag 
                        v-for="feature in product.features" 
                        :key="feature"
                        size="small"
                        class="feature-tag"
                      >
                        {{ feature }}
                      </el-tag>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </section>

    <NewFooter />
    <!-- <section class="contact-section">
      <div class="container">
        <div class="contact-content">
          <div class="contact-info">
            <h3 class="contact-title">聯繫我們</h3>
            <p class="contact-subtitle">歡迎諮詢我們的產品</p>
            
            <div class="contact-details">
              <div class="contact-item">
                <i class="el-icon-location-outline"></i>
                <div class="contact-text">
                  <strong>地址</strong>
                  <span>中國廣東省深圳市福田區國際貿易中心</span>
                </div>
              </div>
              
              <div class="contact-item">
                <i class="el-icon-phone-outline"></i>
                <div class="contact-text">
                  <strong>電話</strong>
                  <span>+86-755-1234-5678</span>
                </div>
              </div>
              
              <div class="contact-item">
                <i class="el-icon-message"></i>
                <div class="contact-text">
                  <strong>郵箱</strong>
                  <span>info@techjewel.com</span>
                </div>
              </div>
              
              <div class="contact-item">
                <i class="el-icon-chat-dot-round"></i>
                <div class="contact-text">
                  <strong>WhatsApp</strong>
                  <span>+86-138-0000-0000</span>
                </div>
              </div>
            </div>
          </div>
        
        </div>
      </div>
    </section> -->
  </div>
</template>

<script>
import NewFooter from './components/NewFooter.vue';
// import { getProductsByBrandId } from '@/api/product';

export default {
  components: {
    NewFooter, 
  },
  data() {
    return {
      searchQuery: '',
      activeIndex: 'home',
      activeTab: 'apple',
      submitting: false,
      
      inquiryForm: {
        name: '',
        company: '',
        phone: '',
        email: '',
        product: '',
        message: ''
      },
      
      // 產品分類
      categories: [
        {
          id: 1,
          name: '蘋果產品',
          description: '最新iPhone、iPad、AirPods、Apple Watch等全系列蘋果產品',
          image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
          productCount: 150,
          brand: '1'
        },
        {
          id: 2,
          name: 'DJI产品',
          description: 'DJI 無人機, 手持设备等產品',
          image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=300&fit=crop',
          productCount: 80,
          brand: '2'
        },
        {
          id: 3,
          name: '首飾',
          description: '手链，天珠和琥珀等各類精美首飾',
          image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
          productCount: 200,
          brand: '3'
        }
      ],
      
      // 蘋果產品
      appleProducts: [
        {
          id: 1,
          name: 'iPhone 15 Pro Max',
          specs: '6.7英寸 | A17 Pro芯片 | 鈦金屬設計',
          image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop',
          features: ['A17 Pro', '鈦金屬', '48MP相機', '5G']
        },
        {
          id: 2,
          name: 'iPad Pro 12.9"',
          specs: '12.9英寸 | M2芯片 | Liquid Retina XDR',
          image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop',
          features: ['M2芯片', '12.9英寸', 'Apple Pencil', 'Face ID']
        },
        {
          id: 3,
          name: 'AirPods Pro 2',
          specs: '主動降噪 | 空間音頻 | H2芯片',
          image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop',
          features: ['主動降噪', '空間音頻', 'H2芯片', '無線充電']
        },
        {
          id: 4,
          name: 'Apple Watch Ultra 2',
          specs: '49mm | 鈦金屬 | GPS + 蜂窩網絡',
          image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300&h=300&fit=crop',
          features: ['鈦金屬', '49mm', 'GPS', '防水100米']
        },
        {
          id: 5,
          name: 'MacBook Pro 16"',
          specs: '16英寸 | M3 Pro芯片 | Liquid Retina XDR',
          image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=300&fit=crop',
          features: ['M3 Pro', '16英寸', 'Retina XDR', '22小時續航']
        },
        {
          id: 6,
          name: 'Mac Studio',
          specs: 'M2 Ultra芯片 | 專業工作站',
          image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop',
          features: ['M2 Ultra', '專業級', '靜音設計', '豐富接口']
        }
      ],
      
      // 無人機產品
      DJIProducts: [
        {
          id: 1,
          name: 'DJI Mini 4 Pro',
          specs: '4K HDR錄影 | 34分鐘飛行 | 249g',
          image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=300&h=300&fit=crop',
          features: ['4K HDR', '34分鐘', '249g', '智能飛行']
        },
        {
          id: 2,
          name: 'DJI Air 3',
          specs: '雙主攝像頭 | 46分鐘飛行 | 全向避障',
          image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=300&h=300&fit=crop',
          features: ['雙主攝', '46分鐘', '全向避障', '15km圖傳']
        },
        {
          id: 3,
          name: 'DJI Mavic 3 Pro',
          specs: '三攝系統 | 43分鐘飛行 | 專業攝影',
          image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=300&h=300&fit=crop',
          features: ['三攝系統', '43分鐘', '專業攝影', 'Cine模式']
        },
        {
          id: 6,
          name: 'DJI FPV',
          specs: '第一人稱視角 | 150km/h | 沉浸式飛行',
          image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=300&h=300&fit=crop',
          features: ['FPV飛行', '150km/h', '沉浸式', '4K/60fps']
        }
      ],
      
      // 珠寶產品
      jewelryProducts: [
        {
          id: 1,
          name: '1克拉鑽石戒指',
          specs: '18K白金 | 1克拉主鑽 | 六爪鑲嵌',
          image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop',
          features: ['1克拉', '18K白金', '六爪鑲嵌', 'GIA證書']
        },
        {
          id: 2,
          name: '黃金項鍊',
          specs: '999純金 | 傳統工藝 | 精美雕花',
          image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=300&h=300&fit=crop',
          features: ['999純金', '傳統工藝', '雕花設計', '可調節']
        },
        {
          id: 3,
          name: '翡翠手鐲',
          specs: 'A貨翡翠 | 冰種質地 | 天然無處理',
          image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=300&h=300&fit=crop',
          features: ['A貨翡翠', '冰種', '天然', '證書齊全']
        },
        {
          id: 4,
          name: '珍珠耳環',
          specs: '南海珍珠 | 925銀鑲嵌 | 天然光澤',
          image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop',
          features: ['南海珍珠', '925銀', '天然光澤', '經典款式']
        },
        {
          id: 5,
          name: '紅寶石吊墜',
          specs: '天然紅寶石 | 18K玫瑰金 | 精工鑲嵌',
          image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop',
          features: ['天然紅寶石', '18K玫瑰金', '精工鑲嵌', '證書']
        },
        {
          id: 6,
          name: '鉑金對戒',
          specs: 'PT950鉑金 | 情侶對戒 | 簡約設計',
          image: 'https://images.unsplash.com/photo-1544376664-80b17f09d399?w=300&h=300&fit=crop',
          features: ['PT950', '情侶對戒', '簡約設計', '終身保養']
        }
      ],
      
      
      // 優勢
      advantages: [
        {
          id: 1,
          title: '正品保證',
          description: '所有產品均為正品，提供官方授權證書',
          icon: 'el-icon-medal'
        },
        {
          id: 2,
          title: '專業團隊',
          description: '8年行業經驗，專業的產品知識和服務',
          icon: 'el-icon-user'
        },
        {
          id: 3,
          title: '全球供應',
          description: '產品遠銷巴基斯坦、印度、台灣、新加坡等地',
          icon: 'el-icon-s-promotion'
        },
        {
          id: 4,
          title: '品質控制',
          description: '嚴格的品質控制流程，確保產品質量',
          icon: 'el-icon-circle-check'
        },
        {
          id: 5,
          title: '快速響應',
          description: '24小時內回復客戶諮詢，高效溝通',
          icon: 'el-icon-time'
        },
        {
          id: 6,
          title: '售後服務',
          description: '完善的售後服務體系，解決後顧之憂',
          icon: 'el-icon-service'
        }
      ]
    };
  },
  
  methods: {
    // 搜索
    handleSearch() {
      this.$message.info(`搜索產品: ${this.searchQuery}`);
    },
    
    // 分類點擊
    handleCategoryClick() {
      // this.$message.info(`查看分類: ${category.name}`);
      // getProductsByBrandId(category.brand)
      this.$router.push('/productList/')
    },
    
    // 標籤頁切換
    handleTabClick(tab) {
      this.$message.info(`切換到: ${tab.props.label}`);
      // console.log(tab.props.label)
    },
    
    // 查看產品
    viewProduct(product) {
      this.$message.info(`查看產品: ${product.name}`);
    },
    
    // 重置表單
    resetForm() {
      this.inquiryForm = {
        name: '',
        company: '',
        phone: '',
        email: '',
        product: '',
        message: ''
      };
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.product-showcase {
  min-height: 100vh;
  background: #fff;
}

/* 頂部橫幅 */
.top-banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 0;
}

.banner-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.banner-text {
  font-weight: 500;
  font-size: 16px;
}

.banner-features {
  display: flex;
  gap: 30px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

/* 主頭部 */
.main-header {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px 0;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-section {
  display: flex;
  flex-direction: column;
}

.brand-logo {
  font-size: 32px;
  font-weight: bold;
  color: #667eea;
  margin: 0;
}

.brand-tagline {
  font-size: 14px;
  color: #666;
  margin-top: 2px;
}

.search-section {
  flex: 1;
  max-width: 500px;
  margin: 0 40px;
}

.search-input {
  width: 100%;
}


/* 主導航 */
.main-navigation {
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.nav-menu {
  border-bottom: none;
}

.nav-menu .el-menu-item,
.nav-menu .el-sub-menu__title {
  height: 55px;
  line-height: 55px;
  border-bottom: none;
  font-weight: 500;
}

/* Hero展示區域 */
.hero-showcase {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 80px 0;
  position: relative;
  overflow: hidden;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 20px;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.3rem;
  color: #7f8c8d;
  margin-bottom: 40px;
}

.hero-stats {
  display: flex;
  gap: 40px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #667eea;
  display: block;
}

.stat-label {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-top: 5px;
}

/* 3D產品展示 */
.hero-visual {
  position: relative;
  height: 500px;
}

.product-display {
  position: relative;
  width: 100%;
  height: 100%;
}

.display-item {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: float 6s ease-in-out infinite;
}

.display-item.iphone-display {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.display-item.drone-display {
  top: 10%;
  right: 20%;
  animation-delay: 2s;
}

.display-item.jewelry-display {
  bottom: 20%;
  left: 30%;
  animation-delay: 4s;
}

.product-label {
  margin-top: 20px;
  font-weight: bold;
  color: #2c3e50;
  background: white;
  padding: 8px 20px;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* 通用樣式 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 15px;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #7f8c8d;
}

/* 產品分類 */
.category-section {
  padding: 80px 0;
  background: white;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.category-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.category-card:hover {
  transform: translateY(-10px);
}

.category-image {
  height: 200px;
  overflow: hidden;
}

.category-image .el-image {
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}

.category-card:hover .category-image .el-image {
  transform: scale(1.1);
}

.category-content {
  padding: 25px;
}

.category-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 10px;
}

.category-description {
  color: #7f8c8d;
  line-height: 1.6;
  margin-bottom: 20px;
}

.category-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-count {
  color: #667eea;
  font-weight: 500;
}

.view-more {
  color: #667eea;
  font-weight: 500;
  cursor: pointer;
}

/* 精選產品 */
.featured-section {
  padding: 80px 0;
  background: #f8f9fa;
}

.featured-tabs {
  margin-top: 40px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 30px;
}

.product-item {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.product-item:hover {
  transform: translateY(-10px);
}

.product-image {
  height: 250px;
  position: relative;
  overflow: hidden;
}

.product-image .el-image {
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}

.product-item:hover .product-image .el-image {
  transform: scale(1.1);
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-item:hover .product-overlay {
  opacity: 1;
}

.product-info {
  padding: 20px;
}

.product-name {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 8px;
}

.product-specs {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 15px;
}

.product-features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.feature-tag {
  background: #ecf0f1;
  color: #34495e;
  border: none;
}

/* 品牌展示 */
.brands-section {
  padding: 60px 0;
  background: white;
}

.brands-carousel {
  overflow: hidden;
}

.brands-track {
  display: flex;
  gap: 40px;
  align-items: center;
  animation: scroll 30s linear infinite;
}

.brand-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  min-width: 150px;
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.brand-item:hover {
  opacity: 1;
}

.brand-logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-logo .el-image {
  max-width: 120px;
  max-height: 60px;
}

.brand-name {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* 優勢展示 */
.advantages-section {
  padding: 80px 0;
  background: #f8f9fa;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.advantage-item {
  background: white;
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.advantage-item:hover {
  transform: translateY(-5px);
}

.advantage-icon {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
  font-size: 1.8rem;
}

.advantage-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 15px;
}

.advantage-description {
  color: #7f8c8d;
  line-height: 1.6;
}



/* 響應式設計 */
@media (max-width: 768px) {
  .banner-content {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .banner-features {
    gap: 20px;
  }
  
  .header-container {
    flex-direction: column;
    gap: 20px;
  }
  
  .search-section {
    margin: 0;
    width: 100%;
  }
  
  
  .hero-content {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-stats {
    justify-content: center;
    gap: 30px;
  }
  
  .category-grid {
    grid-template-columns: 1fr;
  }
  
  .contact-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .section-title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .hero-stats {
    flex-direction: column;
    gap: 20px;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
  }
  
  .advantages-grid {
    grid-template-columns: 1fr;
  }
  
  .brands-track {
    gap: 20px;
  }
  
  .brand-item {
    min-width: 120px;
  }
}
</style>