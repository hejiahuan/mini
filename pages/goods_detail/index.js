import { getGoodsDetail } from "../../network/goods_detail"

Page({


  /**
   * 页面的初始数据
   */
  data: {
    goodsDetailObj: [],
    offsetTop: 0,
    isFixed: false,
    goods: ["商品", "价格", "详情"],
    currentIndex: 0,
    // 存储各个联动效果的Y值
    themeY: [],
    //这里要得到吸顶的高度，然后评价和价格的offsettop-height才是实际要滚动的高度，我们这个高度在onPageScroll中获取
    FixedHeight: "0",
    FixedcurrentIndex: 0,


  },
  bindscroll() {
    console.log("我是你大爷")
  },
  goodFixedClick(e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    })

    const index = this.data.currentIndex
    // // https://developers.weixin.qq.com/miniprogram/dev/api/ui/scroll/wx.pageScrollTo.html
    wx.pageScrollTo({
      scrollTop: this.data.themeY[index],
      duration: 300
    })



  },

  //点击轮播图放大预览
  handelPrevewImage(e) {
    const goodsPics = this.data.goodsDetailObj.pics.map(v => v.pics_mid)
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: goodsPics // 需要预览的图片http链接列表
    })
  },

  // 点击加入购物车
  bindCarAdd() {
    //||[]把字符串变成数组
    let cars = wx.getStorageSync("cars") || [];
    //这个用到了es6 array.findIndex
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
    let index = cars.findIndex(v => v.goods_id === this.data.goodsDetailObj.goods_id);
    console.log(index)
    if(index===-1){
      // 不存在,第一次添加
      this.data.goodsDetailObj.num=1;
      cars.push(this.data.goodsDetailObj);

    }else{
      // 存在
      cars[index].num++;
    }
    // //5把购物车重新添加到缓存中
    wx.setStorageSync("cars", cars);

    //6弹出提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      //mask是防止用户疯狂点击
      mask: true
    });
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
      this.setData({
        FixedHeight: res[0].height
      })
      this.data.themeY.push(0)
      this.data.themeY.push(res[1].top - this.data.FixedHeight)
      this.data.themeY.push(res[2].top - this.data.FixedHeight)
      //这里再push一个Number.Max_Value,为了做滚动显示对应标题
      this.data.themeY.push(Number.MAX_VALUE)

    })


  },
  onPageScroll: function (res) {
    if (res.scrollTop > this.data.offsetTop) {
      this.setData({
        isFixed: true
      })

    } else {
      this.setData({
        isFixed: false
      })
    }
    // 滚动内容显示对应标题
    for (let index = 0; index < this.data.themeY.length - 1; index++) {
      if (this.data.FixedcurrentIndex !== index && (res.scrollTop >= this.data.themeY[index] && res.scrollTop < this.data.themeY[index + 1])) {
        this.data.FixedcurrentIndex = index;
        this.setData({
          currentIndex: this.data.FixedcurrentIndex
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

  }
})