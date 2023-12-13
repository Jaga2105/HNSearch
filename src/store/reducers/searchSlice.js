import { createSlice } from "@reduxjs/toolkit";

const searchSlice =createSlice({
    name:"search",
    initialState:{
        searchText:"",
        searchCache:{
        }
    },
    reducers:{
        searchText:(state,action)=>{
            state.searchText=action.payload
        },
        cacheResults:(state, action)=>{
            // this stores all search reasults according to the searchText
            // such as {"r":[],"re":[],"rea":[],"reac":[],"react":[]}
            state.searchCache = {
                ...state.searchCache,
                [state.searchText]: action.payload,
              };
        }
    }
})
export const {searchText, cacheResults} = searchSlice.actions;
export default searchSlice.reducer;