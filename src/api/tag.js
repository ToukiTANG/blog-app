import request from "@/api/request";

export function getBlogListByTagId(tagId, pageNum) {
    return request({
        url: "/tag",
        method: "GET",
        params: {
            tagId,
            pageNum
        }
    })
}
