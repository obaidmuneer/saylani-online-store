import {
    Badge, Box,
    StackDivider, VStack
} from '@chakra-ui/react'
import { useContext } from 'react'
import { GlobalContext } from '../../context/context'

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

    const vStackProps = {
        p: '2',
        w: '100%',
        mt: 2,
        borderWidth: '1px',
        borderRadius: 'lg',
        alignItems: 'space-between',
        divider: <StackDivider />,
    }

    return (
        <VStack {...vStackProps}>
            {state?.products?.map((product, index) => {
                if (!product?.isDeleted) {
                    return null
                }
            })}
        </VStack>
    )
}

export default ProductList