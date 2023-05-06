import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../axios/apiClient';

export interface ImageInterface {
    _id: string;
    url: string;
    title?: string;
    description?: string;
    altText?: string;
    featured?: boolean;
    owner: string;
    ownerType: string;
}

export interface ImagesState {
    images: ImageInterface[];
    image: ImageInterface;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: null | unknown
}

const initialState: ImagesState = {
    images: [],
    image: {} as ImageInterface,
    status: 'idle',
    error: null,
};

export const createImage = createAsyncThunk('images/create', async (imageData: FormData, { rejectWithValue }) => {
    try {
        const response = await apiClient.post('images/create', imageData);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});

export const getAllImages = createAsyncThunk('get/images/all', async (_, { rejectWithValue }) => {
    try {
        const response = await apiClient.get('images/all');
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});

export const getImageById = createAsyncThunk('get/images/id', async (imageId: string, { rejectWithValue }) => {
    try {
        const response = await apiClient.get(`images/${imageId}`);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});


export const getImagesByIdsArray = createAsyncThunk('get/images/ids', async (imageIdsArray: string[], { rejectWithValue }) => {
    try {

        let queryString = imageIdsArray.map((id: string) => `${id}`).join('&');
        const response = await apiClient.get(`images/ids/${queryString}`);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
})

export const updateImage = createAsyncThunk(
    'images/update',
    async ({ imageId, imageData }: { imageId: string; imageData: FormData }, { rejectWithValue }) => {
        try {
            const response = await apiClient.patch(`images/${imageId}`, imageData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteImage = createAsyncThunk('images/delete', async (imageId: string, { rejectWithValue }) => {
    try {
        const response = await apiClient.delete(`images/${imageId}`);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});

const imagesSlice = createSlice({
    name: 'images',
    initialState,

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createImage.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createImage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.image = action.payload;
            })
            .addCase(createImage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            //
            .addCase(getAllImages.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllImages.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.images = action.payload;
            })
            .addCase(getAllImages.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            //

            .addCase(getImagesByIdsArray.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getImagesByIdsArray.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.images = action.payload
            })
            .addCase(getImagesByIdsArray.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
            })

            //
            .addCase(getImageById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getImageById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.image = action.payload;
            })
            .addCase(getImageById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            //
            .addCase(updateImage.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateImage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.images = state.images.map((image) =>
                    image._id === action.payload._id ? action.payload : image
                );
            })
            .addCase(updateImage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            //
            .addCase(deleteImage.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteImage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.images = state.images.filter(
                    (image) => image._id !== action.payload._id
                );
            })
            .addCase(deleteImage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default imagesSlice.reducer;
