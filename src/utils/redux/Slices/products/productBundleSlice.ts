import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import apiClient from "../../../axios/apiClient";

export interface ProductBundlesInterface {
    _id: string,
    name: string,
    description: string,
    products: [{ productId: string, quantity: number }],
    images: string[],

    originalPrice: number,
    offerPrice: number,
    discountPercentage: number,

    startDate: Date,
    endDate: Date,

    status: string,
    tags: string[],
}

// Async Thunks
export const createProductBundle = createAsyncThunk(
    "productBundles/create",
    async (bundleData) => {
        try {
            const response = await apiClient.post("/products/bundles/create", bundleData);
            return response.data;
        } catch (error: any) {
            return (error.message);
        }
    }
);

export const getAllProductBundles = createAsyncThunk(
    "productBundles/getAll",
    async () => {
        try {
            const response = await apiClient.get("/products/bundles/all");
            return response.data;
        } catch (error: any) {
            return (error.message);
        }
    }
);

export const getProductBundleById = createAsyncThunk(
    "productBundles/getById",
    async (bundlesId: string) => {
        try {
            const response = await apiClient.get(`/products/bundles/id/${bundlesId}`);
            return response.data;
        } catch (error: any) {
            return (error.message);
        }
    }
);

export const updateProductBundle = createAsyncThunk(
    "productBundles/update",
    async ({ bundlesId, bundlesData }: any) => {
        try {
            const response = await apiClient.patch(`/products/bundles/update/${bundlesId}`, bundlesData);
            return response.data;
        } catch (error: any) {
            return (error.message);
        }
    }
);

export const deleteProductBundle = createAsyncThunk(
    "productBundles/delete",
    async (bundlesId) => {
        try {
            const response = await apiClient.delete(`/products/bundles/delete/${bundlesId}`);
            return response.data;
        } catch (error: any) {
            return (error.message);
        }
    }
);

// Slice
const productBundlesSlice = createSlice({
    name: "productBundles",
    initialState: {
        bundles: [] as unknown as ProductBundlesInterface[],
        bundle: {} as unknown as ProductBundlesInterface,
        status: "idle",
        error: null as unknown,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createProductBundle.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createProductBundle.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.bundles.push(action.payload);
                state.bundle = action.payload
            })
            .addCase(createProductBundle.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            //
            .addCase(getAllProductBundles.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getAllProductBundles.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.bundles = action.payload;
            })
            .addCase(getAllProductBundles.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            //
            .addCase(getProductBundleById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getProductBundleById.fulfilled, (state, action) => {
                state.status = "succeeded";
                const existingBundle = state.bundles.find(
                    (bundle: { _id: any; }) => bundle._id === action.payload._id
                );
                if (existingBundle) {
                    Object.assign(existingBundle, action.payload);
                    state.bundle = action.payload
                } else {
                    state.bundles.push(action.payload);
                    state.bundle = action.payload
                }
            })
            .addCase(getProductBundleById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(updateProductBundle.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateProductBundle.fulfilled, (state, action) => {
                state.status = "succeeded";
                const existingBundle = state.bundles.find(
                    (bundles: { _id: any; }) => bundles._id === action.payload._id
                );
                if (existingBundle) {
                    Object.assign(existingBundle, action.payload);
                    state.bundle = action.payload
                }
            })
            .addCase(updateProductBundle.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            //
            .addCase(deleteProductBundle.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteProductBundle.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.bundles = state.bundles.filter(
                    (bundles: { _id: any; }) => bundles._id !== action.payload._id
                );
                state.bundle = action.payload

            })
            .addCase(deleteProductBundle.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });

    }
});

export default productBundlesSlice.reducer;
