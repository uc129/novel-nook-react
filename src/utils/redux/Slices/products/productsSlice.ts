import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// import { ProductInterface } from '../../components/Products/ProductCard';
import apiClient from '../../../axios/apiClient';


export interface ProductsInterface {

    _id: string,
    name: string,
    description: string,
    price: number,
    category: string,
    subcategory: string,
    tagline: string,
    reviews: string[],
    featured: boolean,
    brand: string,
    designer: string,
    status: string,
    images: string[],
    tags: string[],


    limitedEdition: boolean,
    stockCount: number,

    discounted: boolean,
    discountPercentage: string,
    discountEndTime: string,

    saleCount: number,
    viewsCount: number,
    bestSeller: boolean,
    mostViewed: boolean,

}

// Async thunks
export const createProduct = createAsyncThunk('product/create', async (productData) => {
    try {
        const response = await apiClient.post('/products/create', productData);
        return response.data;
    } catch (error: any) {
        return (error.message);
    }
});

export const getAllProducts = createAsyncThunk('product/all', async (_) => {
    try {
        const response = await apiClient.get('/products/all');
        return response.data;
    } catch (error: any) {
        return (error.message);
    }
});



export const getPaginatedProducts = createAsyncThunk('product/paginated', async (page: number) => {
    try {
        const response = await apiClient.get(`/products/paginated?page=${page}`)
        return response.data;
    }
    catch (error: any) {
        return error.message
    }
})

export const getProductById = createAsyncThunk('product/id', async (productId: string) => {
    try {
        const response = await apiClient.get(`/products/id/${productId}`);
        return response.data;
    } catch (error: any) {
        return (error.message);
    }
});

export const searchProducts = createAsyncThunk('product/search', async (query: any) => {
    try {
        const response = await apiClient.get(`/products/search/${query}`);
        return response.data;
    } catch (error: any) {
        return error.message;
    }
});

export const updateProduct = createAsyncThunk('product/update', async ({ productId, productData }: any) => {
    try {
        const response = await apiClient.patch(`/products/update/${productId}`, productData);
        return response.data;
    } catch (error: any) {
        return (error.message);
    }
});

export const deleteProduct = createAsyncThunk('product/delete', async (productId) => {
    try {
        const response = await apiClient.delete(`/products/delete/${productId}`);
        return response.data;
    } catch (error: any) {
        return (error.message);
    }
});

// Product slice
const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [] as ProductsInterface[],
        product: {} as ProductsInterface,
        hasMore: true,
        status: 'idle',
        error: null as unknown,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error;
            })
            //
            .addCase(getPaginatedProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getPaginatedProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
                state.hasMore = action.payload.length > 0;
            })
            .addCase(getPaginatedProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error;
            })


            //
            .addCase(getProductById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.product = action.payload;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error;
            })

            //
            .addCase(createProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products.push(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error;
            })

            //
            .addCase(searchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(searchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error;
            })

            //
            .addCase(updateProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = state.products.map((product) =>
                    product._id === action.payload._id ? action.payload : product
                );
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error;
            })

            //
            .addCase(deleteProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = state.products.filter((product) => product._id !== action.payload._id);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error;
            });

    },
});

export default productSlice.reducer;