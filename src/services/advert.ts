// 广告相关

import request from '@/utils/request'

// 根据Id获取广告信息
export const getAdById = (params: any) => {
    return request({
        method: 'GET',
        url: '/front/ad/getAdById',
        params
    })
}
// 获取所有的广告列表
export const getAdList = (params: any) => {
    return request({
        method: 'GET',
        url: '/front/ad/getAdList',
        params
    })
}
// 获取所有的广告位及其对应的广告
export const getAllAds = (params: any) => {
    return request({
        method: 'GET',
        url: '/front/ad/getAllAds',
        params
    })
}
// 新增或者修改广告信息
export const saveOrUpdate = (data: any) => {
    return request({
        method: 'POST',
        url: '/front/ad/saveOrUpdate',
        data
    })
}
// 获取所有的广告位
export const getAllSpaces = (params: any) => {
    return request({
        method: 'GET',
        url: '/front/ad/space/getAllSpaces',
        params
    })
}
// 根据Id获取广告位
export const getSpaceById = (params: any) => {
    return request({
        method: 'GET',
        url: '/front/ad/space/getSpaceById',
        params
    })
}
// 新增或者修改广告位
export const spaceSaveOrUpdate = (data: any) => {
    return request({
        method: 'POST',
        url: '/front/ad/space/saveOrUpdate',
        data
    })
}
// 更新广告的状态
export const updateStatus = (params: any) => {
    return request({
        method: 'GET',
        url: '/front/ad/updateStatus',
        params
    })
}
// 图片上传
export const uploadImage = (data: any, onUploadProgress: (progressEvent: ProgressEvent) => void) => {
    // 该接口要求的请求数据类型是：multipart/form-data
    // 所以需要提交 FormData 数据对象
    return request({
        method: 'POST',
        url: '/front/upload/img',
        data,
        // HTML5 新增的上传响应事件：progress
        onUploadProgress
    })
}