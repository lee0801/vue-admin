// /admin/product/baseTrademark/{page}/{limit}

import request from '@/utils/request'
export const reqTradeMarkList = (page,limit)=>request({
    url:`/admin/product/baseTrademark/${page}/${limit}`,
    method:'get'
})

// 处理新增品牌，不传id，服务器自动生成 /admin/product/baseTrademark/save
// 处理修改品牌，带id， /admin/product/baseTrademark/update
export const reqAddOrUpdateTradeMark = (tradeMark)=>{
    if(tradeMark.id){
        return request({url:'/admin/product/baseTrademark/update',method:'put',data:tradeMark})
    }else{
        return request({url:'/admin/product/baseTrademark/save',method:'post',data:tradeMark})
    }
}
// /admin/product/baseTrademark/remove/{id}
export const reqDeleteTradeMark = (id)=>{request({url:`/admin/product/baseTrademark/remove/${id}`,method:'delete'})
}