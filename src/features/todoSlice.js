import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { app } from "../firbaseconfig";
import { ref, push, getDatabase, onValue, remove, set } from "firebase/database";
// import { useDispatch } from "react-redux";

const db = getDatabase(app);
const todoRef = ref(db, "/todos");
const initialState = {
    todo: []
}


export const todoSlice = createSlice({
    name: "todoSlice",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.todo = action.payload
        },
        addTodo: (state, action) => {
            push(todoRef, { ...action.payload });
        },
        deleteTodo: (state, action) => {
            remove(ref(db, `/todos/${action.payload}`))
        }
    },
    extraReducers:builder=>{
builder.addCase(hit.pending,(state,action)=>{

})
builder.addCase(hit.rejected,(state,action)=>{

})
builder.addCase(hit.fulfilled,(state,action)=>{

})
    }

})
export const hit=createAsyncThunk('todoSlice/hit',val=>{
console.log(val)
})
export const { addTodo, setData, deleteTodo, updateTodo } = todoSlice.actions

