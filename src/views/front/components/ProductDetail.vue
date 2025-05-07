<template>
  <div class="product-detail">
    <Nav/>
    <div class="container">
    <el-card class="top">
      <div class="product-content">
        <div class="product-images" >
          <el-carousel :interval="5000" arrow="always" height="500px">
            <el-carousel-item v-for="(image, index) in product.detailImages" :key="index">
              <el-image :src="image" alt="商品图片" class="product-image" fit="contain" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="product-info">
          <h1>{{ product.name }}</h1>
          <p>价格: {{ product.salePrice }}</p>
          <p>类型: {{ product.type }}</p>
          <p>颜色: {{ product.color }}</p>
          <p>{{ product.description }}</p>
        </div>
      </div>
    </el-card>
    <el-alert
      v-if="error"
      :title="error"
      type="error"
      :closable="false"
    />
  </div>
    <Footer class="top"/>
  </div>
</template>

<script>
import Nav from './Nav.vue';
import Footer from './Footer.vue';
import { getProductById } from '@/api/index'; // 假设你有一个API文件来处理请求

export default {
  name: 'ProductDetail',
  data() {
    return {
      product: {},
      error: null 
    };
  },
  components: {
    Nav,
    Footer
  },
  async created() {
    try {
      const productId = this.$route.params.id;
      console.log('Fetching product with ID:', productId);
      const response = await getProductById(productId);
      console.log('Product data received:', response);
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
  }
};
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }

  @media (max-width: 480px) {
    padding: 5px;
  }
}

.container {
  flex: 1;
  margin-bottom: 30px;
}

.product-detail {
  .product-content {
    display: flex;
    flex-direction: row;
  }
  .product-images {
    width: 50%;
    overflow-x: auto; /* 使图片部分可以横向滚动 */
  }
  .product-image {
    width: 100%;
    height: 500px; /* 固定图片高度 */
    object-fit: contain; /* 保持图片比例 */
  }
  .product-info {
    width: 50%;
    padding-left: 20px;
    text-align: left;
  }
}
</style>