import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../axios/apiClient";


export interface ProductReviewInterface {
    _id: string,
    customer: string,
    product: string,
    rating: Number,
    comment: string,

}

const initialState = {
    reviews: [] as unknown as ProductReviewInterface[],
    status: "idle",
    error: null as unknown
};

export const createProductReview = createAsyncThunk(
    "productReviews/createProductReview",
    async (review) => {
        const response = await apiClient.post("/products/review/create", review);
        return response.data;
    }
);

export const getAllProductReviews = createAsyncThunk(
    "productReviews/getAllProductReviews",
    async () => {
        const response = await apiClient.get("/products/review/all");
        return response.data;
    }
);

export const getProductReviewById = createAsyncThunk(
    "productReviews/getProductReviewById",
    async (review_id: string) => {
        const response = await apiClient.get(`/products/review/id/${review_id}`);
        return response.data;
    }
);

export const updateProductReview = createAsyncThunk(
    "productReviews/updateProductReview",
    async ({ review_id, updatedReview }: any) => {
        const response = await apiClient.patch(`/products/review/update/${review_id}`, updatedReview);
        return response.data;
    }
);

export const deleteProductReview = createAsyncThunk(
    "productReviews/deleteProductReview",
    async (review_id) => {
        const response = await apiClient.delete(`/products/review/delete/${review_id}`);
        return response.data;
    }
);

const productReviewsSlice = createSlice({
    name: "productReviews",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createProductReview.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createProductReview.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.reviews.push(action.payload);
            })
            .addCase(createProductReview.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            //
            .addCase(getAllProductReviews.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getAllProductReviews.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.reviews = action.payload;
            })
            .addCase(getAllProductReviews.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            //
            .addCase(getProductReviewById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getProductReviewById.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
            .addCase(getProductReviewById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            //
            .addCase(updateProductReview.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateProductReview.fulfilled, (state, action) => {
                state.status = "succeeded";
                const existingReview = state.reviews.find(
                    (review) => review._id === action.payload._id
                );
                if (existingReview) {
                    Object.assign(existingReview, action.payload);
                }
            })
            .addCase(updateProductReview.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            //ss
            .addCase(deleteProductReview.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteProductReview.fulfilled, (state, action) => {
                state.status = "succeeded";
                const existingReviewIndex = state.reviews.findIndex(
                    (review) => review._id === action.payload._id
                );
                if (existingReviewIndex !== -1) {
                    state.reviews.splice(existingReviewIndex, 1);
                }
            })
            .addCase(deleteProductReview.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });

    },
});

export default productReviewsSlice.reducer;
