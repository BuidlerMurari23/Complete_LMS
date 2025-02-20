import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice.js";
import courseSliceReducer from "./courseSlice.js";
import lectureSliceReducer from "./lectureSlice.js";


const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        course: courseSliceReducer,
        lecture: lectureSliceReducer,
    }
});


export default store;