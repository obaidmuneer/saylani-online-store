import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, ButtonGroup, Button, Box, Spacer } from '@chakra-ui/react'

import React from 'react'
import useProducts from '../../../hooks/useProduct'

const CategoryCard = ({ title, img }) => {
    const { getProdsByCategory } = useProducts()
    return (
        <Card
            maxW={140}
            variant={'outline'}
            onClick={() => getProdsByCategory(title)}
            cursor={'pointer'} 
        >
            <CardBody>
                <Stack align={'center'} spacing='2'>
                    <Image
                        w={110}
                        h={110}
                        src={img}
                        alt='product img'
                        borderRadius='lg'
                    />
                    <Text>
                        {title}
                    </Text>
                </Stack>
            </CardBody>
        </Card>
    )
}

export default CategoryCard