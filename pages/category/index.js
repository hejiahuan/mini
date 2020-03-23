
import { getCategoryList } from "../../network/category"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧的菜单数据
    leftMenuList: [],
    //右侧的商品数据
    rightContent: [],
    //分类的总数据
    categoryList: [],
    //当前页码
    currentIndex: 0,
    //缓存用的
    Cates: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 格式{time:data,data:{}}
    // 1先判断是否本地是否有旧数据
    // 2没有旧数据发送请求
    // 3有旧数据同时没有过期用旧数据
    // 0以前web本地存储和小程序的存储区别
    // web:localStorage.setItem("key","value")

    // 1获取本地存储的数据
    const Cates = wx.getStorageSync("cates");
    if (!Cates) {
      //不存在发送请求获取数据
      getCategoryList().then(res => {
        this.categoryList = res.data.message;
        //构造左侧的大菜单数据这里用了js的map遍历数组
        let leftMenuList = this.categoryList.map(v => v.cat_name);

        //把接口的数据存入到本地存储中
        wx.setStorageSync("cates", { time: Date.now(), data: this.categoryList });


        //构造右侧的商品数据
        let rightContent = this.categoryList[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })

      })
    } else {
      //有旧数据，是否过期定义一个过期时间 测试10s
      // 1000ms
      if (Date.now - Cates.time > 1000 * 10) {
        //重新发送请求
        //不存在发送请求获取数据
        getCategoryList().then(res => {
          this.categoryList = res.data.message;
          //构造左侧的大菜单数据这里用了js的map遍历数组
          let leftMenuList = this.categoryList.map(v => v.cat_name);

          //把接口的数据存入到本地存储中
          wx.setStorageSync("cates", { time: Date.now(), data: this.categoryList });


          //构造右侧的商品数据
          let rightContent = this.categoryList[0].children;
          this.setData({
            leftMenuList,
            rightContent
          })

        })
      } else {
        this.Cates = Cates.data;
           //构造左侧的大菜单数据这里用了js的map遍历数组
           let leftMenuList = this.Cates.map(v => v.cat_name);
           //构造右侧的商品数据
           let rightContent = this.Cates[0].children;
           this.setData({
             leftMenuList,
             rightContent
           })
      }
    }



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

  },
  // 左侧点击事件
  bindClick(e) {
    let currentIndex = e.currentTarget.dataset.index;
    //构造右侧的商品数据
    let rightContent = this.Cates[currentIndex].children;

    this.setData({
      currentIndex,
      rightContent
    })

  },

})