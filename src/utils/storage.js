/* 
封装本地存储模块
*/

/*  
 获取本地存储
*/

export const getItem = key => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (err) {
    return localStorage.getItem(key)
  }
}

/*  
 设置本地存储
*/

export const setItem = (key, value) => {
  if (typeof value == 'object') value = JSON.stringify(value)
  localStorage.setItem(key, value)
}

/*  
 删除本地存储
*/

export const removeItem = key => {
  localStorage.removeItem(key)
}
