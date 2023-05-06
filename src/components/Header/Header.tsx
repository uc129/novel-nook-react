import { Box, Button, Container, Typography, Grid } from '@mui/material';
import './Header.css';
import theme from '../../assets/mui.theme';
import NavigationMenu from '../NavigationMenu/NavigationMenu';

const Header = () => {
  const headerTextContainerStyles = {
    display: 'flex',
    flexDirection: 'column',


    justifyContent: 'center',
    alignItems: 'center',
    width: '50vw',
    height: '50vh',



    [theme.breakpoints.up('md')]: {
      gridColumn: '5 / 9',
      gridRow: '3 / 8',
      marginLeft: 80,
    },
    [theme.breakpoints.down('md')]: {
      gridColumn: '1/ -1',
      gridRow: '7 / 8',
      marginRight: 40,
    },
    [theme.breakpoints.down('sm')]: {
      gridColumn: '1 / -1',
      gridRow: '5 / 6',
      marginBottom: 10,
      marginRight: 180,


    },

  };

  const downArrowContainerStyles = {
    marginLeft: '100px',
    [theme.breakpoints.up('md')]: {
      gridColumn: '8',
      gridRow: '9',
      marginRight: 10,
    },
    [theme.breakpoints.down('md')]: {
      gridColumn: '7',
      gridRow: '8',
      marginRight: 40,
      marginBottom: 20

    },
    [theme.breakpoints.down('sm')]: {
      gridColumn: '8',
      gridRow: '8',
      marginRight: 10,
      marginBottom: 20
    },
  }






  const header = (
    <Container className='wrapper'>
      <NavigationMenu />
      <Grid className='grid-wrapper' container sx={{
        height: '100%', width: '100%', maxHeight: '100vh', maxWidth: '100vw', display: 'grid',
        gridTemplateRows: 'repeat(8, 1fr)',
        gridTemplateColumns: 'repeat(8, 1fr)',
      }}>


        <Container className='header-text-container' sx={headerTextContainerStyles}>


          <Typography sx={{ textTransform: 'uppercase', typography: { xs: 'h6', sm: 'h5', md: 'h1', lg: 'h1' }, padding: 2, margin: 0, }}>
            Novel Nook
          </Typography>


          <Box sx={{}}>
            <Typography sx={{ textTransform: 'uppercase', typography: { xs: 'caption', sm: 'body2', md: 'body1', lg: 'body1' } }}>
              Your one stop shop for all things creative.
            </Typography>
            <br />

            <Typography sx={{ textTransform: 'uppercase', typography: { xs: 'caption', sm: 'body2', md: 'body1', lg: 'body1' } }}>
              Our products are made for the{' '}
              <span className='novel'> novel </span> kind.
            </Typography>
          </Box>

          <Box className='button-container'>
            <Button id='join-now' variant='contained'>
              JOIN NOW
            </Button>
            <Button id='explore' variant='contained'>
              EXPLORE
            </Button>
          </Box>




        </Container>

        <Container sx={downArrowContainerStyles}>
          <svg width="24px" height="28px" viewBox="-5 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">

            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id='down-arrow' transform="translate(-385.000000, -6559.000000)" fill="#000">
                <g id="icons" transform="translate(56.000000, 160.000000)">
                  <path d="M337.321844,6413.84809 L335.841796,6415.2601 C335.522354,6415.5621 335.008643,6415.3361 
                  335.008643,6414.89709 L335.008643,6400.00001 C335.008643,6399.448 334.552012,6399 333.999247,6399
                   L334.007258,6399 C333.454493,6399 333.005872,6399.448 333.005872,6400.00001 L333.005872,6414.88209 
                   C333.005872,6415.3231 332.463121,6415.5481 332.145682,6415.2421 L330.683658,6413.83809 C330.285107,
                   6413.45808 329.648226,6413.47508 329.271705,6413.87809 L329.267699,6413.88009 C328.895184,6414.27809 
                   328.913208,6414.90209 329.310759,6415.2771 L332.653384,6418.45411 C333.427455,6419.18512 334.639132,
                   6419.18112 335.410199,6418.44711 L338.692742,6415.2981 C339.085285,6414.92409 339.104311,6414.30509 
                   338.7348,6413.90809 L338.724786,6413.89709 C338.351269,6413.49608 337.722399,6413.47408 337.321844,6413.84809" id="arrow_down-[#364]">

                  </path>
                </g>
              </g>
            </g>
          </svg>
        </Container>




      </Grid>

    </Container>
  );
  return header;
};

export default Header;
