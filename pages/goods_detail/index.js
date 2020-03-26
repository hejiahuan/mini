import { getGoodsDetail } from "../../network/goods_detail"

Page({


  /**
   * 页面的初始数据
   */
  data: {
    goodsDetailObj: [],
    offsetTop: 0,
    isFixed:false,
    goods: ["商品", "价格", "详情"],
    currentIndex: 0,
    // 存储各个联动效果的Y值
    themeY: [0],
    //这里要得到吸顶的高度，然后评价和价格的offsettop-height才是实际要滚动的高度，我们这个高度在onPageScroll中获取
    FixedHeight:"0"


  },

  goodFixedClick(e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    })
    // https://developers.weixin.qq.com/miniprogram/dev/api/ui/scroll/wx.pageScrollTo.html
    wx.pageScrollTo({
      scrollTop: this.data.themeY[this.data.currentIndex],
      duration: 300
    })



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getGoodsDetail(options.goods_id).then(res => {
      this.setData({
        goodsDetailObj: res.data.message
      })
    })

    //得到要Fixed的offsetTop
    const query = wx.createSelectorQuery()
    query.select('.goodsFixed').boundingClientRect()
     //以下得到商品，评价，和价钱的offsetTop
    //这里我们拿到价格和详情的offsetTop
    query.select('.goods_price').boundingClientRect()
    query.select('.goods_info').boundingClientRect()
    query.exec(res => {
      console.log(res)
      this.setData({
        FixedHeight:res[0].height
      })
      this.data.themeY.push(res[1].top-this.data.FixedHeight)
      this.data.themeY.push(res[2].top-this.data.FixedHeight)
      
    })


  },
  onPageScroll: function (res) {
    if (res.scrollTop > this.data.offsetTop) {
      this.setData({
        isFixed:true
      })

    } else {
      this.setData({
        isFixed:false
      })
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

  }
})