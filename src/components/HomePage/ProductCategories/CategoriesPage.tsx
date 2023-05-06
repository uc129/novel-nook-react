import { ArrowForwardIos, Home } from "@mui/icons-material"
import { Box, Grid, IconButton, Typography } from "@mui/material"
import ProgressBar from "../../utils/ProgressBar"
import { blue } from "@mui/material/colors"

import ShoppingCartButton from "../../utils/ShoppingCartButton"
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux"

import { AppStoreState, AppThunkDispatch } from "../../../utils/redux/store.types"
import { ProductCategoryInterface, getAllProductCategories } from "../../../utils/redux/Slices/products/productCategoriesSlice"
import { useEffect, useMemo, useState } from "react"
import { getImageById } from "../../../utils/redux/Slices/ImagesSlice"

import { CSSTransition, SwitchTransition } from 'react-transition-group';
import './CategoriesPage.css'

const CategoriesPage = () => {

    const useAppSelector: TypedUseSelectorHook<AppStoreState> = useSelector;
    const dispatch = useDispatch<AppThunkDispatch>();
    const categories: ProductCategoryInterface[] = useAppSelector((state) => state.categoriesSlice.categories);

    const [gotCategories, setGotCategories] = useState(false);
    const [imagesFetched, setImagesFetched] = useState(false); // New state variable to track if images are fetched

    const imageStatus = useAppSelector((state) => state.imagesSlice.status);
    const categoriesStatus = useAppSelector((state) => state.categoriesSlice.status);
    useAppSelector((state) => state.imagesSlice.images);
    const [allImages, setAllImages] = useState<any[]>([]);

    const [categoryIndex, setCategoryIndex] = useState(0)


    const taglineHardcoded = [
        {
            line1: 'Put together a new look',
            line2: 'for a warm evening'

        }, {
            line1: 'Express Yourself with',
            line2: 'Unique Accessories'

        }, {
            line1: 'Elevate Your',
            line2: 'Stationery Game'

        }, {
            line1: 'Make a Statement',
            line2: 'with Designer Business Cards'

        }, {
            line1: 'Unveil Your True Color',
            line2: 'with Vibrant Accessories'

        },
        {
            line1: 'Unveil Your True Color',
            line2: 'with artistic paintings'

        },
    ]



    useEffect(() => {
        if (!gotCategories) {
            if (categoriesStatus === 'idle') {
                dispatch(getAllProductCategories());
            }
            categories.length > 0 && setGotCategories(true);
        }
    }, [dispatch, gotCategories, categoriesStatus, categories]);




    // const [prevCategoryIndex, setPrevCategoryIndex] = useState(categoryIndex - 1);

    // useEffect(() => {
    //     setPrevCategoryIndex(categoryIndex - 1);
    // }, [categoryIndex]);





    useMemo(() => {
        const fetchedImages: any[] = [];
        if (gotCategories && imageStatus === 'idle' && !imagesFetched) {
            Promise.all(
                categories.map(async (category) => {
                    if (category.images.length > 0) {
                        const fetchedImage = await dispatch(getImageById(String(category.images[0])));
                        fetchedImages.push(fetchedImage.payload);
                    }
                })
            ).then(() => {
                setAllImages(fetchedImages);
                setImagesFetched(true); // Set imagesFetched state to true after fetching images
            });
        }

    }, [dispatch, gotCategories, imageStatus, categories, imagesFetched]);




    const handleCurrentStep = (data: any) => {
        setCategoryIndex(data)
    }



    return (

        <>
            <Box className='wrapper' width={'100vw'} height={'100vh'} borderRadius={'10px'} overflow={'hidden'} >
                {/* content- header*/}

                <Box className='header' height={'10vh'} width={'100vw'} display={'flex'} justifyContent={'center'} borderBottom={'2px solid #1a1a1a'} >

                    <Box width={'84%'} height={'90%'} display={'flex'} flexDirection={'column'} justifyContent={'center'}>

                        <Box display={'flex'} width={'100%'} justifyContent={'space-between'} >
                            <Typography variant="h3" fontWeight={'bold'} color={'#1a1a1a'} textTransform={'uppercase'}> Explore Categories  </Typography>

                            <Box className='nav' color={'#1a1a1a'}>
                                <IconButton sx={{ color: '#1a1a1a' }} href="/" > <Home /> </IconButton>
                            </Box>
                        </Box>

                    </Box>
                </Box>

                <Box className='content-wrapper' width={'100vw'} height={'85vh'} display={'flex'}
                    justifyContent={'flex-end'} borderBottom={'2px solid #1a1a1a'}>




                    {/* content-grid */}
                    <Grid container className="content-container" width={'94vw'} height={'94vh'} borderLeft={'1px solid #1a1a1a'}>

                        {/* Left Box */}
                        <Grid item xs={6} display={'flex'} height={'100%'} width={'100%'} justifyContent={'center'} alignItems={'space-between'}>

                            <Grid container >
                                <Grid item xs={12}>
                                    {/* Empty Grid item */}
                                </Grid>

                                <Grid item xs={2}>
                                    {/* Empty Grid item */}
                                </Grid>
                                <Grid item xs={10} height={'20%'} width={'100%'} sx={{ transform: 'translateX(-2%)' }} >
                                    <ProgressBar getCurrentStep={handleCurrentStep} width={'20vw'} steps={categories.length - 1} minWidth={'100px'} maxWidth="24vw" />
                                </Grid>

                                <Grid item xs={2}>
                                    {/* Empty Grid item */}
                                </Grid>

                                <Grid item xs={10} >
                                    <Box>

                                        <Box className='categories-info'>

                                            {/* Transition Group 1 */}

                                            <SwitchTransition mode={'out-in'}>
                                                <CSSTransition
                                                    key={categoryIndex}
                                                    classNames={'fade-1'}
                                                    addEndListener={(node, done) => {
                                                        node.addEventListener('transitionend', done, false);
                                                    }}
                                                >
                                                    <Typography position={'relative'} fontSize={'2.2em'} variant="h3"
                                                        fontWeight={'bold'} color={'#1a1a1a'} pb={'0.4vh'} textTransform={'uppercase'}>
                                                        {categories.length > 0 && categories[categoryIndex].name}
                                                    </Typography>
                                                </CSSTransition>
                                            </SwitchTransition>

                                            <SwitchTransition mode={'out-in'}>
                                                <CSSTransition
                                                    key={categoryIndex}
                                                    classNames={'fade-2'}
                                                    addEndListener={(node, done) => {
                                                        node.addEventListener('transitionend', done, false);
                                                    }}
                                                >
                                                    <Typography variant="body1" color={'#1a1a1a'} pb={'6vh'}>
                                                        {categories.length > 0 && categories[categoryIndex].description.slice(0, 32)} <br />
                                                        {categories.length > 0 && categories[categoryIndex].description.slice(32,)}
                                                    </Typography>
                                                </CSSTransition>
                                            </SwitchTransition>







                                            <IconButton sx={{ backgroundColor: 'yellow', borderRadius: '20%/80%', width: '8em', height: '2em' }}>
                                                <Typography variant="body1" fontWeight={'bold'} textTransform={'uppercase'}> View More</Typography>
                                                <ArrowForwardIos sx={{ height: '14px' }} />
                                            </IconButton>

                                        </Box>

                                    </Box>



                                </Grid>
                            </Grid>



                        </Grid>




                        {/* Right Box */}
                        <Grid item xs={6} height={'90%'} width={'100%'} display={'flex'}
                            flexDirection={'column'} alignItems={'center'} justifyContent={'center'} >


                            <Grid container width={'80%'} height={'80%'} borderRadius={'10%'} bgcolor={blue[400]}>

                                <Grid item xs={6} display={'flex'} flexDirection={'column'} justifyContent={'space-between'} padding={'4px'}>
                                    <Typography variant="h5" fontWeight={'bold'} textTransform={'uppercase'} p={'18%'}
                                        sx={{ textDecoration: 'underline', textUnderlineOffset: '2px', textDecorationThickness: '2px' }}>
                                        Already<br />on Sale
                                    </Typography>

                                    <Box mb={'10%'} >
                                        <Box pl={'14%'} mb={'10%'}>
                                            <ShoppingCartButton icon_height={'3em'} />
                                        </Box>


                                        <SwitchTransition mode={'out-in'}>
                                            <CSSTransition
                                                key={categoryIndex}
                                                classNames={'fade-1'}
                                                addEndListener={(node, done) => {
                                                    node.addEventListener('transitionend', done, false);
                                                }}
                                            >

                                                <Box pl={'18%'}>
                                                    <Typography variant="body2" fontWeight={'bold'} textTransform={'uppercase'}>
                                                        {categories.length > 0 && categories[categoryIndex].tagline ?
                                                            categories[categoryIndex].tagline.slice(0, 11) : taglineHardcoded[categoryIndex].line1}
                                                    </Typography>
                                                    <Typography variant="body2" fontWeight={'bold'} textTransform={'uppercase'}>
                                                        {categories.length > 0 && categories[categoryIndex].tagline ?
                                                            categories[categoryIndex].tagline.slice(11,) : taglineHardcoded[categoryIndex].line2}
                                                    </Typography>
                                                </Box>

                                            </CSSTransition>
                                        </SwitchTransition>

                                    </Box>
                                </Grid>


                                <Grid item xs={6} height={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'center'} borderRadius={'20%'}>

                                    <SwitchTransition mode={'out-in'}>
                                        <CSSTransition
                                            key={categoryIndex}
                                            classNames={'fade-image'}
                                            addEndListener={(node, done) => {
                                                node.addEventListener('transitionend', done, false);
                                            }}
                                        >
                                            <>
                                                {allImages.length > 0 &&
                                                    <img style={{ width: '140%', objectFit: 'cover', transform: 'translateX(-34%)', backgroundClip: 'content-box' }}
                                                        src={allImages[categoryIndex].url} alt='category' />
                                                }
                                            </>
                                        </CSSTransition>
                                    </SwitchTransition>

                                </Grid>





                            </Grid>




                        </Grid>



                    </Grid>

                    {/* content-end */}
                </Box>


            </Box >





        </>)



}


export default CategoriesPage