import { Typography, Grid, Card, CardContent, Box } from "@mui/material"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppStoreState, AppThunkDispatch } from "../../utils/redux/store.types";
import { useEffect, useState } from "react";
import { searchProducts } from "../../utils/redux/Slices/products/productsSlice";

interface RelatedProductsProps {
    searchString: string
}

const RelatedProducts = ({ searchString }: RelatedProductsProps) => {
    const useAppSelector: TypedUseSelectorHook<AppStoreState> = useSelector;
    const dispatch = useDispatch<AppThunkDispatch>()
    const relatedProducts = useAppSelector((state) => state.productsSlice.products)
    const [gotRelatedProducts, setGotRelatedProducts] = useState(false)
    const relatedProductsStatus = useAppSelector((state) => state.productsSlice.status)


    //get related products

    useEffect(() => {
        if (searchString.length > 0 && !gotRelatedProducts) {
            dispatch(searchProducts(`${searchString}`))
            setGotRelatedProducts(true)
        }
    }, [dispatch, relatedProductsStatus, searchString, gotRelatedProducts])

    // console.log('related', relatedProducts);


    return <>
        <Box bgcolor={'#1a1a1a'}>
            <Typography variant="h4">You may also like</Typography>
            <Grid container spacing={2}>
                {relatedProducts.map((relatedProduct) => (
                    <Grid item xs={6} sm={4} md={3} key={relatedProduct?._id}>
                        <Card>
                            {/* <CardMedia
                            component="img"
                            image={relatedProduct?.images[0]?.url}
                            alt={relatedProduct?.name}
                        /> */}
                            <CardContent>
                                <Typography variant="h6">{relatedProduct?.name}</Typography>
                                <Typography variant="body2">{relatedProduct?.description}</Typography>
                                <Typography variant="caption">{`Price: $${relatedProduct?.price}`}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>

    </>
}

export default RelatedProducts

