import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice.js";
import courseSliceReducer from "./courseSlice.js";
import lectureSliceReducer from "./lectureSlice.js";
import razorpaySliceReducer from "./razorpaySlice.js";
import statSliceReducer from "./statSlice.js";


const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        course: courseSliceReducer,
        lecture: lectureSliceReducer,
        razorpay: razorpaySliceReducer,
        stat: statSliceReducer,
    }
});


export default store;