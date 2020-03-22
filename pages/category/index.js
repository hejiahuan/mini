
import {getCategoryList } from "../../network/category"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧的菜单数据
    leftMenuList:[],
    //右侧的商品数据
    rightContent:[],
    //分类的总数据
    categoryList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getCategoryList().then(res=>{
     this.categoryList=res.data.message;
     //构造左侧的大菜单数据这里用了js的map遍历数组
     let leftMenuList=this.categoryList.map(v=>v.cat_name);
     //构造右侧的商品数据
     let rightContent=this.categoryList[0].children;
     this.setData({
      leftMenuList,
      rightContent
     })

    })
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

  }
})