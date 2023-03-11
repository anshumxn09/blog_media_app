import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer({}, {
    REGISTER_REQUEST : (state) => {
        state.loading = true;
    },
    REGISTER_SUCCESS : (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.message = null;
        state.isAuthenticated = true;
    },
    REGISTER_FAILURE : (state,action) => {
        state.loading = false;
        state.message = action.payload;
        state.isAuthenticated = false;
    },

    LOGIN_REQUEST : (state) => {
        state.loading = true;
    },
    LOGIN_SUCCESS : (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.message = null;
        state.isAuthenticated = true;
    },
    LOGIN_FAILURE : (state,action) => {
        state.loading = false;
        state.message = action.payload;
        state.isAuthenticated = false;
    },

    LOAD_REQUEST : (state) => {
        state.loading = true;
    },
    LOAD_SUCCESS : (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.message = null;
        state.isAuthenticated = true;
    },
    LOAD_FAILURE : (state,action) => {
        state.loading = false;
        state.message = action.payload
    },
    
    CLEAR_MESSAGE : (state) => {
        state.message = null;
    }
})

export const allUserReducer = createReducer({}, {
    ALL_USER_REQUEST : (state) => {
        state.loading = true;
    },
    ALL_USER_SUCCESS : (state, action) => {
        state.loading = false;
        state.users = action.payload;
    },
    ALL_USER_FAILURE : (state,action) => {
        state.loading = false;
        state.message = action.payload;
    },
})