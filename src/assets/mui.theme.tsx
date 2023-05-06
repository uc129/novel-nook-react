import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'Work Sans',

        h1: {
            fontFamily: 'Tourney',
            fontWeight: 900,
        },

        h2: {
            fontFamily: 'Tourney',
            fontWeight: 900,
        },

        h3: {
            fontFamily: 'Work Sans',
            fontWeight: 500,
        },

        h4: {
            fontFamily: 'Work Sans',
            fontWeight: 400,
        },

        h5: {
            fontFamily: 'Work Sans',
            fontWeight: 300,
        },

        h6: {
            fontFamily: 'Work Sans',
            fontWeight: 200,
        },




    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
});


export default theme;
