import request from "@/api/request";

export function getMomentList(pageNum) {
    return request({
        url: "/moments",
        method: "GET",
        params:{
            pageNum
        }
    })
}

export function likeMoment(id) {
    return request({
        url: `/moment/like/${id}`,
        method: "POST"
    })
}