import request from "@/api/request";

export function getBlogListByCategoryName(categoryName, pageNum) {
    return request({
        url: "/category",
        method: "GET",
        params: {
            categoryName,
            pageNum
        }
    })
}