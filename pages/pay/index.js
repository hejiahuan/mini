// pages/cart/index.js
import { showToast } from "../../network/showmodelfixe"

import request from "../../utils/network"

import regeneratorRuntime from "../../lib/runtime/runtime"

import wxpay from "../../network/pay"

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
    const checkedCart = cars.filter(v => v.checked);

    //总价格和总数量
    let totalPrice = 0;
    let totalNum = 0;
    checkedCart.forEach(v => {
      totalPrice += v.num * v.goods_price
      totalNum += v.num;


    });

    this.setData({
      address, totalPrice, totalNum,
      cars: checkedCart
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
  async handelPay(e) {
    try {

      // 1首先要判断有没有token
      const token = wx.getStorageSync("token")
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/index'
        });
        return;
      }

      //有token开始创建订单，获取订单编号
      // 准备请求头
      const header = { Authorization: token }
      // 准备请求体
      const order_price = this.data.totalPrice;
      const consignee_addr = this.data.address.all;
      let goods = [];
      const cars = this.data.cars;
      cars.forEach(v => goods.push({
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price
      }))
      const orderParas = { order_price, consignee_addr, goods }
      //4转变发送请求，创建订单获取订单编号
      const { order_number } = await request({ url: "/orders/create", methos: "POST", data: orderParas, header })
      //5完成预支付（拿到订单编号）
      const { pay } = await request({ url: "/orders/req_unifiedorder", data: order_number, header });
      //6完成微信小程序支付wx.requestPayment(Object object) 刚好需要这个pay里面的参数
      // timeStamp: '',刚好是pay的参数
      // nonceStr: '',
      // package: '',
      // signType: '',
      // paySign: '', wxpay是自己封装的
      await wxpay(pay);
      //查询diy后台是否成功支付
      const res = await request({ url: "/orders/chkOrder", data: order_number, header });
      //如果diy后台成功那么成功
      await showToast({ title: "支付成功" })
      
      //支付成后，要把缓存中选中的的数据全部删除
      const car=wx.getStorageSync("cars");
      //选中的是我们已经付款的，那么我们直接过滤未选中的不就完了
      car.filter(v=>!v.checked)
      wx.setStorageSync("cart",car);

      //跳转到订单页面
      wx.navigateTo({
        url: '/pages/order/index'
      });
    } catch (error) {
      await showToast({ title: "支付失败" })
    }



  }



})