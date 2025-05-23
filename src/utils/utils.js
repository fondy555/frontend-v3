import { baseImageUrl } from '@/config';

export const CategoryMap = {

  1: {
    "id": 1,
    "Name": "平板電腦",
    "NameEn": "Tablet"
  },
  2: {
    "id": 2,
    "Name": "智能手機",
    "NameEn": "Smartphone"
  },
  3: {
    "id": 3,
    "Name": "無線耳機",
    "NameEn": "Headphone"
  },
  4: {
    "id": 4,
    "Name": "筆記本電腦",
    "NameEn": "Laptop"
  },
  5: {
    "id": 5,
    "Name": "無人機",
    "NameEn": "Drone"
  },
  6: {
    "id": 6,
    "Name": "珠寶首飾",
    "NameEn": "Jewelry"
  }
};

export function getCategoryName(categoryId) {
  // 判断categoryId是否在CategoryMap中
  if (Object.prototype.hasOwnProperty.call(CategoryMap, categoryId)) {
    return CategoryMap[categoryId].Name;
  } else {
    return '未知';
  }
}

export function getCategoryNameEn(categoryId) {
  // 判断categoryId是否在CategoryMap中
  if (Object.prototype.hasOwnProperty.call(CategoryMap, categoryId)) {
    return CategoryMap[categoryId].NameEn;
  } else {
    return 'Unknown';
  }
}

// 判斷圖片，獲取對應的鏈接
export function getImageSrc(image) {
  try {
    if (image.startsWith('@/assets')) {
    // 处理本地资源路径
    return require(`${image}`);
    } else if (image.startsWith('http')) {
      // 处理网络资源路径
      return image;
    } else {
      // 处理相对路径
      return `${baseImageUrl}${image}`;
    }
  } catch (error) {
    // console.error('Error processing image path:', image);
    return ''; 
  }

}
