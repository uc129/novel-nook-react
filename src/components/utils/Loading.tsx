import { Box } from "@mui/material"
import loading from '../../assets/images/gif/preloader.gif'

const Loading = () => {

    return (
        <>
            <Box height={'100vh'} width={'100vw'}>
                <img height={'100%'} width={'100%'} src={loading} alt='preloader' />
            </Box>
        </>
    )

}

export default Loading