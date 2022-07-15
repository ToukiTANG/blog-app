import request from "@/api/request";

export function getArchives() {
    return request({
        url: "archives",
        method: "GET",
    })
}