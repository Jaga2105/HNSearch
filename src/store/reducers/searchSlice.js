import { createSlice } from "@reduxjs/toolkit";

const searchSlice =createSlice({
    name:"search",
    initialState:{
        searchText:"",
        // searchCache:{
            
        // }
    },
    reducers:{
        searchText:(state,action)=>{
            console.log(action.payload)
            state.searchText=action.payload
        },
        // cacheResults:(state, action)=>{
        //     state.searchCache = {
        //         ...state.searchCache, // Copy existing cache
        //         [state.searchText]: action.payload, // Add new result
        //       };
        // }
    }
})
export const {searchText, cacheResults} = searchSlice.actions;
export default searchSlice.reducer;