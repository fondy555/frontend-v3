<template>
  <div class="about-page">
    <!-- <Nav/> -->
    <!-- <Banner/> -->

    <!-- 公司簡介 -->
    <section class="company-intro">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">公司簡介</h2>
          <p class="section-subtitle">專業的珠寶首飾與蘋果產品供應商，服務亞太地區</p>
        </div>
        
        <div class="intro-content">
          <div class="intro-text">
            <p class="intro-paragraph">
              我們公司成立於2016年，是一家專業從事珠寶首飾和蘋果電子產品銷售的國際化企業。
              經過8年的發展，產品遠銷巴基斯坦、印度、台灣、新加坡等多個國家和地區。
            </p>
            <p class="intro-paragraph">
              我們專注於提供高品質的珠寶首飾、蘋果手機、iPad平板電腦、AirPods耳機以及無人機等科技產品。
              憑藉優質的產品質量、競爭力的價格和專業的服務，我們在國際市場上建立了良好的聲譽，
              與眾多客戶建立了長期穩定的合作關係。
            </p>
            <div class="intro-highlights">
              <div class="highlight-item">
                <i class="el-icon-medal highlight-icon"></i>
                <div class="highlight-content">
                  <h4>品質保證</h4>
                  <p>所有產品均為正品，提供完善的品質保證和售後服務</p>
                </div>
              </div>
              <div class="highlight-item">
                <i class="el-icon-s-promotion highlight-icon"></i>
                <div class="highlight-content">
                  <h4>國際貿易</h4>
                  <p>豐富的國際貿易經驗，熟悉各國進出口政策和流程</p>
                </div>
              </div>
              <div class="highlight-item">
                <i class="el-icon-truck highlight-icon"></i>
                <div class="highlight-content">
                  <h4>全球配送</h4>
                  <p>完善的國際物流網絡，確保產品安全快速送達全球</p>
                </div>
              </div>
            </div>
          </div>
          <div class="intro-image">
            <el-image 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=600&fit=crop"
              alt="公司產品展示"
              fit="cover"
            ></el-image>
          </div>
        </div>
      </div>
    </section>

    <!-- 市場覆蓋 -->
    <section class="market-coverage">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">市場覆蓋</h2>
          <p class="section-subtitle">服務亞太地區，產品遠銷多個國家和地區</p>
        </div>
        
        <div class="market-grid">
          <div class="market-card" v-for="market in marketData" :key="market.id">
            <div class="market-flag">
              <el-image 
                :src="market.flag"
                :alt="market.country"
                fit="cover"
              ></el-image>
            </div>
            <div class="market-info">
              <h3 class="market-country">{{ market.country }}</h3>
              <p class="market-description">{{ market.description }}</p>
              <div class="market-stats">
                <div class="market-stat">
                  <span class="stat-label">合作年限</span>
                  <span class="stat-value">{{ market.years }}年</span>
                </div>
                <div class="market-stat">
                  <span class="stat-label">主要產品</span>
                  <span class="stat-value">{{ market.mainProducts }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 發展歷程 -->
    <section class="timeline-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">發展歷程</h2>
          <p class="section-subtitle">見證我們的國際化發展足跡</p>
        </div>
        
        <el-timeline class="company-timeline">
          <el-timeline-item
            v-for="(item, index) in timelineData"
            :key="index"
            :timestamp="item.year"
            placement="top"
            :type="item.type"
            :size="item.size"
          >
            <el-card class="timeline-card">
              <div class="timeline-content">
                <h4 class="timeline-title">{{ item.title }}</h4>
                <p class="timeline-description">{{ item.description }}</p>
                <div class="timeline-achievements" v-if="item.achievements">
                  <el-tag
                    v-for="achievement in item.achievements"
                    :key="achievement"
                    size="small"
                    type="success"
                    class="achievement-tag"
                  >
                    {{ achievement }}
                  </el-tag>
                </div>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </section>

    <!-- 主營業務 -->
    <section class="business-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">主營業務</h2>
          <p class="section-subtitle">專業的產品線，滿足您的多樣化需求</p>
        </div>
        
        <div class="business-grid">
          <div class="business-card" v-for="business in businessData" :key="business.id">
            <div class="business-icon">
              <i :class="business.icon"></i>
            </div>
            <div class="business-content">
              <h3 class="business-title">{{ business.title }}</h3>
              <p class="business-description">{{ business.description }}</p>
              <ul class="business-features">
                <li v-for="feature in business.features" :key="feature">{{ feature }}</li>
              </ul>
              <div class="business-brands" v-if="business.brands">
                <h5>主要品牌：</h5>
                <div class="brand-tags">
                  <el-tag
                    v-for="brand in business.brands"
                    :key="brand"
                    type="primary"
                    size="small"
                    class="brand-tag"
                  >
                    {{ brand }}
                  </el-tag>
                </div>
              </div>
            </div>
            <div class="business-image">
              <el-image 
                :src="business.image"
                :alt="business.title"
                fit="cover"
              ></el-image>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 產品展示 -->
    <section class="products-showcase">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">熱門產品</h2>
          <p class="section-subtitle">精選優質產品，品質保證</p>
        </div>
        
        <div class="products-grid">
          <div class="product-card" v-for="product in productsData" :key="product.id">
            <div class="product-image">
              <el-image 
                :src="product.image"
                :alt="product.name"
                fit="cover"
              ></el-image>
              <div class="product-badge" v-if="product.badge">{{ product.badge }}</div>
            </div>
            <div class="product-info">
              <h4 class="product-name">{{ product.name }}</h4>
              <p class="product-description">{{ product.description }}</p>
              <div class="product-features">
                <span 
                  v-for="feature in product.features" 
                  :key="feature"
                  class="feature-tag"
                >
                  {{ feature }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 公司願景與使命 -->
    <section class="vision-mission">
      <div class="container">
        <div class="vision-mission-grid">
          <div class="vision-card">
            <div class="card-icon">
              <i class="el-icon-view"></i>
            </div>
            <h3 class="card-title">公司願景</h3>
            <p class="card-content">
              成為亞太地區領先的珠寶首飾與蘋果產品供應商，為全球客戶提供最優質的產品和最專業的服務，
              讓美麗與科技融入每個人的生活。
            </p>
          </div>
          
          <div class="mission-card">
            <div class="card-icon">
              <i class="el-icon-flag"></i>
            </div>
            <h3 class="card-title">公司使命</h3>
            <p class="card-content">
              通過專業的國際貿易服務，為客戶提供高品質、高性價比的珠寶首飾和蘋果產品，
              搭建中外貿易橋樑，促進國際商務合作與發展。
            </p>
          </div>
          
          <div class="values-card">
            <div class="card-icon">
              <i class="el-icon-star-on"></i>
            </div>
            <h3 class="card-title">核心價值</h3>
            <div class="values-list">
              <div class="value-item">
                <span class="value-label">誠信</span>
                <span class="value-desc">誠實守信，合規經營</span>
              </div>
              <div class="value-item">
                <span class="value-label">品質</span>
                <span class="value-desc">品質第一，正品保證</span>
              </div>
              <div class="value-item">
                <span class="value-label">服務</span>
                <span class="value-desc">客戶至上，專業服務</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 合作優勢 -->
    <section class="advantages-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">合作優勢</h2>
          <p class="section-subtitle">選擇我們的理由</p>
        </div>
        
        <div class="advantages-grid">
          <div class="advantage-item" v-for="advantage in advantagesData" :key="advantage.id">
            <div class="advantage-icon">
              <i :class="advantage.icon"></i>
            </div>
            <h4 class="advantage-title">{{ advantage.title }}</h4>
            <p class="advantage-description">{{ advantage.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 聯繫我們 -->
    <section class="contact-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">聯繫我們</h2>
          <p class="section-subtitle">期待與您的合作</p>
        </div>
        
        <div class="contact-content">
          <div class="contact-info">
            <div class="contact-item">
              <div class="contact-icon">
                <i class="el-icon-location-outline"></i>
              </div>
              <div class="contact-details">
                <h4>公司地址</h4>
                <p>中國廣東省深圳市福田區<br>國際貿易中心大廈</p>
              </div>
            </div>
            
            <div class="contact-item">
              <div class="contact-icon">
                <i class="el-icon-phone-outline"></i>
              </div>
              <div class="contact-details">
                <h4>聯繫電話</h4>
                <p>+86-755-1234-5678<br>+86-138-0000-0000</p>
              </div>
            </div>
            
            <div class="contact-item">
              <div class="contact-icon">
                <i class="el-icon-message"></i>
              </div>
              <div class="contact-details">
                <h4>電子郵箱</h4>
                <p>info@company.com<br>sales@company.com</p>
              </div>
            </div>
            
            <div class="contact-item">
              <div class="contact-icon">
                <i class="el-icon-chat-dot-round"></i>
              </div>
              <div class="contact-details">
                <h4>即時通訊</h4>
                <p>WhatsApp: +86-138-0000-0000<br>WeChat: company_sales</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import Banner from './components/Banner'
// import Nav from './components/Nav.vue'

export default {
  // components: {Nav},
  data() {
    return {
      submitting: false,
      contactForm: {
        name: '',
        company: '',
        phone: '',
        email: '',
        country: '',
        product: '',
        message: ''
      },
      
      // 市場覆蓋數據
      marketData: [
        {
          id: 1,
          country: '巴基斯坦',
          flag: 'https://flagcdn.com/w320/pk.png',
          description: '主要市場之一，提供珠寶首飾和蘋果產品，深受當地客戶喜愛',
          years: '6',
          mainProducts: '珠寶、iPhone'
        },
        {
          id: 2,
          country: '印度',
          flag: 'https://flagcdn.com/w320/in.png',
          description: '重要的合作夥伴，產品涵蓋全線蘋果設備和精美珠寶',
          years: '5',
          mainProducts: 'iPad、珠寶'
        },
        {
          id: 3,
          country: '台灣',
          flag: 'https://flagcdn.com/w320/tw.png',
          description: '穩定的市場，主要供應高端珠寶和最新蘋果產品',
          years: '7',
          mainProducts: 'AirPods、珠寶'
        },
        {
          id: 4,
          country: '新加坡',
          flag: 'https://flagcdn.com/w320/sg.png',
          description: '高端市場，提供頂級珠寶和全系列蘋果產品及無人機',
          years: '4',
          mainProducts: '無人機、iPhone'
        }
      ],
      
      // 發展歷程數據
      timelineData: [
        {
          year: '2016',
          title: '公司成立',
          description: '公司正式成立，開始專注於珠寶首飾和蘋果產品的國際貿易',
          type: 'primary',
          size: 'large',
          achievements: ['獲得進出口許可', '建立初始團隊', '確立產品方向']
        },
        {
          year: '2017',
          title: '市場開拓',
          description: '成功開拓巴基斯坦和台灣市場，建立穩定的客戶群體',
          type: 'success',
          size: 'normal',
          achievements: ['巴基斯坦市場', '台灣市場', '客戶突破500+']
        },
        {
          year: '2018-2019',
          title: '業務擴展',
          description: '擴展到印度和新加坡市場，產品線日趨完善',
          type: 'warning',
          size: 'normal',
          achievements: ['印度市場', '新加坡市場', '產品線擴展']
        },
        // {
        //   year: '2020-2021',
        //   title: '數字化升級',
        //   description: '建立線上銷售平台，優化國際物流體系，適應疫情挑戰',
        //   type: 'info',
        //   size: 'normal',
        //   achievements: ['線上平台', '物流優化', '疫情適應']
        // },
        {
          year: '2020-2024',
          title: '快速發展',
          description: '業務量快速增長，引入無人機產品線，持續優化服務質量，拓展更多市場',
          type: 'success',
          size: 'normal',
          achievements: ['業績翻倍', '無人機業務', '服務升級']
        }
      ],
      
      // 主營業務數據
      businessData: [
        {
          id: 1,
          title: '珠寶首飾',
          description: '提供各類精美珠寶首飾，包括翡翠等高品質產品',
          icon: 'el-icon-star-on',
          image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
          features: ['翡翠手鐲', '珍珠項鍊', '銀飾配件'],
        //   brands: ['周大福', '周生生', '六福珠寶', '老鳳祥']
        },
        {
          id: 2,
          title: '蘋果產品',
          description: '正品蘋果全系列產品，包括iPhone、iPad、AirPods等最新款式',
          icon: 'el-icon-mobile-phone',
          image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
          features: ['iPhone系列', 'iPad平板', 'AirPods耳機', 'Apple Watch', 'MacBook'],
          brands: ['Apple官方', '正品保證', '全球聯保']
        },
        {
          id: 3,
          title: '無人機設備',
          description: '專業無人機設備，適用於航拍、測繪、娛樂等多種用途',
          icon: 'el-icon-coordinate',
          image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=300&fit=crop',
          features: ['航拍無人機', '專業測繪', '娛樂飛行', '配件齊全', '技術支持'],
          brands: ['DJI']
        }
      ],
      
      // 產品展示數據
      productsData: [
        {
          id: 1,
          name: 'iPhone 15 Pro Max',
          description: '最新款iPhone，配備A17 Pro芯片，鈦金屬設計',
          image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop',
          features: ['A17 Pro', '鈦金屬', '48MP相機'],
          badge: '熱銷'
        },
        {
          id: 2,
          name: '鑽石戒指',
          description: '1克拉鑽石戒指，18K白金鑲嵌，經典六爪設計',
          image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop',
          features: ['1克拉', '18K白金', '六爪設計'],
          badge: '精選'
        },
        {
          id: 3,
          name: 'iPad Pro 12.9"',
          description: '12.9英寸iPad Pro，M2芯片，支持Apple Pencil',
          image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop',
          features: ['M2芯片', '12.9英寸', 'Apple Pencil'],
          badge: '新品'
        },
        {
          id: 4,
          name: 'DJI Mini 4 Pro',
          description: '輕便型無人機，4K HDR錄影，智能飛行模式',
          image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=300&h=300&fit=crop',
          features: ['4K HDR', '智能飛行', '輕便設計'],
          badge: '推薦'
        },
        {
          id: 5,
          name: 'AirPods Pro 2',
          description: '主動降噪耳機，空間音頻，無線充電盒',
          image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop',
          features: ['主動降噪', '空間音頻', '無線充電'],
          badge: '熱銷'
        },
        {
          id: 6,
          name: '黃金手鐲',
          description: '999純金手鐲，傳統工藝，精美雕花設計',
          image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=300&h=300&fit=crop',
          features: ['999純金', '傳統工藝', '雕花設計'],
          badge: '經典'
        }
      ],
      
    
      
      // 合作優勢數據
      advantagesData: [
        {
          id: 1,
          title: '正品保證',
          description: '所有產品均為正品，提供官方授權證書和品質保證',
          icon: 'el-icon-medal'
        },
        {
          id: 2,
          title: '價格優勢',
          description: '直接從源頭採購，省去中間環節，為客戶提供最優價格',
          icon: 'el-icon-coin'
        },
        {
          id: 3,
          title: '快速交付',
          description: '完善的庫存管理和物流體系，確保快速交付',
          icon: 'el-icon-truck'
        },
        {
          id: 4,
          title: '專業服務',
          description: '專業的銷售團隊，提供一對一的客戶服務',
          icon: 'el-icon-service'
        },
        {
          id: 5,
          title: '全球配送',
          description: '覆蓋全球的物流網絡，支持多種配送方式',
          icon: 'el-icon-s-promotion'
        },
        {
          id: 6,
          title: '售後保障',
          description: '完善的售後服務體系，解決客戶後顧之憂',
          icon: 'el-icon-phone'
        }
      ]
    };
  },
  
  methods: {
    submitContact() {
      // 簡單的表單驗證
      if (!this.contactForm.name || !this.contactForm.phone || !this.contactForm.email) {
        this.$message.warning('請填寫必要的聯繫信息');
        return;
      }
      
      this.submitting = true;
      
      // 模擬提交過程
      setTimeout(() => {
        this.submitting = false;
        this.$message.success('詢盤提交成功，我們會在24小時內與您聯繫！');
        this.resetForm();
      }, 2000);
    },
    
    resetForm() {
      this.contactForm = {
        name: '',
        company: '',
        phone: '',
        email: '',
        country: '',
        product: '',
        message: ''
      };
    }
  }
};
</script>

<style>
.about-page {
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 頁面頭部橫幅 */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 0;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 40px;
  opacity: 0.9;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

.hero-image {
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.hero-image .el-image {
  width: 100%;
  height: 400px;
}

/* 通用樣式 */
.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: #2c3e50;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #7f8c8d;
  max-width: 600px;
  margin: 0 auto;
}

/* 公司簡介 */
.company-intro {
  padding: 100px 0;
  background: #f8f9fa;
}

.intro-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 60px;
  align-items: center;
}

.intro-paragraph {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 25px;
  color: #34495e;
}

.intro-highlights {
  margin-top: 40px;
}

.highlight-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 25px;
}

.highlight-icon {
  font-size: 2rem;
  color: #3498db;
  margin-right: 20px;
  margin-top: 5px;
}

.highlight-content h4 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 8px;
  color: #2c3e50;
}

.highlight-content p {
  color: #7f8c8d;
  line-height: 1.6;
}

.intro-image {
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.intro-image .el-image {
  width: 100%;
  height: 500px;
}

/* 市場覆蓋 */
.market-coverage {
  padding: 100px 0;
  background: white;
}

.market-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.market-card {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  transition: transform 0.3s ease;
  border: 2px solid transparent;
}

.market-card:hover {
  transform: translateY(-10px);
  border-color: #3498db;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.market-flag {
  width: 80px;
  height: 60px;
  margin: 0 auto 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.market-flag .el-image {
  width: 100%;
  height: 100%;
}

.market-country {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: #2c3e50;
}

.market-description {
  color: #7f8c8d;
  line-height: 1.6;
  margin-bottom: 20px;
}

.market-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.market-stat {
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 5px;
}

.stat-value {
  display: block;
  font-weight: bold;
  color: #3498db;
}

/* 發展歷程 */
.timeline-section {
  padding: 100px 0;
  background: #f8f9fa;
}

.company-timeline {
  max-width: 800px;
  margin: 0 auto;
}

.timeline-card {
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.timeline-card:hover {
  transform: translateY(-5px);
}

.timeline-title {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #2c3e50;
}

.timeline-description {
  color: #7f8c8d;
  line-height: 1.6;
  margin-bottom: 15px;
}

.achievement-tag {
  margin-right: 8px;
  margin-bottom: 5px;
}

/* 主營業務 */
.business-section {
  padding: 100px 0;
  background: white;
}

.business-grid {
  display: grid;
  gap: 40px;
}

.business-card {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 30px;
  align-items: center;
  transition: transform 0.3s ease;
}

.business-card:hover {
  transform: translateY(-10px);
}

.business-card:nth-child(even) {
  grid-template-columns: auto 1fr auto;
}

.business-card:nth-child(even) .business-image {
  order: -1;
}

.business-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
}

.business-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: #2c3e50;
}

.business-description {
  color: #7f8c8d;
  line-height: 1.6;
  margin-bottom: 20px;
}

.business-features {
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
}

.business-features li {
  padding: 5px 0;
  color: #34495e;
  position: relative;
  padding-left: 20px;
}

.business-features li:before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #27ae60;
  font-weight: bold;
}

.business-brands h5 {
  margin-bottom: 10px;
  color: #2c3e50;
}

.brand-tag {
  margin-right: 8px;
  margin-bottom: 5px;
}

.business-image {
  width: 200px;
  height: 150px;
  border-radius: 10px;
  overflow: hidden;
}

.business-image .el-image {
  width: 100%;
  height: 100%;
}

/* 產品展示 */
.products-showcase {
  padding: 100px 0;
  background: #f8f9fa;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.product-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-10px);
}

.product-image {
  height: 200px;
  position: relative;
  overflow: hidden;
}

.product-image .el-image {
  width: 100%;
  height: 100%;
}

.product-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: #e74c3c;
  color: white;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: bold;
}

.product-info {
  padding: 20px;
}

.product-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #2c3e50;
}

