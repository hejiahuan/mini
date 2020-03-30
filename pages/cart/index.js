// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cars:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  //1获取缓存中的收获地址
  const address=wx.getStorageSync("address");
  // 2获取缓存中的购物车数据
  const cars=wx.getStorageSync("cars")
  this.setData({
    address,cars
  })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //点击收获地址触发事件
  handleChoseAddress(){
    // 1假设用户点击获取收获地址的提框。wx.getSetting确定scope权限值为true
    // 2如果没有点击确定点击的取消，scope权限值为false
    // 3假设用户从来没有调用过 收获地址的api,scope 为undefined

    wx.getSetting({
      success: (result)=>{
        //获取scope的状态
       const scopeAddress=result.authSetting["scope.address"] 
       if(scopeAddress===true || scopeAddress===undefined){
          wx.chooseAddress({
            success: (result1)=>{
             //把数据存入到缓存中
             wx.setStorageSync("address", result1);
            }
          });
       }else{
         //用户拒绝过授权。诱导用户打开权限
         wx.openSetting({
           success: (result2)=>{
             wx.chooseAddress({
               success: (result3)=>{
                wx.setStorageSync("address", result3);
               }
             });
           }
         });
       }
      }
    });
  }

  
 
})