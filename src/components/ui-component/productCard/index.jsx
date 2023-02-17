import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, ButtonGroup, Button, Box, Spacer } from '@chakra-ui/react'

import React from 'react'
import { IoMdAdd } from 'react-icons/io'

const ProductCard = ({ title, desc, unit_name, unit_price, img }) => {
    return (
        <Card maxH={180}  >
            <CardBody>
                <Stack direction={'row'} mt='6' spacing='2'>
                    <Image
                        w={110}
                        h={110}
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