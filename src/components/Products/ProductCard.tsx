
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material"


import { useState, useEffect, forwardRef } from "react"
import './Products.css'

import { ArrowBackIosNew, ArrowForwardIos, Favorite, ReadMore, Share } from "@mui/icons-material"


import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { AppStoreState, AppThunkDispatch } from "../../utils/redux/store.types";

import { ProductsInterface } from "../../utils/redux/Slices/products/productsSlice";

import { ImageInterface, getImagesByIdsArray } from "../../utils/redux/Slices/ImagesSlice";

import { ProductCategoryInterface } from "../../utils/redux/Slices/products/productCategoriesSlice";



interface ProductCardProps {
        product: ProductsInterface
        category?: ProductCategoryInterface | undefined
        minWidth: string
        height?: string
        width?: string,
        headerBg?: string,
        contentBg?: string,
        boxShadow?: string,
        imgHeight?: string

}


const ProductCard = forwardRef(({ product, category, minWidth, headerBg, height, width, contentBg, boxShadow, imgHeight }: ProductCardProps,
        ref: React.Ref<HTMLDivElement>) => {
        const useAppSelector: TypedUseSelectorHook<AppStoreState> = useSelector;
        const dispatch = useDispatch<AppThunkDispatch>()

        useAppSelector((state) => state.imagesSlice.images)


        const [gotImages, setGotImages] = useState(false)
        const [thisProductImages, setThisProductImages] = useState<ImageInterface[]>([]); // Separate state for each ProductCard


        useEffect(() => {
                const imageIds = product.images;
                if (imageIds && imageIds.length > 0 && !gotImages) {
                        dispatch(getImagesByIdsArray(imageIds))
                                .then((images) => {
                                        setThisProductImages(images.payload); // Update the state with the fetched images
                                        setGotImages(true);
                                })
                                .catch((error) => {
                                        // Handle error if necessary
                                });
                }
        }, [product, gotImages, dispatch]);



        const [imageIndex, setImageIndex] = useState(0)
        const numImages = product && product.images.length - 1;

        const handlePreviousClick = () => {
                imageIndex === 0 ? setImageIndex(numImages) : setImageIndex(imageIndex - 1)
        }

        const handleNextClick = () => {
                imageIndex === numImages ? setImageIndex(0) : setImageIndex(imageIndex + 1)
        }



        function getShortDescription(description: string, maxLength = 41) {
                // const indexOfPeriod = description.indexOf(".");
                let shortDescription;
                // if (indexOfPeriod > 0) {
                //         shortDescription = description.slice(0, indexOfPeriod + 1);
                // } else {
                shortDescription = description.slice(0, maxLength) + '...';
                // }
                return shortDescription;
        }

        const productDescription = product && getShortDescription(product.description);



        let genProductName = (name: string) => {

                let names = name.split(' ');
                if (names.length > 2) {
                        return names[0] + ' ' + names[2]
                }
                return names


        }
        let productName = product && genProductName(product.name)


        return <>



                <Card
                        ref={ref}
                        sx={{
                                height: height ? height : '24rem',
                                width: width ? width : '20rem',
                                minWidth: { minWidth }, maxWidth: '300px',
                                bgcolor: headerBg ? headerBg : '#c5c5fd',
                                boxShadow: '5px 5px black', color: '#f4c945',
                                display: 'flex', flexDirection: 'column', borderRadius: '2em',
                                mx: '0.4em', my: '1em',
                                border: '2px solid black'


                        }}>
                        <CardHeader
                                avatar={
                                        <Avatar sx={{ bgcolor: '#ff5a34 ', color: 'black', fontWeight: '600' }} aria-label="category">
                                                {category && category.name.slice(0, 1)}
                                        </Avatar>
                                }
                                // action={<IconButton aria-label="settings"> <ArrowDownward sx={{ color: 'black' }} /> </IconButton>}
                                title={<Typography color={'#f4c945'} fontWeight={'900'} fontSize={'0.9em'}
                                        sx={{ textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black' }}
                                >
                                        {productName}
                                </Typography>}
                                subheader={<Typography color={'black'}> {category ? category.name : 'category'}</Typography>}

                                sx={{ py: '1em', px: '2em', mt: '1em', fontWeight: '800', minHeight: '2em', height: '20%' }}
                        />

                        <Box bgcolor={contentBg ? contentBg : '#fe91e7'} height={'80%'} >

                                <Box position="relative" pb={'4px'} height={'50%'}>
                                        {thisProductImages.length > 0 &&
                                                <CardMedia
                                                        component="img"
                                                        height={imgHeight ? imgHeight : "174"}
                                                        image={thisProductImages[imageIndex].url}
                                                        alt={productName + "Image"}
                                                />}

                                        <IconButton
                                                onClick={handlePreviousClick}
                                                sx={{
                                                        position: "absolute",
                                                        top: "40%",
                                                        left: "1%",
                                                        // backgroundColor: "rgba(255, 255, 255, 0.5)",
                                                        // "&:hover": {
                                                        //         backgroundColor: "rgba(255, 255, 255, 0.8)",
                                                        // },
                                                }}
                                        >
                                                <ArrowBackIosNew sx={{ color: 'black' }} />
                                        </IconButton>

                                        <IconButton
                                                onClick={handleNextClick}
                                                sx={{
                                                        position: "absolute",
                                                        top: "40%",
                                                        right: "1%",
                                                        // backgroundColor: "rgba(255, 255, 255, 0.5)",
                                                        // "&:hover": {
                                                        //         backgroundColor: "rgba(255, 255, 255, 0.8)",
                                                        // },
                                                }}
                                        >
                                                <ArrowForwardIos sx={{ color: 'black' }} />
                                        </IconButton>
                                </Box>


                                <Box height={'50%'}>

                                        <CardContent sx={{ height: '30%' }} >
                                                <Typography variant="body1" color="black">
                                                        {productDescription}
                                                </Typography>
                                        </CardContent>


                                        <CardActions disableSpacing sx={{ height: '10%' }}>
                                                <IconButton aria-label="add to favorites">
                                                        <Favorite sx={{ color: '#f8cb46' }} />
                                                </IconButton>
                                                <IconButton aria-label="share">
                                                        <Share sx={{ color: '#f8cb46' }} />
                                                </IconButton>

                                                {product && <IconButton sx={{ marginLeft: 'auto' }} aria-label="read more" href={`/product/${product._id}`}>
                                                        <ReadMore sx={{ color: '#f8cb46' }} />
                                                </IconButton>}
                                        </CardActions>
                                </Box>

                        </Box>

                </Card >
        </>



})

export default ProductCard









