
const API_BASE_URL = 'https://api-hmugo-web.itheima.net/api/public/v1'

export default function request(options){
  const _url=API_BASE_URL+options.url;
  return new Promise((resolve,reject)=>{
    wx.request({
      url:_url,
      method:options.method||"get",
      data:options.data||{},
      success:function(res){
        //这个resolve成功的时候把res成功的东西回调给要调用的对象
        resolve(res)
      },
      fail:function(err){
         //这个reject失败的时候把reject失败的东西回调给要调用的对象
        reject(err)
      }
    })
  })
}

// // 再一个简洁版本
// export default function request(options){
//   return new Promise((resolve,reject)=>{
//     wx.request({
//       url: options.url,
//       method:options.method||"get",
//       data:options.data||{},
//       success:resolve,
//       fail:reject
//     })
//   })
// }