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