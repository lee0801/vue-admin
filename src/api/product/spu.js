import request from '@/utils/request'

// /admin/product/{page}/{limit}
export const reqSpuList = (page, limit, category3Id) => request({ url: `/admin/product/${page}/${limit}`, method: 'get', params: { category3Id } })

// /admin/product/getSpuById/{spuId}
export const reqSpu = (spuId) => request({ url: `/admin/product/getSpuById/${spuId}`, method: 'get' })

// /admin/product/baseTrademark/getTrademarkList
export const reqTradeMarkList = () => request({ url: `/admin/product/baseTrademark/getTrademarkList`, method: 'get' })

// /admin/product/spuImageList/{spuId}
export const reqSpuImageList = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })

// /admin/product/baseSaleAttrList
export const reqBaseSaleAttrList = () => request({ url: `/admin/product/baseSaleAttrList`, method: 'get' })

// /admin/product/saveSpuInfo
export const reqAddOrUpdateSpu = (spuInfo) => {
    if (spuInfo.id) {
        return request({ url: `/admin/product/updateSpuInfo`, method: 'post', data: spuInfo })
    } else {
        return request({ url: `/admin/product/saveSpuInfo`, method: 'post', data: spuInfo })
    }
}

// /admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = (spuId)=>request({ulr:`/admin/product/deleteSpu/${spuId}`,method:'delete'})


//  sku in spu

/* // /admin/product/spuImageList/{spuId}
export const reqSpuImageList = (spuId)=>request({url:`/admin/product/spuImageList/${spuId}`,method:'get'}) */

// /admin/product/spuSaleAttrList/{spuId}

export const reqSpuSaleAttrList = (spuId)=>request({url:`/admin/product/spuSaleAttrList/${spuId}`,method:'get'})

export const reqAttrInfoList = (category1Id,category2Id,category3Id)=>request({
    url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method:'get'
})

// 添加sku
export const reqAddSku = (skuInfo)=>request({url:`/admin/product/saveSkuInfo`,method:'post',data:skuInfo})

// /admin/product/findBySpuId/{spuId}
export const reqSkuList = (spuId)=>request({url:`/admin/product/findBySpuId/${spuId}`,method:'get'})