<template>
  <div class="brand-edit-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-left">
          <div class="header-icon">
            <el-icon size="24"><Shop /></el-icon>
          </div>
          <div class="header-text">
            <h1 class="page-title">{{ isEdit ? '编辑品牌' : '创建品牌' }}</h1>
            <p class="page-subtitle">{{ isEdit ? '修改品牌信息和设置' : '添加新的品牌到系统中' }}</p>
          </div>
        </div>
        <div class="header-actions">
          <el-button @click="handleCancel" class="cancel-btn">
            <el-icon><ArrowLeft /></el-icon>
            返回
          </el-button>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="content-wrapper">
      <el-row :gutter="24">
        <!-- 左侧表单区域 -->
        <el-col :xs="24" :lg="16">
          <div class="form-section">
            <el-card class="form-card" shadow="hover">
              <template #header>
                <div class="card-header">
                  <el-icon class="header-icon"><Edit /></el-icon>
                  <span class="header-title">基本信息</span>
                </div>
              </template>
              
              <el-form
                ref="formRef"
                :model="form"
                :rules="rules"
                label-position="top"
                class="beautiful-form"
              >
                <!-- 品牌名称区域 -->
                <div class="form-group">
                  <div class="group-title">
                    <el-icon><Star /></el-icon>
                    <span>品牌标识</span>
                  </div>
                  <el-row :gutter="16">
                    <el-col :span="12">
                      <el-form-item label="品牌中文名" prop="name" class="form-item">
                        <el-input 
                          v-model="form.name" 
                          placeholder="请输入品牌中文名称"
                          size="large"
                          :prefix-icon="'Edit'"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="品牌英文名" prop="englishName" class="form-item">
                        <el-input 
                          v-model="form.englishName" 
                          placeholder="请输入品牌英文名称"
                          size="large"
                          :prefix-icon="'Edit'"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>

                <!-- 状态设置区域 -->
                <div class="form-group">
                  <div class="group-title">
                    <el-icon><Setting /></el-icon>
                    <span>状态设置</span>
                  </div>
                  <el-form-item label="品牌状态" prop="status" class="form-item">
                    <el-radio-group v-model="form.status" class="status-radio-group">
                      <el-radio :value="1" class="status-radio status-active">
                        <div class="radio-content">
                          <el-icon><Check /></el-icon>
                          <span>启用</span>
                        </div>
                      </el-radio>
                      <el-radio :value="0" class="status-radio status-inactive">
                        <div class="radio-content">
                          <el-icon><Close /></el-icon>
                          <span>禁用</span>
                        </div>
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                </div>

                <!-- Logo上传区域 -->
                <div class="form-group">
                  <div class="group-title">
                    <el-icon><Picture /></el-icon>
                    <span>品牌Logo</span>
                  </div>
                  <el-form-item label="" prop="logo" class="form-item">
                    <div class="logo-upload-container">
                      <el-upload
                        class="logo-uploader"
                        action="#"
                        :show-file-list="false"
                        :auto-upload="false"
                        :on-change="handleLogoChange"
                        accept="image/*"
                      >
                        <div class="upload-area" :class="{ 'has-image': form.logo }">
                          <div v-if="form.logo" class="logo-preview-container">
                            <img :src="form.logo" class="logo-preview" />
                            <div class="logo-overlay">
                              <el-icon class="overlay-icon"><Edit /></el-icon>
                              <span class="overlay-text">点击更换</span>
                            </div>
                          </div>
                          <div v-else class="upload-placeholder">
                            <el-icon class="upload-icon"><Plus /></el-icon>
                            <div class="upload-text">
                              <p class="upload-title">上传品牌Logo</p>
                              <p class="upload-subtitle">点击或拖拽文件到此区域</p>
                            </div>
                          </div>
                        </div>
                      </el-upload>
                      <div class="upload-tips">
                        <div class="tip-item">
                          <el-icon class="tip-icon"><InfoFilled /></el-icon>
                          <span>建议尺寸：200×80px</span>
                        </div>
                        <div class="tip-item">
                          <el-icon class="tip-icon"><InfoFilled /></el-icon>
                          <span>支持格式：JPG、PNG、SVG</span>
                        </div>
                        <div class="tip-item">
                          <el-icon class="tip-icon"><InfoFilled /></el-icon>
                          <span>建议使用透明背景</span>
                        </div>
                      </div>
                    </div>
                  </el-form-item>
                </div>

                <!-- 操作按钮 -->
                <div class="form-actions">
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
                  <el-button 
                    @click="handleCancel"
                    size="large"
                    class="cancel-btn"
                  >
                    <el-icon><Close /></el-icon>
                    取消
                  </el-button>
                  <el-button 
                    v-if="isEdit" 
                    type="danger" 
                    @click="handleDelete"
                    size="large"
                    class="delete-btn"
                  >
                    <el-icon><Delete /></el-icon>
                    删除品牌
                  </el-button>
                </div>
              </el-form>
            </el-card>
          </div>
        </el-col>

        <!-- 右侧预览区域 -->
        <el-col :xs="24" :lg="8">
          <div class="preview-section">
            <el-card class="preview-card" shadow="hover">
              <template #header>
                <div class="card-header">
                  <el-icon class="header-icon"><View /></el-icon>
                  <span class="header-title">预览效果</span>
                </div>
              </template>
              
              <div class="brand-preview">
                <div class="preview-logo">
                  <div class="logo-container" :class="{ 'empty': !form.logo }">
                    <img v-if="form.logo" :src="form.logo" class="preview-logo-img" />
                    <div v-else class="empty-logo">
                      <el-icon class="empty-icon"><Picture /></el-icon>
                      <span class="empty-text">暂无Logo</span>
                    </div>
                  </div>
                </div>
                
                <div class="preview-info">
                  <div class="brand-names">
                    <h3 class="brand-name-cn">{{ form.name || '品牌中文名' }}</h3>
                    <p class="brand-name-en">{{ form.englishName || 'Brand English Name' }}</p>
                  </div>
                  
                  <div class="brand-status">
                    <el-tag 
                      :type="form.status === 1 ? 'success' : 'danger'" 
                      size="large"
                      class="status-tag"
                    >
                      <el-icon>
                        <Check v-if="form.status === 1" />
                        <Close v-else />
                      </el-icon>
                      {{ form.status === 1 ? '启用状态' : '禁用状态' }}
                    </el-tag>
                  </div>
                </div>
              </div>
            </el-card>

            <!-- 操作提示卡片 -->
            <el-card class="tips-card" shadow="hover">
              <template #header>
                <div class="card-header">
                  <el-icon class="header-icon"><QuestionFilled /></el-icon>
                  <span class="header-title">操作提示</span>
                </div>
              </template>
              
              <div class="tips-content">
                <div class="tip-item">
                  <el-icon class="tip-icon success"><SuccessFilled /></el-icon>
                  <span>品牌名称应简洁明了，便于用户记忆</span>
                </div>
                <div class="tip-item">
                  <el-icon class="tip-icon warning"><WarningFilled /></el-icon>
                  <span>Logo应保持清晰，避免过于复杂的设计</span>
                </div>
                <div class="tip-item">
                  <el-icon class="tip-icon info"><InfoFilled /></el-icon>
                  <span>英文名称有助于国际化推广</span>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// import { ref, reactive, computed, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { 
  Plus, Edit, Check, Close, Delete, ArrowLeft, Star, Setting, Picture, 
  View, Shop, InfoFilled, QuestionFilled, SuccessFilled, WarningFilled
} from '@element-plus/icons-vue';
import { ref } from 'vue';
// import { fa } from 'element-plus/es/locale';

