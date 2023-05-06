import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import apiClient from "../../../axios/apiClient";

export interface ProductSubCategoryInterface {
    _id: string,
    name: string,
    tagline: string,
    description: string,
    images: string[],
    isActive: boolean,
    category: string
}

// Async Thunks
export const createProductSubCategory = createAsyncThunk(
    "productSubCategories/create",
    async (categoryId: string, subcategoryData: any) => {
        try {
            const response = await apiClient.post(`/products/category/${categoryId}/add/subcategory`, subcategoryData);
            return response.data;
        } catch (error: any) {
            return (error.message);
        }
    }
);

export const getAllProductSubCategories = createAsyncThunk(
    "productSubCategories/getAll",
    async () => {
        try {
            const response = await apiClient.get(`/products/category/all/subcategories`);
            return response.data;
        } catch (error: any) {
            return (error.message);
        }
    }
);

// export const getAllCategorySubCategories = createAsyncThunk(
//     "productSubCategories/getAll",
//     async (categoryId: string) => {
//         try {
//             const response = await apiClient.get(`/products/category/${categoryId}/subcategories`);
//             return response.data;
//         } catch (error: any) {
//             return (error.message);
//         }
//     }
// );



export const updateProductSubCategory = createAsyncThunk(
    "productSubCategories/update",
    async ({ categoryId, subCategoryId, subcategoryData }: any) => {
        try {
            const response = await apiClient.patch(`products/category/${categoryId}/update/subcategory/${subCategoryId}`, subcategoryData);
            return response.data;
        } catch (error: any) {
            return (error.message);
        }
    }
);

export const deleteProductSubCategory = createAsyncThunk(
    "productSubCategories/delete",
    async (categoryId, subcategoryId) => {
        try {
            const response = await apiClient.delete(`/category/${categoryId}/delete/${subcategoryId}`);
            return response.data;
        } catch (error: any) {
            return (error.message);
        }
    }
);

// Slice
const productSubCategoriesSlice = createSlice({
    name: "productSubCategories",
    initialState: {
        subcategories: [] as unknown as ProductSubCategoryInterface[],
        subcategory: {} as unknown as ProductSubCategoryInterface,
        // categories: [] as ProductSubCategoryInterface,
        status: "idle",
        error: null as unknown,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createProductSubCategory.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createProductSubCategory.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.subcategories.push(action.payload);
                state.subcategory = action.payload
            })
            .addCase(createProductSubCategory.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            //
            .addCase(getAllProductSubCategories.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getAllProductSubCategories.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.subcategories = action.payload;
            })
            .addCase(getAllProductSubCategories.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            //
            // .addCase(getProductSubCategoryById.pending, (state) => {
            //     state.status = "loading";
            // })
            // .addCase(getProductSubCategoryById.fulfilled, (state, action) => {
            //     state.status = "succeeded";
            //     const existingCategory = state.categories.find(
            //         (category: { _id: any; }) => category._id === action.payload._id
            //     );
            //     if (existingCategory) {
            //         Object.assign(existingCategory, action.payload);
            //         state.category = action.payload
            //     } else {
            //         state.categories.push(action.payload);
            //         state.category = action.payload
            //     }
            // })
            // .addCase(getProductSubCategoryById.rejected, (state, action) => {
            //     state.status = "failed";
            //     state.error = action.payload;
            // })
            .addCase(updateProductSubCategory.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateProductSubCategory.fulfilled, (state, action) => {
                state.status = "succeeded";
                const existingCategory = state.subcategories.find(
                    (category: { _id: any; }) => category._id === action.payload._id
                );
                if (existingCategory) {
                    Object.assign(existingCategory, action.payload);
                    state.subcategory = action.payload
                }
            })
            .addCase(updateProductSubCategory.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(deleteProductSubCategory.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteProductSubCategory.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.subcategories = state.subcategories.filter(
                    (sub: { _id: any; }) => sub._id !== action.payload._id
                );
            })
            .addCase(deleteProductSubCategory.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });

    }
});

export default productSubCategoriesSlice.reducer;
