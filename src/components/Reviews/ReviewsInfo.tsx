import { Box, Typography, Grid, Card, CardContent, Avatar } from "@mui/material"
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { AppStoreState, AppThunkDispatch } from "../../utils/redux/store.types";
import { useEffect, useState } from "react";
import { ImageInterface, getImageById } from "../../utils/redux/Slices/ImagesSlice";
import { ProductReviewInterface, getProductReviewById } from "../../utils/redux/Slices/products/productReviewSlice";
// import { getProductCategoryById } from "../../utils/redux/Slices/products/productCategoriesSlice";
import { CustomerInterface, getCustomerById } from "../../utils/redux/Slices/users/customerSlice";

interface ReviewInfoProps {
    reviewIdList: string[]
    reviewId?: string
}

const ReviewsInfo = ({ reviewIdList }: ReviewInfoProps) => {


    const useAppSelector: TypedUseSelectorHook<AppStoreState> = useSelector;
    const dispatch = useDispatch<AppThunkDispatch>()

    useAppSelector((state) => state.reviewsSlice.reviews)
    useAppSelector((state) => state.imagesSlice.images)
    useAppSelector((state) => state.customerSlice.customer)

    const reviewsStatus = useAppSelector((state) => state.reviewsSlice.status)

    const [allReviews, setAllReviews] = useState<ProductReviewInterface[]>([])
    const [allCustomers, setAllCustomers] = useState<CustomerInterface[]>([])
    const [customerImages, setCustomerImages] = useState<ImageInterface[]>([])


    useEffect(() => {
        const fetchReviews = async () => {
            if (reviewsStatus === 'idle' && reviewIdList.length > 0) {
                const fetchedReviews = await Promise.all(
                    reviewIdList.map((review: any) =>
                        dispatch(getProductReviewById(String(review)))
                    )
                );
                setAllReviews(fetchedReviews.map((reviewData) => reviewData.payload));
            }
        };
        fetchReviews();
    }, [dispatch, reviewIdList, reviewsStatus]);
    // console.log('all reviews', allReviews)



    useEffect(() => {
        const fetchCustomers = async () => {
            if (allReviews.length > 0) {
                const fetchedCustomers = await Promise.all(
                    allReviews.map((review) =>
                        dispatch(getCustomerById(review.customer))
                    )
                );
                setAllCustomers(fetchedCustomers.map((customer) => customer.payload))
            }
        };
        fetchCustomers()
    }, [dispatch, allReviews])
    console.log('customers', allCustomers)


    useEffect(() => {
        const fetchCustomerImages = async () => {
            if (allCustomers.length > 0) {
                const fetchedCustomerImages = await Promise.all(
                    allCustomers.map((customer) =>
                        dispatch(getImageById(customer.avatar))
                    )
                );
                setCustomerImages(fetchedCustomerImages.map((avatar) => avatar.payload))
            }
        };
        fetchCustomerImages()
    }, [dispatch, allCustomers])


    return (
        <>
            <Box bgcolor={'#1a1a1a'}>
                <Typography variant="h4">User-Generated Content</Typography>
                <Grid container spacing={2}>
                    {allReviews.map((review) => (
                        <Grid item xs={6} sm={4} md={3} key={review._id}>
                            <Card>
                                {customerImages.length > 0 &&
                                    <Avatar
                                        src={String(customerImages.find((avatar) => { if (avatar.owner === review.customer) return avatar.url; return null }))}
                                        alt={
                                            String(allCustomers.map((customer) => { if (customer._id === review.customer) { return customer.firstName } else return 'U' }))}
                                    />
                                }
                                <CardContent>
                                    <Typography variant="body2">{review.comment}</Typography>
                                    <Typography variant="caption">{`Rating: ${review.rating}/5`}</Typography>
                                </CardContent>

                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>


        </>)
}

export default ReviewsInfo