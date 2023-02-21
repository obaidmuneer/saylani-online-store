import { Card, CardBody, Text, Heading, Image, HStack, Badge, Spacer } from '@chakra-ui/react'
import { IoIosAdd, } from 'react-icons/io'
import { FiMinus } from 'react-icons/fi'
import CIcon from '../CIcon'
import useCart from '../../../hooks/useCart'

const AddQty = ({ id }) => {
    const { updateCart, isLoading } = useCart()

    return <CIcon isLoading={isLoading} handleClick={async () => await updateCart(id, 1)} >
        <IoIosAdd size={26} />
    </CIcon >
}

const MinusQty = ({ id }) => {
    const { updateCart, isLoading } = useCart()

    return <CIcon isLoading={isLoading} handleClick={async () => await updateCart(id, 0)} >
        <FiMinus size={18} />
    </CIcon>
}

const CartCard = ({ id, title, unit_price, total_price, img, quantity }) => {
    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            h={150}
        >
            <Image
                rounded={'lg'}
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src={img}
                alt='product image'
            />

            <HStack width={'full'} px={2} >
                <CardBody >
                    <Heading size='md'>{title}</Heading>
                    <Text>Product Price : {unit_price}</Text>

                    <HStack py='5' >
                        <AddQty id={id} />
                        <Badge fontSize={16} py={3} px={5} rounded={'lg'} >
                            {quantity}
                        </Badge>
                        <MinusQty id={id} />
                    </HStack>

                </CardBody>
                <Spacer />

                <Text fontSize={20} >
                    Price : {total_price}
                </Text>
            </HStack>
        </Card>
    )
}

export default CartCard