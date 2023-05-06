import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { AppStoreState, AppThunkDispatch } from "../../utils/redux/store.types";
import { useCallback, useEffect, useRef, useState } from "react";
import { getAllProductCategories } from "../../utils/redux/Slices/products/productCategoriesSlice";
import CategoryCard from "../Categories/CategoryCard";
import { Box, Checkbox, FormControlLabel, FormGroup, Grid, IconButton, List, ListItemButton, ListSubheader, Typography } from "@mui/material";
import { getAllProductBundles } from "../../utils/redux/Slices/products/productBundleSlice";
import BundleCard from "../Bundles/BundleCard";
import { getPaginatedProducts } from "../../utils/redux/Slices/products/productsSlice";
import ProductCard from "../Products/ProductCard";
import { getAllProductSubCategories } from "../../utils/redux/Slices/products/subCategoriesSlice";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import React from "react";

const ShopPage = () => {

    const useAppSelector: TypedUseSelectorHook<AppStoreState> = useSelector;
    const dispatch = useDispatch<AppThunkDispatch>()

    const categories = useAppSelector((state) => state.categoriesSlice.categories);
    const categoriesStatus = useAppSelector((state) => state.categoriesSlice.status);

    const bundles = useAppSelector((state) => state.bundlesSlice.bundles);
    const bundlesStatus = useAppSelector((state) => state.bundlesSlice.status);

    const allProducts = useAppSelector((state) => state.productsSlice.products);
    // const productsStatus = useAppSelector((state) => state.productsSlice.status);

    const subcategories = useAppSelector((state) => state.subcategoriesSlice.subcategories);
    const subcategoriesStatus = useAppSelector((state) => state.subcategoriesSlice.status);


    useEffect(() => {

        if (subcategoriesStatus === 'idle') {
            dispatch(getAllProductSubCategories())
        }
    }, [dispatch, subcategoriesStatus])

    useEffect(() => {
        if (bundlesStatus === 'idle') {
            dispatch(getAllProductBundles())
        }
    }, [bundlesStatus, dispatch])

    useEffect(() => {
        if (categoriesStatus === 'idle') {
            dispatch(getAllProductCategories())
        }
    }, [dispatch, categoriesStatus])


    const [page, setPage] = useState(1);



    useEffect(() => {
        dispatch(getPaginatedProducts(page));
    }, [dispatch, page]);




    let productBrands: string[] = [];

    if (allProducts.length > 0) {
        productBrands = allProducts.map((product) => product.brand)
        let uniq = (a: string[]) => [...new Set(a)];
        productBrands = uniq(productBrands)
    }

    // console.log('all Products', allProducts);




    const [bundleIndex, setBundleIndex] = useState(0)
    const bundlesLength = bundles.length - 1

    const handleBundleLeftClick = () => {
        if (bundleIndex === 0) setBundleIndex(bundlesLength)
        else setBundleIndex(bundleIndex - 1)
    }

    const handleBundleRightClick = () => {
        if (bundleIndex === bundlesLength) setBundleIndex(0)
        else setBundleIndex(bundleIndex + 1)
    }

    //pagination





    const hasMore = useAppSelector((state) => state.productsSlice.hasMore);
    const lastProductRef = useRef(null);


    const getIntersectionOptions = () => {
        const screenWidth = window.innerWidth;
        let rootMargin = "20px";
        let threshold = 0.4;

        if (screenWidth <= 480) { // For small screens
            rootMargin = "10px";
            threshold = 0.7;
        } else if (screenWidth > 480 && screenWidth <= 1024) { // For medium screens
            rootMargin = "15px";
            threshold = 0.6;
        }

        return { rootMargin, threshold };
    };

    const lastProductCallback = useCallback(
        (entries: any) => {
            const [entry] = entries;
            console.log('entry', entry);

            if (entry.isIntersecting && hasMore && allProducts.length > 0) {
                console.log("Intersection event triggered");
                setPage((prevPage) => prevPage + 1);
                console.log('num of products', allProducts.length);

            }
        },
        [hasMore, allProducts.length]
    );

    useEffect(() => {

    }, [lastProductCallback, lastProductRef]);


    useEffect(() => {
        if (!lastProductRef.current) return;

        const { rootMargin, threshold } = getIntersectionOptions();

        const observer = new IntersectionObserver(lastProductCallback, {
            root: null,
            rootMargin: rootMargin,
            threshold: threshold,
        });

        observer.observe(lastProductRef.current);

        return () => {
            observer.disconnect();
        };
    }, [lastProductCallback, lastProductRef]);








    return (
        <Box className='shop-wrapper' width={'90%'} margin={'0 auto'}>
            <Typography variant="h2" textAlign={'center'} py={4}> Novel Nook Shop</Typography>

            <Box className='products-bundle-wrapper' height={'40vh'} mb={'2vh'}>

                {bundlesStatus === 'succeeded' &&
                    <Box height={'40%'} width={'90%'} margin={'0 auto'}>
                        <Box position={'relative'}>
                            <BundleCard key={bundleIndex + 100} bundle={bundles[bundleIndex]} width={'80vw'} height="35vh" />
                        </Box>
                        <Box display={'flex'} width={'100%'} justifyContent={'space-between'} >
                            <IconButton onClick={handleBundleLeftClick} sx={{ position: 'absolute', top: '15em', left: '8em' }}> <ArrowLeft /> </IconButton>
                            <IconButton onClick={handleBundleRightClick} sx={{ position: 'absolute', top: '15em', right: '8em' }}> <ArrowRight /> </IconButton>
                        </Box>
                    </Box>

                }


            </Box>


            <Box className='category-cards-wrapper' mb={'2em'} display={'flex'} gap={2} justifyContent={'space-between'}
                overflow={'scroll'}
                height={'52vh'}>
                {categoriesStatus === 'succeeded' && categories.map((category) => {
                    let categorySubIds = category.subcategories;
                    let catSubs: any[] = [];
                    subcategories.map((sub) => {
                        categorySubIds.map((subId) => {
                            if (sub._id === subId) catSubs.push(sub)
                            return sub
                        })
                        return sub
                    })
                    return <CategoryCard key={category._id} category={category} subcategories={catSubs} />
                })}
            </Box>

            <Grid container>

                <Grid item className="sidebar" xs={2}>
                    <List>
                        <React.Fragment key={'categories-list'}>
                            <ListSubheader key={'categories'} > Categories </ListSubheader>
                            {categories && categories.map((category) =>
                                <ListItemButton key={category._id + category.name + 1} href={'/'}>
                                    <Typography fontWeight={'600'}>{category.name}</Typography>
                                </ListItemButton>
                            )}
                        </React.Fragment>
                    </List>

                    <List>
                        <React.Fragment key={'brands-list'}>
                            <ListSubheader key={'brands'} > Brands </ListSubheader>
                            <FormGroup key={'brands-form-group'}>
                                {productBrands.length > 0 && productBrands.map((brand) =>
                                    <FormControlLabel key={brand} control={<Checkbox defaultChecked />} label={brand} />
                                )}
                            </FormGroup>
                        </React.Fragment>
                    </List>
                </Grid>

                <Grid item xs={1}>

                </Grid>



                <Grid item xs={8.5}
                    className='all-products-wrapper'
                    display={'flex'} flexWrap={'wrap'}
                    justifyContent={'space-evenly'}
                    height={'100%'}
                >
                    {allProducts.length > 1 &&
                        allProducts.map((product, index) => {
                            let cat = categories.find((item) => product && item._id === product.category)
                            return (
                                <Box key={product._id} ref={index === allProducts.length - 1 ? lastProductRef : null}>
                                    <ProductCard
                                        product={product}
                                        category={cat}
                                        width="18vw"
                                        height="42vh"
                                        minWidth="200px"
                                        headerBg="#1f3eew"
                                        contentBg="yge623"
                                        imgHeight="140"
                                    />
                                </Box>
                            )
                        }
                        )}
                    <Grid item xs={12} mt={'2em'} width={'30%'}>
                        {/* <Button variant="text" > Previous</Button>
                        <Button key={page} variant='text' >{page}</Button>
                        <Button variant="text" > Next</Button> */}
                    </Grid>
                </Grid>
                {/* <Grid item xs={5.5}>

                </Grid>
                <Grid item xs={4}>
                    <Box margin={'0 auto'} >
                        <Button variant="text" onClick={handleProductNextPageClick} > Next</Button>
                        {pagesArray && pagesArray.map((page) => <Button variant='text' onClick={() => handleProductPageNumberClick(page)}>{page}</Button>)}
                        <Button variant="text" onClick={handleProductPreviousPageClick}> Previous</Button>
                    </Box>
                </Grid> */}

                <Grid item xs={8} className='recommended-products-wrapper'>

                </Grid>

            </Grid >

        </Box>)

}

export default ShopPage