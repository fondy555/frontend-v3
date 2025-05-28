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

			<div class="login">
				<div v-if="!isLogin" class="btn">
					<div @click="login">登錄</div>
					<!-- <div @click="login('add')">注冊</div> -->
				</div>
				<div v-else class="loginOut">
					<el-dropdown trigger="hover">
						<div class="avatar-wrapper">
							<el-avatar :src='require("@/assets/avatar.png")'></el-avatar>
							<span style="font-size: 12px;margin-left:10px">{{ name }}</span>
						</div>
            <template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item @click="backend">
								<span>後臺管理</span>
							</el-dropdown-item>
							<el-dropdown-item divided @click="logout">
								<span>退出登錄</span>
              </el-dropdown-item>
						</el-dropdown-menu>
            </template>
					</el-dropdown>
				</div>
			</div>
      <!-- 聯繫信息 -->
      <!-- <div class="contact-info">
        <div class="contact-item">
          <i class="el-icon-phone"></i>

        </div>
        <div class="contact-item">
          <i class="el-icon-message"></i>
          <span></span>
        </div>
      </div> -->
    </div>
  </header>

  <nav class="main-navigation">
    <div class="nav-container">
      <el-menu
        :default-active="activeIndex"
        class="nav-menu"
        mode="horizontal"
      >
        <template v-for="item in menuItems">
          <el-menu-item v-if="!item.children" :index="item.path" :key="item.id" @click="handleMenuItemClick(item.path)">
            {{ item.text }}
          </el-menu-item>
          <el-sub-menu v-else :index="item.text" :key="item.method">
            <template v-slot:title>
              <i :class="item.icon"></i>
              {{ item.text }}
            </template>
            <el-menu-item v-for="child in item.children" :index="child.text" :key="child.text" 
            @click="handleSubMenuItemClick(item.path, item.method, child.value)">
              {{ child.text }}
            </el-menu-item>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </nav>
  <router-view />
</template>

<script>
import {mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      isLogin: null,
      searchQuery: '',
      activeIndex: 'home',
      menuItems: [
        { id: 1, 
          text: '首頁', 
          path: '/home',
          method: "", 
        },
        { id: 2, 
          text: 'Apple', 
          path: 'productList',
          method: "getProductsByCategoryId", 
          children: [
          { text: 'iPhone', value: 1 },
          { text: 'iPad', value: 2 },
          { text: 'AirPods', value: 3 },
          { text: 'Apple Watch', value: 4 },
          { text: 'MacBook', value: 5 },
        ] },
        { id: 3, 
          text: 'DJI', 
          path: 'productList',
          method: "getProductsByCategoryId",
          children: [ 
          { text: '無人機',   value: 6},
          { text: '手持穩定器',   value: 7 },
          { text: '雲台相機',   value: 8 },
          { text: '無人機配件',   value: 9 },
        ]},
        { id:4,
          text: '首飾', 
          path: 'productList',
          method: "getProductsByCategoryId",
          children: [
          { text: '銀飾系列', value: 11},
          { text: '寶石首飾', value: 12 }, 
        ]},
        { id:5,
          text: '產品目錄', 
          path: '/productList/',
          method: "",
        },
        { id:6, 
          text: '關於我們', 
          path: '/about',
          method: "",
        },
      ]
    };
  },
  computed: {
  ...mapGetters(["avatar", "name", "roles"]), 
  },
  mounted () {
           const token = localStorage.getItem("token");
        // console.log("Token:", token); // 调试代码，检查 token 是否正确读取
        this.isLogin = token ? true : false;

        if (this.isLogin) {
          this.getInfo();

        }

        const cachedFooterData = localStorage.getItem('footerData');
        if (cachedFooterData) {
            const footerData = JSON.parse(cachedFooterData);
            this.$nextTick(() => {
                this.logoImage = footerData.beianImage; // 从缓存中读取 beianImage
            });
        } 
  },
  methods: {
    ...mapActions('user', ['getInfo']),
    handleSearch() {
      // 搜索处理逻辑
    },
    handleMenuSelect(index) {
      // console.log(index, key,method);
      this.activeIndex = index;
      if (this.$route.path !== index) {
        this.$router.push(index);
        // console.log(index);
      }
    },

    handleMenuItemClick(index) {
      this.activeIndex = index;
      // console.log(index);
      if (this.$route.path !== index) {
        this.$router.push(index);
      }
    },
    handleSubMenuItemClick(parentPath, method, value) {
      // this.activeIndex = index;
      // console.log(parentPath, method, childText);
      this.$router.push({
        name: parentPath,
        query: {  
          categoryID: value,
          method: method
        },
      });
    },
    logout() {
        this.$message.success('退出成功')
        localStorage.removeItem('token')
        this.isLogin = false
        this.$router.replace({
            path: '/login'
        })
    },
    login(e) {
        if (e == 'add') {
            this.$router.push('/register')
        } else {
            this.$router.push('/login')
        }
    },
    backend() {
        this.$router.push({
            path: '/admin/productList'
        })
    },
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

.login {
      display: flex;
      align-items: center;


      .loginOut {
        line-height: 72px;

        .user-avatar {
          cursor: pointer;
          width: 20px;
          height: 20px;
          border-radius: 10px;
          margin: -5px 0 0 5px;
        }

        .avatar-wrapper {
          display: flex;
          align-items: center;
          height: 72px;
        }
      }

      .btn {
        display: flex;

        div {
          width: 50px;
          height: 72px;
          line-height: 72px;
          text-align: center;
          cursor: pointer;
        }
      }
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

.login-button {
  background-color: #667eea;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #556cd6;
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
  margin-right: 20px; /* 增加间隔 */
}
</style>