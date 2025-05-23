import request from '@/utils/request'


// 获取基础信息数据
export function getFooterData() {
  return request({
    url: '/v1/basicInformation/getAllBasicInformation', // 使用代理路径
    method: 'get',
  }).then(response => {
    // console.log('API request successful:', response); // 打印API请求成功的响应
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