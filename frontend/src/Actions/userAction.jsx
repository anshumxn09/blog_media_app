import axios from "axios"

export const login = (email, password)  => async (dispatch) => {
    try {
        dispatch({type : "LOGIN_REQUEST"})

        const {data} = await axios.post("/api/login", {
            email, password
        }, {
            headers : {
                "Content-Type" : "application/json"
            },
            withCredentials : true
        })
        dispatch({type : "LOGIN_SUCCESS", payload : data.user})
    } catch (error) {
        dispatch({type : "LOGIN_FAILURE", payload : error.response.data.message})
    }
}

export const register = (name, email, password, avatar)  => async (dispatch) => {
    try {
        dispatch({type : "REGISTER_REQUEST"})

        const {data} = await axios.post("/api/register", {
            email, password, name, avatar
        }, {
            headers : {
                "Content-Type" : "application/json"
            },
            withCredentials : true
        })
        dispatch({type : "REGISTER_SUCCESS", payload : data.user})
    } catch (error) {
        dispatch({type : "REGISTER_FAILURE", payload : error.response.data.message})
    }
}

export const loadUser = ()  => async (dispatch) => {
    try {
        dispatch({type : "LOAD_REQUEST"})

        const {data} = await axios.get("/api/me");

        dispatch({type : "LOAD_SUCCESS", payload : data.user})
    } catch (error) {
        dispatch({type : "LOAD_FAILURE", payload : error.response.data.message})
    }
}

export const loadSearchUser = (id)  => async (dispatch) => {
    try {
        dispatch({type : "SEARCH_USER_REQUEST"})

        const {data} = await axios.get(`/api/user/${id}`);

        const res = {
            user : data.user,
            blogs : data.blogs
        }

        dispatch({type : "SEARCH_USER_SUCCESS", payload : res})
    } catch (error) {
        dispatch({type : "SEARCH_USER_FAILURE", payload : error.response.data.message})
    }
}

export const followUnfollow = (id)  => async (dispatch) => {
    try {
        dispatch({type : "FOLLOW_REQUEST"})

        const {data} = await axios.put(`/api/user/${id}`);
        
        dispatch({type : "FOLLOW_SUCCESS", payload : data.message});

    } catch (error) {
        dispatch({type : "FOLLOW_FAILURE", payload : error.response.data.message})
    }
}

export const getAllUser = ()  => async (dispatch) => {
    try {
        dispatch({type : "ALL_USER_REQUEST"})

        const {data} = await axios.get("/api/users");

        dispatch({type : "ALL_USER_SUCCESS", payload : data.users})
    } catch (error) {
        dispatch({type : "ALL_USER_FAILURE", payload : error.response.data.message})
    }
}

export const logoutUser = ()  => async (dispatch) => {
    try {
        dispatch({type : "LOGOUT_REQUEST"})

        const {data} = await axios.get("/api/logout");

        dispatch({type : "LOGOUT_SUCCESS", payload : data.message})
    } catch (error) {
        dispatch({type : "LOGOUT_FAILURE", payload : error.response.data.message})
    }
}

export const updateUser = (name, avatar)  => async (dispatch) => {
    try {
        dispatch({type : "EDIT_PROFILE_REQUEST"})

        const {data} = await axios.put("/api/edit/profile", {
            name, avatar
        }, {
            headers : {
                'Content-Type' : "application/json"
            },
            withCredentials : "true"
        });

        dispatch({type : "EDIT_PROFILE_SUCCESS", payload : data.message})
    } catch (error) {
        dispatch({type : "EDIT_PROFILE_FAILURE", payload : error.response.data.message})
    }
}

export const updateMyPassword = (oldpass, newpass)  => async (dispatch) => {
    try {
        dispatch({type : "EDIT_PASSWORD_REQUEST"})
        console.log(oldpass, newpass)
        const {data} = await axios.put("/api/edit/password", {
            oldpass, newpass
        }, {
            headers : {
                'Content-Type' : "application/json"
            },
            withCredentials : "true"
        });

        dispatch({type : "EDIT_PASSWORD_SUCCESS", payload : data.message})
    } catch (error) {
        dispatch({type : "EDIT_PASSWORD_FAILURE", payload : error.response.data.message})
    }
}