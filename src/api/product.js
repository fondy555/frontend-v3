import request from '@/utils/request'

// 获取所有商品
export function getAllProducts() {
    return request({
      url: '/v1/products/getAllProducts',
      method: 'get',
    }).then(response => {
      // console.log('API request successful:', response); // 打印API请求成功的响应
      return response; // 返回整个response对象
    }).catch(error => {
      console.error('API request failed:', error); // 打印API请求失败的错误
      throw error;
    });
}

export function getProductById(id) {
  return request({
    url: `/v1/products/getProductById/${id}`, // 替换为你的后端接口路径
    method: 'get',
  }).then(response => {
    // console.log('API request successful:', response); // 打印API请求成功的响应
    return response; // 返回整个response对象
  }).catch(error => {
    console.error('API request failed:', error); // 打印API请求失败的错误
    throw error;
  });
}




// 上传图片
export async function uploadFile(data) {
  return request({
    url: '/v1/fileUpload/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  }).then(response => {
    // console.log('圖片上傳成功:', response); // 打印API请求成功的响应
    return response; // 返回整个response对象
  }).catch(error => {
    console.error('圖片上傳失敗:', error); // 打印API请求失败的错误
    throw error;
  });
}


export async function deleteFile(data) {
  return request({
    url: '/v1/deleteImage',
    method: 'delete',
    data 
  }).then(() => {
    // console.log('刪除圖片成功:', response); // 打印API请求成功的响应
    // return response; // 返回整个response对象 
  }).catch(error => {
    console.error('刪除圖片失敗:', error); // 打印API请求失败的错误
    throw error; 
  })
}

export function saveProduct(data) {
  return request({
    url: '/v1/products/addProduct',
    method: 'post',
    data 
  }).then(() => {
    // console.log('保存商品成功:', response); // 打印API请求成功的响应
    // return response; // 返回整个response对象 
  }).catch(error => {
    console.error('保存商品失敗:', error); // 打印API请求失败的错误
    throw error; 
  })
}

export function deleteProduct(id) {
  return request({
    url: `/v1/products/deleteProduct/${id}`,
    method: 'delete',
  }).then(() => {
    
  }).catch(error => {
    console.error('刪除商品失敗:', error); // 打印API请求失败的错误
    throw error; 
  })
}

// 批量刪除商品
export function deleteProducts(data) {
  return request({
    url: `/v1/products/deleteProducts`,
    method: 'delete',
    data
  }).then(() => {
    
  }).catch(error => {
    console.error('批量刪除商品失敗:', error); // 打印API请求失败的错误
    throw error;
  })
}

// 複製商品
export function copyProduct(id) {
  return request({
    url: `/v1/products/copyProduct/${id}`,
    method: 'post',
  }).then(() => {

  }).catch(error => {
    console.error('複製商品失敗:', error); // 打印API请求失败的错误
    throw error;
  })
}

// 更新商品
export function updateProduct(data) {
  return request({
    url: `/v1/products/updateProduct`,
    method: 'put',
    data 
  }).then(() => {
    
  }).catch(error => {
    console.error('更新商品失敗:', error); // 打印API请求失败的错误
    throw error; 
  })
}