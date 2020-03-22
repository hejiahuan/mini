import request from "../utils/network";


export function getCategoryList(){
    return request({url:"/categories"})
}