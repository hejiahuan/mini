####1重置了全局的样式

/* 微信小程序不支持通配符 */
page,view,text,swiper,swiper-item,image,navigator{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}


/* 主体颜色，通过变量来实现的 */
page{
    /* 定义主题颜色 */
    --themColor:#eb4450;
    font-size: 28rpx;
    /* 定义统一的字体大小  大小是375px
    1px=2rpx
    14px=28rpx */

    
}
####2配置了tabbar和顶端样式
tabbar基本上靠配置，在app.json中

###3注意这里定义自定义组件的时候，引用的时候不能用wx-xxx来命名
可能是保留字把
####3如果自定义组件中要有多插槽必须
options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  }
  https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html

####做了顶部搜索界面
我们界面跳转有2种方式
1navigator
2wx.navigateTo(代码的方式)

###轮播图
引入了network.js自己封装的
一定不要忘了this.setData({
    xxx:xxxx
    不是xxx=xxxx
})

image 的mode属性
<image mode="widthFix" src="{{item.image_src}}"/>
  <!-- https://developers.weixin.qq.com/miniprogram/dev/component/image.html -->

  ####做了分类导航
  1主要做了分类导航的css 布局
  这里我们要主要的是我们布局一定要写成rpx
  比如图片100px 那就写成100rpx

  width的100%是继承他包裹的元素！！！

  ###做分类导航真正的分类导航（scroll-view）
  1拿到了分类导航的左侧菜单数据和右侧的数据
  这里用了map来遍历数组，真的很好用
  xxx.map(x=>x.xx)
2做手机端，基本上图片都是集成包裹块的，图片是默认
width:100%
3做完了分类（未加缓存）

####给分类数据做缓存
思路：在打开分类的时候，判断本地有没有旧的数据，发送请求获取新数据。
如果旧数据没有过期就用旧的

   格式{time:data,data:{}}
      1先判断是否本地是否有旧数据
      2没有旧数据发送请求
      3有旧数据同时没有过期用旧数据

加了缓存主要是靠wx.setStorageSync主要业务在index.js


####在给分类点击的时候默认是置顶的
scroll-view scroll-top
必须 要给scroll-top搞一个变量，单单写0是不对的
 <scroll-view scroll-y class="right-content" scroll-top="{{scrollTop}}" >

 ####点击分类进入tabControl
 1思路他是给TabControll中加入一个slot来做切换
 就是点击tab上的栏目，slot切换到固定位置

 ####做了goodList没有做下拉加载(都在goodList中)
 这里加了没有图片的话，加载默认图片！！！
 文字溢出，4个缺一不可
 .goods_name{
    display: -webkit-box;    
    -webkit-box-orient: vertical; 
    /* -webkit-line-clamp表示几行1就是1行，2就是2行    */
    -webkit-line-clamp: 2;    
    overflow: hidden;
}

