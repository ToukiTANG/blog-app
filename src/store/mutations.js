import {SAVE_CLIENT_SIZE, SET_IS_BLOG_TO_HOME, SAVE_SITE_INFO, SAVE_INTRODUCTION} from "@/store/mutation-types";

export default {
    [SET_IS_BLOG_TO_HOME](state, isBlogToHome) {
        state.isBlogToHome = isBlogToHome
    },
    [SAVE_CLIENT_SIZE](state, clientSize) {
        state.clientSize = clientSize
    },
    [SAVE_SITE_INFO](state, siteInfo) {
        state.siteInfo = siteInfo
    },
    [SAVE_INTRODUCTION](state, introduction) {
        state.introduction = introduction
    }
}