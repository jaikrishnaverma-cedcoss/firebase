import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { app } from "../firbaseconfig";
import {  ref, push, getDatabase, onValue } from "firebase/database";
import { useDispatch } from "react-redux";

const db = getDatabase(app);
const todoRef = ref(db, "/todos");
const initialState = {
    todo: []
}


export const todoSlice = createSlice({
    name: "todoSlice",
    initialState,
    reducers: {
        setData(state,action){
            state.todo=action.payload
        },
        addTodo(state,action){
            push(todoRef, {...action.payload});
        }
    },
    extraReducers:builder=>{
    builder.addCase(fetchData.pending,(state,action)=>{
   state.message=action.payload
    })
    builder.addCase(fetchData.rejected,(state,action)=>{
        state.message=action.payload
    })
    builder.addCase(fetchData.fulfilled,(state,action)=>{
        state.todo=action.payload
    })
    }
 
})
export const {addTodo,setData} = todoSlice.actions

export const fetchData=createAsyncThunk('todoSlice/fetchData',async type=>{
    const todoRef = ref(db, "/todos");
    const dispatch=useDispatch()
      onValue(todoRef, (snapshot) => {
          const todos = snapshot.val();
          const newTodoList = [];
    
          for (let id in todos) {
            newTodoList.push({ id, ...todos[id] });
          };
     dispatch(setData(newTodoList))
         
        });

       
})