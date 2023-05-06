import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export interface WishlistItemInterface {
    product: String,
    date_added: String
}


const initialState = {
    wishlist: [] as unknown as WishlistItemInterface[],
    status: "idle",
    error: null as unknown,
};

// Thunks
export const getWishlistItems = createAsyncThunk("wishlist/getWishlist", async (customerId) => {
    const response = await axios.get(`/api/customers/${customerId}/wishlist`);
    return response.data;
});

export const addWishlistItem = createAsyncThunk("wishlist/addWishlistItem", async ({ customerId, productId }: any) => {
    const response = await axios.post(`/api/customers/${customerId}/wishlist/add/${productId}`);
    return response.data;
});

export const removeWishlistItem = createAsyncThunk("wishlist/removeWishlistItem", async ({ customerId, productId }: any) => {
    await axios.delete(`/api/customers/${customerId}/wishlist/remove/${productId}`);
    return productId;
});

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getWishlistItems.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getWishlistItems.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.wishlist = action.payload;
            })
            .addCase(getWishlistItems.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addWishlistItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addWishlistItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.wishlist.push(action.payload);
            })
            .addCase(addWishlistItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(removeWishlistItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(removeWishlistItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.wishlist = state.wishlist.filter(item => item.product !== action.payload);
            })
            .addCase(removeWishlistItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default wishlistSlice.reducer;
