import request from "@/api/request";

export function getBlogListByTagName(tagName, pageNum) {
    return request({
        url: "/tag",
        method: "GET",
        params: {
            tagName,
            pageNum
        }
    })
}