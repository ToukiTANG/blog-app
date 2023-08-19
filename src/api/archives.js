import request from "@/api/request";

export function getArchives() {
    return request({
        url: "/archive",
        method: "GET",
    })
}

export function getBlogListByYearMonth(pageNum, yearMonth) {
    return request({
        url: "/archive/yearMonth",
        method: "GET",
        params: {
            pageNum,
            yearMonth
        }
    })
}
