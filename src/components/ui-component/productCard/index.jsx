import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, ButtonGroup, Button, Box, Spacer } from '@chakra-ui/react'
import axios from 'axios'

import { IoMdAdd } from 'react-icons/io'
import useCart from '../../../hooks/useCart'

const ProductCard = ({ _id, title, desc, unit_name, unit_price, img }) => {
    const { addToCart, isLoading } = useCart()

    return (
        <Card variant={'outline'} >
            <CardBody>
                <Stack direction={{ base: 'column', sm: 'row' }} spacing='2'>
                    <Image
                        w={{ base: '100%', sm: 110 }}
                        objectFit={'contain'}
                        src={img}
                        alt='product img'
                        borderRadius='lg'
                    />
                    <Box width={'full'} >
                        <Stack direction={'row'} >
                            <Heading size='md'>{title}</Heading>
                            <Spacer />
                            <Text fontWeight={600} fontSize='md'>
                                {`${unit_price} rs per ${unit_name}`}
                            </Text>
                        </Stack>
                        <Stack direction={'row'} >
                            <Text color={'gray.400'} >
                                {desc}
                            </Text>
                            <Spacer />

                            <Button
                                isLoading={isLoading}
                                onClick={async () => await addToCart(_id)}
                                bg={'green.400'}
                            >
                                <IoMdAdd size={"18"} />
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </CardBody>
        </Card>
    )
}

export default ProductCard