export default {
  components: {
    Plus, Edit, Check, Close, Delete, ArrowLeft, Star, Setting, Picture,
    View, Shop, InfoFilled, QuestionFilled, SuccessFilled, WarningFilled
  },
  data() {
    return {

      loading: false,
      form: {
        name: '',
        englishName: '',
        status: 1,
        logo: ''
      },
      formRef: ref(this.form),
      rules: {
        name: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          { min: 2, max: 30, message: '品牌名称长度在 2 到 30 个字符', trigger: 'blur' }
        ]
      },
    } 
  },
  computed: {
      isEdit() {
        return !!this.$route.query.id
      } 
  },
  methods: {
    handleLogoChange(file) {
      const reader = new FileReader()  
      reader.onload = (e) => {
        this.form.logo = e.target.result
     }
     reader.readAsDataURL(file.raw)
    },

    async handleSubmit() {
      try {
        await this.formRef.validate()
        this.loading = true
        await new Promise(resolve => setTimeout(resolve, 1000))
        ElMessage.success(this.isEdit ? '品牌更新成功' : '品牌创建成功')
        this.router.push('/brand-list')
      } catch(error) {
        console.error('表单验证失败:', error)
          
      }finally {
        this.loading = false
      }
    },
    handleCancel() {
      this.router.back() 
    },

    async handleDelete() {
      try {
        await ElMessageBox.confirm('确定要删除该品牌吗?', '删除品牌', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        this.loading = true
        ElMessage.success('品牌删除成功')
        this.router.push('/brand-list'  )
      } catch(error) {
        console.error('删除品牌失败:', error) 
      } finally {
        this.loading = false
      }
    },
    
    onMounted() {
    if (this.isEdit) {
      // 模拟加载编辑数据
        Object.assign(this.form, {
          name: '苹果',
          englishName: 'Apple',
          status: 1,
          logo: '/placeholder.svg?height=80&width=200'
        })
      }
    }
  }
}
</script>

<style scoped>
.brand-edit-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 0;
}

