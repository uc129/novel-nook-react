import { Button } from "@mui/material"

const ShoppingCartButton = ({ icon_height, fill_color }: any) => {

    return <>
        <Button>

            <svg style={{ height: icon_height, fill: fill_color }} id="Layer_2" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 45.22 44.7"><g id="Layer_1-2">
                    <path d="m0,22.41c-.09-28.2,41.57-30.56,45.12-2.69C47.72,51.21.79,53.83,0,22.41Zm22.36-8.33h0c-14.32-1.09-8.35,2.45-9.55,14.18.65,3.72,13.41.96,16.93,1.75,4.19-.18,1.3-10.66,2.09-13.86-.37-3.97-6.71-1.37-9.48-2.08Z" />
                    <path d="m22.39,28.32c-11.72.52-7-.19-7.9-11.22,0-1.22.16-1.31,1.56-1.31,2.6.52,13.53-1.13,14.03.77-1,11.06,3.98,12.4-7.68,11.74,0,0,0,.01,0,.02Zm.13-5.41c2.27.09,5.37-2.95,3.46-5.04-1.48.71-1.15,3.1-3.09,3.24-2.65.84-2.66-2.48-4.28-3.22-2.1,2.03,1.39,5.23,3.91,5.02Z" /></g></svg>

        </Button>
    </>

}

export default ShoppingCartButton