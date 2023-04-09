import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],

};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: { //functions that involve modifying the global state
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
            //1 hour 58 mins


            //trying to check the git usage here
            //checking Git again
        }

    }
})