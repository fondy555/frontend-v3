<template>
  <div class="product-detail">
    <Nav/>
    <el-card>
      <div class="product-content">
        <div class="product-images">
          <img :src="product.coverImage" class="product-image" />
          <div v-for="(image, index) in product.detailImages" :key="index" class="thumbnail">
            <img :src="image" alt="商品图片" class="product-thumbnail" @click="selectImage(image)" />
          </div>
        </div>
        <div class="product-info">
          <div class="product-name">{{ product.name }}</div>
          <p class="price">price: ${{ product.salePrice }}</p>
          <el-card class="detail-card">
            <div>
              sytle: {{ modelName }}
            </div>
            <div class="selectSytle">
              <el-radio v-model="modelName" label="blue" border>blue</el-radio>
              <el-radio v-model="modelName" label="yellow" border>yellow</el-radio>
              <el-radio v-model="modelName" label="silver" border>silver</el-radio>
              <el-radio v-model="modelName" label="pink" border>pink</el-radio>
            </div>
          </el-card>
          <!-- <el-select v-model="selectedColor" placeholder="选择颜色">
            <el-option
              v-for="(color, index) in product.colors"
              :key="index"
              :label="color"
              :value="color">
            </el-option>
          </el-select> -->
          <!-- <el-input-number v-model="quantity" :min="1" :max="product.stock" label="数量"></el-input-number>
          <el-button type="primary" @click="addToCart">加入购物车</el-button> -->
          <!-- <div class="product-description">
            <h2>产品详细描述</h2>
            <p>{{ product.longDescription }}</p>
          </div> -->
        </div>
      </div>
      <div class="product-reviews">
        <h2>用户评价</h2>
        <div v-for="(review, index) in product.reviews" :key="index" class="review">
          <p><strong>{{ review.user }}</strong>: {{ review.comment }}</p>
        </div>
      </div>
    </el-card>
    <el-alert
      v-if="error"
      :title="error"
      type="error"
      :closable="false"
    />
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
      error: null,
      selectedColor: '',
      quantity: 1,
      modelName: "",
    };
  },
  components: {
    Nav,
    Footer
  },
  methods: {
    addToCart() {
      // 添加到购物车的逻辑
      console.log('商品已添加到购物车:', this.product.name, '颜色:', this.selectedColor, '数量:', this.quantity);
    },
    selectImage(image) {
      this.product.coverImage = image;
    }
  },
  async created() {
    try {
      const productId = this.$route.params.id;
      // console.log('Fetching product with ID:', productId);
      const response = await getProductById(productId);
      // console.log('Product data received:', response);
      if (response.code === 0) {
        this.product = response.data;
      } else {
        throw new Error(response.message || '获取产品详情失败');
      }
    } catch (error) {
      // console.error('获取产品详情失败:', error);
      this.error = '获取产品详情失败，请稍后再试';
      // 可以添加更多的错误处理逻辑，比如显示一个错误提示
    }
  }
};
</script>

<style scoped>
.product-detail {
  .product-content {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
  }
  .product-images {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;
  }
  .product-image {
    width: 100%;
    height: auto;
    max-width: 100%;
    max-height: 100vh; /* 使图片高度自适应页面高度 */
    object-fit: contain; /* 保持图片比例 */
    margin-bottom: 20px; /* 将图片向下移动 */
  }
  .thumbnail {
    margin-top: 10px;
    cursor: pointer;
  }
  .product-thumbnail {
    width: 80px;
    height: 80px;
    object-fit: cover;
  }


  .product-info {
    flex: 1;
    text-align: left;
    padding: 20px;
  }
  .product-name {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .price {
    font-size: 24px;
    /* color: #e74c3c; */
    margin-bottom: 20px;
    margin-top: 10px;
  }
  .detail-card {
    margin-top: 10px;
    height: 200px;
    width: 80%;
  }

  .el-radio {
    display: inline-block;
    margin-right: 10px;
    margin-top: 20px;
  }
  .el-radio .el-radio__input {
    display: none; /* 隐藏小圆点 */
  }
  .el-radio .el-radio__inner {
    border: 2px solid #dcdcdc;
    border-radius: 50%; /* 使其变成圆形 */
    width: 20px;
    height: 20px;
  }
  .el-radio .el-radio__inner:hover {
    border-color: #409eff;
  }
  .el-radio .el-radio__input.is-checked .el-radio__inner {
    border-color: #409eff;
    background-color: #409eff;
  }
  .el-radio .el-radio__input.is-checked .el-radio__inner::after {
    display: none; /* 隐藏选中的小圆点 */
  }
  
  .selectSytle{
    margin-top: 10px;
  }
  .product-description {
    margin-top: 20px;
  }
  .product-reviews {
    margin-top: 20px;
  }
  .review {
    margin-bottom: 10px;
  }
}
</style>