import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
    name:"comment",
    initialState:{
        repliesArr:[]
    },
    reducers:{
        commentReplies:(state, action)=>{
            console.log(action.payload)
            if(state.repliesArr.includes(action.payload)){
                state.repliesArr = state.repliesArr.filter((item)=>item!==action.payload)
            }else{
                state.repliesArr =[...state.repliesArr, action.payload]
            }
        }
    }
})
export const { commentReplies } = commentSlice.actions;
export default commentSlice.reducer;