import {SET_IS_BLOG_TO_HOME} from "@/store/mutation-types";

export default{
    [SET_IS_BLOG_TO_HOME](state,isBlogToHome){
        state.isBlogToHome = isBlogToHome
    }
}