import request from "@/api/request";

export function getMomentList(pageNum) {
    return request({
        url: "/moment",
        method: "GET",
        params:{
            pageNum
        }
    })
}

export function likeMoment(momentId) {
    return request({
        url: `/moment/like`,
        method: "POST",
        params:{
            momentId
        }
    })
}
