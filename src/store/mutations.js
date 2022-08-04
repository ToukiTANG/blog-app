import {
    SAVE_CLIENT_SIZE,
    SET_IS_BLOG_TO_HOME,
    SAVE_SITE_INFO,
    SAVE_INTRODUCTION,
    SET_IS_BLOG_RENDER_COMPLETE,
    SET_FOCUS_MODE
} from "@/store/mutation-types";

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
    },
    [SET_IS_BLOG_RENDER_COMPLETE](state, ok) {
        state.isBlogRenderComplete = ok
    },
    [SET_FOCUS_MODE](state, focusMode) {
        state.focusMode = focusMode
    }
}