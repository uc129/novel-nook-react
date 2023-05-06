
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface CartItemInterface {
    product: String,
    quantity: Number,
    date_added: String
}

const initialState = {
    cart: [] as unknown as CartItemInterface[],
    status: "idle",
    error: null as unknown,
};

// Thunks
export const getCart = createAsyncThunk("cart/getCart", async (customerId) => {
    const response = await axios.get(`/api/customers/${customerId}/cart`);
    return response.data;
});

export const addCartItem = createAsyncThunk("cart/addCartItem", async ({ customerId, productId }: any) => {
    const response = await axios.post(`/api/customers/${customerId}/cart/add/${productId}`);
    return response.data;
});

export const updateCartItem = createAsyncThunk("cart/updateCartItem", async ({ customerId, productId, quantity }: any) => {
    const response = await axios.patch(`/api/customers/${customerId}/cart/update/${productId}`, { quantity });
    return response.data;
});

export const removeCartItem = createAsyncThunk("cart/removeCartItem", async ({ customerId, productId }: any) => {
    await axios.delete(`/api/customers/${customerId}/cart/remove/${productId}`);
    return productId;
});

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.cart = action.payload;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addCartItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addCartItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.cart.push(action.payload);
            })
            .addCase(addCartItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(updateCartItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                const index = state.cart.findIndex(item => item.product === action.payload.productId);
                if (index !== -1) {
                    state.cart[index] = action.payload;
                }
            })
            .addCase(updateCartItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(removeCartItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(removeCartItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.cart = state.cart.filter(item => item.product !== action.payload);
            })
            .addCase(removeCartItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default cartSlice.reducer;
