<template>
  <div class="admin-panel">
    <div class="admin-header">
      <h1>商品管理後臺</h1>
      <div class="admin-actions">
        <button class="btn btn-secondary" @click="goBack">返回</button>
        <button class="btn btn-primary" @click="saveProduct">保存商品</button>
      </div>
    </div>

    <div class="admin-content">
      <form @submit.prevent="saveProduct" class="product-form">
        <!-- 基本信息 -->
        <div class="form-section">
          <h2 class="section-title">基本信息</h2>
          <div class="form-grid">
            <div class="form-group">
              <label for="productName">商品名稱 <span class="required">*</span></label>
              <input 
                link 
                id="productName" 
                v-model="product.name" 
                required 
                placeholder="請輸入商品名稱"
              />
            </div>
            
            <!-- <div class="form-group">
              <label for="productModel">型號 <span class="required">*</span></label>
              <input 
                link 
                id="productModel" 
                v-model="product.model" 
                required 
                placeholder="請輸入商品型號"
              />
            </div> -->
            
            <!-- <div class="form-group">
              <label for="productTag">標籤</label>
              <input 
                link 
                id="productTag" 
                v-model="product.tag" 
                placeholder="例如：熱銷款、新品、限量版"
              />
            </div> -->
            
            <div class="form-group">
              <label for="productCategory">商品分類 <span class="required">*</span></label>
              <select id="productCategory" v-model="product.categoryId" required>
                <option value=0>請選擇分類</option>
                <option v-for="(Category, key) in CategoryMap" :key="key" :value="Category.id">{{ Category.Name }}</option>
                <!-- <option value="smartphone">智能手機</option>
                <option value="tablet">平板電腦</option>
                <option value="headphone">無線耳機</option>
                <option value="laptop">筆記本電腦</option>
                <option value="drone">無人機</option>
                <option value="jewelry">珠寶首飾</option> -->
              </select>
            </div>
          </div>
        </div>

        <!-- 商品圖片 -->
        <div class="form-section">
          <h2 class="section-title">商品圖片</h2>
          <div class="image-uploader">
            <div class="image-list">
              <div 
                v-for="(image, index) in product.detailImages" 
                :key="index" 
                class="image-item"
              >
                <div class="image-preview">
                  <img :src="getImageSrc(image)" :alt="`商品圖片 ${index + 1}`" />
                  <div class="image-actions">
                    <button type="button" class="btn-icon" @click="removeImage(index)">
                      <i class="icon">🗑️</i>
                    </button>
                    <button type="button" class="btn-icon" @click="setMainImage(index)" :class="{ active: index === 0 }">
                      <i class="icon">{{ index === 0 ? '✓' : '⭐' }}</i>
                    </button>
                  </div>
                </div>
              </div>
              
              <div class="image-upload-placeholder" @click="triggerImageUpload">
                <i class="icon">➕</i>
                <span>添加圖片</span>
                <input 
                  type="file" 
                  ref="imageUpload" 
                  @change="handleImageUpload" 
                  multiple 
                  accept="image/*" 
                  style="display: none"
                />
              </div>
            </div>
            <div class="form-hint">
              建議上傳多張不同角度的商品圖片，第一張圖片將作為主圖顯示。支持 JPG、PNG 格式，建議尺寸 800x800 像素。
            </div>
          </div>
        </div>

        <!-- 商品選項 -->
        <div class="form-section">
          <h2 class="section-title">商品選項</h2>
          <div class="options-container">
            <div 
              v-for="(option, optionIndex) in product.options" 
              :key="optionIndex" 
              class="option-group"
            >
              <div class="option-header">
                <div class="form-group">
                  <label :for="`optionName${optionIndex}`">選項名稱 <span class="required">*</span></label>
                  <input 
                    link 
                    :id="`optionName${optionIndex}`" 
                    v-model="option.name" 
                    required 
                    placeholder="例如：顏色、尺寸、版本"
                  />
                </div>
                <button type="button" class="btn-icon" @click="removeOption(optionIndex)">
                  <i class="icon">🗑️</i>
                </button>
              </div>
              
              <div class="option-values">
                <div 
                  v-for="(value, valueIndex) in option.values" 
                  :key="valueIndex" 
                  class="option-value-item"
                >
                  <input 
                    link 
                    v-model="option.values[valueIndex]" 
                    placeholder="選項值"
                    required
                  />
                  <button type="button" class="btn-icon" @click="removeOptionValue(optionIndex, valueIndex)">
                    <i class="icon">🗑️</i>
                  </button>
                </div>
                
                <button type="button" class="btn btn-sm" @click="addOptionValue(optionIndex)">
                  添加選項值
                </button>
              </div>
            </div>
            
            <button type="button" class="btn" @click="addOption">添加新選項</button>
          </div>
        </div>

        <!-- 價格與庫存 -->
        <div class="form-section">
          <h2 class="section-title">價格與庫存</h2>
          <div class="variants-container">
            <div class="variants-header">
              <p>根據您設置的選項，系統生成了以下商品變體。請為每個變體設置價格和庫存。</p>
            </div>
            
            <div class="variants-table">
              <table>
                <thead>
                  <tr>
                    <th v-for="(option, index) in product.options" :key="index">
                      {{ option.name }}
                    </th>
                    <th style="width: 20%;">價格 <span class="required">*</span></th>
                    <!-- <th>原價</th> -->
                    <th style="width: 20%;">庫存 <span class="required">*</span></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(variant, index) in product.variants" :key="index">
                    <td v-for="(optionIndex, oIndex) in variant.options" :key="oIndex">
                      {{ product.options[oIndex].values[optionIndex] }}
                    </td>
                    <td>
                      <input 
                        type="number" 
                        v-model.number="variant.price" 
                        min="0" 
                        step="0.01" 
                        required 
                        placeholder="售價"
                      />
                    </td>
                    <!-- <td>
                      <input 
                        type="number" 
                        v-model.number="variant.originalPrice" 
                        min="0" 
                        step="0.01" 
                        placeholder="原價"
                      />
                    </td> -->
                    <td>
                      <input 
                        type="number" 
                        v-model.number="variant.stock" 
                        min="0" 
                        step="1" 
                        required 
                        placeholder="庫存"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- 商品特點 -->
        <div class="form-section">
          <h2 class="section-title">商品特點</h2>
          <div class="features-container">
            <div 
              v-for="(feature, index) in product.features" 
              :key="index" 
              class="feature-item"
            >
              <input 
                link 
                v-model="product.features[index]" 
                placeholder="輸入商品特點"
              />
              <button type="button" class="btn-icon" @click="removeFeature(index)">
                <i class="icon">🗑️</i>
              </button>
            </div>
            
            <button type="button" class="btn btn-sm" @click="addFeature">添加特點</button>
          </div>
        </div>

        <!-- 商品描述 -->
        <div class="form-section">
          <h2 class="section-title">商品描述</h2>
          <!-- <div class="form-group">
            <label for="shortDescription">簡短描述 <span class="required">*</span></label>
            <textarea 
              id="shortDescription" 
              v-model="product.description" 
              rows="3" 
              required 
              placeholder="簡短描述商品的主要特點和用途"
            ></textarea>
          </div> -->
          
          <div class="form-group">
            <label for="longDescription">詳細描述</label>
            <textarea 
              id="longDescription" 
              v-model="product.longDescription" 
              rows="6" 
              placeholder="詳細描述商品的功能、特點、使用方法等"
            ></textarea>
          </div>
        </div>

        <!-- 規格參數 -->
        <div class="form-section">
          <h2 class="section-title">規格參數</h2>
          <div class="specifications-container">
            <div 
              v-for="(spec, specIndex) in product.specifications" 
              :key="specIndex" 
              class="spec-group"
            >
              <div class="spec-header">
                <div class="form-group">
                  <label :for="`specCategory${specIndex}`">參數分類 <span class="required">*</span></label>
                  <input 
                    link 
                    :id="`specCategory${specIndex}`" 
                    v-model="spec.category" 
                    required 
                    placeholder="例如：基本規格、技術參數"
                  />
                </div>
                <button type="button" class="btn-icon" @click="removeSpecification(specIndex)">
                  <i class="icon">🗑️</i>
                </button>
              </div>
              
              <div class="spec-items">
                <div 
                  v-for="(item, itemIndex) in spec.items" 
                  :key="itemIndex" 
                  class="spec-item"
                >
                  <div class="spec-item-inputs">
                    <input 
                      link 
                      v-model="item.name" 
                      placeholder="參數名稱"
                      required
                    />
                    <input 
                      link 
                      v-model="item.value" 
                      placeholder="參數值"
                      required
                    />
                  </div>
                  <button type="button" class="btn-icon" @click="removeSpecItem(specIndex, itemIndex)">
                    <i class="icon">🗑️</i>
                  </button>
                </div>
                
                <button type="button" class="btn btn-sm" @click="addSpecItem(specIndex)">
                  添加參數項
                </button>
              </div>
            </div>
            
            <button type="button" class="btn" @click="addSpecification">添加參數分類</button>
          </div>
        </div>

        <!-- 發布設置 -->
        <div class="form-section">
          <h2 class="section-title">發布設置</h2>
          <div class="form-grid">
            <div class="form-group">
              <label for="productStatus">商品狀態</label>
              <select id="productStatus" v-model="product.status">
                <option value=0>草稿</option>
                <option value=1>已發布</option>
                <option value=2>隱藏</option>
              </select>
            </div>
          
          </div>
          
        </div> 

        <!-- 表單底部按鈕 -->
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" @click="goBack">取消</button>
          <button type="submit" @submit.prevent="saveProduct" class="btn btn-primary">保存商品</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { uploadFile, deleteFile, saveProduct, getProductById, updateProduct } from '@/api/product.js';
