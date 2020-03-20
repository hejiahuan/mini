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