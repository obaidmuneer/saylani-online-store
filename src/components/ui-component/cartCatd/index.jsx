import { Card, CardHeader, CardBody, CardFooter, Text, Button, Heading, Image, Stack, HStack, Badge, Spacer } from '@chakra-ui/react'
import { IoIosAdd, } from 'react-icons/io'
import { FiMinus } from 'react-icons/fi'
import CIcon from '../CIcon'
import { useContext, useState } from 'react'
import { GlobalContext } from '../../../context/context'

const CartCard = ({ title, unit_price, img }) => {
    const [quantity, setQuantity] = useState(1)
    const { state, dispatch } = useContext(GlobalContext)

    const handlePrice = () => {
        dispatch({
            type: 'order',
            payload: [...state.orders]
        })
    }
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
                        <CIcon handleClick={() => setQuantity(quantity + 1)} >
                            <IoIosAdd size={26} />
                        </CIcon>
                        <Badge fontSize={16} py={3} px={5} rounded={'lg'} >{
                            quantity
                        }</Badge>
                        <CIcon handleClick={() => quantity <= 1 ? null : setQuantity(quantity - 1)} >
                            <FiMinus size={18} />
                        </CIcon>
                    </HStack>

                </CardBody>
                <Spacer />

                <Text fontSize={20} >
                    Price : {quantity * unit_price}
                </Text>
            </HStack>
        </Card>
    )
}

export default CartCard