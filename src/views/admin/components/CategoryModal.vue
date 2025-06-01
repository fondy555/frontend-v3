<template>
  <el-dialog
    v-model="visible"
    :title="isEdit ? '编辑分类' : '添加分类'"
    width="600px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    class="category-modal"
    @close="handleClose"
  >
    <div class="modal-content">
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
        class="category-form"
      >
        <!-- 基本信息 -->
        <div class="form-section">
          <div class="section-title">
            <el-icon class="title-icon"><Folder /></el-icon>
            <span>基本信息</span>
          </div>
          
          <el-form-item label="分类名称" prop="name" class="form-item">
            <el-input 
              v-model="form.name" 
              placeholder="请输入分类名称"
              size="large"
              :prefix-icon="'Edit'"
              clearable
              maxlength="30"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="英文分类名称" prop="name_en" class="form-item">
            <el-input 
              v-model="form.name_en" 
              placeholder="请输入英文分类名称"
              size="large"
              :prefix-icon="'Edit'"
              clearable
              maxlength="30"
              show-word-limit
            />
          </el-form-item>
          
          <el-form-item label="分类描述" prop="description" class="form-item">
            <el-input
              v-model="form.description"
              type="textarea"
              :rows="3"
              placeholder="请输入分类描述（可选）"
              maxlength="200"
              show-word-limit
            />
          </el-form-item>
        </div>

        <!-- 设置选项 -->
        <div class="form-section">
          <div class="section-title">
            <el-icon class="title-icon"><Setting /></el-icon>
            <span>显示设置</span>
          </div>
          
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="分类状态" prop="is_enabled" class="form-item">
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
          {{ isEdit ? '更新分类' : '创建分类' }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { ElMessage } from 'element-plus'
import {
  Check, Close, Folder, Setting
} from '@element-plus/icons-vue'
import { updateCategory } from '@/api/categories'


export default {
  name: 'CategoryModal',
  components: {
    Check, Close, Folder, Setting
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    categoryData: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:modelValue', 'success', 'cancel'],
  data() {
    return {
      visible: this.modelValue,
      loading: false,
      formRef: null,
      form: {
        name: '',
        name_en: '',
        description: '',
        is_enabled: 1,
      },
      rules: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 2, max: 30, message: '分类名称长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        description: [
          { max: 200, message: '分类描述不能超过 200 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    isEdit() {
      return this.categoryData && this.categoryData.id
    }
  },
  watch: {
    modelValue(val) {
      this.visible = val
      if (val) {
        this.resetForm()
        this.loadCategoryData()
      }
    },
    visible(val) {
      this.$emit('update:modelValue', val)
    }
  },
  methods: {
    resetForm() {
      this.form = {
        name: '',
        name_en: '',
        description: '',
        is_enabled: 1,
      }
      this.$nextTick(() => {
        if (this.$refs.formRef) {
          this.$refs.formRef.clearValidate()
        }
      })
    },
    loadCategoryData() {
      if (this.isEdit && this.categoryData) {
        Object.assign(this.form, {
          id: this.categoryData.id,
          name: this.categoryData.name || '',
          name_en: this.categoryData.name_en || '',
          description: this.categoryData.description || '',
          is_enabled: this.categoryData.is_enabled ?? 1,
          update_time: this.categoryData.update_time || '',
          create_time: this.categoryData.create_time || ''
        })
      }
    },
    async handleSubmit() {
      try {
        await this.$refs.formRef.validate()
        this.loading = true

        const submitData = {
          id: this.isEdit? this.form.id : 0,
          name: this.form.name.trim(),
          description: this.form.description.trim(),
          is_enabled: this.form.is_enabled,
          update_time: new Date().toISOString(),
          create_time: this.isEdit? this.form.create_time : new Date().toISOString()
        }

        console.log('Submit data:', submitData)
        // await new Promise(resolve => setTimeout(resolve, 1000))

        await updateCategory(submitData).then(() => {
            ElMessage.success(this.isEdit ? '分类更新成功' : '分类创建成功')

            this.$emit('success', {
            action: this.isEdit ? 'update' : 'create',
            data: submitData
            })
            this.visible = false
        //   console.log('Response:', response)
        })
      } catch (error) {
        console.error('Submit error:', error)
        if (error.message) {
          ElMessage.error(error.message)
        }
      } finally {
        this.loading = false
      }
    },
    handleCancel() {
      this.$emit('cancel')
      this.visible = false
    },
    handleClose() {
      this.$emit('cancel')
    }
  }
}
</script>


<style scoped>
.category-modal :deep(.el-dialog) {
  border-radius: 16px;
  overflow: hidden;
}

.category-modal :deep(.el-dialog__header) {
  background: linear-gradient(135deg, #52c41a 0%, #73d13d 100%);
  color: white;
  padding: 20px 24px;
  margin: 0;
}

.category-modal :deep(.el-dialog__title) {
  color: white;
  font-weight: 600;
  font-size: 18px;
}

.category-modal :deep(.el-dialog__headerbtn) {
  top: 20px;
  right: 24px;
}

.category-modal :deep(.el-dialog__close) {
  color: white;
  font-size: 18px;
}

.category-modal :deep(.el-dialog__close:hover) {
  color: rgba(255, 255, 255, 0.8);
}

.category-modal :deep(.el-dialog__body) {
  padding: 24px;
  max-height: 70vh;
  overflow-y: auto;
}

.category-modal :deep(.el-dialog__footer) {
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
  color: #52c41a;
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
  box-shadow: 0 4px 12px rgba(82, 196, 26, 0.3);
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
  box-shadow: 0 4px 12px rgba(82, 196, 26, 0.3);
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
  background: linear-gradient(135deg, #52c41a 0%, #73d13d 100%);
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(82, 196, 26, 0.3);
  transition: all 0.3s ease;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(82, 196, 26, 0.4);
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
  .category-modal :deep(.el-dialog) {
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
