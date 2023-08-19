import request from "@/api/request";

export function getBlog(blogId) {
    return request({
        url: "/blog",
        method: "GET",
        params: {
            blogId
        }
    })
}

export function getSearchBlogList(queryString) {
    return request({
        url: 'blog/searchBlog',
        method: 'GET',
        params: {
            queryString
        }
    })
}
