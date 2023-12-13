import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./reducers/searchSlice";
import commentSlice from "./reducers/commentSlice";

const store = configureStore({
    reducer:{
        search:searchSlice,
        comment:commentSlice
    }
})

export default store;