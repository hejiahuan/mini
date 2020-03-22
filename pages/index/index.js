import { getSwiperList,getCatNavList} from "../../network/index"

//Page Object
Page({
  data: {
    swiperList: [],
    categoryNavList:[]
  },
  //options(Object)
  //页面加载的时候
  onLoad: function (options) {
     getSwiperList().then(res=>{
       this.setData({
         swiperList:res.data.message
       })
     })

     getCatNavList().then(res=>{
       this.setData({
        categoryNavList:res.data.message
       })
       
     })

  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});