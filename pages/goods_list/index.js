import {getGoodsList} from "../../network/goods-list"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabControl:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    //定义参数
    QueryParams:{
      query:"",
      cid:"",
      pageNum:1,
      pageSize:10
    },

    goodList:[]


  },

  // tab切换点击
  tabItemChange(e){
    // 1获取被点击的标题索引
    const {index}=e.detail;
    // //2修改数据源组
    const tabs=this.data.tabControl;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
      // tabs.forEach((i,v)=>{
      //   console.log(v)
      // })
   
    // //3
    this.setData({
      tabControl:tabs
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // // 可以得到上个页面的cid
    this.data.QueryParams=options.cid;
    // //获取商品列表数据
    getGoodsList(this.data.QueryParams).then(res=>{
      const goodList=res.data.message.goods;
     this.setData({
      goodList
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