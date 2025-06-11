import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const userFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

const initialGuestId = localStorage.getItem("guestId") ? localStorage.getItem("guestId") : `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", initialGuestId);


//initial state
const initialState = {
    user: userFromStorage,
    guestId: initialGuestId,
    loading: false,
    error: null
};
//create async thunk for login
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
                userData
            );
            localStorage.setItem("userInfo", JSON.stringify(response.data));
            localStorage.setItem("userToken", response.data.token);
            return response.data.user;
        } catch (error) {

            return rejectWithValue(error.response.data);

        }
    }
    );
    //create async thunk for register
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
                userData
            );
            localStorage.setItem("userInfo", JSON.stringify(response.data));
            localStorage.setItem("userToken", response.data.token);
            return response.data.user;
        } catch (error) {

            return rejectWithValue(error.response.data);

        }
    }
    );
    const authSlice = createSlice({
        name: "auth",
        initialState,
        reducers: {
            logout: (state) => {
                state.user = null;
                state.guestId = `guest_${new Date().getTime()}`;
                localStorage.removeItem("userInfo");
                localStorage.removeItem("userToken");
                localStorage.setItem("guestId", state.guestId);//set guestId in local storage
            },
            generateNewGuestId: (state) => {
                state.guestId = `guest_${new Date().getTime()}`;
                localStorage.setItem("guestId", state.guestId);//set guestId in local storage
            }
        
