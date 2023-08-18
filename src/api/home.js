import request from "@/api/request";

export function getBlogList(pageNum) {
    return request({
        url: "/blog/list",
        method: "GET",
        params: {
            pageNum
        }
    })
}
