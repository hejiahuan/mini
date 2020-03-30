// pages/cart/index.js
import {showToast} from "../../network/showmodelfixe"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cars: [],
    totalNum: 0,
    totalPrice: 0
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
    const address = wx.getStorageSync("address");
    // 2获取缓存中的购物车数据
    const cars = wx.getStorageSync("cars") || [];
    //过滤后的数组
    const checkedCart=cars.filter(v=>v.checked);

    //总价格和总数量
    let totalPrice = 0;
    let totalNum = 0;
    checkedCart.forEach(v => {
        totalPrice += v.num * v.goods_price
        totalNum += v.num;


    });

    this.setData({
      address, totalPrice, totalNum,
      cars:checkedCart
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
 





  //点击按钮结算
  handelPay() {
   
  }



})