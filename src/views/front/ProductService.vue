<template>
	<div>
		<Nav/>
		<Banner/>
		<div class="container">
			<el-breadcrumb separator="/" class="top">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>当前</el-breadcrumb-item>
			</el-breadcrumb>
			<el-card class="top">
        <el-row :gutter="24" style="height: 1000px;">
          <!-- 左侧筛选栏 -->
          <el-col :span="6">
              <el-card>
                <div style="margin-bottom: 10px;">筛选</div>
                <el-collapse v-model="activeNames">
                  <el-collapse-item title="Model" name="1" style="margin-bottom: 10px;">
                  <!-- 原有的Model筛选 -->
                  <div v-for="i in testList" :key="i">
                    <el-checkbox value="checked1" :label="i" style="margin-top: 5px;">{{ i }}</el-checkbox>
                  </div>
                  </el-collapse-item>

                  <!-- 颜色筛选 -->
                  <el-collapse-item title="颜色" name="2" style="margin-bottom: 10px;">
                  <div v-for="color in colors" :key="color">
                    <el-checkbox value="selectedColors" :label="color" style="margin-top: 5px;">{{ color }}</el-checkbox>
                  </div>
                  </el-collapse-item>

                  <!-- 库存筛选 -->
                  <div style="margin-top: 20px;">库存</div>
                  <el-slider class="slider"
                    v-model="stock"
                    :min="0"
                    :max="100"
                    :step="1"
                    range
                    show-stops
                    style="margin-top: 10px;"
                    :format-tooltip="formatTooltip"
                  >
                    <!-- <span slot="start">{{ stockRange[0] }}</span>
                    <span slot="end">{{ stockRange[1] }}</span> -->
                  </el-slider>

                  <!-- 价格筛选 -->
                  <div style="margin-top: 20px;">价格</div>
                  <el-slider class="slider"
                    v-model="price"
                    :min="0"
                    :max="2000"
                    :step="50"
                    range
                    show-stops
                    style="margin-top: 10px;"
                    :format-tooltip="value => formatTooltip(value, 'price')"
                  >
                    <!-- <span slot="start">{{ priceRange[0] }}</span>
                    <span slot="end">{{ priceRange[1] }}</span> -->
                  </el-slider>
              </el-collapse>
              </el-card>
          </el-col>

          <!-- 右侧产品展示 -->
          <el-col :span="18">
            <el-row :gutter="24" class="product-row" style="height: 1000px; overflow-y: auto;">
              <el-col :span="8" :xs="24" :sm="12" :md="8" v-for="product in products" :key="product.id" class="product-col">
                <el-card class="product-card" @click="viewDetails(product.id)">
                  <img :src="product.coverImage" alt="暂无图片" class="product-image"/>
                  <div class="product-info">
                    <p class="product-name">{{ product.name }}</p>
                    <p class="product-price">$ {{ product.salePrice }}</p>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
			</el-card>
		</div>
		<!-- <Footer class="top"/> -->
	</div>
</template>

<script>
import Banner from './components/Banner'
import Nav from './components/Nav.vue'
// import Footer from './components/Footer.vue'
// import { getAllProducts } from '@/api/index.js'

