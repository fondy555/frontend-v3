<template>
  <div class="product-detail">
    <Nav/>
    <div class="container">
    <el-card class="top">
        <!-- <div class="product-detail"> -->
        <div class="product-container">
            <!-- 商品圖片區域 -->
            <div class="product-images">
                <div class="main-image">
                    <img :src="product.detailImages[selectedImageIndex]" :alt="product.name" />
                </div>
                <div class="image-thumbnails">
                    <div 
                    v-for="(image, index) in product.detailImages" 
                    :key="index" 
                    class="thumbnail"
                    :class="{ active: selectedImageIndex === index }"
                    @click="selectedImageIndex = index"
                    >
                    <img :src="image" :alt="`${product.name} 縮圖 ${index + 1}`" />
                    </div>
                </div>
            </div>
    
            <!-- 商品信息區域 -->
            <div class="product-info">
            <div class="product-header">
                <span class="product-tag">{{ product.tag }}</span>
                <!-- <div class="product-rating">
                <span class="stars">
                    <span 
                    v-for="i in 5" 
                    :key="i" 
                    :class="['star', { filled: i <= product.rating }]"
                    >★</span>
                </span>
                <span class="review-count">({{ product.reviewCount }} 評價)</span>
                </div> -->
            </div>
    
            <h1 class="product-title">{{ product.name }}</h1>
            <p class="product-model">類型: {{ product.type }}</p>
    
            <!-- 商品規格選擇 -->
            <div class="product-options">
                <div 
                v-for="(option, optionIndex) in product.options" 
                :key="optionIndex"
                class="option-group"
                >
                <h3>{{ option.name }}</h3>
                <div class="option-values">
                    <button 
                    v-for="(value, valueIndex) in option.values" 
                    :key="valueIndex"
                    class="option-button"
                    :class="{ active: selectedOptions[optionIndex] === valueIndex }"
                    @click="selectOption(optionIndex, valueIndex)"
                    >
                    {{ value }}
                    </button>
                </div>
                </div>
            </div>
    
            <!-- 價格顯示 -->
            <div class="price-info">
                <span class="current-price">¥{{ currentVariant.price }}</span>
                <span v-if="currentVariant.originalPrice" class="original-price">
                ¥{{ currentVariant.originalPrice }}
                </span>
                <span v-if="currentVariant.discount" class="discount-badge">
                省 ¥{{ currentVariant.discount }}
                </span>
            </div>
    
            <!-- 庫存信息 -->
            <div class="stock-info">
                <span v-if="currentVariant.stock > 10" class="in-stock">有貨</span>
                <span v-else-if="currentVariant.stock > 0" class="low-stock">
                庫存緊張，僅剩 {{ currentVariant.stock }} 件
                </span>
                <span v-else class="out-of-stock">暫時缺貨</span>
            </div>
    
            <div class="divider"></div>
    
            <!-- 商品特點 -->
            <div class="product-features">
                <h3>商品特點</h3>
                <ul>
                <li v-for="(feature, index) in product.features" :key="index">
                    {{ feature }}
                </li>
                </ul>
            </div>
            </div>
        </div>
    
        <!-- 商品詳情標籤頁 -->
        <!-- <div class="product-details">
            <div class="tabs">
            <button 
                v-for="(tab, index) in tabs" 
                :key="index"
                class="tab-button"
                :class="{ active: activeTab === index }"
                @click="activeTab = index"
            >
                {{ tab }}
            </button>
            </div>
    
            <div class="tab-content"> -->
            <!-- 詳細描述 -->
            <!-- <div v-if="activeTab === 0" class="description">
                <p>{{ product.description }}</p>
                <p>{{ product.longDescription }}</p>
            </div> -->
    
            <!-- 規格參數 -->
            <!-- <div v-if="activeTab === 1" class="specifications">
                <div 
                v-for="(spec, index) in product.specifications" 
                :key="index"
                class="spec-card"
                >
                <h3>{{ spec.category }}</h3>
                <table>
                    <tr v-for="(item, itemIndex) in spec.items" :key="itemIndex">
                    <td class="spec-name">{{ item.name }}</td>
                    <td class="spec-value">{{ item.value }}</td>
                    </tr>
                </table>
                </div>
            </div>
            </div>
        </div> -->
        <!-- </div> -->
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
  import { getProductById } from '@/api/index';

  export default {
    data() {
      return {
        error: null,
        // 模擬商品數據
        product: {
          name: '高級無線藍牙耳機',
          model: 'WH-1000XM5',
          type: '平板',
          tag: '熱銷款',
          detailImages: [],
          options: [],
          variants: [
            { options: [0, 0], price: 1299, originalPrice: 1599, discount: 300, stock: 15 },
            { options: [0, 1], price: 1499, originalPrice: 1799, discount: 300, stock: 8 },
            { options: [0, 2], price: 1699, originalPrice: 1999, discount: 300, stock: 3 },
            { options: [1, 0], price: 1299, originalPrice: 1599, discount: 300, stock: 20 },
            { options: [1, 1], price: 1499, originalPrice: 1799, discount: 300, stock: 12 },
            { options: [1, 2], price: 1699, originalPrice: 1999, discount: 300, stock: 5 },
            { options: [2, 0], price: 1399, originalPrice: 1699, discount: 300, stock: 10 },
            { options: [2, 1], price: 1599, originalPrice: 1899, discount: 300, stock: 6 },
            { options: [2, 2], price: 1799, originalPrice: 2099, discount: 300, stock: 0 },
            { options: [3, 0], price: 1399, originalPrice: 1699, discount: 300, stock: 7 },
            { options: [3, 1], price: 1599, originalPrice: 1899, discount: 300, stock: 4 },
            { options: [3, 2], price: 1799, originalPrice: 2099, discount: 300, stock: 2 }
          ],
          features: [
            '業界領先的降噪技術',
            '長達30小時的電池續航',
            '高解析度音頻支持',
            '舒適的貼耳設計',
            '多點連接功能'
          ],
        //   description: '這款高級無線藍牙耳機採用了最新的降噪技術，能夠有效隔絕外界噪音，讓您沉浸在音樂世界中。',
        //   longDescription: '耳機採用高品質材料製作，佩戴舒適，即使長時間使用也不會感到不適。內置高性能驅動單元，能夠還原豐富的音樂細節，帶來震撼的聽覺體驗。支持藍牙5.2連接，傳輸穩定，延遲低。同時支持多點連接，可以同時連接兩台設備，方便在不同設備間切換。內置麥克風支持通話功能，採用降噪算法，確保通話清晰。觸控操作簡單直觀，輕觸即可控制音樂播放、接聽電話等功能。',
        //   specifications: [
        //     {
        //       category: '基本規格',
        //       items: [
        //         { name: '型號', value: 'WH-1000XM5' },
        //         { name: '顏色', value: '黑色/白色/藍色/銀色' },
        //         { name: '重量', value: '250g' },
        //         { name: '連接方式', value: '藍牙5.2' }
        //       ]
        //     },
        //     {
        //       category: '音頻規格',
        //       items: [
        //         { name: '驅動單元', value: '40mm' },
        //         { name: '頻率響應', value: '4Hz-40,000Hz' },
        //         { name: '阻抗', value: '47Ω' },
        //         { name: '靈敏度', value: '105dB/mW' }
        //       ]
        //     },
        //     {
        //       category: '電池規格',
        //       items: [
        //         { name: '電池容量', value: '1000mAh' },
        //         { name: '播放時間', value: '最長30小時' },
        //         { name: '充電時間', value: '3小時' },
        //         { name: '快充', value: '10分鐘充電可使用5小時' }
        //       ]
        //     },
        //     {
        //       category: '其他功能',
        //       items: [
        //         { name: '降噪', value: '主動降噪' },
        //         { name: '控制方式', value: '觸控' },
        //         { name: '語音助手', value: '支持' },
        //         { name: 'APP支持', value: 'iOS/Android' }
        //       ]
        //     }
        //   ]
        },
        tabs: ['產品描述', '規格參數'],
        activeTab: 0,
        selectedImageIndex: 0,
        selectedOptions: [0, 0]
      };
    },
    components: {
    Nav,
    Footer
    },
    async created() {
        try {
        const productId = this.$route.params.id;
        // const productId = 1;
        console.log('Fetching product with ID:', productId);
        const response = await getProductById(productId);
        console.log('Product data received:', response);
        
        if (response.code === 0) {
            this.product = response.data;
            this.product.tag = "平板"
        //     this.product.options = [
        //     {
        //       name: '顏色',
        //       values: ['黑色', '白色', '藍色', '銀色']
        //     },
        //     {
        //       name: '版本',
        //       values: ['標準版', '豪華版', '限量版']
        //     }
        //   ];
          this.product.variants = [
            { options: [0, 0], price: 1299, originalPrice: 1599, discount: 300, stock: 15 },
            { options: [0, 1], price: 1499, originalPrice: 1799, discount: 300, stock: 8 },
            { options: [0, 2], price: 1699, originalPrice: 1999, discount: 300, stock: 3 },
            { options: [1, 0], price: 1299, originalPrice: 1599, discount: 300, stock: 20 },
            { options: [1, 1], price: 1499, originalPrice: 1799, discount: 300, stock: 12 },
            { options: [1, 2], price: 1699, originalPrice: 1999, discount: 300, stock: 5 },
            { options: [2, 0], price: 1399, originalPrice: 1699, discount: 300, stock: 10 },
            { options: [2, 1], price: 1599, originalPrice: 1899, discount: 300, stock: 6 },
            { options: [2, 2], price: 1799, originalPrice: 2099, discount: 300, stock: 0 },
            { options: [3, 0], price: 1399, originalPrice: 1699, discount: 300, stock: 7 },
            { options: [3, 1], price: 1599, originalPrice: 1899, discount: 300, stock: 4 },
            { options: [3, 2], price: 1799, originalPrice: 2099, discount: 300, stock: 2 }
          ];
          this.product.features = [
          '10.9英寸Liquid Retina显示屏',
          'A14仿生芯片',
          '支持Apple Pencil（第1代）',
          '支持Magic Keyboard Folio',
          '1200万像素后置摄像头',
          'USB-C接口',
          '支持Wi-Fi 6',
          '长达10小时的电池续航'
          ];
        } else {
            throw new Error(response.message || '获取产品详情失败');
        }
        } catch (error) {
        console.error('获取产品详情失败:', error);
        this.error = '获取产品详情失败，请稍后再试';
        // 可以添加更多的错误处理逻辑，比如显示一个错误提示
        }
    },
    computed: {
      currentVariant() {
        return this.product.variants.find(variant => 
          variant.options[0] === this.selectedOptions[0] && 
          variant.options[1] === this.selectedOptions[1]
        ) || this.product.variants[0];
      }
    },
    methods: {
      selectOption(optionIndex, valueIndex) {
        this.selectedOptions[optionIndex] = valueIndex;
      }
    }
  };
  </script>
  
  <style>
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

  
  /* 商品容器 */
  .product-container {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    margin-bottom: 40px;
  }
  
  /* 商品圖片區域 */
  .product-images {
    flex: 1;
    min-width: 300px;
  }
  
  .main-image {
    width: 100%;
    height: 400px;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 10px;
    border: 1px solid #eee;
  }
  
  .main-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
    object-fit: contain;
  }
  
  .main-image img:hover {
    transform: scale(1.03);
  }
  
  .image-thumbnails {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding-bottom: 5px;
    padding-top: 3px;
  }
  
  .thumbnail {
    width: 200%;
    height: 200%;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.2s ease;
  }
  
  .thumbnail:hover {
    transform: translateY(-2px);
  }
  
  .thumbnail.active {
    border-color: #e53e3e;
  }
  
  .thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  /* 商品信息區域 */
  .product-info {
    flex: 1;
    min-width: 300px;
  }
  
  .product-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .product-tag {
    background-color: #e53e3e;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 14px;
  }
  
  .product-rating {
    display: flex;
    align-items: center;
  }
  
  .stars {
    display: flex;
    color: #d1d5db;
  }
  
  .star {
    margin-right: 2px;
  }
  
  .star.filled {
    color: #f59e0b;
  }
  
  .review-count {
    margin-left: 5px;
    font-size: 14px;
    color: #6b7280;
  }
  
  .product-title {
    font-size: 36px;
    font-weight: bold;
    margin: 0 0 5px 0;
  }
  
  .product-model {
    color: #6b7280;
    margin: 0 0 20px 0;
  }
  
  /* 商品規格選擇 */
  .product-options {
    margin-bottom: 20px;
  }
  
  .option-group {
    margin-bottom: 15px;
  }
  
  .option-group h3 {
    font-size: 16px;
    margin-bottom: 10px;
  }
  
  .option-values {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .option-button {
    padding: 8px 16px;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    background: none;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .option-button:hover {
    border-color: #e53e3e;
  }
  
  .option-button.active {
    border-color: #e53e3e;
    background-color: #fef2f2;
  }
  
  /* 價格信息 */
  .price-info {
    display: flex;
    align-items: baseline;
    margin-bottom: 15px;
  }
  
  .current-price {
    font-size: 28px;
    font-weight: bold;
    color: #e53e3e;
    margin-right: 10px;
  }
  
  .original-price {
    font-size: 16px;
    color: #6b7280;
    text-decoration: line-through;
    margin-right: 10px;
  }
  
  .discount-badge {
    color: #e53e3e;
    border: 1px solid #e53e3e;
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 14px;
  }
  
  /* 庫存信息 */
  .stock-info {
    margin-bottom: 20px;
  }
  
  .in-stock {
    color: #10b981;
  }
  
  .low-stock {
    color: #f59e0b;
  }
  
  .out-of-stock {
    color: #ef4444;
  }
  
  /* 分隔線 */
  .divider {
    height: 1px;
    background-color: #e5e7eb;
    margin: 20px 0;
  }
  
  /* 商品特點 */
  .product-features {
    margin-bottom: 20px;
  }
  
  .product-features h3 {
    font-size: 16px;
    margin-bottom: 10px;
  }
  
  .product-features ul {
    padding-left: 20px;
    color: #4b5563;
  }
  
  .product-features li {
    margin-bottom: 5px;
  }
  
  /* 商品詳情標籤頁 */
  .product-details {
    margin-top: 40px;
  }
  
  .tabs {
    display: flex;
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: 20px;
  }
  
  .tab-button {
    padding: 10px 16px;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    font-size: 16px;
    color: #6b7280;
    transition: all 0.2s ease;
  }
  
  .tab-button:hover {
    color: #111827;
  }
  
  .tab-button.active {
    color: #e53e3e;
    border-bottom-color: #e53e3e;
  }
  
  /* 詳細描述 */
  .description {
    line-height: 1.6;
    color: #4b5563;
  }
  
  .description p {
    margin-bottom: 15px;
  }
  
  /* 規格參數 */
  .specifications {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
  
  .spec-card {
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 15px;
  }
  
  .spec-card h3 {
    margin-bottom: 10px;
    font-size: 16px;
  }
  
  .spec-card table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .spec-card tr {
    border-bottom: 1px solid #f3f4f6;
  }
  
  .spec-card tr:last-child {
    border-bottom: none;
  }
  
  .spec-card td {
    padding: 8px 0;
  }
  
  .spec-name {
    color: #6b7280;
    width: 40%;
  }
  
  .spec-value {
    font-weight: 500;
  }
  
  /* 用戶評價 */
  .reviews {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .review-item {
    padding-bottom: 20px;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .review-item:last-child {
    border-bottom: none;
  }
  
  .review-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
  }
  
  .user-info {
    display: flex;
    align-items: center;
  }
  
  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #f3f4f6;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-right: 10px;
  }
  
  .username {
    font-weight: bold;
  }
  
  .review-date {
    font-size: 14px;
    color: #6b7280;
    margin-bottom: 10px;
  }
  
  .review-comment {
    line-height: 1.6;
    color: #4b5563;
  }
  
  /* 響應式調整 */
  @media (max-width: 768px) {
    .product-container {
      flex-direction: column;
    }
    
    .main-image {
      height: 300px;
    }
    
    .specifications {
      grid-template-columns: 1fr;
    }
  }
  </style>