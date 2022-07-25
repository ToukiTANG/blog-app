import request from "@/api/request";

export function getBlogList(pageNum) {
    return request({
        url: "blogs",
        method: "GET",
        params: {
            pageNum
        }
    })
}