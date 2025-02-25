import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import axiosInstance from '../helpers/axiosInstance.js';


const initialState = {
    key: "",
    subscription_id: "",
    isPaymentVarified: false,
    allPayment: {},
    finalMonths: {},
    monthlySalesRecord: [],
};


export const getRazorpayId = createAsyncThunk("/get/razorpayId", async () => {
    try {
        const res = axiosInstance.get("/payment/razorpay-key");
        return (await res)?.data;
    } catch (e) {
        toast.error(e?.response?.data?.message || "Failed to load data");
    }
});


export const purchaseCourseBundle = createAsyncThunk("/buySubscription", async () => {
    try {
        const res = axiosInstance.post("/payment/subscribe");
        return (await res)?.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
    }
});


export const verifySubscription = createAsyncThunk("/verifySubscription", async (paymentDetail) => {
    try {
        const res = axiosInstance.post("/payment/verify", {
            razorpay_payment_id: paymentDetail.razorpay_payment_id,
            razorpay_subscription_id: paymentDetail.razorpay_subscription_id,
            razorpay_signature: paymentDetail.razorpay_signature,
        });
        return (await res)?.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
    }
});


export const getPaymentRecord = createAsyncThunk("/get/paymentRecord", async () => {
    try {
        const res = axiosInstance.get("/payment?count=100");
        toast.promise(res, {
            loading: "Wait! Getting all Payment records.",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Sorry! Failed to get payment records."
        });
        return (await res)?.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
    }
});


export const cancelCourseBundel = createAsyncThunk("/unsubscribe", async () => {
    try {
        const res = axiosInstance.post("/payment/unsubscribe");
        toast.promise(res, {
            loading: "Wait! Unsubscribing the bundle...",
            success: "Bundle Unsubscribed successfully...",
            error: "Sorry! Failed to Unsubscribe... "
        });
        return (await res)?.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
    }
});


const razorpaySlice = createSlice({
    name: "razorpay",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRazorpayId.rejected, () => {
            toast.error("Failed to get razorpay id.");
            })
            .addCase(getRazorpayId.fulfilled, (state, action) => {
                state.key = action?.payload?.key;
            })
            .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
                state.subscription_id = action?.payload?.subscription_id;
            })
            .addCase(verifySubscription.fulfilled, (state, action) => {
                toast.success(action?.payload?.message);
                state.isPaymentVarified = action?.payload?.isPaymentVarified;
            })
            .addCase(verifySubscription.rejected, (state, action) => {
                toast.error(action?.payload?.message);
                state.isPaymentVarified = action?.payload?.isPaymentVarified;
            })
            .addCase(getPaymentRecord.fulfilled, (state, action) => {
                state.allPayment = action?.payload?.allPayment;
                state.finalMonths = action?.payload?.finalMonths;
                state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
            });
        },
    });
            



export default razorpaySlice.reducer;
