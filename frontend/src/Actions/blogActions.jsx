import axios from "axios"

export const getAllBlogs = () => async (dispatch) => {
    try {
        dispatch({type : "GET_ALL_BLOGS_REQUEST"})

        const {data} = await axios.get("/api/following/blogs");

        dispatch({type : "GET_ALL_BLOGS_SUCCESS", payload : data.blogs})

    } catch (error) {
        dispatch({type : "GET_ALL_BLOGS_FAILURE", payload : error.response.data.message})
    }
}

export const getMyBlogs = () => async (dispatch) => {
    try {
        dispatch({type : "GET_MY_BLOGS_REQUEST"})

        const {data} = await axios.get("/api/me/blogs");

        dispatch({type : "GET_MY_BLOGS_SUCCESS", payload : data.blogs})

    } catch (error) {
        dispatch({type : "GET_MY_BLOGS_FAILURE", payload : error.response.data.message})
    }
}

export const likeBlog = (id) => async (dispatch) => {
    try {
        dispatch({type : "LIKE_REQUEST"})

        const {data} = await axios.put(`/api/like/${id}`);

        dispatch({type : "LIKE_SUCCESS", payload : data.message})

    } catch (error) {
        dispatch({type : "LIKE_FAILURE", payload : error.response.data.message})
    }
}

export const commentBlog = (id, message) => async (dispatch) => {
    try {
        dispatch({type : "COMMENT_REQUEST"})

        const {data} = await axios.post(`/api/comment/${id}`, {
            message
        }, {
            headers : {
                "Content-Type" : "application/json"
            },
            withCredentials : "true"
        });

        dispatch({type : "COMMENT_SUCCESS", payload : data.message})

    } catch (error) {
        dispatch({type : "COMMENT_FAILURE", payload : error.response.data.message})
    }
}

export const deleteComment = (id) => async (dispatch) => {
    try {
        dispatch({type : "DELETE_COMMENT_REQUEST"})

        const {data} = await axios.delete(`/api/comment/${id}`);

        dispatch({type : "DELETE_COMMENT_SUCCESS", payload : data.message})

    } catch (error) {
        dispatch({type : "DELETE_COMMENT_FAILURE", payload : error.response.data.message})
    }
}


export const addToFavourite = (id) => async (dispatch) => {
    try {
        dispatch({type : "ADD_TO_FAVOURITE_REQUEST"})

        const {data} = await axios.put(`/api/favourite/${id}`);

        dispatch({type : "ADD_TO_FAVOURITE_SUCCESS", payload : data.message})

    } catch (error) {
        dispatch({type : "ADD_TO_FAVOURITE_FAILURE", payload : error.response.data.message})
    }
}

export const getAllFavourite = () => async (dispatch) => {
    try {
        dispatch({type : "GET_FAV_REQUEST"})

        const {data} = await axios.get(`/api/favourite`);

        dispatch({type : "GET_FAV_SUCCESS", payload : data.fav})

    } catch (error) {
        dispatch({type : "GET_FAV_FAILURE", payload : error.response.data.message})
    }
}

