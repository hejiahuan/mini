import request from "../utils/network";

export function getGoodsList(params){
    return request({
        url:"/goods/search",
        data:params
    })
}