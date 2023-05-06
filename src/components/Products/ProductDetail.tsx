import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { AppStoreState, AppThunkDispatch } from "../../utils/redux/store.types";

import { Box, Typography, Button, IconButton, Divider } from '@mui/material';
import { FavoriteBorder, ShoppingCart, ArrowBackIos, ArrowForwardIos, FavoriteBorderSharp } from '@mui/icons-material';
import styled from "@emotion/styled";


import { useEffect, useState } from "react";
import { getProductById } from "../../utils/redux/Slices/products/productsSlice";
import { ImageInterface, getImageById } from "../../utils/redux/Slices/ImagesSlice";
// import { getDesignerById } from "../../utils/redux/Slices/users/designerSlice";
// import { getProductCategoryById } from "../../utils/redux/Slices/products/productCategoriesSlice";
// import { ProductReviewInterface, getProductReviewById } from "../../utils/redux/Slices/products/productReviewSPropslice";
import DesignerInfo from "../Designers/DesignerInfo";
import RelatedProducts from "./RelatedProducts";
import ReviewsInfo from "../Reviews/ReviewsInfo";
import Loading from "../utils/Loading";
// import ReviewsInfo from "../Reviews/ReviewsInfo";


const ImageContainer = styled(Box)`
  position: relative;
  overflow: hidden;
`;


const ImageControls = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 0.5rem;
`;


const ProductDetail = () => {


    const { productID } = useParams()
    // console.log('productID', productID)

    const useAppSelector: TypedUseSelectorHook<AppStoreState> = useSelector;
    const dispatch = useDispatch<AppThunkDispatch>()

    const product = useAppSelector((state) => state.productsSlice.product);
    // const productStatus = useAppSelector((state) => state.productsSlice.status)

    useAppSelector((state) => state.imagesSlice.images)
    // const imagesStatus = useAppSelector((state) => state.imagesSlice.status)


    // const categories = useAppSelector((state) => state.categoriesSlice.categories)
    // const categoryStatus = useAppSelector((state) => state.categoriesSlice.status)

    const [allProductImages, setAllProductImages] = useState<ImageInterface[]>([])


    useEffect(() => {
        dispatch(getProductById(String(productID)));
    }, [productID, dispatch]);



    useEffect(() => {
        const fetchImages = async () => {
            if (product.images) {
                const fetchedImages = await Promise.all(
                    product.images.map((image: any) => dispatch(getImageById(String(image))))
                );
                setAllProductImages(fetchedImages.map((imageData) => imageData.payload));
            }
        };
        fetchImages();
    }, [dispatch, product]);

    // console.log('products', product)















    const [isWishlist, setIsWishlist] = useState(false);
    const [isCart, setIsCart] = useState(false);

    const handleWishlistClick = () => {
        setIsWishlist(!isWishlist);
        // Your logic to add or remove the item from the wishlist
    };

    const handleCartClick = () => {
        setIsCart(!isCart);
        // Your logic to add or remove the item from the cart
    };


    let relatedProductSearchString = `category=${product.category}`
    let productDesignerProps = product.designer
    let productReviewsProps = product.reviews

    return <>
        {product.name ?
            <Box height={'100vh'} width={'100vw'} bgcolor={'#1a1a1a'}>
                <ImageContainer>
                    <Box>
                        {allProductImages.length > 0 && <img src={allProductImages[0].url} style={{ height: 442 }} alt='product' />}
                    </Box>
                    <ImageControls>
                        <IconButton color="inherit">
                            <ArrowBackIos />
                        </IconButton>
                        <IconButton color="inherit">
                            <ArrowForwardIos />
                        </IconButton>
                    </ImageControls>
                </ImageContainer>

                <Box my={2}>
                    <Typography variant="h2">{product.name}</Typography>
                    <Typography variant="body1">{product.description}</Typography>
                    <Typography variant="h4">{`$ ${product.price}`}</Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Button variant="contained" color="primary" onClick={handleCartClick} startIcon={<ShoppingCart />}>
                        Add to Cart
                    </Button>
                    <IconButton onClick={() => handleWishlistClick()}>
                        {isWishlist === true ? <FavoriteBorderSharp /> : <FavoriteBorder />}
                    </IconButton>
                </Box>

                <Divider />

                {product &&
                    <>
                        <Box alignItems="center" >
                            {product.designer && <DesignerInfo designerId={productDesignerProps} />}
                        </Box>
                        <Divider />

                        <Box >
                            {(product.reviews.length > 0) ? <ReviewsInfo reviewIdList={productReviewsProps} /> : <Typography bgcolor={'#1a1a1a'} pt={'2em'}> No Product Reviews </Typography>}
                        </Box>
                        <Divider />

                        <Box pb={'2em'} >
                            {product.category && <RelatedProducts searchString={relatedProductSearchString} />}
                        </Box>
                    </>
                }
            </Box > : <Loading />
        }

    </>

}

export default ProductDetail