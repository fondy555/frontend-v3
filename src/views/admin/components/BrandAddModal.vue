
<template>
  <el-dialog
    v-model="visible"
    :title="isEdit ? '编辑品牌' : '添加品牌'"
    width="600px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    class="brand-modal"
    @close="handleClose"
  >
    <div class="modal-content">
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
        class="brand-form"
      >
        <!-- 基本信息 -->
        <div class="form-section">
          <div class="section-title">
            <el-icon class="title-icon"><Star /></el-icon>
            <span>基本信息</span>
          </div>
          
          <el-form-item label="品牌中文名" prop="name" class="form-item">
            <el-input 
              v-model="form.name" 
              placeholder="请输入品牌中文名称"
              size="large"
              :prefix-icon="'Edit'"
              clearable
            />
          </el-form-item>
          
          <el-form-item label="品牌英文名" prop="name_en" class="form-item">
            <el-input 
              v-model="form.name_en" 
              placeholder="请输入品牌英文名称（可选）"
              size="large"
              :prefix-icon="'Edit'"
              clearable
            />
          </el-form-item>
        </div>

        <!-- 设置选项 -->
        <div class="form-section">
          <div class="section-title">
            <el-icon class="title-icon"><Setting /></el-icon>
            <span>设置选项</span>
          </div>
          
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="品牌状态" prop="is_enabled" class="form-item">
                <el-select 
                  v-model="form.is_enabled" 
                  placeholder="请选择状态"
                  size="large"
                  style="width: 100%"
                >
                  <el-option 
                    :value="1" 
                    label="启用"
                  >
                    <div class="option-item">
                      <el-icon class="option-icon success"><Check /></el-icon>
                      <span>启用</span>
                    </div>
                  </el-option>
                  <el-option 
                    :value="0" 
                    label="禁用"
                  >
                    <div class="option-item">
                      <el-icon class="option-icon danger"><Close /></el-icon>
                      <span>禁用</span>
                    </div>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 详细信息 -->
        <div class="form-section">
          <div class="section-title">
            <el-icon class="title-icon"><Document /></el-icon>
            <span>详细信息</span>
          </div>
          
          <el-form-item label="品牌官网" prop="website" class="form-item">
            <el-input 
              v-model="form.website" 
              placeholder="请输入品牌官网地址（可选）"
              size="large"
              :prefix-icon="'Link'"
              clearable
            />
          </el-form-item>
          
          <el-form-item label="品牌介绍" prop="description" class="form-item">
            <el-input
              v-model="form.description"
              type="textarea"
              :rows="3"
              placeholder="请输入品牌介绍（可选）"
              maxlength="500"
              show-word-limit
            />
          </el-form-item>
        </div>
      </el-form>
    </div>

    <template #footer>
      <div class="modal-footer">
        <el-button 
          @click="handleCancel"
          size="large"
          class="cancel-btn"
        >
          <el-icon><Close /></el-icon>
          取消
        </el-button>
        <el-button 
          type="primary" 
          @click="handleSubmit" 
          :loading="loading"
          size="large"
          class="submit-btn"
        >
          <el-icon v-if="!loading"><Check /></el-icon>
          {{ isEdit ? '更新品牌' : '创建品牌' }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { ref, reactive, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { 
   Check, Close, Star, Setting, Document
} from '@element-plus/icons-vue'

import { updateBrand } from '@/api/brands'

// 导出组件
export default {
  name: 'BrandModal',
  components: {
    Check, Close, Star, Setting, Document
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    brandData: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:modelValue', 'success', 'cancel'],
  data() {
    return {
      formRef: ref(null),
      loading: ref(false),
      form: reactive({
        name: '',
        name_en: '',
        is_enabled: 1,
        website: '',
        description: ''
      }),
      rules: {
        name: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          { min: 2, max: 30, message: '品牌名称长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        name_en: [
          { min: 2, max: 50, message: '英文名称长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        website: [
          { 
            pattern: /^https?:\/\/.+/, 
            message: '请输入正确的网址格式（以http://或https://开头）', 
            trigger: 'blur' 
          }
        ]
      }
    }
  },
  computed: {
    visible: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    },
    isEdit() {
      return this.brandData && this.brandData.id
    }
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.resetForm()
        this.loadBrandData()
      }
    }
  },
  methods: {
    // 重置表单
    resetForm() {
      Object.assign(this.form, {
        name: '',
        name_en: '',
        is_enabled: 1,
        website: '',
        description: ''
      })
      
      nextTick(() => {
        this.formRef?.clearValidate()
      })
    },

    // 加载品牌数据（编辑模式）
    loadBrandData() {
      if (this.isEdit && this.brandData) {
        Object.assign(this.form, {
          id: this.brandData.id,
          name: this.brandData.name || '',
          name_en: this.brandData.name_en || '',
          is_enabled: this.brandData.is_enabled ?? 1,
          website: this.brandData.website || '',
          description: this.brandData.description || '',
          create_time: this.brandData.create_time || '',
          update_time: this.brandData.update_time || '',
        })
      }
    },

    // 提交表单
    async handleSubmit() {
      try {
        await this.$refs.formRef.validate()
        this.loading = true
        
        // 准备提交的数据
        const submitData = {
          id:  this.isEdit? this.form.id : 0,
          name: this.form.name.trim(),
          name_en: this.form.name_en.trim(),
          is_enabled: this.form.is_enabled,
          website: this.form.website.trim(),
          description: this.form.description.trim(),
          create_time: this.isEdit? this.form.create_time : new Date().toISOString(),
          update_time: new Date().toISOString(),
        }
        
    //    updateBrand(submitData).then(response => {
    //         // this.brands = response.data; // 访问response.data
    //         console.log(response.data)
    //     }).catch(error => {
    //         console.error(' 品牌更新失敗:', error);
    //     })
        
        
        // 这里应该调用实际的API
        // if (!this.isEdit) {
        //   submitData.id = 0
        //   // 创建新品牌时，添加创建时间和更新时间
        //   submitData.create_time = new Date().toISOString()
        //   submitData.update_time = new Date().toISOString()
        // }

        // console.log("submitData: ", submitData)
        await updateBrand(submitData).then(response => {
        // this.brands = response.data; // 访问response.data
            console.log(response.data)
        }).catch(error => {
            console.error(' 品牌更新失敗:', error);
        })
        
        ElMessage.success(this.isEdit ? '品牌更新成功' : '品牌创建成功')
        
        // 触发成功事件
        this.$emit('success', {
          action: this.isEdit ? 'update' : 'create',
          data: submitData
        })
        
        // 关闭弹窗
        this.visible = false
        
      } catch (error) {
        console.error('Submit error:', error)
        if (error.message) {
          ElMessage.error(error.message)
        }
      } finally {
        this.loading = false
      }
    },

    // 取消操作
    handleCancel() {
      this.$emit('cancel')
      this.visible = false
    },

    // 关闭弹窗
    handleClose() {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>
.brand-modal :deep(.el-dialog) {
  border-radius: 16px;
  overflow: hidden;
}

.brand-modal :deep(.el-dialog__header) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px 24px;
  margin: 0;
}

.brand-modal :deep(.el-dialog__title) {
  color: white;
  font-weight: 600;
  font-size: 18px;
}

.brand-modal :deep(.el-dialog__headerbtn) {
  top: 20px;
  right: 24px;
}

.brand-modal :deep(.el-dialog__close) {
  color: white;
  font-size: 18px;
}

.brand-modal :deep(.el-dialog__close:hover) {
  color: rgba(255, 255, 255, 0.8);
}

.brand-modal :deep(.el-dialog__body) {
  padding: 24px;
  max-height: 70vh;
  overflow-y: auto;
}

.brand-modal :deep(.el-dialog__footer) {
  padding: 16px 24px 24px;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
}

/* 表单内容样式 */
.modal-content {
  max-height: 60vh;
  overflow-y: auto;
}

.form-section {
  margin-bottom: 24px;
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.form-section:last-child {
  margin-bottom: 0;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  font-weight: 600;
  color: #334155;
  font-size: 15px;
}

.title-icon {
  color: #667eea;
  font-size: 16px;
}

/* 表单项样式 */
.form-item {
  margin-bottom: 16px;
}

.form-item:last-child {
  margin-bottom: 0;
}

.form-item :deep(.el-form-item__label) {
  font-weight: 500;
  color: #475569;
  margin-bottom: 6px;
}

.form-item :deep(.el-input__wrapper) {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.form-item :deep(.el-input__wrapper:hover) {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.form-item :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.form-item :deep(.el-textarea__inner) {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.form-item :deep(.el-textarea__inner:hover) {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.form-item :deep(.el-textarea__inner:focus) {
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

/* 选择框选项样式 */
.option-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.option-icon {
  font-size: 14px;
}

.option-icon.success {
  color: #10b981;
}

.option-icon.danger {
  color: #ef4444;
}

/* 开关提示文字 */
.switch-tip {
  margin-left: 12px;
  font-size: 12px;
  color: #6b7280;
}

/* 底部按钮样式 */
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.submit-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.cancel-btn {
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  transform: translateY(-2px);
}

/* 滚动条样式 */
.modal-content::-webkit-scrollbar {
  width: 6px;
}

.modal-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .brand-modal :deep(.el-dialog) {
    width: 95% !important;
    margin: 5vh auto;
  }
  
  .form-section {
    padding: 16px;
  }
  
  .modal-footer {
    flex-direction: column;
  }
  
  .submit-btn, .cancel-btn {
    width: 100%;
  }
}
</style>
