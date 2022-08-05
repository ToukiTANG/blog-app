import request from "@/api/request";

export function getBlog(id) {
    return request({
        url: "/blog",
        method: "GET",
        params: {
            id
        }
    })
}

export function getSearchBlogList(queryString) {
    return request({
        url: '/searchBlog',
        method: 'GET',
        params: {
            queryString
        }
    })
}