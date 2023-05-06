import { Divider } from "@mui/material"
import FeaturedProducts from "../../Products/FeaturedProducts"
import LandingPage from "../Landing/LandingPage"

const HomePage = () => {


    return (
        <>

            <LandingPage />
            <Divider light sx={{ border: '0px', bgcolor: 'transparent', color: 'transparent', padding: '4em' }} />
            <FeaturedProducts />

        </>)
}

export default HomePage