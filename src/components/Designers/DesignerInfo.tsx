import { Box, Grid, Avatar, Typography, Button } from "@mui/material"
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { AppStoreState, AppThunkDispatch } from "../../utils/redux/store.types";
import { getDesignerById } from "../../utils/redux/Slices/users/designerSlice";
import { useEffect, useState } from "react";
import { getImageById } from "../../utils/redux/Slices/ImagesSlice";

interface DesignerInfoProps {
    designerId: string
}

const DesignerInfo = ({ designerId }: DesignerInfoProps) => {
    // console.log('designer id', designerId);


    const useAppSelector: TypedUseSelectorHook<AppStoreState> = useSelector;
    const dispatch = useDispatch<AppThunkDispatch>()

    const designer = useAppSelector((state) => state.designerSlice.designer)
    // const designerStatus = useAppSelector((state) => state.designerSlice.status)

    const designerAvatar = useAppSelector((state) => state.imagesSlice.image)
    const designerAvatarStatus = useAppSelector((state) => state.imagesSlice.status)

    const [gotDesigner, setGotDesigner] = useState(false)

    //get product designer info
    useEffect(() => {
        if (designerId) {
            dispatch(getDesignerById(String(designerId)))
            setGotDesigner(true)
        }
    }, [dispatch, designerId])

    // get designer avatar

    useEffect(() => {
        if (designerAvatarStatus === 'idle' && gotDesigner === true) {
            dispatch(getImageById(String(designer.avatar)))
        }
    }, [dispatch, designerAvatarStatus, gotDesigner, designer])


    // console.log('designer', designer);
    // console.log('designer avatar', designerAvatar);



    return <>

        <Box>
            <Grid item xs={3}>
                <Avatar> <img src={designerAvatar?.url} alt={designer.firstName} /> </Avatar>
            </Grid>
            <Grid item xs={9}>
                {designer && <Typography variant="h6">{`${designer.firstName} ${designer.lastName}`}</Typography>}
                {designer && <Typography variant="body2">{designer.bio}</Typography>}
                <Box>

                    {designer && designer.links && designer.links.map((link) => (
                        <Button key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer">
                            {link.platform}
                        </Button>
                    ))}
                </Box>
            </Grid>
        </Box>
    </>

}

export default DesignerInfo