export default {
    name: 'ProductService',
    components: {Nav, Banner},
    // components: {Nav, Footer, Banner},

    data() {
        return {
            // products: [
            //   { id: 1, name: "iPhone 13", model: "iphone", color: "Red", salePrice: 799, stock: 50, coverImage: "https://i.ebayimg.com/images/g/EcIAAOSwropmIhRN/s-l1200.jpg" },
            //   { id: 2, name: "iPad Air", model: "ipad", color: "Blue", salePrice: 599, stock: 30, coverImage: "https://i.ebayimg.com/images/g/EcIAAOSwropmIhRN/s-l1200.jpg" },
            //   { id: 3, name: "MacBook Pro", model: "macbook", color: "Black", salePrice: 1299, stock: 20, coverImage: "https://i.ebayimg.com/images/g/EcIAAOSwropmIhRN/s-l1200.jpg" },
            //   { id: 4, name: "Apple Watch", model: "watch", color: "Green", salePrice: 399, stock: 100, coverImage: "https://i.ebayimg.com/images/g/EcIAAOSwropmIhRN/s-l1200.jpg" },
            //   { id: 5, name: "Starlink Kit", model: "starlink", color: "White", salePrice: 499, stock: 5, coverImage: "https://i.ebayimg.com/images/g/EcIAAOSwropmIhRN/s-l1200.jpg" },
            //   { id: 6, name: "iPhone 12", model: "iphone", color: "Black", salePrice: 699, stock: 50, coverImage: "https://i.ebayimg.com/images/g/EcIAAOSwropmIhRN/s-l1200.jpg" },
            //   { id: 7, name: "MacBook Air", model: "macbook", color: "White", salePrice: 999, stock: 10, coverImage: "https://i.ebayimg.com/images/g/EcIAAOSwropmIhRN/s-l1200.jpg" },
            //   { id: 8, name: "iPad Pro", model: "ipad", color: "Red", salePrice: 799, stock: 60, coverImage: "https://i.ebayimg.com/images/g/EcIAAOSwropmIhRN/s-l1200.jpg" },
            //   { id: 9, name: "iPad Pro", model: "ipad", color: "Red", salePrice: 799, stock: 60, coverImage: "https://i.ebayimg.com/images/g/EcIAAOSwropmIhRN/s-l1200.jpg" },
            //   { id: 10, name: "iPad Pro", model: "ipad", color: "Red", salePrice: 799, stock: 60, coverImage: "https://i.ebayimg.com/images/g/EcIAAOSwropmIhRN/s-l1200.jpg" },
            //   { id: 11, name: "iPad Pro", model: "ipad", color: "Red", salePrice: 799, stock: 60, coverImage: "https://i.ebayimg.com/images/g/EcIAAOSwropmIhRN/s-l1200.jpg" },
            //   { id: 12, name: "iPad Pro", model: "ipad", color: "Red", salePrice: 799, stock: 60, coverImage: "https://i.ebayimg.com/images/g/EcIAAOSwropmIhRN/s-l1200.jpg" },
            // ],
            products: [],
            testList: [
              "iphone",
              "ipad",
              "macbook",
              "watch",
              "starlink"
            ],
            checked1: [],  // 用于原有的Model筛选
            selectedColors: [],  // 颜色筛选
            stockRange: [0, 100],  // 库存范围筛选
            priceRange: [0, 2000],  // 价格范围筛选
            colors: ["Red", "Blue", "Green", "Black", "White"],  // 假设的颜色列表
            activeNames: '1',  // 折叠面板的默认展开项
            stock: 0,
            price: 0
        };
    },
    mounted() {
        // this.fetchProducts();
        // this.mouseover();
    },

    computed: {
        // 根据筛选条件过滤产品
        filteredProducts() {
            return this.products.filter(product => {
                // 颜色过滤
                const colorMatches = this.selectedColors.length === 0 || this.selectedColors.includes(product.color);
                
                // 库存过滤
                const stockMatches = product.stock >= this.stockRange[0] && product.stock <= this.stockRange[1];
                
                // 原有Model筛选
                const modelMatches = this.checked1.length === 0 || this.checked1.includes(product.model);

                return colorMatches && stockMatches && modelMatches;
            });
        }
    },

    methods: {
        // fetchProducts() {
        //   getAllProducts().then(response => {
        //         this.products = response.data; // 访问response.data
        //     }).catch(error => {
        //         console.error('Failed to fetch products:', error);
        //     });
        // },
        // viewDetails(id) {
        //   this.$router.push({ name: 'Product', params: { id } });
        // },
        formatTooltip(value, type) {
          if (type === 'price') {
                return `$${value}`;
            }
            return `${value}件`;
        }
    },

};
</script>

<style lang="scss" scoped>
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
  margin-bottom: 100px;
}

.product-card {
  width: 100%;
  border: 1px solid #e1e1e1;
  padding: 10px;
  text-align: center;
  margin: 4px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  height: 350px;
  border-radius: 10px; /* 添加圆角 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 添加阴影 */
  background-color: #fff; /* 设置背景颜色 */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 垂直方向均匀分布 */
}

.product-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2); /* 鼠标悬停时增加阴影 */
}

.product-image {
  width: 100%;
  height: auto;
  border-radius: 10px 10px 0 0; /* 图片顶部圆角 */
  object-fit: cover; /* 确保图片覆盖整个区域 */
}

.product-info {
  padding: 10px;
  text-align: left;
}

.product-name {
  font-size: 1.2em;
  font-weight: bold;
  margin: 10px 0;
}

.product-price {
  font-size: 1.1em;
  color: #ff5722;
  margin: 10px 0;
}

/* 控制每行最多显示3个卡片 */
.product-col {
  display: flex;
  justify-content: center;
  margin-bottom: 10px; /* 确保间隔一致 */
  margin-top: 10px; /* 确保间隔一致 */
  height: 350px;
}

/* 滾動條樣式 */
.slider {
  margin-left: 10px;
  margin-right: 10px;
}

.product-row {
  max-height: 1000px;
  overflow-y: auto;
  scrollbar-width: thin; /* For Firefox */
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent; /* For Firefox */

  &::-webkit-scrollbar {
    width: 8px; /* For WebKit browsers */
  }

  &::-webkit-scrollbar-track {
    background: transparent; /* For WebKit browsers */
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2); /* For WebKit browsers */
    border-radius: 10px; /* For WebKit browsers */
  }
}
</style>
