import { createReducer } from "@reduxjs/toolkit";

export const getAllBlogs = createReducer({}, {
    GET_ALL_BLOGS_REQUEST : (state) => {
        state.loading = true;
    },
    GET_ALL_BLOGS_SUCCESS : (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
        state.error = false;
    },
    GET_ALL_BLOGS_FAILURE : (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
})

export const singleBlog = createReducer({}, {
    SINGLE_BLOGS_REQUEST : (state) => {
        state.loading = true;
    },
    SINGLE_BLOGS_SUCCESS : (state, action) => {
        state.loading = false;
        state.blog = action.payload;
        state.error = false;
    },
    SINGLE_BLOGS_FAILURE : (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    CLEAR_BLOG : (state) => {
        state.blog = null;
    }
})

export const myBlogs = createReducer({}, {
    GET_MY_BLOGS_REQUEST : (state) => {
        state.loading = true;
    },
    GET_MY_BLOGS_SUCCESS : (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
        state.error = false;
    },
    GET_MY_BLOGS_FAILURE : (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
})

export const likeReducer = createReducer({}, {
    LIKE_REQUEST : (state) => {
        state.loading = true;
    },
    LIKE_SUCCESS : (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    LIKE_FAILURE : (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },

    COMMENT_REQUEST : (state) => {
        state.loading = true;
    },
    COMMENT_SUCCESS : (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    COMMENT_FAILURE : (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },

    DELETE_COMMENT_REQUEST : (state) => {
        state.loading = true;
    },
    DELETE_COMMENT_SUCCESS : (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    DELETE_COMMENT_FAILURE : (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },

    EDIT_PROFILE_REQUEST : (state) => {
        state.loading = true;
    },
    EDIT_PROFILE_SUCCESS : (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    EDIT_PROFILE_FAILURE : (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },

    EDIT_PASSWORD_REQUEST : (state) => {
        state.loading = true;
    },
    EDIT_PASSWORD_SUCCESS : (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    EDIT_PASSWORD_FAILURE : (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },

    ADD_TO_FAVOURITE_REQUEST : (state) => {
        state.loading = true;
    },
    ADD_TO_FAVOURITE_SUCCESS : (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    ADD_TO_FAVOURITE_FAILURE : (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },

    FOLLOW_REQUEST : (state) => {
        state.loading = true;
    },
    FOLLOW_SUCCESS : (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    FOLLOW_FAILURE : (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },

    CREATE_BLOG_REQUEST : (state) => {
        state.loading = true;
    },
    CREATE_BLOG_SUCCESS : (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    CREATE_BLOG_FAILURE : (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },

    EDIT_BLOG_REQUEST : (state) => {
        state.loading = true;
    },
    EDIT_BLOG_SUCCESS : (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    EDIT_BLOG_FAILURE : (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },

    DELETE_BLOG_REQUEST : (state) => {
        state.loading = true;
    },
    DELETE_BLOG_SUCCESS : (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    DELETE_BLOG_FAILURE : (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },


    CLEAR_MESSAGE : (state, action) => {
        state.message = null;
    }
})