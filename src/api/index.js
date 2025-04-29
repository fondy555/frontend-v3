import request from '@/utils/request'

// 获取所有商品
export function getAllProducts() {
    return request({
      url: '/v1/products/getAllProducts',
      method: 'get',
    }).then(response => {
      console.log('API request successful:', response); // 打印API请求成功的响应
      return response; // 返回整个response对象
    }).catch(error => {
      console.error('API request failed:', error); // 打印API请求失败的错误
      throw error;
    });
  }