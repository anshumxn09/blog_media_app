import { configureStore } from "@reduxjs/toolkit";
import { getAllBlogs, likeReducer, myBlogs, singleBlog } from "./Reducers/blogReducer";
import { userReducer, allUserReducer, getFavourite, getSearchUser } from "./Reducers/userReducer";

const store = configureStore({
    reducer : {
        userReducer, allUserReducer, getAllBlogs, likeReducer, getFavourite, myBlogs, getSearchUser, singleBlog
    }
})


export default store;
