import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../axios/apiClient";


export interface TestimonialInterface {
    _id: String,
    designer: String,
    testimonial: String,
    featured: Boolean,

}



const initialState = {
    testimonials: [] as unknown as TestimonialInterface[],
    status: "idle",
    error: null as unknown,
};

export const getAllTestimonials = createAsyncThunk(
    "testimonials/getAllTestimonials",
    async () => {
        const response = await apiClient.get("/designers/testimonial/all");
        return response.data;
    }
);

export const getTestimonialById = createAsyncThunk(
    "testimonials/getTestimonialById",
    async (testimonialId: string) => {
        const response = await apiClient.get(
            `/designers/testimonial/id/${testimonialId}`
        );
        return response.data;
    }
);

export const getTestimonialByDesignerId = createAsyncThunk(
    "testimonials/getTestimonialByDesignerId",
    async (designerId: string) => {
        const response = await apiClient.get(
            `/designers/testimonial/designer/${designerId}`
        );
        return response.data;
    }
);

export const createTestimonial = createAsyncThunk(
    "testimonials/createTestimonial",
    async (testimonial: TestimonialInterface) => {
        const response = await apiClient.post(
            "/designers/testimonial/create",
            testimonial
        );
        return response.data;
    }
);

export const updateTestimonial = createAsyncThunk(
    "testimonials/updateTestimonial",
    async ({
        testimonialId,
        updatedTestimonial,
    }: {
        testimonialId: string;
        updatedTestimonial: TestimonialInterface;
    }) => {
        const response = await apiClient.patch(
            `/designers/testimonial/update/${testimonialId}`,
            updatedTestimonial
        );
        return response.data;
    }
);

export const deleteTestimonial = createAsyncThunk(
    "testimonials/deleteTestimonial",
    async (testimonialId: string) => {
        await apiClient.delete(
            `/designers/testimonial/delete/${testimonialId}`
        );
        return testimonialId;
    }
);

const testimonialSlice = createSlice({
    name: "testimonials",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllTestimonials.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getAllTestimonials.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.testimonials = action.payload;
            })
            .addCase(getAllTestimonials.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(getTestimonialById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getTestimonialById.fulfilled, (state, action) => {
                state.status = "succeeded";
                const index = state.testimonials.findIndex(
                    (testimonial) => testimonial._id === action.payload._id
                );
                if (index === -1) {
                    state.testimonials.push(action.payload);
                } else {
                    state.testimonials[index] = action.payload;
                }
            })
            .addCase(getTestimonialById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(getTestimonialByDesignerId.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getTestimonialByDesignerId.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.testimonials = action.payload;
            })
            .addCase(getTestimonialByDesignerId.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createTestimonial.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createTestimonial.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.testimonials.push(action.payload);
            })
            .addCase(createTestimonial.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(updateTestimonial.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateTestimonial.fulfilled, (state, action) => {
                state.status = "succeeded";
                const index = state.testimonials.findIndex(
                    (testimonial) => testimonial._id === action.payload._id
                );
                if (index !== -1) {
                    state.testimonials[index] = action.payload;
                }
            })
            .addCase(updateTestimonial.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteTestimonial.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteTestimonial.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.testimonials = state.testimonials.filter(
                    (testimonial) => testimonial._id !== action.payload
                );
            })
            .addCase(deleteTestimonial.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default testimonialSlice.reducer;