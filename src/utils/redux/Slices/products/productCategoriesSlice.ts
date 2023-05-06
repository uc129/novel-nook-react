import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import apiClient from "../../../axios/apiClient";

export interface ProductCategoryInterface {
    _id: string,
    name: string,
    tagline: string,
    description: string,
    images: string[],
    isActive: Boolean,
    subcategories: string[]
}

// Async Thunks
export const createProductCategory = createAsyncThunk(
    "productCategories/create",
    async (categoryData) => {
        try {
            const response = await apiClient.post("/products/category/create", categoryData);
            return response.data;
        } catch (error: any) {
            return (error.message);
        }
    }
);

export const getAllProductCategories = createAsyncThunk(
    "productCategories/getAll",
    async () => {
        try {
            const response = await apiClient.get("/products/category/all");
            return response.data;
        } catch (error: any) {
            return (error.message);
        }
    }
);

export const getProductCategoryById = createAsyncThunk(
    "productCategories/getById",
    async (categoryId: string) => {
        try {
            const response = await apiClient.get(`/products/category/id/${categoryId}`);
            return response.data;
        } catch (error: any) {
            return (error.message);
        }
    }
);

export const updateProductCategory = createAsyncThunk(
    "productCategories/update",
    async ({ categoryId, categoryData }: any) => {
        try {
            const response = await apiClient.patch(`/products/category/update/${categoryId}`, categoryData);
            return response.data;
        } catch (error: any) {
            return (error.message);
        }
    }
);

export const deleteProductCategory = createAsyncThunk(
    "productCategories/delete",
    async (categoryId) => {
        try {
            const response = await apiClient.delete(`/products/category/delete/${categoryId}`);
            return response.data;
        } catch (error: any) {
            return (error.message);
        }
    }
);

// Slice
const productCategoriesSlice = createSlice({
    name: "productCategories",
    initialState: {
        categories: [] as unknown as ProductCategoryInterface[],
        category: {} as unknown as ProductCategoryInterface,
        // categories: [] as ProductCategoryInterface,
        status: "idle",
        error: null as unknown,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createProductCategory.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createProductCategory.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.categories.push(action.payload);
                state.category = action.payload
            })
            .addCase(createProductCategory.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            //
            .addCase(getAllProductCategories.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getAllProductCategories.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.categories = action.payload;
            })
            .addCase(getAllProductCategories.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            //
            .addCase(getProductCategoryById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getProductCategoryById.fulfilled, (state, action) => {
                state.status = "succeeded";
                const existingCategory = state.categories.find(
                    (category: { _id: any; }) => category._id === action.payload._id
                );
                if (existingCategory) {
                    Object.assign(existingCategory, action.payload);
                    state.category = action.payload
                } else {
                    state.categories.push(action.payload);
                    state.category = action.payload
                }
            })
            .addCase(getProductCategoryById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(updateProductCategory.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateProductCategory.fulfilled, (state, action) => {
                state.status = "succeeded";
                const existingCategory = state.categories.find(
                    (category: { _id: any; }) => category._id === action.payload._id
                );
                if (existingCategory) {
                    Object.assign(existingCategory, action.payload);
                    state.category = action.payload
                }
            })
            .addCase(updateProductCategory.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(deleteProductCategory.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteProductCategory.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.categories = state.categories.filter(
                    (category: { _id: any; }) => category._id !== action.payload._id
                );
            })
            .addCase(deleteProductCategory.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });

    }
});

export default productCategoriesSlice.reducer;
