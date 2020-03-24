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
      pagenum:1,
      pagesize:20,
    },

    goodList:[],
    //总页数
    totalPage:1


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
    this.data.QueryParams.cid=options.cid;
    // //获取商品列表数据
    getGoodsList(this.data.QueryParams).then(res=>{
      const total=res.data.message.total;
      this.data.totalPage=Math.ceil(total/this.data.QueryParams.pagesize);
      const goodList=res.data.message.goods;
     this.setData({
       //这么写是为了做数组拼接，上拉加载！！！
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
  onReachBottom: function (item) {
    const pageNum=this.data.QueryParams.pagenum;
    const totalPage=this.data.QueryParams.totalPage;
  //  1判断有没有下一页
    if(pageNum>=totalPage){
        console.log("没有下一页数据");
    }else{
      this.data.QueryParams.pagenum++;
      getGoodsList(this.data.QueryParams).then(res=>{
        const total=res.data.message.total;
        this.data.totalPage=Math.ceil(total/this.data.QueryParams.pagesize);
        const resgoodList=res.data.message.goods;
       
       this.setData({
        goodList:[...this.data.goodList,...resgoodList]
        
       })
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})