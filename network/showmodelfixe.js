export const showToast=({title})=>{
    return new Promise((resolve,reject)=>{
        wx.showToast({
            title: title,
            icon: 'none',
            image: '',
            duration: 1500,
            mask: false,
            success: resolve,
            fail: reject,
            complete: ()=>{}
        });
    })

}