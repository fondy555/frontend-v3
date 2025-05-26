<template>
  <div class="top-banner">
    <div class="banner-content">
      <span class="banner-text">專業的無人機、蘋果產品與首飾供應商</span>
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
        <h1 class="brand-logo">ShunGlory</h1>
        <!-- <span class="brand-tagline">科技與美麗的完美結合</span> -->
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
            <el-button icon="el-icon-search" @click="handleSearch"></el-button>
          </template>
        </el-input>
      </div>

      <!-- 聯繫信息 -->
      <div class="contact-info">
        <div class="contact-item">
          <i class="el-icon-phone"></i>
          <span></span>
        </div>
        <div class="contact-item">
          <i class="el-icon-message"></i>
          <span></span>
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
        <el-menu-item index="/home">
          首頁
        </el-menu-item>
        
        <el-sub-menu index="apple">
          <template v-slot:title>
            <i class="el-icon-mobile-phone"></i>
            Apple
          </template>
          <el-menu-item index="iphone">iPhone</el-menu-item>
          <el-menu-item index="ipad">iPad</el-menu-item>
          <el-menu-item index="airpods">AirPods</el-menu-item>
          <el-menu-item index="watch">Apple Watch</el-menu-item>
          <el-menu-item index="macbook">MacBook</el-menu-item>
          <el-menu-item index="others">其他</el-menu-item>
        </el-sub-menu>
        
        <el-sub-menu index="Dji">
          <template v-slot:title>
            <i class="el-icon-coordinate"></i>
            DJI
          </template>
          <el-menu-item index="drones">無人機</el-menu-item>
          <el-menu-item index="handheld gimbals">手持穩定器</el-menu-item>
          <el-menu-item index="gimbal cameras">雲台相機</el-menu-item>
          <el-menu-item index="accessories">無人機配件</el-menu-item>
        </el-sub-menu>
        
        <el-sub-menu index="jewelry">
          <template v-slot:title>
            <i class="el-icon-star-on"></i>
            首飾
          </template>
          <!-- <el-menu-item index="gold">黃金首飾</el-menu-item> -->
          <!-- <el-menu-item index="diamond">鑽石珠寶</el-menu-item> -->
          <el-menu-item index="silver">銀飾系列</el-menu-item>
          <el-menu-item index="gemstone">寶石首飾</el-menu-item>
        </el-sub-menu>
        
        <el-menu-item index="/productService">
          <i class="el-icon-document"></i>
          產品目錄
        </el-menu-item>
        
        <el-menu-item index="/about">
          <i class="el-icon-info"></i>
          關於我們
        </el-menu-item>
        
      </el-menu>
    </div>
  </nav>
  <router-view />
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      activeIndex: 'home'
    };
  },
  methods: {
    handleSearch() {
      // 搜索处理逻辑
    },
    handleMenuSelect(index) {
      this.activeIndex = index;
      if (this.$route.path !== index) {
        
        this.$router.push(index);
      }
    }
  }
};
</script>

<style scoped>
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
  margin-top: 1px;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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
</style>