import { createSlice } from "@reduxjs/toolkit";
const date=new Date().getFullYear()-1;

const initialState = {
    dataValue:[],

};
export const dataSlice=createSlice({
    name:"data",
    initialState,
    reducers:{
        dataRedux:(state,action)=>{
          
            state.dataValue=[action.payload]
        },
       
    }
});

export const {dataRedux}=dataSlice.actions;
export default dataSlice.reducer;