.product-description {
  color: #7f8c8d;
  line-height: 1.6;
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
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
}

/* 願景使命 */
.vision-mission {
  padding: 100px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.vision-mission-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
}

.vision-card, .mission-card, .values-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 40px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.card-icon {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 25px;
  font-size: 2rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.card-content {
  line-height: 1.8;
  opacity: 0.9;
}

.values-list {
  text-align: left;
}

.value-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.value-item:last-child {
  border-bottom: none;
}

.value-label {
  font-weight: bold;
  font-size: 1.1rem;
}

.value-desc {
  opacity: 0.8;
  font-size: 0.9rem;
}

/* 團隊介紹 */
.team-section {
  padding: 100px 0;
  background: white;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
}

.team-member {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  transition: transform 0.3s ease;
}

.team-member:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.member-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 20px;
  border: 4px solid white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.member-avatar .el-image {
  width: 100%;
  height: 100%;
}

.member-name {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 8px;
  color: #2c3e50;
}

.member-position {
  color: #3498db;
  font-weight: 500;
  margin-bottom: 15px;
}

.member-description {
  color: #7f8c8d;
  line-height: 1.6;
  margin-bottom: 20px;
}

.skill-tag {
  margin: 2px;
}

/* 合作優勢 */
.advantages-section {
  padding: 100px 0;
  background: #f8f9fa;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
  font-size: 1.5rem;
}

.advantage-title {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #2c3e50;
}

.advantage-description {
  color: #7f8c8d;
  font-size: 0.9rem;
  line-height: 1.5;
}

/* 聯繫我們 */
.contact-content {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 50px;
}

.contact-info {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  width: calc(50% - 10px); /* 每行两个，间隔20px */
}

.contact-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  margin-right: 20px;
  flex-shrink: 0;
}

.contact-details h4 {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 8px;
  color: #2c3e50;
}

.contact-details p {
  color: #7f8c8d;
  line-height: 1.6;
}

.contact-form {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 40px;
}

.form-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 25px;
  color: #2c3e50;
  text-align: center;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  .intro-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .business-card {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .business-card:nth-child(even) .business-image {
    order: 0;
  }
  
  .vision-mission-grid {
    grid-template-columns: 1fr;
  }
  
  .contact-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .container {
    padding: 0 15px;
  }
  
  .market-grid {
    grid-template-columns: 1fr;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 480px) {
  .hero-stats {
    grid-template-columns: 1fr;
  }
  
  .stat-number {
    font-size: 2rem;
  }
  
  .business-card, .contact-form {
    padding: 25px;
  }
  
  .team-member {
    padding: 20px;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>