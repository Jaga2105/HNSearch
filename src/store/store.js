import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./reducers/searchSlice";

const store = configureStore({
    reducer:{
        search:searchSlice
    }
})

export default store;