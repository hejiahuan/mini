import request from "../utils/network";


export function getGoodsDetail(params){
    return request({
        url:"/goods/detail",
        data:{
            "goods_id":params
        }
    })
}