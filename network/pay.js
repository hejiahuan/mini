

/***
 * 支付所必要的参数，用了多点参数
 */
export default function wxPay(pay){
    return new Promise((resolve,reject)=>{
        wx.requestPayment({
            ...pay,
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{
                reject(erro)
            }
        });
    })


}