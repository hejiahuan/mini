
import request from "../utils/network";

/**
 * 首页中得到轮播图
 */

 export function getSwiperList(){
    return request({url:"/home/swiperdata"})

 }

/**
 * 获取导航的List
 */
 export function getCatNavList(){
     return request({url:"/home/catitems"})
 }