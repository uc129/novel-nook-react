import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../axios/apiClient";

export interface ProductTagsInterface {
    _id: String,
    name: String,
    description: String,
    products: String[],
    isActive: Boolean
}

export const createProductTag = createAsyncThunk(
    "productTags/createProductTag",
    async (tagData) => {
        const response = await apiClient.post("/tag/create", tagData);
        return response.data;
    }
);

export const getAllProductTags = createAsyncThunk(
    "productTags/getAllProductTags",
    async () => {
        const response = await apiClient.get("/tag/all");
        return response.data;
    }
);

export const getProductTagById = createAsyncThunk(
    "productTags/getProductTagById",
    async (tagId) => {
        const response = await apiClient.get(`/tag/id/${tagId}`);
        return response.data;
    }
);

export const updateProductTag = createAsyncThunk(
    "productTags/updateProductTag",
    async ({ tagId, updatedTag }: any) => {
        const response = await apiClient.patch(`/tag/update/${tagId}`, updatedTag);
        return response.data;
    }
);

export const deleteProductTag = createAsyncThunk(
    "productTags/deleteProductTag",
    async (tagId) => {
        const response = await apiClient.delete(`/tag/delete/${tagId}`);
        return response.data;
    }
);

const productTagsSlice = createSlice({
    name: "productTags",
    initialState: {
        tags: [] as unknown as ProductTagsInterface[],
        status: "idle",
        error: null as unknown,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createProductTag.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createProductTag.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.tags.push(action.payload);
            })
            .addCase(createProductTag.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(getAllProductTags.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getAllProductTags.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.tags = action.payload;
            })
            .addCase(getAllProductTags.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(getProductTagById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getProductTagById.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
            .addCase(getProductTagById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(updateProductTag.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateProductTag.fulfilled, (state, action) => {
                state.status = "succeeded";
                const existingTagIndex = state.tags.findIndex(
                    (tag) => tag._id === action.payload._id
                );
                if (existingTagIndex !== -1) {
                    state.tags[existingTagIndex] = action.payload;
                }
            })
            .addCase(updateProductTag.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(deleteProductTag.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteProductTag.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.tags = state.tags.filter((tag) => tag._id !== action.payload._id);
            })
            .addCase(deleteProductTag.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default productTagsSlice.reducer;
