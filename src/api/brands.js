import request from '@/utils/request'

// 获取所有商品
export function getAllBrands() {
    return request({
      url: '/v1/brands/getAllBrands',
      method: 'get',
    }).then(response => {
      // console.log('API request successful:', response); // 打印API请求成功的响应
      return response; // 返回整个response对象
    }).catch(error => {
      console.error('獲取商品類別失敗:', error); // 打印API请求失败的错误
      throw error;
    });
}