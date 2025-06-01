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

export function getBrandsById(Id) {
  return request({
    url: `/v1/brands/getBrandsById?Id=${Id}`,
    method: 'get', 
  }).then(response => {
    // console.log('API request successful:', response); // 打印API请求成功的响应
    return response; // 返回整个response对象 
  }).catch(error => {
    console.error('獲取品牌失敗:', error); // 打印API请求失败的错误
    throw error; 
  })
}

export function addBrand(brand) {
  return request({
    url: '/v1/brands/addBrand',
    method: 'post',
    data: brand 
  }).then(response => {
    // console.log('API request successful:', response); // 打印API请求成功的响应
    return response; // 返回整个response对象 
  }).catch(error => {
    // console.error('添加品牌失敗:', error); // 打印API请求失败的错误
    throw error;
  })
}

// 刪除品牌
export function deleteBrand(id) {
  return request({
    url: `/v1/brands/deleteBrand/${id}`,
    method: 'delete', 
  })  
}

// 更新品牌
export function updateBrand(brand) {
  return request({
    url: '/v1/brands/updateBrand',
    method: 'put',
    data: brand 
  })  
}


// 根據頁數獲取品牌
export function getBrandsByPage(search) {
  return request({
    url: `/v1/brands/getBrandsByPage`,
    method: 'post',
    data: search
  }) 
}