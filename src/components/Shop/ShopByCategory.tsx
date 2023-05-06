import { useEffect, useState } from "react"
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { AppStoreState, AppThunkDispatch } from "../../utils/redux/store.types"

// interface ProductByCategoryProps {
//     categoryName?: string,
//     categoryId: string
// }

const ShopByCategory = () => {

    const { categoryFromUrl } = useParams()
    // const [searchString, setSearchString] = useState('')

    // if (categoryName) {
    //     setSearchString(categoryName)
    // }
    // else if (categoryId) {
    //     setSearchString(categoryId)
    // }
    // else if (categoryFromUrl) {
    //     setSearchString(categoryFromUrl)
    // }


    const useAppSelector: TypedUseSelectorHook<AppStoreState> = useSelector;
    const dispatch = useDispatch<AppThunkDispatch>()


    const productsByCategory = useAppSelector((state) => state.productsSlice.products)
    const productsByCategoryStatus = useAppSelector((state) => state.productsSlice.status)


    useEffect(() => {




    })


    return <></>






}


export default ShopByCategory