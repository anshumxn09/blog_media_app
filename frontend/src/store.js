import { configureStore } from "@reduxjs/toolkit";
import { getAllBlogs, likeReducer } from "./Reducers/blogReducer";
import { userReducer, allUserReducer, getFavourite } from "./Reducers/userReducer";

const store = configureStore({
    reducer : {
        userReducer, allUserReducer, getAllBlogs, likeReducer, getFavourite
    }
})


export default store;
