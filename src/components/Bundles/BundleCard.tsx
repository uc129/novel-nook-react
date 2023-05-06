import { Box, Grid, List, ListItem, Typography } from "@mui/material";
import { ProductBundlesInterface } from "../../utils/redux/Slices/products/productBundleSlice";
import React from "react";


interface BundleCardProps {
    bundle: ProductBundlesInterface
    height?: string
    width: string
}



// _id: string,
// name: string,
// description: string,
// products: [{ productId: string, quantity: number }],
// images: string[],

// originalPrice: number,
// offerPrice: number,
// discountPercentage: number,

// startDate: Date,
// endDate: Date,

// status: string,
// tags: string[],

const BundleCard = ({ bundle, height, width }: BundleCardProps) => {

    return (
        <>

            {bundle &&
                <Grid container display={'flex'} justifyContent={'space-evenly'} width={width}
                    height={height ? height : '10vh'} px={'5em'} py={'2em'} margin={'0 auto'} borderRadius={'2em'} bgcolor={'#fb5a35'}
                    sx={{ boxShadow: '0.7em 0.9em black, -0.7em 0.9em black' }}
                    border={'4px solid black'}

                >

                    <Box mb={'1em'}>
                        <Typography mb={4}>{bundle.name} </Typography>
                        <Typography>{bundle.description}</Typography>
                    </Box>




                    <Box key={bundle._id} mb={'1em'}>

                        {bundle.products.map((product) => {
                            return (
                                <React.Fragment key={product.productId}>
                                    <Typography>{product.productId} - {product.quantity}</Typography>
                                </React.Fragment>
                            )
                        })}

                    </Box>


                    <Grid container display={'flex'} justifyContent={'space-evenly'}>
                        <Typography>{bundle.originalPrice}</Typography>
                        <Typography>{bundle.discountPercentage}</Typography>
                        <Typography>{bundle.offerPrice}</Typography>
                        <Typography>{String(bundle.endDate)}</Typography>
                        <Typography>{bundle.status}</Typography>
                        <Typography>{bundle.tags}</Typography>

                    </Grid>

                </Grid >
            }




        </>)

}


export default BundleCard