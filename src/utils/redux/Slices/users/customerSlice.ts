import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { OrderInterface } from "../orderSlice";
import { AddressInterface } from "../addressSlice";
import apiClient from "../../../axios/apiClient";




export interface CustomerInterface {
    _id: string,
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string,
    avatar: string,
    wishlist: [{ product: string, date_added: string }],
    cart: [{ product: string, quantity: Number, date_added: string }],
    orders: OrderInterface[]
    reviews: string[],
    addresses: AddressInterface[],
    default_billing_address: AddressInterface,
    default_shipping_address: AddressInterface,
}

;

// Thunks
export const getAllCustomers = createAsyncThunk("customers/getAllCustomers", async () => {
    const response = await apiClient.get("/customers/all");
    return response.data;
});

export const getCustomerById = createAsyncThunk("customers/getCustomerById", async (customerId: string) => {
    const response = await apiClient.get(`/customers/id/${customerId}`);
    return response.data;
});

export const getCustomerByEmail = createAsyncThunk("customers/getCustomerByEmail", async (customerEmail: string) => {
    const response = await apiClient.get(`/customers/email/${customerEmail}`);
    return response.data;
});

export const createCustomer = createAsyncThunk("customers/createCustomer", async (newCustomer: any) => {
    const response = await apiClient.post("/customers/create", newCustomer);
    return response.data;
});

export const updateCustomer = createAsyncThunk("customers/updateCustomer", async ({ customerId, updatedCustomer }: any) => {
    const response = await apiClient.patch(`/customers/update/${customerId}`, updatedCustomer);
    return response.data;
});

export const deleteCustomer = createAsyncThunk("customers/deleteCustomer", async (customerId: any) => {
    await apiClient.delete(`/customers/delete/${customerId}`);
    return customerId;
});


// Slice


const initialState = {
    customers: [] as CustomerInterface[],
    customer: {} as CustomerInterface,
    status: "idle",
    error: null as unknown,
}
const customerSlice = createSlice({
    name: "customers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCustomers.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getAllCustomers.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.customers = action.payload;
            })
            .addCase(getAllCustomers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            //
            .addCase(getCustomerById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getCustomerById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.customer = action.payload;
            })
            .addCase(getCustomerById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            //
            .addCase(getCustomerByEmail.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getCustomerByEmail.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.customers = [action.payload];
            })
            .addCase(getCustomerByEmail.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createCustomer.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createCustomer.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.customers.push(action.payload);
            })
            .addCase(createCustomer.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(updateCustomer.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateCustomer.fulfilled, (state, action) => {
                state.status = "succeeded";
                const index = state.customers.findIndex((customer) => customer._id === action.payload._id);
                if (index !== -1) {
                    state.customers[index] = action.payload;
                }
            })
            .addCase(updateCustomer.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteCustomer.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.customers = state.customers.filter((customer) => customer._id !== action.payload);
            })
            .addCase(deleteCustomer.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default customerSlice.reducer;
