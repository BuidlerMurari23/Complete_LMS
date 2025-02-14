import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../helpers/axiosInstance.js';
import { toast } from "react-hot-toast";


function getStoredData(){
    try {
        const storeData = localStorage.getItem("data");
        return (storeData) && (storeData !== "undefined") ? JSON.parse(storeData) : {};
    } catch (e) {
        console.error("Error in parsing localStorage data", e);
        return {};
    }
}


const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    data: getStoredData(),
    role: localStorage.getItem("role") || "",
};

export const createAccout = createAsyncThunk("/auth/signup", async (data) => {
    try {
        const res = axiosInstance.post("/user/register", data);

        toast.promise(res, {
            loading: "Wait! Creating your Account.",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Sorry! Failed to create account."
        });
        
        return ((await res)?.data);
    } catch (e) {
        toast.error(e?.response?.data?.message)
    }
});


export const login = createAsyncThunk("/user/login", async (data) => {
    try {
        const res = axiosInstance.post("/user/login", data);

    toast.promise(res, {
        loading: "Logging In ...",
        success: (data) => {
            return data?.data?.message;
        },
        error: "Sorry! Failed to login",
    });

    return ((await res)?.data);
    } catch (e) {
        toast.error(e.message);
    }
});


export const logout = createAsyncThunk("/user/logout", async () => {
    try {
        const res = axiosInstance.post("/user/logout");

    toast.promise(res, {
        loading: "Logging Out ...",
        success: (data) => {
            return data?.data?.message;
        },
        error: "Sorry! Failed to logout",
    });

    return ((await res)?.data);
    } catch (e) {
        toast.error(e.message);
    }
});


export const getUserData = createAsyncThunk("/user/me", async () => {
    try {
        const res = axiosInstance.get("/user/me");
        toast.promise(res, {
            loading: "Wait! Getting User's details.",
            success: res?.data?.data?.message,
            error: "Sorry! Failed to get user's details."
        });
        
        return ((await res)?.data);
    } catch (e) {
        toast.error(e.message);
    }
});


export const forgotPassword = createAsyncThunk("/user/forgotPassword", async (email) => {
    try {
        const res = axiosInstance.post("/user/reset", {email});

        toast.promise(res, {
            loading: "Loading ...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Sorry! Failed to send verification email"
        });

        return ((await res)?.data);
    } catch (e) {
        toast.error(e.message);
    }
});


export const resetPassword = createAsyncThunk("/user/resetPassword", async (data) => {
    try {
       const res = axiosInstance.post(`/user/reset/:${data.resetToken}`, {password: data.password});
       toast.promise(res, {
        loading: "Reseting ...",
        success: (data) => {
            return data?.data?.message;
        },
        error: "Sorry! Failed to reset password."
       });
       
       return ((await res).data);
    } catch (e) {
        toast.error(e.message);
    }
});


export const changePassword = createAsyncThunk("/user/changePassword", async (userPassword) => {
    try {
        const res = axiosInstance.post("/user/changePassword", userPassword);
        console.log("res", res)
        toast.promise(res, {
            loading: "Wait! Change password.",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Sorry! Failed to change password."
        });
        return ((await res)?.data);
    } catch (e) {
        toast.error(e.message);
    }
});


export const updateProfile = createAsyncThunk("/user/updateProfile", async (data) => {
    try {
        const res = axiosInstance.put(`/user/update/:${data[0]}`, data[1]);
        toast.promise(res, {
            loading: "Wait! Updateing the Profile.",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Sorry! Failed to update profile."
        });

        return ((await res)?.data);
    } catch (e) {
        toast.error(e?.response?.data?.message);
    }
});



const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(login.fulfilled, (state, action) => {
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("role", action?.payload?.user?.role);

            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
        })
        .addCase(logout.fulfilled, (state) => {
            localStorage.clear();
            state.isLoggedIn = false;
            state.data = {};
            state.role = "";
        })
        .addCase(getUserData.fulfilled, (state, action) => {
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("role", action?.payload?.user?.role);

            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
        })
    },
});


export default authSlice.reducer;