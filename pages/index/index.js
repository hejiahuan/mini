 
 //导入封装的request类
 import request from "../../utils/network"

//Page Object
Page({
  data: {
    swiperList:[]
  },
  //options(Object)
  //页面加载的时候
  onLoad: function(options){
    request({
      url:"https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"
    }).then(res=>{
      this.setData({
        swiperList:res.data.message
      })
    })
  },
  onReady: function(){
    
  },
  onShow: function(){
    
  },
  onHide: function(){

  },
  onUnload: function(){

  },
  onPullDownRefresh: function(){

  },
  onReachBottom: function(){

  },
  onShareAppMessage: function(){

  },
  onPageScroll: function(){

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item){

  }
});