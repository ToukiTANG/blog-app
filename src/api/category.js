import request from "@/api/request";

export function getBlogListByCategoryId(categoryId, pageNum) {
    return request({
        url: "/category",
        method: "GET",
        params: {
            categoryId,
            pageNum
        }
    })
}
