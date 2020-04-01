
// es7  async 语法解决回调的最终方案

export default function wxlogin(){
    return new Promise((resolve,reject)=>{
        wx.login({
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{
                reject(err)
            }
        });
    })

}