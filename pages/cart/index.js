// pages/cart/index.js
import {showToast} from "../../network/showmodelfixe"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cars: [],
    allChecked: false,
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
    //1计算全选 Array.every()表示 必须要确保每个回调函数都返回true
    //缺点空数组调用every返回也是True
    const allChecked = cars.length ? cars.every(v => v.checked) : false

    //总价格和总数量
    let totalPrice = 0;
    let totalNum = 0;
    cars.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price
        totalNum += v.num;

      }

    });

    this.setData({
      address, cars, allChecked, totalPrice, totalNum
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
  //点击收获地址触发事件
  handleChoseAddress() {
    // 1假设用户点击获取收获地址的提框。wx.getSetting确定scope权限值为true
    // 2如果没有点击确定点击的取消，scope权限值为false
    // 3假设用户从来没有调用过 收获地址的api,scope 为undefined

    wx.getSetting({
      success: (result) => {
        //获取scope的状态
        const scopeAddress = result.authSetting["scope.address"]
        if (scopeAddress === true || scopeAddress === undefined) {
          wx.chooseAddress({
            success: (result1) => {
              //把数据存入到缓存中
              wx.setStorageSync("address", result1);
            }
          });
        } else {
          //用户拒绝过授权。诱导用户打开权限
          wx.openSetting({
            success: (result2) => {
              wx.chooseAddress({
                success: (result3) => {
                  wx.setStorageSync("address", result3);
                }
              });
            }
          });
        }
      }
    });
  },

  //选中
  handleItemcheck(e) {
    //1获取被修改的商品id
    const goods_id = e.currentTarget.dataset.id;
    //2获取购物车数组
    const { cars } = this.data;
    //3findIndex找到要修改的对象
    let index = cars.findIndex(v => v.goods_id === goods_id);
    // 4选中状态取反
    cars[index].checked = !cars[index].checked;
    //5,6把购物车数据重新设置回data中和缓存中
    // this.setData({
    //   cars
    // })

    wx.setStorageSync("cars", cars);

    //7重新计算全选总价格和总数量
    //1计算全选 Array.every()表示 必须要确保每个回调函数都返回true
    //缺点空数组调用every返回也是True
    const allChecked = cars.length ? cars.every(v => v.checked) : false

    //总价格和总数量
    let totalPrice = 0;
    let totalNum = 0;
    cars.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price
        totalNum += v.num;

      }

    });

    this.setData({
      cars, allChecked, totalPrice, totalNum
    })
  },

  //商品全选和反选
  handleItemAllChecked() {
    // 1获取商品中的data中的数据
    const allChecked = this.data.allChecked;
    const cars = this.data.cars;
    // //2修改值
    this.data.allChecked = !this.data.allChecked;
    // //3改变数组中的cars和缓存中的cars
    cars.forEach(v => v.checked = this.data.allChecked)
    //总价格和总数量
    let totalPrice = 0;
    let totalNum = 0;
    cars.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price
        totalNum += v.num;

      }

    });
    this.setData({
      cars, totalPrice, totalNum
    })


    wx.setStorageSync("cars", cars);
  },

  //商品num的+和-
  handelItemNumEdit(e) {
    const { id, operate } = e.currentTarget.dataset;
    // 1获取购物车数组
    let { cars } = this.data;
    //2找到需要修改的商品索引
    const index = cars.findIndex(v => v.goods_id === id)
    //这里判断是否执行删除
    if (cars[index].num === 1 && operate === -1) {
      // 弹出提示
      wx.showModal({
        title: '提示',
        content: '您是否要删除?',
        success: res => {
          if (res.confirm) {
            //用array splice来删除

            cars.splice(index, 1)
            //4设置回缓存和data中
            //总价格和总数量
            let totalPrice = 0;
            let totalNum = 0;
            cars.forEach(v => {
              if (v.checked) {
                totalPrice += v.num * v.goods_price
                totalNum += v.num;

              }

            });
            const allChecked = cars.length ? cars.every(v => v.checked) : false
            this.setData({
              cars, totalNum, totalPrice, allChecked
            })

            wx.setStorageSync("cars", cars);
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

    } else {
      //3找到需要修改的商品索引
      cars[index].num += operate;

      //4设置回缓存和data中
      //总价格和总数量
      let totalPrice = 0;
      let totalNum = 0;
      cars.forEach(v => {
        if (v.checked) {
          totalPrice += v.num * v.goods_price
          totalNum += v.num;

        }

      });

      this.setData({
        cars, totalNum, totalPrice
      })

      wx.setStorageSync("cars", cars);
    }




  },
  //点击按钮结算
  handelPay() {
    // 1判断收获地址
    const { address,totalNum} = this.data;
    if (!address.userName) {
      showToast({title:"您还没有选择收获地址"})
      return
    }
    //2判断用户有没有选择商品
    if(totalNum===0){
      showToast({title:"您还没有选择商品"})
      return
    }

    // 3跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/index',
      success: (result)=>{
        
      }
    });
  }



})