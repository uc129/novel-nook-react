import { useState } from 'react';
import { Box, Button, Stack, Input, IconButton, useMediaQuery, Theme, Link } from '@mui/material';
import { AccountBox, Favorite, ShoppingBag } from '@mui/icons-material';

const NavigationMenu = () => {
    const [open, setOpen] = useState(false);
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

    const handleMenuClick = () => {
        setOpen(!open);
        if (!open) {
            document.body.style.overflow = 'hidden';
            const navMenuContainer = document.querySelector('.nav-menu-container');
            (navMenuContainer as HTMLElement).style.transform = 'translateY(40px)'
            const navMenuItems = document.querySelectorAll('.nav-menu-item');
            navMenuItems.forEach((item) => {
                (item as HTMLElement).style.transform = 'translateX(-100px)';
            });
        } else {
            document.body.style.overflow = 'auto';
            const navMenuItems = document.querySelectorAll('.nav-menu-item');
            navMenuItems.forEach((item) => {
                (item as HTMLElement).style.transform = 'translateX(0)';
            });
        }
    };



    return (
        <Box sx={{ borderBottom: '2px solid transparent', mt: 4, display: 'flex', height: '4em', justifyContent: 'center', bgcolor: 'transparent' }}>

            <Box sx={{ display: 'flex', alignItems: 'center', width: '94%', justifyContent: 'space-between', color: 'black', }}>

                <Link href='/' variant='h2' sx={{ ml: '1rem', mr: '5rem', textDecoration: 'none', color: 'black' }}> NN </Link>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {!isMobile && (
                        <Stack direction='row' color={'white'} spacing={2} sx={{ ml: '1rem', }} >
                            {/* <Button href='/' variant='text' sx={{ textTransform: 'none', color:'black', fontSize: '20px' }}>Home</Button> */}
                            <Button href='/categories' variant='text' sx={{ textTransform: 'none', color: 'black', fontSize: '18px' }}>Categories</Button>
                            <Input disableUnderline sx={{ '& input': { borderBottom: '1px solid white', color: 'black' } }} />
                            <Button variant='text' sx={{ textTransform: 'none', color: 'black', fontSize: '18px' }}>Search </Button>


                        </Stack>
                    )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>

                    {isMobile && (
                        <Box className={'nav-menu-container'} sx={{ position: 'absolute', top: '100%', left: 0, right: 0, bgcolor: 'black', zIndex: 1, display: open ? 'block' : 'none' }}>
                            <Button className='nav-menu-item' variant='text' sx={{ textTransform: 'none', color: 'black', width: '100%', my: 1 }}>Home</Button>
                            <Button className='nav-menu-item' variant='text' sx={{ textTransform: 'none', color: 'black', width: '100%', my: 1 }}>Categories</Button>
                            <Button className='nav-menu-item' variant='text' sx={{ textTransform: 'none', color: 'black', width: '100%', my: 1 }}>My Account</Button>
                            <Button className='nav-menu-item' variant='text' sx={{ textTransform: 'none', color: 'black', width: '100%', my: 1 }}>Cart</Button>
                            <Button className='nav-menu-item' variant='text' sx={{ textTransform: 'none', color: 'black', width: '100%', my: 1 }}>Wishlist</Button>
                        </Box>
                    )}
                    {!isMobile && (
                        <>
                            <Button variant='text' sx={{ textTransform: 'none', color: 'black', fontSize: '20px' }}><AccountBox /></Button>
                            <Button variant='text' sx={{ textTransform: 'none', color: 'black', fontSize: '20px' }}><ShoppingBag /></Button>
                            <Button variant='text' sx={{ textTransform: 'none', color: 'black', fontSize: '20px' }}><Favorite /></Button>
                        </>
                    )}
                    {isMobile && (
                        <IconButton onClick={handleMenuClick} color='inherit' aria-label='search' sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}>
                            <svg width="48px" height="48px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 17H20M4 12H20M4 7H20" stroke="#101010" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </IconButton>
                    )}
                </Box>
            </Box>
        </Box >
    );
};

export default NavigationMenu;
