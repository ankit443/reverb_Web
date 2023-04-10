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
        },
        setLogin: (state, action) => {
            state.user = action.payload.user; // we are sending a user parameter from this function

            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;

        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;

            }
            else {
                console.error("user friends are non existent")
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;

        },
        setPost: (state, action) => {
            const updatedPost = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPost;
        }

    }
})


export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;

export default authSlice.reducer;

//all the logic needed for the application to be done by the redux part is done now