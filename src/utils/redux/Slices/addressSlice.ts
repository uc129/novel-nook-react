
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface AddressInterface {

    _id: String,
    street1: String,
    street2: String,
    city: String,
    state: String,
    country: String,
    zip: String,
    phone: String,
    isDefaultBilling: Boolean,
    isDefaultShipping: Boolean

}

const initialState = {
    status: "idle",
    error: null as unknown,
};

// Thunks
export const addAddress = createAsyncThunk("address/addAddress", async ({ customerId, address }: any) => {
    const response = await axios.post(`/api/customers/${customerId}/address/add`, address);
    return response.data;
});

export const updateAddress = createAsyncThunk("address/updateAddress", async ({ customerId, addressId, updatedAddress }: any) => {
    const response = await axios.patch(`/api/customers/${customerId}/address/update/${addressId}`, updatedAddress);
    return response.data;
});

export const removeAddress = createAsyncThunk("address/removeAddress", async ({ customerId, addressId }: any) => {
    await axios.delete(`/api/customers/${customerId}/address/remove/${addressId}`);
    return addressId;
});

export const updateDefaultBillingAddress = createAsyncThunk("address/updateDefaultBillingAddress", async ({ customerId, addressId }: any) => {
    const response = await axios.patch(`/api/customers/${customerId}/address/default-billing/${addressId}`);
    return response.data;
});

export const updateDefaultShippingAddress = createAsyncThunk("address/updateDefaultShippingAddress", async ({ customerId, addressId }: any) => {
    const response = await axios.patch(`/api/customers/${customerId}/address/default-shipping/${addressId}`);
    return response.data;
});

const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addAddress.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
            .addCase(addAddress.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(updateAddress.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateAddress.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
            .addCase(updateAddress.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(removeAddress.pending, (state) => {
                state.status = "loading";
            })
            .addCase(removeAddress.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
            .addCase(removeAddress.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(updateDefaultBillingAddress.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateDefaultBillingAddress.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
            .addCase(updateDefaultBillingAddress.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(updateDefaultShippingAddress.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateDefaultShippingAddress.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
            .addCase(updateDefaultShippingAddress.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default addressSlice.reducer;
