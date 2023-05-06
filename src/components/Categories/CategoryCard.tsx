
import { ProductCategoryInterface } from "../../utils/redux/Slices/products/productCategoriesSlice";
import { Box, Button, Card, CardActions, CardContent, Link, Typography } from "@mui/material";
import { ProductSubCategoryInterface } from "../../utils/redux/Slices/products/subCategoriesSlice";

interface CategoryCardProps {
    category: ProductCategoryInterface
    subcategories: ProductSubCategoryInterface[]
}

const CategoryCard = ({ category, subcategories }: CategoryCardProps) => {

    // const useAppSelector: TypedUseSelectorHook<AppStoreState> = useSelector;
    // const dispatch = useDispatch<AppThunkDispatch>()






    return (
        <Box>
            {category && (
                <Card
                    sx={{
                        maxWidth: 440,
                        width: '18vw',
                        height: '44vh',
                        boxShadow: '0.5em 0.5em black',
                        borderRadius: '2em',
                        border: '4px solid black',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <CardContent sx={{ padding: '2em', flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
                        <Box>
                            <Typography gutterBottom variant="h5" component="div" pb={2}>
                                {category.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {category.description}
                            </Typography>
                        </Box>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box display="flex" flexDirection="column">
                            {subcategories.length > 0 &&
                                subcategories.map((sub) => (
                                    <Link
                                        key={sub._id}
                                        fontFamily="Work Sans"
                                        fontSize="1em"
                                        textTransform="uppercase"
                                        href="/"
                                        sx={{
                                            color: 'black',
                                            textDecoration: 'none',
                                            '&:hover': { color: '#da514f' },
                                            marginBottom: '0.5em',
                                        }}
                                    >
                                        {sub.name}
                                    </Link>
                                ))}
                        </Box>
                    </CardContent>
                    <CardActions sx={{ height: '40px', display: 'flex', justifyContent: 'space-around' }}>
                        <Button size="small" sx={{ flex: '0 0 auto' }}>
                            Share
                        </Button>
                        <Button size="small" sx={{ flex: '0 0 auto' }}>
                            Explore Category
                        </Button>
                    </CardActions>
                </Card>
            )}
        </Box>


    )
}

export default CategoryCard