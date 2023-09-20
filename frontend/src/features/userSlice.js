import { createSlice } from "@reduxjs/toolkit";

const initialState={
    displayName:"",
    email:"",
    photoURL:"",
};

export const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        loginRedux:(state,action)=>{
           
        state.displayName=action.payload.displayName;
          state.email=action.payload.email;
          state.photoURL=action.payload.photoURL;
        },
        logoutRedux:(state,action)=>{
            state.displayName = "";
            state.email = "";
            state.photoURL = "";
            
        }
    }
});

export const {loginRedux,logoutRedux}=userSlice.actions;
export default userSlice.reducer;