import request from "@/api/request";

export function getArchives() {
    return request({
        url: "/archives",
        method: "GET",
    })
}

export function getBlogListByYearMonth(pageNum, yearMonth) {
    return request({
        url: "/archive",
        method: "GET",
        params: {
            pageNum,
            yearMonth
        }
    })
}