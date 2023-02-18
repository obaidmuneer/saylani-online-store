import {
    Badge, Box,
    Stack,
    Text
} from '@chakra-ui/react'
import { useContext } from 'react'
import { GlobalContext } from '../../context/context'
import ProductCard from '../ui-component/productCard'

function ProductList() {
    const { state } = useContext(GlobalContext)

    if (state?.docs?.length === 0)
        return (
            <Box display={'flex'} justifyContent={'center'} >
                <Badge colorScheme='green' p='4' m='4' borderRadius='lg'>
                    Be the one to Add product
                </Badge>
            </Box>
        )

    return (
        <Stack mt={2}>
            {
                state.products.length > 0 ? state.products.map(product => {
                    return <ProductCard
                        key={product._id}
                        img={product.file}
                        title={product.title}
                        unit_name={product.unit_name}
                        unit_price={product.unit_price}
                        desc={product.description}
                        _id={product._id} />
                }) :
                    <Text>
                        Product Not Found
                    </Text>
            }
        </Stack>
    )
}

export default ProductList