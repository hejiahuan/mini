import wxlogin from "./network/auth"
import request from "../../utils/network"

import regeneratorRuntime from "../../lib/runtime/runtime"

Page({

  //获取用户信息
  async getUserInfo(e) {
    // 1获取用户信息
    const { encryptedData, errMsg, iv, rawData, signature } = e.detail;
    //获取小程序登录成功后的值code，这个用的是es7的语法！！！
    const { code } = await wxlogin()
    const loginparam = { encryptedData, errMsg, iv, rawData, signature, code }
    //3发送请求获取token值
    const header={Authorization:"11111"}
    const {token} = await request({ url: "/users/wxlogin", method: "post", data:loginparam,header})
    //4有token后，把token存入缓存中，并且goBack上一个界面
    wx.setStorageSync("token", token);
    wx.navigateBack({
      delta: 1
    });
    

    
  }
})