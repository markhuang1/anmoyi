const baseURL = 'https://share.100bm.cn/'
export function request(url,method,data = {}){
  url = baseURL + url
  return new Promise((resolve,reject) => {
    wx.request({
      url,
      data,
      method,
      success(response){
        resolve(response.data)
      },
      fail(err){
        reject(err)
      }
    })
  })
}