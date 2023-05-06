import { Box, Grid, Typography } from "@mui/material";

import { useEffect, useMemo } from "react"
import ProductCard from "./ProductCard";
import './Products.css'



import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { AppStoreState, AppThunkDispatch } from "../../utils/redux/store.types";
import { ProductsInterface, searchProducts } from "../../utils/redux/Slices/products/productsSlice";
import { ProductCategoryInterface, getAllProductCategories } from "../../utils/redux/Slices/products/productCategoriesSlice";

// import { fetchProducts } from "../../assets/redux/products/productsSlice";






const FeaturedProducts = () => {

    const useAppSelector: TypedUseSelectorHook<AppStoreState> = useSelector;
    const dispatch = useDispatch<AppThunkDispatch>()


    const featuredProducts: ProductsInterface[] = useAppSelector((state) => state.productsSlice.products)
    const productStatus = useAppSelector((state) => state.productsSlice.status)



    const productCategories: ProductCategoryInterface[] = useAppSelector((state) => state.categoriesSlice.categories)
    let categoryStatus = useAppSelector((state) => state.categoriesSlice.status)

    useEffect(() => {
        if (categoryStatus === 'idle') {
            dispatch(getAllProductCategories())
        }
    }, [categoryStatus, dispatch])


    useMemo(() => {

        if (productStatus === 'idle') {
            dispatch(searchProducts('featured=true'))
        }

    }, [dispatch, productStatus])


    // console.log('all', featuredProducts.length)
    // console.log('featured', fetchProducts.length)


    return <>

        <Box className="featured-products-wrapper" width={'100%'} bgcolor={'#fbeee3'} >


            <Box width={'90%'} margin={'0 auto'} pb={4}  >

                <Box pl={'3.4em'}>
                    <Typography variant='h2' fontSize={'4em'} color={'black'} align="center" pt={'0.4em'} pb={'0.4em'} sx={{ textDecoration: 'underline', textUnderlineOffset: '0.2em' }}> Featured Products </Typography>
                </Box>

                <Grid display={'flex'}
                    overflow={'scroll'}
                    gap={'1em'}
                    p={'1em'}
                    // py={'1em'}
                    boxShadow={'8px 8px black , -8px 8px black'}


                    sx={{ scrollbarWidth: 'none' }}
                >
                    {featuredProducts && featuredProducts.map((product) => {
                        let category = productCategories.find((cat) => cat._id === product.category)
                        return (

                            <ProductCard key={product._id} product={product} category={category} minWidth="20vw" />

                        )
                    })}

                </Grid>

            </Box>

        </Box>





    </>


}

export default FeaturedProducts