import { Card, CardHeader, CardBody, CardFooter, Text, Button, Heading, Image, Stack, HStack, Badge, Spacer } from '@chakra-ui/react'
import { IoIosAdd, } from 'react-icons/io'
import { FiMinus } from 'react-icons/fi'
import CIcon from '../CIcon'
const CartCard = () => {
    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            // variant='outline'
            h={150}
        >
            <Image
            rounded={'lg'}
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                alt='Caffe Latte'
            />

            <HStack width={'full'} px={2} >
                <CardBody >
                    <Heading size='md'>Item Name</Heading>

                    <HStack py='5' >
                        <CIcon>
                            <IoIosAdd size={26} />
                        </CIcon>
                        <Badge fontSize={16} py={3} px={5} rounded={'lg'} >2</Badge>
                        <CIcon>
                            <FiMinus size={18} />
                        </CIcon>
                    </HStack>

                </CardBody>
                <Spacer />

                <Text fontSize={20} >
                    Price : 12
                </Text>
            </HStack>
        </Card>
    )
}

export default CartCard