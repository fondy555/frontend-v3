<template>
  <div class="product-showcase">
    <!-- 頂部橫幅 -->
    <div class="top-banner">
      <div class="banner-content">
        <span class="banner-text">專業的無人機、蘋果產品與珠寶首飾供應商</span>
        <div class="banner-features">
          <span class="feature-item">
            <i class="el-icon-medal"></i>
            正品保證
          </span>
          <span class="feature-item">
            <i class="el-icon-s-promotion"></i>
            全球供應
          </span>
          <span class="feature-item">
            <i class="el-icon-service"></i>
            專業服務
          </span>
        </div>
      </div>
    </div>

    <!-- 主頭部 -->
    <header class="main-header">
      <div class="header-container">
        <!-- Logo -->
        <div class="logo-section">
          <h1 class="brand-logo">TechJewel</h1>
          <span class="brand-tagline">科技與美麗的完美結合</span>
        </div>

        <!-- 搜索框 -->
        <div class="search-section">
          <el-input
            v-model="searchQuery"
            placeholder="搜索產品..."
            prefix-icon="el-icon-search"
            class="search-input"
            @keyup.enter="handleSearch"
          > 
            <template v-slot:append>
            <el-button  icon="el-icon-search" @click="handleSearch"></el-button>
            </template>
          </el-input>
        </div>

        <!-- 聯繫信息 -->
        <div class="contact-info">
          <div class="contact-item">
            <i class="el-icon-phone"></i>
            <span>+86-755-1234-5678</span>
          </div>
          <div class="contact-item">
            <i class="el-icon-message"></i>
            <span>info@techjewel.com</span>
          </div>
        </div>
      </div>
    </header>

    <!-- 主導航菜單 -->
    <nav class="main-navigation">
      <div class="nav-container">
        <el-menu
          :default-active="activeIndex"
          class="nav-menu"
          mode="horizontal"
          @select="handleMenuSelect"
        >
          <el-menu-item index="home">
            <i class="el-icon-house"></i>
            首頁
          </el-menu-item>
          
          <el-submenu index="apple">
            <template v-slot:title>
              <i class="el-icon-mobile-phone"></i>
              蘋果產品
            </template>
            <el-menu-item index="iphone">iPhone系列</el-menu-item>
            <el-menu-item index="ipad">iPad系列</el-menu-item>
            <el-menu-item index="airpods">AirPods系列</el-menu-item>
            <el-menu-item index="watch">Apple Watch</el-menu-item>
            <el-menu-item index="macbook">MacBook系列</el-menu-item>
          </el-submenu>
          
          <el-submenu index="drones">
            <template v-slot:title>
              <i class="el-icon-coordinate"></i>
              無人機
            </template>
            <el-menu-item index="dji">DJI系列</el-menu-item>
            <el-menu-item index="autel">Autel系列</el-menu-item>
            <el-menu-item index="parrot">Parrot系列</el-menu-item>
            <el-menu-item index="accessories">無人機配件</el-menu-item>
          </el-submenu>
          
          <el-submenu index="jewelry">
            <template v-slot:title>
              <i class="el-icon-star-on"></i>
              珠寶首飾
            </template>
            <el-menu-item index="gold">黃金首飾</el-menu-item>
            <el-menu-item index="diamond">鑽石珠寶</el-menu-item>
            <el-menu-item index="silver">銀飾系列</el-menu-item>
            <el-menu-item index="gemstone">寶石首飾</el-menu-item>
          </el-submenu>
          
          <el-menu-item index="catalog">
            <i class="el-icon-document"></i>
            產品目錄
          </el-menu-item>
          
          <el-menu-item index="about">
            <i class="el-icon-info"></i>
            關於我們
          </el-menu-item>
          
          <el-menu-item index="contact">
            <i class="el-icon-phone-outline"></i>
            聯繫我們
          </el-menu-item>
        </el-menu>
      </div>
    </nav>

    <!-- 主要展示區域 -->
    <section class="hero-showcase">
      <div class="hero-container">
        <div class="hero-content">
          <div class="hero-text">
            <h2 class="hero-title">優質產品展示</h2>
            <p class="hero-subtitle">專業供應無人機、蘋果產品與珠寶首飾</p>
            <div class="hero-stats">
              <div class="stat-item">
                <div class="stat-number">500+</div>
                <div class="stat-label">產品型號</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">8+</div>
                <div class="stat-label">年專業經驗</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">50+</div>
                <div class="stat-label">合作品牌</div>
              </div>
            </div>
          </div>
          
          <div class="hero-visual">
            <div class="product-display">
              <!-- 3D產品展示 -->
              <div class="display-item iphone-display">
                <div class="product-3d">
                  <div class="iphone-model">
                    <div class="screen"></div>
                    <div class="home-button"></div>
                  </div>
                </div>
                <span class="product-label">iPhone系列</span>
              </div>
              
              <div class="display-item drone-display">
                <div class="drone-model">
                  <div class="drone-body"></div>
                  <div class="propeller prop1"></div>
                  <div class="propeller prop2"></div>
                  <div class="propeller prop3"></div>
                  <div class="propeller prop4"></div>
                </div>
                <span class="product-label">專業無人機</span>
              </div>
              
              <div class="display-item jewelry-display">
                <div class="jewelry-model">
                  <div class="ring"></div>
                  <div class="diamond"></div>
                </div>
                <span class="product-label">精美珠寶</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

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
                        size="mini"
                        class="feature-tag"
                      >
                        {{ feature }}
                      </el-tag>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            
            <el-tab-pane label="無人機" name="drones">
              <div class="products-grid">
                <div 
                  class="product-item"
                  v-for="product in droneProducts"
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
                        size="mini"
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
                        size="mini"
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

 
    <section class="contact-section">
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
          
          <div class="contact-form">
            <h4 class="form-title">產品諮詢</h4>
            <el-form :model="inquiryForm" label-width="80px">
              <el-form-item label="姓名">
                <el-input v-model="inquiryForm.name" placeholder="請輸入您的姓名"></el-input>
              </el-form-item>
              
              <el-form-item label="公司">
                <el-input v-model="inquiryForm.company" placeholder="請輸入公司名稱"></el-input>
              </el-form-item>
              
              <el-form-item label="電話">
                <el-input v-model="inquiryForm.phone" placeholder="請輸入聯繫電話"></el-input>
              </el-form-item>
              
              <el-form-item label="郵箱">
                <el-input v-model="inquiryForm.email" placeholder="請輸入郵箱地址"></el-input>
              </el-form-item>
              
              <el-form-item label="產品">
                <el-select v-model="inquiryForm.product" placeholder="請選擇感興趣的產品" style="width: 100%">
                  <el-option label="蘋果產品" value="apple"></el-option>
                  <el-option label="無人機" value="drone"></el-option>
                  <el-option label="珠寶首飾" value="jewelry"></el-option>
                  <el-option label="全部產品" value="all"></el-option>
                </el-select>
              </el-form-item>
              
              <el-form-item label="留言">
                <el-input
                  type="textarea"
                  v-model="inquiryForm.message"
                  placeholder="請描述您的需求"
                  :rows="4"
                ></el-input>
              </el-form-item>
              
              <el-form-item>
                <el-button type="primary" @click="submitInquiry" :loading="submitting">
                  {{ submitting ? '提交中...' : '提交諮詢' }}
                </el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
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
          productCount: 150
        },
        {
          id: 2,
          name: '專業無人機',
          description: 'DJI、Autel、Parrot等品牌專業無人機及配件',
          image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=300&fit=crop',
          productCount: 80
        },
        {
          id: 3,
          name: '珠寶首飾',
          description: '黃金、鑽石、翡翠、銀飾等各類精美珠寶首飾',
          image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
          productCount: 200
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
      droneProducts: [
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
          id: 4,
          name: 'Autel EVO Lite+',
          specs: '6K攝像頭 | 40分鐘飛行 | 三軸雲台',
          image: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?w=300&h=300&fit=crop',
          features: ['6K攝像', '40分鐘', '三軸雲台', '智能跟隨']
        },
        {
          id: 5,
          name: 'Parrot ANAFI Ai',
          specs: '4G連接 | 32分鐘飛行 | AI功能',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
          features: ['4G連接', '32分鐘', 'AI功能', '180°雲台']
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
      
      // 品牌
      brands: [
        { id: 1, name: 'Apple', logo: 'https://logos-world.net/wp-content/uploads/2020/04/Apple-Logo.png' },
        { id: 2, name: 'DJI', logo: 'https://logos-world.net/wp-content/uploads/2022/01/DJI-Logo.png' },
        { id: 3, name: 'Autel', logo: 'https://via.placeholder.com/120x60/f0f0f0/666?text=Autel' },
        { id: 4, name: 'Parrot', logo: 'https://via.placeholder.com/120x60/f0f0f0/666?text=Parrot' },
        { id: 5, name: 'Tiffany', logo: 'https://via.placeholder.com/120x60/f0f0f0/666?text=Tiffany' },
        { id: 6, name: 'Cartier', logo: 'https://via.placeholder.com/120x60/f0f0f0/666?text=Cartier' },
        { id: 7, name: 'Chow Tai Fook', logo: 'https://via.placeholder.com/120x60/f0f0f0/666?text=周大福' },
        { id: 8, name: 'Chow Sang Sang', logo: 'https://via.placeholder.com/120x60/f0f0f0/666?text=周生生' }
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
    
    // 菜單選擇
    handleMenuSelect(key) {
      this.activeIndex = key;
      this.$message.info(`瀏覽: ${key}`);
    },
    
    // 分類點擊
    handleCategoryClick(category) {
      this.$message.info(`查看分類: ${category.name}`);
    },
    
    // 標籤頁切換
    handleTabClick(tab) {
      this.$message.info(`切換到: ${tab.label}`);
    },
    
    // 查看產品
    viewProduct(product) {
      this.$message.info(`查看產品: ${product.name}`);
    },
    
    // 提交諮詢
    submitInquiry() {
      if (!this.inquiryForm.name || !this.inquiryForm.phone || !this.inquiryForm.email) {
        this.$message.warning('請填寫必要的聯繫信息');
        return;
      }
      
      this.submitting = true;
      
      setTimeout(() => {
        this.submitting = false;
        this.$message.success('諮詢提交成功，我們會盡快與您聯繫！');
        this.resetForm();
      }, 2000);
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

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 14px;
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
.nav-menu .el-submenu__title {
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

/* iPhone 3D模型 */
.product-3d {
  width: 100px;
  height: 180px;
  position: relative;
  transform-style: preserve-3d;
  animation: rotate3d 8s linear infinite;
}

.iphone-model {
  width: 100px;
  height: 180px;
  background: #1a1a1a;
  border-radius: 20px;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.screen {
  width: 85px;
  height: 150px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 15px;
  margin: 15px auto;
}

.home-button {
  width: 40px;
  height: 40px;
  background: #333;
  border-radius: 50%;
  margin: 10px auto;
}

/* 無人機 3D模型 */
.drone-model {
  width: 120px;
  height: 120px;
  position: relative;
  transform-style: preserve-3d;
  animation: rotate3d 10s linear infinite;
}

.drone-body {
  width: 50px;
  height: 50px;
  background: #333;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.propeller {
  width: 35px;
  height: 35px;
  background: #666;
  border-radius: 50%;
  position: absolute;
  animation: spin 0.1s linear infinite;
}

.prop1 { top: 0; left: 0; }
.prop2 { top: 0; right: 0; }
.prop3 { bottom: 0; left: 0; }
.prop4 { bottom: 0; right: 0; }

/* 珠寶 3D模型 */
.jewelry-model {
  width: 80px;
  height: 80px;
  position: relative;
  transform-style: preserve-3d;
  animation: rotate3d 12s linear infinite;
}

.ring {
  width: 80px;
  height: 80px;
  border: 10px solid #ffd700;
  border-radius: 50%;
  position: relative;
  box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
}

.diamond {
  width: 25px;
  height: 25px;
  background: linear-gradient(45deg, #fff, #e6e6e6);
  transform: rotate(45deg);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  animation: sparkle 2s ease-in-out infinite;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
}

/* 動畫 */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-25px); }
}

@keyframes rotate3d {
  0% { transform: rotateY(0deg) rotateX(0deg); }
  25% { transform: rotateY(90deg) rotateX(0deg); }
  50% { transform: rotateY(180deg) rotateX(90deg); }
  75% { transform: rotateY(270deg) rotateX(0deg); }
  100% { transform: rotateY(360deg) rotateX(0deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes sparkle {
  0%, 100% { opacity: 1; transform: translate(-50%, -50%) rotate(45deg) scale(1); }
  50% { opacity: 0.7; transform: translate(-50%, -50%) rotate(45deg) scale(1.3); }
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

/* 聯繫我們 */
.contact-section {
  padding: 80px 0;
  background: white;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
}

.contact-title {
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 10px;
}

.contact-subtitle {
  color: #7f8c8d;
  margin-bottom: 40px;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.contact-details .contact-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
}

.contact-details .contact-item i {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.contact-text {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.contact-text strong {
  color: #2c3e50;
  font-weight: 600;
}

.contact-text span {
  color: #7f8c8d;
}

.contact-form {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 40px;
}

.form-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 25px;
  text-align: center;
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
  
  .contact-info {
    align-items: center;
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