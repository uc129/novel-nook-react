// store.ts or store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./Slices/products/productsSlice";
import productCategoriesSlice from "./Slices/products/productCategoriesSlice";
import productReviewSlice from "./Slices/products/productReviewSlice";
import productTagsSlice from "./Slices/products/productTagsSlice";
import cartSlice from "./Slices/cartSlice";
import designerSlice from "./Slices/users/designerSlice";
import testimonialSlice from "./Slices/testimonialSlice";
import wishlistSlice from "./Slices/wishlistSlice";
import customerSlice from "./Slices/users/customerSlice";
import addressSlice from "./Slices/addressSlice";
import orderSlice from "./Slices/orderSlice";
import ImagesSlice from "./Slices/ImagesSlice";
import subCategoriesSlice from "./Slices/products/subCategoriesSlice";
import productBundleSlice from "./Slices/products/productBundleSlice";

const store = configureStore({
    reducer: {
        productsSlice: productsReducer,
        categoriesSlice: productCategoriesSlice,
        subcategoriesSlice: subCategoriesSlice,
        reviewsSlice: productReviewSlice,
        tagsSlice: productTagsSlice,
        customerSlice: customerSlice,
        designerSlice: designerSlice,
        testimonialSlice: testimonialSlice,
        addressSlice: addressSlice,
        imagesSlice: ImagesSlice,
        orderSlice: orderSlice,
        cartSlice: cartSlice,
        wishlistSlice: wishlistSlice,
        bundlesSlice: productBundleSlice
    },
    devTools: false
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