import { CategoryMap, getImageSrc  } from '@/utils/utils';

export default {
  name: 'ProductEdit',
  data() {
    return {
      product: {
        name: '',
        tag: '',
        categoryId: 0,
        coverImage: '' ,
        stockQuantity: 0,
        detailImages: [],
        options: [
          {
            name: '顏色',
            values: ['黑色', '白色']
          },
          {
            name: '版本',
            values: ['標準版', '豪華版']
          }
        ],
        variants: [],
        features: [''],
        // description: '',
        longDescription: '',
        specifications: [
          {
            category: '基本規格',
            items: [
              { name: '', value: '' }
            ]
          }
        ],
        status: 0,
        sortOrder: 0,
        featured: false,
        newArrival: false
      },
      CategoryMap
    };
  },
  watch: {
    'product.options': {
      handler: 'generateVariants',
      deep: true
    }
  },
  async created() {
    // 从路由参数中获取 productId
    if (this.$route.params.id) {
      // this.productId = this.$route.params.id;
      // console.log("productId:  ", this.$route.params.id)
      const response = await getProductById(this.$route.params.id);
      console.log("response:  ", response)
      this.product = response.data;
      
    }
  },
  mounted() {
    this.generateVariants();
  },
  methods: {
    
    // 圖片處理
    triggerImageUpload() {
      this.$refs.imageUpload.click();
    },
    getImageSrc(image) {
      return getImageSrc(image)
    },
    async handleImageUpload(event) {
      const files = event.target.files;
      if (!files.length) return;

      const formData = new FormData();
      // 这里我们创建一个数组来保存每个文件上传后的返回结果
      const uploadedImages = [];

      // 将每个文件追加到 FormData
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }

      try {
        // 上传文件到服务器
        const response = await uploadFile(formData);
        console.log('文件上传成功:', response);
        alert('文件上传成功');

        // 假设 response.data 是一个包含上传图片 URL 的数组
        
        for (let i = 0; i < response.data.length; i++) {
          uploadedImages.push(response.data[i]);
        }
        // uploadedImages.push({
        //   url: 'http://localhost:8080/api/v1/getImage?fileName=' + response.data,  // 使用服务器返回的图片 URL
        //   alt: '',
        //   file: '' // 保持文件的引用，可能用于后续操作
        // });
        

        // 将上传的图片 URL 添加到 product.images 数组
        this.product.detailImages = [...this.product.detailImages, ...uploadedImages];

      } catch (error) {
        console.error('文件上传失败:', error);
        alert('文件上传失败');
      }
      
      if (this.product.detailImages.length > 0 && ! this.product.coverImage) {
        this.product.coverImage = this.product.detailImages[0];
      }
      

      console.log(this.product.detailImages)
      // 清空 input 以便再次选择相同文件
      event.target.value = '';
    },

    removeImage(index){
      try {
        deleteFile({
          'imageUrl': this.product.detailImages[index]
        });
        console.log('圖片刪除成功');
      } catch (error) {
        console.error('圖片刪除失敗:', error);
      }
      this.product.detailImages.splice(index, 1);

      if (this.product.detailImages.length == 0 && this.product.coverImage) {
        this.product.coverImage = '';
      }
      // console.log(this.product.images);
    },
    
    // 選項處理
    addOption() {
      this.product.options.push({
        name: '',
        values: ['']
      });
    },
    removeOption(index) {
      
      this.product.options.splice(index, 1);
      this.generateVariants();
    },
    addOptionValue(optionIndex) {
      this.product.options[optionIndex].values.push('');
    },
    removeOptionValue(optionIndex, valueIndex) {
      if (this.product.options[optionIndex].values.length > 1) {
        this.product.options[optionIndex].values.splice(valueIndex, 1);
        this.generateVariants();
      }
    },

    // 生成商品變體
    generateVariants() {
      // 保存現有變體的價格和庫存信息
      const existingVariants = {};
      // console.log("this.product.variants： ", this.product.variants)
      if (! this.product.variants) {
        this.product.variants = []; 
      }
      if (! this.product.options) {
        this.product.options = [];
      }

      // console.log("this.product.variants ", this.product.variants)
      try{
        this.product.variants.forEach(variant => {
        // console.log("variant.option: ", variant.options)
        const key = variant.options.join('-');
        existingVariants[key] = {
          price: variant.price,
          // originalPrice: variant.originalPrice,
          stock: variant.stock
        };
        });
      // 生成新的變體列表
      const options = this.product.options;
      if (!options.length || options.some(opt => !opt.name || !opt.values.length)) {
        this.product.variants = [];
        return;
      }
            // 使用遞歸函數生成所有可能的組合
      const generateCombinations = (optionIndex, currentCombination) => {
        if (optionIndex >= options.length) {
          // 基本情況：已經處理完所有選項
          const key = currentCombination.join('-');
          const existingData = existingVariants[key] || {};
          
          this.product.variants.push({
            options: [...currentCombination],
            price: existingData.price || 0,
            // originalPrice: existingData.originalPrice || 0,
            stock: existingData.stock || 0
          });
          
          return;
        }
        
        // 遞歸情況：處理當前選項的每個值
        const currentOption = options[optionIndex];
        for (let i = 0; i < currentOption.values.length; i++) {
          if (currentOption.values[i].trim() === '') continue;
          
          currentCombination[optionIndex] = i;
          generateCombinations(optionIndex + 1, currentCombination);
        }
      };
      
      this.product.variants = [];

      generateCombinations(0, Array(options.length).fill(0));
      } catch (error) {
        console.error('生成商品變體失敗:', error);
        return;
      }
    },
    
    // 特點處理
    addFeature() {
      this.product.features.push('');
    },
    removeFeature(index) {
      this.product.features.splice(index, 1);
    },
    
    // 規格參數處理
    addSpecification() {
      this.product.specifications.push({
        category: '',
        items: [{ name: '', value: '' }]
      });
    },
    removeSpecification(index) {
      this.product.specifications.splice(index, 1);
    },
    addSpecItem(specIndex) {
      this.product.specifications[specIndex].items.push({ name: '', value: '' });
    },
    removeSpecItem(specIndex, itemIndex) {
      if (this.product.specifications[specIndex].items.length > 1) {
        this.product.specifications[specIndex].items.splice(itemIndex, 1);
      }
    },
    
    // 表單提交
    saveProduct() {
      // 驗證表單
      if (!this.validateForm()) {
        return;
      }
      
      // 處理表單數據
      const formData = this.prepareFormData();

      // 計算總庫存
      formData.stockQuantity = this.calculateStock()
      // 獲取最低價格
      formData.salePrice = this.getLowestPrice();
      
      // 這裡可以添加 API 調用來保存商品
      console.log('保存商品數據:', formData);
      
      // 模擬 API 調用成功
      // alert('商品保存成功！');
      if (this.$route.params.id) {
        updateProduct(formData)
        alert('商品更新成功！')
      } else {
        saveProduct(formData)
        alert('商品添加成功！')
      }
      

      
      // 重置表單或跳轉到商品列表頁
      // this.resetForm();
      // this.$router.push('/admin/products');
    },
    validateForm() {
      // 基本驗證
      if (!this.product.name || !this.product.categoryId) {
        alert('請填寫必填的基本信息！');
        return false;
      }
      
      // 圖片驗證
      if (this.product.detailImages.length === 0) {
        alert('請至少上傳一張商品圖片！');
        return false;
      }
      
      // 選項驗證
      for (const option of this.product.options) {
        if (!option.name) {
          alert('請填寫所有選項名稱！');
          return false;
        }
        
        for (const value of option.values) {
          if (!value.trim()) {
            alert(`選項 "${option.name}" 中存在空值，請填寫所有選項值！`);
            return false;
          }
        }
      }
      
      // 變體驗證
      for (const variant of this.product.variants) {
        if (!variant.price || variant.price <= 0) {
          alert('請為所有變體設置有效的價格！');
          return false;
        }
        
        if (variant.stock < 0) {
          alert('庫存不能為負數！');
          return false;
        }
      }
      
      // 描述驗證
      // if (!this.product.description) {
      //   alert('請填寫商品簡短描述！');
      //   return false;
      // }
      
      return true;
    },
    prepareFormData() {
      // 創建一個新對象，避免修改原始數據
      const formData = JSON.parse(JSON.stringify(this.product));
      
      // 處理圖片數據
      formData.detailImages = this.product.detailImages.map(img => {
        if (typeof img === 'string') {
          return img;
        }
        return img || '' ;
      });
      
      // 移除空的特點
      formData.features = formData.features.filter(feature => feature.trim() !== '');
      
      // 處理規格參數
      formData.specifications = formData.specifications.filter(spec => {
        spec.items = spec.items.filter(item => item.name.trim() !== '' && item.value.trim() !== '');
        return spec.category.trim() !== '' && spec.items.length > 0;
      });
      
      return formData;
    },

    resetForm() {
      this.product = {
        name: '',
        tag: '',
        categoryId: 0,
        detailImages: [],
        options: [
          {
            name: '顏色',
            values: ['黑色', '白色']
          }
        ],
        variants: [],
        features: [''],
        description: '',
        longDescription: '',
        specifications: [
          {
            category: '基本規格',
            items: [
              { name: '', value: '' }
            ]
          }
        ],
        status: 0,
        sortOrder: 0,
        featured: false,
        newArrival: false,
      };
      
      this.generateVariants();

    },
    goBack() {
      // 返回上一頁或商品列表頁
      // this.$router.push('/admin/products');
      // alert('操作已取消');
      this.$router.go(-1);
    },
    calculateStock() {
      let totalStock = 0;
      this.product.variants.forEach(variant => {
        totalStock += variant.stock;
      });
      return totalStock;
    },
    getLowestPrice() {
      const prices = this.product.variants.map(variant => variant.price);
      return Math.min(...prices);
    },

  }
};
</script>

