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

export function getProductById(id) {
  return request({
    url: `/v1/products/getProductById/${id}`, // 替换为你的后端接口路径
    method: 'get',
  }).then(response => {
    console.log('API request successful:', response); // 打印API请求成功的响应
    return response; // 返回整个response对象
  }).catch(error => {
    console.error('API request failed:', error); // 打印API请求失败的错误
    throw error;
  });
}

// 获取基础信息数据
export function getFooterData() {
  return request({
    url: '/v1/basicInformation/getAllBasicInformation', // 使用代理路径
    method: 'get',
  }).then(response => {
    console.log('API request successful:', response); // 打印API请求成功的响应
    return response; // 返回整个response对象
  }).catch(error => {
    console.error('API request failed:', error); // 打印API请求失败的错误
    throw error;
  });
}

// 更新基础信息数据（更新Footer数据）
export function updateFooterData(data) {
  return request({
    url: '/v1/basicInformation/updateBasicInformation',
    method: 'put',
    data
  }).then(response => {
    console.log('API request successful:', response); // 打印API请求成功的响应
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
    console.log('圖片上傳成功:', response); // 打印API请求成功的响应
    return response; // 返回整个response对象
  }).catch(error => {
    console.error('圖片上傳失敗:', error); // 打印API请求失败的错误
    throw error;
  });
}

// delete('/delete-image', {
//         data: {
//           imageUrl: image.url // 传递图片的 URL 或唯一标识符
//         }
//       })

export async function deleteFile(data) {
  return request({
    url: '/v1/deleteImage',
    method: 'delete',
    data 
  }).then(response => {
    console.log('刪除圖片成功:', response); // 打印API请求成功的响应
    return response; // 返回整个response对象 
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
  }) 
}
  