/* 页面头部样式 */
.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 32px 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-icon {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.header-text .page-title {
  margin: 0;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 4px;
}

.header-text .page-subtitle {
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
}

.header-actions .cancel-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  backdrop-filter: blur(10px);
}

.header-actions .cancel-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* 内容区域样式 */
.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px 24px;
}

/* 表单卡片样式 */
.form-card {
  border-radius: 16px;
  border: none;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #333;
}

.header-icon {
  color: #667eea;
}

/* 表单组样式 */
.form-group {
  margin-bottom: 32px;
  padding: 24px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.group-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  font-weight: 600;
  color: #334155;
  font-size: 16px;
}

.group-title .el-icon {
  color: #667eea;
}

/* 表单项样式 */
.form-item {
  margin-bottom: 0;
}

.form-item :deep(.el-form-item__label) {
  font-weight: 500;
  color: #475569;
  margin-bottom: 8px;
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

/* 状态单选框样式 */
.status-radio-group {
  display: flex;
  gap: 16px;
}

.status-radio {
  margin: 0;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px 20px;
  background: white;
  transition: all 0.3s ease;
  cursor: pointer;
  flex: 1;
}

.status-radio:hover {
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
}

.status-radio.is-checked.status-active {
  border-color: #10b981;
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
}

.status-radio.is-checked.status-inactive {
  border-color: #ef4444;
  background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%);
}

.radio-content {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

.status-radio :deep(.el-radio__input) {
  display: none;
}

.status-radio :deep(.el-radio__label) {
  padding: 0;
}

/* Logo上传样式 */
.logo-upload-container {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.logo-uploader {
  flex-shrink: 0;
}

.upload-area {
  width: 160px;
  height: 160px;
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.upload-area:hover {
  border-color: #667eea;
  background: #f8fafc;
}

.upload-area.has-image {
  border-style: solid;
  border-color: #10b981;
}

.logo-preview-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.logo-preview {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: white;
}

.logo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;
}

.upload-area:hover .logo-overlay {
  opacity: 1;
}

.overlay-icon {
  font-size: 24px;
  margin-bottom: 4px;
}

.overlay-text {
  font-size: 12px;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #6b7280;
}

.upload-icon {
  font-size: 32px;
  margin-bottom: 8px;
  color: #9ca3af;
}

.upload-title {
  text-align: center;
  font-weight: 500;
  margin: 0 0 4px 0;
  color: #374151;
}

.upload-subtitle {
  font-size: 12px;
  margin: 0;
  color: #9ca3af;
}

.upload-tips {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tip-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #6b7280;
}

.tip-icon {
  color: #667eea;
  font-size: 14px;
}

/* 操作按钮样式 */
.form-actions {
  display: flex;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid #e2e8f0;
  margin-top: 32px;
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

.cancel-btn, .delete-btn {
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.cancel-btn:hover, .delete-btn:hover {
  transform: translateY(-2px);
}

/* 预览区域样式 */
.preview-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.preview-card, .tips-card {
  border-radius: 16px;
  border: none;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.brand-preview {
  text-align: center;
}

.preview-logo {
  margin-bottom: 24px;
}

.logo-container {
  width: 120px;
  height: 120px;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
  background: #f8fafc;
  border: 2px dashed #d1d5db;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-container:not(.empty) {
  border-style: solid;
  border-color: #10b981;
  background: white;
}

.preview-logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.empty-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: #9ca3af;
}

.empty-icon {
  font-size: 24px;
}

.empty-text {
  font-size: 12px;
}

.brand-names {
  margin-bottom: 16px;
}

.brand-name-cn {
  margin: 0 0 4px 0;
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
}

.brand-name-en {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
  font-style: italic;
}

.status-tag {
  border-radius: 20px;
  padding: 8px 16px;
  font-weight: 500;
}

/* 提示卡片样式 */
.tips-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tips-content .tip-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 14px;
  line-height: 1.5;
}

.tips-content .tip-icon {
  margin-top: 2px;
  flex-shrink: 0;
}

.tips-content .tip-icon.success {
  color: #10b981;
}

.tips-content .tip-icon.warning {
  color: #f59e0b;
}

.tips-content .tip-icon.info {
  color: #3b82f6;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .brand-edit-container {
    padding: 0;
  }
  
  .page-header {
    padding: 24px 16px;
  }
  
  .header-content {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
  
  .content-wrapper {
    padding: 0 16px 24px;
  }
  
  .form-group {
    padding: 16px;
  }
  
  .logo-upload-container {
    flex-direction: column;
    gap: 16px;
  }
  
  .upload-area {
    width: 140px;
    height: 140px;
    max-width: none;
    margin: 0 auto;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .status-radio-group {
    flex-direction: column;
  }
}

/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-card, .preview-card, .tips-card {
  animation: fadeInUp 0.6s ease-out;
}

.form-card {
  animation-delay: 0.1s;
}

.preview-card {
  animation-delay: 0.2s;
}

.tips-card {
  animation-delay: 0.3s;
}
</style>