<style>
/* 基本樣式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f5f7fa;
}

.admin-panel {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* 頭部樣式 */
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e1e4e8;
}

.admin-header h1 {
  font-size: 24px;
  color: #2c3e50;
}

.admin-actions {
  display: flex;
  gap: 10px;
}

/* 內容區域 */
.admin-content {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

/* 表單樣式 */
.product-form {
  padding: 20px;
}

.form-section {
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #e1e4e8;
}

.section-title {
  font-size: 18px;
  margin-bottom: 20px;
  color: #2c3e50;
  font-weight: 600;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.full-width {
  grid-column: 1 / -1;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #4a5568;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-group textarea {
  resize: vertical;
}

.form-hint {
  font-size: 12px;
  color: #718096;
  margin-top: 5px;
}

.required {
  color: #e53e3e;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox-label input {
  margin-right: 8px;
  width: auto;
}

/* 按鈕樣式 */
.btn {
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 12px;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-secondary {
  background-color: #e2e8f0;
  color: #4a5568;
}

.btn-secondary:hover {
  background-color: #cbd5e0;
}

.btn-icon {
  width: 30px;
  height: 30px;
  border: none;
  background: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-icon:hover {
  background-color: #f1f1f1;
}

.btn-icon.active {
  color: #3498db;
}

/* 圖片上傳樣式 */
.image-uploader {
  margin-bottom: 20px;
}

.image-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 10px;
}

.image-item {
  width: 150px;
}

.image-preview {
  width: 150px;
  height: 150px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  margin-bottom: 5px;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-actions {
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  gap: 5px;
}

.image-actions .btn-icon {
  background-color: rgba(255, 255, 255, 0.8);
}

.image-alt {
  width: 100%;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 12px;
}

.image-upload-placeholder {
  width: 150px;
  height: 150px;
  border: 2px dashed #ddd;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.image-upload-placeholder:hover {
  border-color: #3498db;
  color: #3498db;
}

.image-upload-placeholder .icon {
  font-size: 24px;
  margin-bottom: 5px;
}

/* 選項樣式 */
.option-group {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #e1e4e8;
  border-radius: 4px;
}

.option-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}

.option-header .form-group {
  flex: 1;
  margin-bottom: 0;
}

.option-values {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.option-value-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.option-value-item input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* 變體表格樣式 */
.variants-container {
  margin-top: 20px;
}

.variants-header {
  margin-bottom: 15px;
}

.variants-table {
  overflow-x: auto;
}

.variants-table table {
  width: 100%;
  border-collapse: collapse;
}

.variants-table th,
.variants-table td {
  padding: 10px;
  border: 1px solid #e1e4e8;
  text-align: left;
}

.variants-table th {
  background-color: #f8f9fa;
  font-weight: 500;
}

.variants-table input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* 特點樣式 */
.features-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.feature-item input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* 規格參數樣式 */
.spec-group {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #e1e4e8;
  border-radius: 4px;
}

.spec-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}

.spec-header .form-group {
  flex: 1;
  margin-bottom: 0;
}

.spec-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.spec-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.spec-item-inputs {
  display: flex;
  flex: 1;
  gap: 10px;
}

.spec-item-inputs input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* 表單底部按鈕 */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

/* 響應式調整 */
@media (max-width: 768px) {
  .admin-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .variants-table {
    font-size: 14px;
  }
  
  .variants-table th,
  .variants-table td {
    padding: 8px 5px;
  }
  
  .spec-item-inputs {
    flex-direction: column;
  }
}
</style>