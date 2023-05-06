
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../axios/apiClient";


export interface DesignerInterface {
    _id: string,
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string,
    avatar: string[],
    bio: string,
    links: [{ platform: string, url: string }],
    products: string[],
    testimonials: string[],
}





// Thunks
export const getAllDesigners = createAsyncThunk("designers/getAllDesigners", async () => {
    const response = await apiClient.get("/designers/all");
    return response.data;
});

export const getDesignerById = createAsyncThunk("designers/getDesignerById", async (designerId: string) => {
    const response = await apiClient.get(`/designers/id/${designerId}`);
    return response.data;
});

export const getDesignerByEmail = createAsyncThunk("designers/getDesignerByEmail", async (email) => {
    const response = await apiClient.get(`/designers/email/${email}`);
    return response.data;
});

export const createDesigner = createAsyncThunk("designers/createDesigner", async (newDesigner) => {
    const response = await apiClient.post("/designers/create", newDesigner);
    return response.data;
});

export const updateDesigner = createAsyncThunk("designers/updateDesigner", async ({ designerId, updatedDesigner }: any) => {
    const response = await apiClient.patch(`/designers/update/${designerId}`, updatedDesigner);
    return response.data;
});

export const addDesignerProduct = createAsyncThunk("designers/addDesignerProduct", async ({ designerId, productId }: any) => {
    const response = await apiClient.post(`/designers/${designerId}/product/add/${productId}`);
    return response.data;
});

export const updateDesignerProduct = createAsyncThunk("designers/updateDesignerProduct", async ({ designerId, productId, productData }: any) => {
    const response = await apiClient.patch(`/designers/${designerId}/product/update/${productId}`, productData);
    return response.data;
});

export const removeDesignerProduct = createAsyncThunk("designers/removeDesignerProduct", async ({ designerId, productId }: any) => {
    await apiClient.delete(`/designers/${designerId}/product/remove/${productId}`);
    return productId;
});

export const deleteDesigner = createAsyncThunk("designers/deleteDesigner", async (designerId: any) => {
    await apiClient.delete(`/designers/delete/${designerId}`);
    return designerId;
});




const initialState = {
    designers: [] as DesignerInterface[],
    designer: {} as DesignerInterface,
    status: "idle",
    error: null as unknown,
};


const designerSlice = createSlice({
    name: "designers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllDesigners.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getAllDesigners.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.designers = action.payload;
            })
            .addCase(getAllDesigners.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            //
            .addCase(getDesignerById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getDesignerById.fulfilled, (state, action) => {
                state.status = "succeeded";
                const index = state.designers.findIndex(designer => designer._id === action.payload._id);
                if (index === -1) {
                    state.designer = action.payload;
                } else {
                    state.designers[index] = action.payload;
                    state.designer = action.payload;
                }
            })
            .addCase(getDesignerById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(updateDesigner.pending, (state) => {
                state.status = "loading";
            })

            //
            .addCase(updateDesigner.fulfilled, (state, action) => {
                state.status = "succeeded";
                const index = state.designers.findIndex(designer => designer._id === action.payload._id);
                if (index !== -1) {
                    state.designers[index] = action.payload;
                }
            })
            .addCase(updateDesigner.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addDesignerProduct.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addDesignerProduct.fulfilled, (state, action) => {
                state.status = "succeeded";
                const index = state.designers.findIndex(designer => designer._id === action.payload._id);
                if (index !== -1) {
                    state.designers[index] = action.payload;
                }
            })
            .addCase(addDesignerProduct.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(updateDesignerProduct.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateDesignerProduct.fulfilled, (state, action) => {
                state.status = "succeeded";
                const index = state.designers.findIndex(designer => designer._id === action.payload._id);
                if (index !== -1) {
                    state.designers[index] = action.payload;
                }
            })
            .addCase(updateDesignerProduct.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(removeDesignerProduct.pending, (state) => {
                state.status = "loading";
            })
            .addCase(removeDesignerProduct.fulfilled, (state, action) => {
                state.status = "succeeded";
                const index = state.designers.findIndex(designer => designer._id === action.meta.arg.designerId);
                if (index !== -1) {
                    state.designers[index].products = state.designers[index].products.filter(productId => productId !== action.payload);
                }
            })
            .addCase(removeDesignerProduct.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteDesigner.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteDesigner.fulfilled, (state, action) => {
                state.status = "succeeded";

                state.designers = state.designers.filter(designer => designer._id !== action.payload);
            })
            .addCase(deleteDesigner.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

    },
});

export default designerSlice.reducer;
