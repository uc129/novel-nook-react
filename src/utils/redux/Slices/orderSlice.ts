import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../axios/apiClient";

export interface OrderInterface {
    _id: String,
    customer: String,
    products: [{
        product: String,
        quantity: Number,
        customizationOptions: { color: String, size: String, monogram: String }
    }],
    total_amount: Number,
    discount_percent: Number,
    discounted_amount: Number,
    order_status: String,
    payment_status: String,
}


const initialState = {
    orders: [] as OrderInterface[],
    status: "idle",
    error: null as unknown,
};

export const createOrder = createAsyncThunk(
    "orders/createOrder",
    async (newOrder: OrderInterface) => {
        const response = await apiClient.post("/api/orders/", newOrder);
        return response.data;
    }
);

export const getAllOrders = createAsyncThunk(
    "orders/getAllOrders",
    async () => {
        const response = await apiClient.get("/api/orders/");
        return response.data;
    }
);

export const getOrderById = createAsyncThunk(
    "orders/getOrderById",
    async (orderId: string) => {
        const response = await apiClient.get(`/api/orders/${orderId}`);
        return response.data;
    }
);

export const updateOrder = createAsyncThunk(
    "orders/updateOrder",
    async ({ orderId, updatedOrder }: { orderId: string; updatedOrder: OrderInterface }) => {
        const response = await apiClient.patch(`/api/orders/${orderId}`, updatedOrder);
        return response.data;
    }
);

export const deleteOrder = createAsyncThunk(
    "orders/deleteOrder",
    async (orderId: string) => {
        const response = await apiClient.delete(`/api/orders/${orderId}`);
        return response.data;
    }
);

export const getOrdersByCustomerId = createAsyncThunk(
    "orders/getOrdersByCustomerId",
    async (customerId: string) => {
        const response = await apiClient.get(`/api/orders/customers/${customerId}/orders`);
        return response.data;
    }
);

export const addProductToOrder = createAsyncThunk(
    "orders/addProductToOrder",
    async ({ orderId, product }: any) => {
        const response = await apiClient.post(`/api/orders/${orderId}/products/add-product`, product);
        return response.data;
    }
);

export const updateProductInOrder = createAsyncThunk(
    "orders/updateProductInOrder",
    async ({ orderId, product }: any) => {
        const response = await apiClient.patch(`/api/orders/${orderId}/products/${product.product}`, product);
        return response.data;
    }
);

export const removeProductFromOrder = createAsyncThunk(
    "orders/removeProductFromOrder",
    async ({ orderId, productId }: any) => {
        const response = await apiClient.delete(`/api/orders/${orderId}/products/${productId}`);
        return response.data
    }
);

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrders.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.orders = action.payload;
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(getOrderById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getOrderById.fulfilled, (state, action) => {
                state.status = "succeeded";
                const index = state.orders.findIndex((order) => order._id === action.payload._id);
                if (index === -1) {
                    state.orders.push(action.payload);
                } else {
                    state.orders[index] = action.payload;
                }
            })
            .addCase(getOrderById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(updateOrder.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.status = "succeeded";
                const index = state.orders.findIndex((order) => order._id === action.payload._id);
                if (index !== -1) {
                    state.orders[index] = action.payload;
                }
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteOrder.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.orders = state.orders.filter((order) => order._id !== action.payload);
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addProductToOrder.fulfilled, (state, action) => {
                state.status = "succeeded";
                const index = state.orders.findIndex((order) => order._id === action.payload._id);
                if (index !== -1) {
                    state.orders[index] = action.payload;
                }
            })
            .addCase(addProductToOrder.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(updateProductInOrder.fulfilled, (state, action) => {
                state.status = "succeeded";
                const index = state.orders.findIndex((order) => order._id === action.payload._id);
                if (index !== -1) {
                    state.orders[index] = action.payload;
                }
            })
            .addCase(updateProductInOrder.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            .addCase(removeProductFromOrder.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.orders = state.orders.map((order) => {
                    if (order._id === action.payload.order_id) {

                        order.products.filter((item) => {
                            return item.product !== action.payload;
                        });


                    }
                    return order;
                });
            })

            .addCase(removeProductFromOrder.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },

});

export default orderSlice.reducer;