改变flex 默认X轴对齐--->Y
.goods_info{
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

###上拉加载（在Page中）
https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html
onReachBottom

1找到滚动条触底事件
2判断还有没有下一页数据
   获取总页数
   当前页
3没有下一页弹出提示
4有下一页，加载
这里对数组的拼接没有用push,直接用这个很神奇（数组的拼接）
goodList:[...this.data.goodList,...goodList]
跟Array的可变参数很像
let totalNums=[]

const nums1=[1,2,3,4]
const nums2=[33,44,666]

一种方法是遍历，然后添加到totalNums中
for(let n of nums1){
  totalNums.push(n)
}


第二种最可用的方法
有个...语法！！！！！
totalNums.push(...nums1)
语义...nums把nums的依次解析出来，然后再加入totalNums中


Arrays.push(...items: T[])可变参数
所以他可以放多个参数进去！！！！，然后,分隔！
totalName.push(1,2,3,4)

###做了向上加载过渡动画
1自己封装组件（底部加载动画）wx-loading
2用
wx.showLoading({
      title: '加载中',
    })


####当goods_list向上移的时候我们给tabControl吸顶
1得到要吸顶的导航区域到的顶部的距离offsetTop(但是微信小程序已经给你吧offsetTop算出来了，他们这里命名为top)
2得到页面滚动的距离scrollTop
3当页面滚动的距离scrollTop大于offsetTop的距离，那么就应该吸顶
4吸顶就是给样式，绑定样式就可以了
(这里我们还用到了父组件给子组件传样式)
 externalClasses: ['isfixedtopclass']

 主要代码在goods_detail和wx-tabcontroll中
 ####吸顶效果的优化（防止setDatas大量频繁的赋值）
 我们不频繁的给scrollTop赋值，设置一个isFixed的属性默认是false,
 然后做判断如果滚动距离大于offsetTop那么就为true,否则为false

  onPageScroll: function(e){
     if(e.scrollTop>this.data.offSetTop){
        this.setData({
          isFixed:true
        })
     }else{
      this.setData({
        isFixed:false
      })
     }

isFixed做三目运算符 
<my-tabcontrol tabcontrol="{{tabControl}}" bind:tabItemChange="tabItemChange" class="tabControl" isfixedtopclass="{{isFixed ? 'isfixedtopclass':''}}">

####商品的详情页
这里我们我们的图文详情这个栏目中我们传过来的是(div)
像这种直接放进去肯定不行，我们得加入富文本，让富文本来渲染
https://developers.weixin.qq.com/miniprogram/dev/component/rich-text.html
<div class=\"lazyimg\"><div moduleid=\"R0503002_2\" modulename=\"关联推荐\"><p><a href=\"https://shop.suning.com/30000011/index.html\" target=\"_blank\"><img data-src=\"https://image.suning.cn/uimg/sop/commodity/152418403963754690151350_x.jpg?from=mobile&amp;format=80q.webp\" alt=\"\" src=\"https://image.suning.cn/uimg/sop/commodity/152418403963754690151350_x.jpg?from=mobile&format=80q.webp\" width=\"100%\" height=\"auto\"></a></p>\n<table style=\"width: 100%; height: auto;\">\n<tbody>\n<tr>\n<td><a href=\"https://product.suning.com/0000000000/721034170.html\" target=\"_blank\"><img data-src=\"https://image.suning.cn/uimg/sop/commodity/674265889569958711135500_x.jpg?from=mobile&amp;format=80q.webp\" alt=\"\" src=\"https://image.suning.cn/uimg/sop/commodity/674265889569958711135500_x.jpg?from=mobile&format=80q.webp\" width=\"100%\" height=\"auto\"></a></td>\n<td><a href=\"https://product.suning.com/0030000011/659973806.html\" target=\"_blank\"><img data-src=\"https://image.suning.cn/uimg/sop/commodity/580804888269630832171600_x.jpg?from=mobile&amp;format=80q.webp\" alt=\"\" src=\"https://image.suning.cn/uimg/sop/commodity/580804888269630832171600_x.jpg?from=mobile&format=80q.webp\" width=\"100%\" height=\"auto\"></a></td>\n<td><a href=\"https://product.suning.com/0000000000/646332415.html\" target=\"_blank\"><img data-src=\"https://image.suning.cn/uimg/sop/commodity/164947314370596747459900_x.jpg?from=mobile&amp;format=80q.webp\" alt=\"\" src=\"https://image.suning.cn/uimg/sop/commodity/164947314370596747459900_x.jpg?from=mobile&format=80q.webp\" width=\"100%\" height=\"auto\"></a></td>\n</tr>\n<tr>\n<td><a href=\"https://product.suning.com/0030000011/719579209.html\" target=\"_blank\"><img data-src=\"https://image.suning.cn/uimg/sop/commodity/109859084335308009815860_x.jpg?from=mobile&amp;format=80q.webp\" alt=\"\" src=\"https://image.suning.cn/uimg/sop/commodity/109859084335308009815860_x.jpg?from=mobile&format=80q.webp\" width=\"100%\" height=\"auto\"></a></td>\n<td><a href=\"https://product.suning.com/0000000000/154158097.html\" target=\"_blank\"><img data-src=\"https://image.suning.cn/uimg/sop/commodity/139086270826280834777770_x.jpg?from=mobile&amp;format=80q.webp\" alt=\"\" src=\"https://image.suning.cn/uimg/sop/commodity/139086270826280834777770_x.jpg?from=mobile&format=80q.webp\" width=\"100%\" height=\"auto\"></a></td>\n<td><a href=\"https://product.suning.com/0000000000/683246685.html\" target=\"_blank\"><img data-src=\"https://image.suning.cn/uimg/sop/commodity/212695348731710262086520_x.jpg?from=mobile&amp;format=80q.webp\" alt=\"\" src=\"https://image.suning.cn/uimg/sop/commodity/212695348731710262086520_x.jpg?from=mobile&format=80q.webp\" width=\"100%\" height=\"auto\"></a></td>\n</tr>\n</tbody>\n</table></div><div moduleid=\"R0503002_3\" modulename=\"商品详情\"><p><img data-src=\"//image.suning.cn/uimg/sop/commodity/323128866134590684049660_x.jpg?from=mobile&amp;format=80q.webp\" alt=\"\" src=\"//image.suning.cn/uimg/sop/commodity/323128866134590684049660_x.jpg?from=mobile&format=80q.webp\" width=\"100%\" height=\"auto\"></p></div><div moduleid=\"R0503002_6\" modulename=\"安装说明\"><table style=\"width: 100%; height: auto;\">\n<tbody>\n<tr>\n<td><a href=\"https://sale.suning.com/shfw/cdaz/index.html#suning\" target=\"_blank\"><img data-src=\"https://sale.suning.com/shfw/cdazpic/images/all.jpg?from=mobile&amp;format=80q.webp\" alt=\"\" src=\"https://sale.suning.com/shfw/cdazpic/images/all.jpg?from=mobile&format=80q.webp\" width=\"100%\" height=\"auto\"></a></td>\n</tr>\n</tbody>\n</table></div></div>

####在商品详情页对应效果联动（这个没有用框架写，原生的）
1点击标题滚动到指定位置(关键是得到offsetTop 在图片加载完后得到)
得到每个栏目的Y值，然后存储起来，然后当点击的时候，跳到Y值就可以了
https://developers.weixin.qq.com/miniprogram/dev/api/ui/scroll/wx.pageScrollTo.html
//这里我们拿到价格和详情的offsetTop
2滚动内容显示对应标题（问题，再点击标题的时候，滚动到其他位置，但是有个问题就是CurrentIndex-1这个是不对的）
思路！
我们在1中采集了他们的Y轴 themeY并且存入
[0,xx,xxx]
我们做判断，如果y轴到0-xxx我们给那个设置active

我建议用Scroll-view来做！！！！！（上面的是有问题的）当时用vue 这种方法是没有问题的
https://developers.weixin.qq.com/miniprogram/dev/component/scroll-view.html


####点击图片全屏预览
https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.previewImage.html
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


  ###底部做完分享，客服，加入购物车，购物车
  1navigator 默认不能跳到tabBar中的页面。如果想跳到tabBar页面，必须加open-type="switchTab" 表明这个url是tabbar
  https://developers.weixin.qq.com/miniprogram/dev/component/navigator.html
  2分享和客服都是button 中不同的opentype
  https://developers.weixin.qq.com/miniprogram/dev/component/button.html
  这里有个小技巧当我们用的布局是View但是我们在客服和分享中都加了button一旦加了button那么他的布局
  又会打乱，如和不打乱再完成任务呢
  1button透明值为0，而且width:100%,height:100%, 
  .car_item button,.share{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0

 }
####加入购物车
1绑定事件
2获取缓存中的购物车数据 、数组或者对象格式
3先判断是否存在商品
4如果存在，修改商品数据++，重新把数据填充到缓存中
5如果不存在，添加新元素，带上购买数量属性，重新填充购物车
6弹出提示

####加入购物车后，点击购物车
1调用小程序内置的api,获取用户的收获地址wx.choseAddress
  1假设用户点击获取收获地址的提框。wx.getSetting确定scope权限值为true
  2如果没有点击确定点击的取消，scope权限值为false
  3假设用户从来没有调用过 收获地址的api,scope 为undefined

  // wx.chooseAddress({
    //   success: (result)=>{
    //     console.log(result);    
    //   },
    //   fail: ()=>{},
    //   complete: ()=>{}
    // });

    wx.getSetting({
      success: (result)=>{
        console.log(result);    
      },
      fail: ()=>{},
      complete: ()=>{}
    });
    

####购物车遍历数据
1获取缓存中的收获信息
2获取缓存中的cart数据
###点击全选
1onshow获取到缓存中的购物车数组
2根据购物车中的商品数据进行计算
当购物车的所有商品都被选中 checked=true 全选都被选中
 //1计算全选 Array.every()表示 必须要确保每个回调函数都返回true
 //缺点空数组调用every返回也是True
  const allChecked=cars.every(v=>v.checked)

####计算总价格和总重量
1必须全部选中
2总价格+=单价*商品数量
3总数量+=商品数量

###商品选中和不选
1绑定change事件
2获取修改的商品对象
3选中状态取反
4改变了重新填充回Data和缓存中
5重新计算数量和价格

得到方法的新写法
page{
  data:{
    cars
  }
}
这样写。直接得到cars对象
const {cars}=this.data;

###点击全选和反选
1全选复选框绑定事件
2获取data中的全选allchecke状态
3直接取反allChecked
4遍历购物车数组，让里面的商品选中状态跟随allchecke的改变而改变
5把购物车数组和选中状态重新设置回Data和缓存中

####点击按钮增加数量
1“+”，“-”按钮 绑定同一个点击事件 区分关键， 自定义属性
2传递被点击的商品id goods_id
3获取data中的购物车数组，根据goods_id需要被修改的商品对象
4直接修改商品的num
5重新设置回缓存和data中

####商品删除
1当数量为1，同时用户点击的减号按钮
2弹出提示(wx.showModel)
https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showModal.html
  1确定 删除
  2取消 什么都不做

####点击button 立即购买
1判断一下有没有收获地址信息
2判断用户有没有选购商品
3经过以上验证，跳转到支付页面

####跳转到支付页面
1页面加载的时候
  1从缓存中获取购物车的数据，渲染到页面
    这些数据 checked=true

####微信支付的分析
1哪些账号可以实现微信支付
  1企业账号 
  2企业账号的小程序后台中，必须 给开发者添加上白名单
    1一个appid 可以同时绑定多个开发者
    2这些开发者就可以共用这个appid和他的开发权限
  3支付按钮
    1先判断缓存中有没有token
    2没有跳转授权，页面获取token
    3有token

自己的理解
1微信小程序要调用前端api wx.login得到code-----coder传给----->后端API(后端需要coder来换取 OpenID 和 会话密钥 session_key。) (后台自己组建token 并且回传给前台)
2创建订单(必须要有token)
  1准备请求头参数 
    Authorization	是	string	用户登录成功获取的token值
    const header={Authorization:token}
  2准备请求体参数
    order_price	是	string	订单总价格
    consignee_addr	是	string	收货地址
    goods	是	Array	订单数组

    goods字段说明
    参数名	必选	类型	说明
    goods_id	是	number	商品id
    goods_number	是	number	购买的数量
    goods_price	是	number	单价

    const order_price=this.data.totalPrice;

  返回示例

  {
    "error_code": 0,
    "data": {
      "uid": "1",
      "username": "12154545",
      "name": "吴系挂",
      "groupid": 2 ,
      "reg_time": "1436864169",
      "last_login_time": "0",
    }
  }

3发起预支付（预支付参数必须带有token,和第二步的order_number）
请求头参数：

参数名	必选	类型	说明
Authorization	是	string	用户登录成功获取的token值
请求体参数：

参数名	必选	类型	说明
order_number	是	string	订单编号

返回值是一个pay的对象（这个对象是微信wx-wx.requestPayment(Object object)必须要的）
{
  "message": {
    "pay": {
      "timeStamp": "1564730510",
      "nonceStr": "SReWbt3nEmpJo3tr",
      "package": "prepay_id=wx02152148991420a3b39a90811023326800",
      "signType": "MD5",
      "paySign": "3A6943C3B865FA2B2C825CDCB33C5304"
    },
    "order_number": "HMDD20190802000000000422"
  },
  "meta": {
    "msg": "预付订单生成成功",
    "status": 200
  }
4查询订单状态是否支付成功
就是发送请求给diy后台，看真的是否成功

[!getUserInfo登录.PNG]
#####支付成功后，本地从缓存中删除已经被选中的商品(其实过滤掉选中的就可以了)
car.filter(v=>!v.checked)


订单流程
[!订单流程.PNG]
####css tree 生成css 树 ctrl+shift+p 仍然选择


####es7  async 语法解决回调的最终方案
1在小程序的开发工具中，勾选es6转es5语法
2下载facebook regenerator库中的
https://github.com/facebook/regenerator/tree/master/packages/regenerator-runtime
3要用的引入(不要全局引入)
	
import regeneratorRuntime from "./lib/runtime/runtime.js"

4使用es7 async await 来发送请求

async xxxx(){


  await request("xxxxx")


}

例子

import regeneratorRuntime from "../../lib/runtime/runtime"

Page({
  
 
  //获取用户信息
 async getUserInfo(e){
     // 1获取用户信息
     const {encryptedData,errMsg,iv,rawData,signature}=e.detail;
     //获取小程序登录成功后的值code
     const {code}=await wxlogin()
     console.log(code);
}
   
})



