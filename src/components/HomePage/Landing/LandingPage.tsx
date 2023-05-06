import { Box, Button, Grid, IconButton, Typography } from "@mui/material"
import { ArrowForwardIos } from "@mui/icons-material"
import { blue } from "@mui/material/colors"
import './LandingPage.css'
import NavigationMenu from "../../NavigationMenu/NavigationMenu"
import ShoppingCartButton from "../../utils/ShoppingCartButton"


import socks from '../../../assets/images/colorful-socks.png'
import mug from '../../../assets/images/enamel-mug.png'
import hoodie from '../../../assets/images/hoodie-1.png'
import stickers from '../../../assets/images/stickers.png'
import tape from '../../../assets/images/tape.png'

import cartIcon from '../../../assets/svg/cart-lines-1-svgrepo-com.svg'
import circleText from '../../../assets/svg/circle-text.svg'





const LandingPage = () => {


    return (
        <>
            <Box height={'100vh'} width={'100vw'} margin={'0 auto'} className='landing-wrapper' >

                <Box className='navbar' >
                    <NavigationMenu />
                </Box>

                <Box width={'90vw'} margin={'0 auto'} >



                    <Grid container spacing={2} className='header-container' my={'2.4em'} px={4}>

                        <Grid item xs={0.5}></Grid>

                        <Grid item xs={8}  >
                            <Typography variant="h2" className="header-text"
                                color={'#1a1a1a'}
                                textTransform={'uppercase'}
                                sx={{ transform: 'translateX(-5%)' }} >
                                Curated Creations
                            </Typography>
                            <Typography variant="h4" className="header-text"
                                color={'#1a1a1a'}
                                textTransform={'lowercase'}
                                sx={{ transform: 'translateX(-4%)' }} >
                                for the Discerning Individual
                            </Typography>
                        </Grid>

                        <Grid item xs={3} >

                            <Typography color={'#1a1a1a'} variant='body2'   >
                                NovelNook  is a form of self-expression!
                                Check out our new catalog! <br />
                            </Typography>

                            <IconButton sx={{ fontSize: '20px', color: '#1a1a1a', textDecoration: 'underline', textUnderlineOffset: '8px', ml: '-8px' }} >
                                Read More <ArrowForwardIos />
                            </IconButton>
                        </Grid>

                    </Grid>


                    {/* /////// */}
                    <Grid container spacing={4} className="landing-content-wrapper">
                        {/* Left Box  */}
                        <Grid item xs={0.2} width={'10%'}></Grid>
                        <Grid item xs={3}>
                            <Grid item xs={12} container height={'55vh'} width={'98%'} bgcolor={'#ff92e8'} className='box-curve'>

                                <Grid gap={1} item className='item-desc-1'>
                                    <Grid item xs={8}>
                                        <Typography color={'#1a1a1a'} textTransform={'uppercase'} variant="h5">
                                            Greet the new day<br />  with bright  colors!
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography color={'#1a1a1a'} textTransform={'uppercase'} position={'relative'} variant="h6">  Click to see
                                            <span style={{ position: 'absolute', bottom: '8px' }} className='box-1-button'> <ShoppingCartButton fill_color='#1a1a1a' icon_height='3em' /></span>
                                        </Typography>
                                        <Typography color={'#1a1a1a'} textTransform={'uppercase'} variant="h6">
                                            sportswear
                                        </Typography>
                                    </Grid>
                                    <Box>

                                    </Box>


                                </Grid>

                                {/* <img
                                    className="show-img show-img-1"
                                    src='https://res.cloudinary.com/drqofmj2h/image/upload/v1682562494/Novel%20Nook%20Ui/5_Background_Removed.1-_erlrdo.png'
                                    alt='coin-matte'
                                /> */}
                                <img
                                    className="show-img show-img-1"
                                    src={socks}
                                    alt='socks'
                                />

                            </Grid>
                        </Grid>

                        {/* Center Boxes  */}
                        <Grid item spacing={2} container xs={6} >

                            <Grid item xs={5} >
                                <Box height={'30vh'} width={'95%'} bgcolor={'#f7cb46'} className='box-curve' display={'flex'} alignItems={'center'} justifyContent={'center'} position={'relative'}>
                                    <Typography variant="h4" textTransform={'uppercase'} className='text-top-left'>
                                        Be Bright!
                                    </Typography>

                                    {/* <img className="show-img show-img-2" src='https://res.cloudinary.com/drqofmj2h/image/upload/v1682583908/04_enamel_mug_mockup-_Background_Removed_iz9fzd.png' alt='enamel-mug' /> */}
                                    <img
                                        className="show-img show-img-2"
                                        src={mug}
                                        alt='enamel mug'
                                    />

                                    <Typography variant="body1" fontSize={'2em'} textTransform={'uppercase'} className='text-bottom-right'>
                                        Be Yourself!
                                    </Typography>
                                    <Box className='box-2-button' ><ShoppingCartButton icon_height={'40px'} /> </Box>

                                </Box>
                            </Grid>

                            <Grid item xs={7}  >
                                <Box height={'30vh'} width={'94%'} bgcolor={'#22a094'} className='box-curve'>
                                    {/* <img src='https://res.cloudinary.com/drqofmj2h/image/upload/v1682562466/Novel%20Nook%20Ui/cover-4-_Background_Removed_tiinoa.png'
                                        alt='smiley-hoodies' /> */}
                                    <Box className='box-3-button' ><ShoppingCartButton icon_height={'40px'} fill_color={'#f8eddb'} /> </Box>

                                    <img
                                        className="show-img show-img-3"
                                        src={hoodie}
                                        alt='smiley hoodie'
                                    />


                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box height={'20vh'} display={'flex'} mt={1} width={'97%'} justifyContent={'center'} bgcolor={blue[700]} className='box-curve'>
                                    <Grid container spacing={2}>
                                        <Grid item xs={1}>

                                        </Grid>
                                        <Grid item xs={4}>
                                            <Box height={'30%'} display={'flex'} flexDirection={'column'} justifyContent={'flex-end'} >
                                                <Box sx={{ borderRadius: '20%/50%', backgroundColor: 'black', width: '25%', transform: 'translateX(-15%)' }}
                                                    display={'flex'} justifyContent={'center'} >
                                                    <Typography variant="body2" color={'#1a1a1a'}> New</Typography>
                                                </Box>
                                            </Box>

                                            <Box height={'30%'} display={'flex'} flexDirection={'column'} justifyContent={'flex-end'} >
                                                <Typography variant="body2"> Creative and delightful packaging tapes available now!</Typography>
                                            </Box>

                                        </Grid>
                                        <Grid item xs={2} container display={'flex'} height={'100%'} justifyContent={'flex-end'} className="circle-container">

                                            <Box position="relative">
                                                <img src={circleText} className="circle-text" alt='circle-text'
                                                    style={{ position: 'absolute', top: '-25px', left: '-112px' }} />

                                                <Button style={{ position: 'absolute', top: '40px', left: '-50px' }} >
                                                    <img className="cart-icon" src={cartIcon} alt="cart" />
                                                </Button>
                                            </Box>


                                        </Grid>


                                        <Grid item xs={5}>
                                            <Box>
                                                <img src={tape} className="show-img" alt='packaging-tape' />
                                            </Box>
                                        </Grid>


                                    </Grid>
                                </Box>
                            </Grid>

                        </Grid>

                        {/* Right Box */}
                        <Grid item xs={2} ml={1}>
                            <Box height={'55vh'} className='box-curve'>
                                <img className="show-img-5" src={stickers} alt='stickers' />
                            </Box>
                        </Grid>

                        {/* Bottom Box */}
                        <Grid container pl={10} pr={8} my={'1.4em'}>

                            <Grid item xs={10}>
                                <Typography variant="body1" color={'#1a1a1a'} > Creativity Is
                                    The Spirit Of Life</Typography>
                            </Grid>

                            <Grid item xs={2}>
                                <Button variant='text'> Designers </Button>
                            </Grid>

                        </Grid>
                    </Grid>
                </Box>

            </Box >
        </>)
}

export default LandingPage