import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../helpers/axiosInstance';
import toast, {} from 'react-hot-toast';

const initialState = {
    courseData: [],
};


export const getAllCourses = createAsyncThunk("courses/get", async () => {
    try {
        const res = axiosInstance.get("/course");

        toast.promise(res, {
            loading: "Loading all the Courses...",
            success: "Courses loaded successfully...",
            error: "Sorry! Failed to load courses..."
        });
        
        return (await res)?.data?.courses;

    } catch (e) {
        toast.error(e?.response?.data?.message)
    }
});


export const createNewCourse = createAsyncThunk("/course/post", async (data) => {
    try {
        const formData = new FormData();

        formData.append("title", data?.title);
        formData.append("description", data?.description);
        formData.append("category", data?.category);
        formData.append("thumbnail", data?.thumbnail);
        formData.append("createdBy", data?.createdBy);

        const res = axiosInstance.post("/course", formData);

        toast.promise(res, {
            loading: "Wait! Your course is get ready...",
            success: "Your course is created successfully...",
            error: "Sorry! Failed to create course..."
        });
        const response = await res
        console.log("respones", response?.data)
        return (await res)?.data
    } catch (e) {
        toast.error(e?.response?.data?.message);
    }
});


export const deleteCourseById = createAsyncThunk("/delete/course", async (id) => {
    try {
        const res = axiosInstance.delete(`/course/:${id}`);

        toast.promise(res, {
            loading: "Wait! Deleting the course...",
            success: "Course is deleted successfully...",
            error: "Sorry! Failed to delete course..."
        });

        return (await res)?.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
    }
});


export const updateCourseById = createAsyncThunk("/course/update", async (data) => {
    try {
        const formData = new FormData();

        formData.append("title", data?.title);
        formData.append("description", data?.description);
        formData.append("thumbnail", data?.thumbnail);
        formData.append("category", data?.category);
        formData.append("createdBy", data?.createdBy);

        const res = axiosInstance.put(`/course/:${data.id}`, formData);

        toast.promise(res, {
            loading: "Wait! Updating Your Course...",
            success: "Your course updated successfully...",
            error: "Sorry! Failed to update course..."
        });

        return (await res)?.data;

    } catch (e) {
        toast.error(e?.response?.data?.message);
    }
})

const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            if(action?.payload){
                state.courseData = [...action.payload];
            }
        });
    },
});


export default courseSlice.reducer;