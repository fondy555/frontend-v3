import request from '@/utils/request'

// 获取所有商品
export function getAllCategories() {
    return request({
      url: '/v1/categories/getAllCategories',
      method: 'get',
    }).then(response => {
      // console.log('API request successful:', response); // 打印API请求成功的响应
      return response; // 返回整个response对象
    }).catch(error => {
      console.error('獲取商品類別失敗:', error); // 打印API请求失败的错误
      throw error;
    });
}

// 根據頁數獲取商品類別
export function getCategoriesByPage(search) {
  return request({
    url: `/v1/categories/getCategoriesByPage`,
    method: 'POST',
    data: search
  })  
}

export function addCategory(category) {
  return request({
    url: '/v1/categories/addCategory',
    method: 'post',
    data: category 
  }).then(response => {
    // console.log('API request successful:', response); // 打印API请求成功的响应
    return response; // 返回整个response对象 
  }).catch(error => {
    // console.error('添加品牌失敗:', error); // 打印API请求失败的错误
    throw error;
  })
}

// 刪除品牌
export function deleteCategory(id) {
  return request({
    url: `/v1/categories/deleteCategory/${id}`,
    method: 'delete', 
  })  
}

// 更新品牌
export function updateCategory(category) {
  return request({
    url: '/v1/categories/updateCategory',
    method: 'put',
    data: category 
  })  
}