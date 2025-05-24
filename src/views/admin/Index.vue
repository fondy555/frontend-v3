<template>
  <div class="page">
    <Nav />
    <el-row class="container">
      <el-col :xs="24" :sm="6" :md="4" :lg="4" :xl="4">
        <el-menu
          :default-active="active"
          class="menu"
          @open="handleOpen"
          @close="handleClose"
          @select="select"
          position: fixed
          mode="vertical"
        >
          <!-- <el-sub-menu index="1">
            <template #title>
              <i class="el-icon-setting"></i>
              <span>配置</span>
            </template> -->
            <!-- 子菜单项可以放在这里，如果有的话 -->
          <!-- </el-sub-menu> -->
          <el-menu-item index="/ProductList">
            <template #title>
              <div class="flex-start">
                <div>商品列表</div>
              </div>
            </template>
          </el-menu-item>
          <el-menu-item index="/ProductEdit">
            <template #title>
              <div class="flex-start">
                <div>商品編輯</div>
              </div>
            </template>
          </el-menu-item>
          <el-menu-item index="/info">
            <template #title>
              <div class="flex-start">
                <div>基本信息</div>
              </div>
            </template>
          </el-menu-item>
          <!-- <el-menu-item index="/Brands">
            <template #title>
              <div class="flex-start">
                <div>商品品牌</div>
              </div>
            </template>
          </el-menu-item> -->
          <!-- <el-menu-item index="/Products">
            <template #title>
              <div class="flex-start">
                <div>商品配置</div>
              </div>
            </template>
          </el-menu-item> -->
          <!-- <el-menu-item index="/ProductsCarousels">
            <template #title>
              <div class="flex-start">
                <div>横向商品</div>
              </div>
            </template>
          </el-menu-item>
          <el-menu-item index="/ProductsWaterfall">
            <template #title>
              <div class="flex-start">
                <div>瀑布流商品</div>
              </div>
            </template>
          </el-menu-item> -->
        </el-menu>
      </el-col>
      <el-col :xs="24" :sm="18" :md="20" :lg="20" :xl="20" class="appMain">
        <router-view />
      </el-col>
    </el-row>
    <Footer />
  </div>
</template>

<script>
import Nav from '../front/components/Nav.vue'
import Footer from '../front/components/Footer.vue'

export default {
  name: 'Index',
  components: { Nav, Footer },
  data() {
    return {
      isCollapse: false,
      active: null,
    };
  },

  mounted() {
    this.active = this.$route.fullPath;
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  },
  beforeMount() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleOpen(key, keyPath) {
      this.active = key;
      this.keyPath = keyPath;
    },
    handleClose(key, keyPath) {
      this.active = key;
      this.keyPath = keyPath;
    },
    handleResize() {
      this.isCollapse = window.innerWidth <= 768;
    },
    select(index) {
      if (this.$route.path !== index) {
        this.$router.push(index);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  background: #f4f5fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  flex: 1;
  display: flex;
  margin-top: 75px;
  margin-bottom: 15px;
}

.menu {
  height: 100%;
  border-right: solid 1px #e6e6e6;
}

.appMain {
  padding: 20px;
  background: #fff;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .menu {
    width: 100%;
    height: auto;
  }

  .appMain {
    width: 100%;
    padding: 10px;
  }
}
</style>