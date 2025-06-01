// FILEPATH: h:/work/frontend-v3/src/components/ContactSection.vue
<template>
  <section class="contact-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">聯繫我們</h2>
        <p class="section-subtitle">期待與您的合作</p>
      </div>
      
      <div class="contact-content">
        <div class="contact-info">
          <div class="contact-item">
            <div class="contact-icon">
              <i class="el-icon-location-outline"></i>
            </div>
            <div class="contact-details">
              <h4>公司地址</h4>
              <p>{{ contactForm.address }}</p>
            </div>
          </div>
          
          <div class="contact-item">
            <div class="contact-icon">
              <i class="el-icon-phone-outline"></i>
            </div>
            <div class="contact-details">
              <h4>聯繫電話</h4>
              <p>{{ contactForm.phone }}</p>
            </div>
          </div>
          
          <div class="contact-item">
            <div class="contact-icon">
              <i class="el-icon-message"></i>
            </div>
            <div class="contact-details">
              <h4>電子郵箱</h4>
              <p>{{ contactForm.email }}</p>
            </div>
          </div>
          
          <div class="contact-item">
            <div class="contact-icon">
              <i class="el-icon-chat-dot-round"></i>
            </div>
            <div class="contact-details">
              <h4>即時通訊</h4>
              <p>WhatsApp: {{ contactForm.whatsApp }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getFooterData } from '@/api/index'

export default {
  name: 'NewFooter',
  data() {
    return {
      contactForm: {
        address: '',
        phone: '',
        email: '',
        whatsApp: ''
      }
    };
  },
  mounted() {
    this.getBaseInfo();
  },
  methods: {
    async getBaseInfo() {
        try {
            // 获取Footer数据
            const response = await getFooterData();
            // 如果请求成功，且数据不为空，则更新数据
            if (response.code === 0 && response.data.length > 0) {
                this.contactForm = response.data[0];
                // 将数据缓存到localStorage
                // localStorage.setItem('footerData', JSON.stringify(this.footerData));
            } else {
                console.error('Failed to fetch footer data:', response.message);
            }
        } catch (error) {
            console.error('Failed to fetch footer data:', error);
        }
    },
  }
};
</script>

<style scoped>
/* 聯繫我們 */
.contact-content {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 50px;
}

.contact-info {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  width: calc(50% - 10px); /* 每行两个，间隔20px */
}

.contact-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  margin-right: 20px;
  flex-shrink: 0;
}

.contact-details h4 {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 8px;
  color: #2c3e50;
}

.contact-details p {
  color: #7f8c8d;
  line-height: 1.6;
}

.contact-form {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 40px;
}

.form-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 25px;
  color: #2c3e50;
  text-align: center;
}
</style>