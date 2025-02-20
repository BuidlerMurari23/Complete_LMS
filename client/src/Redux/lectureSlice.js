import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../helpers/axiosInstance";


const initialState = {
    lectures: [],
};


export const getCourseLecture = createAsyncThunk("/get/course/lecture", async (courseID) => {
    try {
        const res = axiosInstance.get(`/course/:${courseID}`);

        toast.promise(res, {
            loading: "Wait! Loading all the course lectures...",
            success: "Lectures fetched successfully...",
            error: "Sorry! Failes to fetched lectures..."
        });

        return (await res)?.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
    }
});


export const addCourseLecture = createAsyncThunk("/post/course/lecture", async (data) => {
    try {
        const formData = new FormData();

        formData.append("title", data?.title);
        formData.append("description", data?.description);
        formData.append("lecture", data?.lecture);

        const res = axiosInstance.post(`/course/;${data.id}`, formData);

        toast.promise(res, {
            loading: "Wait! Adding Your lecture...",
            success: "Lecuture added successfully...",
            error: "Sorry! Failed to add lecture..."
        });


        return (await res)?.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
    }
});


export const deleteCourseLectureById = createAsyncThunk("/delete/course/lecture", async (data) => {
    try {
        const res = axiosInstance.delete(`/course/${data.courseID}&${data.lectureID}`);

        toast.promise(res, {
            loading: "Wait! Deleting the lecture...",
            success: "Lecture deleted successfully...",
            error: "Sorry! Failed to delete lecture..."
        });

        return (await res)?.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);   
    }
})


const lectureSlice = createSlice({
    name: "lecture",
    initialState,
    reducers: {},
    extraReducers: (bulider) => {
        bulider
        .addCase(getCourseLecture.fulfilled, (state, action) => {
            state.lectures = action?.payload?.lectures;
        })
        .addCase(addCourseLecture.fulfilled, (state, action) => {
            state.lectures = action?.payload?.course?.lectures;
        })
    }
});


export default lectureSlice.reducer;