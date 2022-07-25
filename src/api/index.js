import request from "@/api/request";

export function getHitokoto() {
    return request({
        url: "https://v1.hitokoto.cn/?c=a",
        method: "GET"
    })
}

export function getSite() {
    return request({
        url: "/site",
        method: "GET"
    })
}