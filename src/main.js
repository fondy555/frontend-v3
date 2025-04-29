import { createApp} from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'

import '@/styles/index.scss' // global css

// import md5 from 'md5'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';    // 引入element-plus样式

// Vue.config.productionTip = false
// Vue.prototype.$md5 = md5


// import './permission' // permission control

// import piugin from './components/index'  //导入全局组件
// Vue.use(piugin)

// Vue.use(ElementUI);
// new Vue({
//     router,
//     store,
//     render: h => h(App)
// }).$mount('#app')

createApp(App)
    .use(ElementPlus)
    .use(router)
    .mount('#app')
