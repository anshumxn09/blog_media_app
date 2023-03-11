import { configureStore } from "@reduxjs/toolkit";
import { userReducer, allUserReducer } from "./Reducers/userReducer";

const store = configureStore({
    reducer : {
        userReducer, allUserReducer
    }
})


export default store;
