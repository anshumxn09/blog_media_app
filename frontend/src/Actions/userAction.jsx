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

export const getAllUser = ()  => async (dispatch) => {
    try {
        dispatch({type : "ALL_USER_REQUEST"})

        const {data} = await axios.get("/api/users");

        dispatch({type : "ALL_USER_SUCCESS", payload : data.users})
    } catch (error) {
        dispatch({type : "ALL_USER_FAILURE", payload : error.response.data.message})
    }
}