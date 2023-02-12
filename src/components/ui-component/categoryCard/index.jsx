import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, ButtonGroup, Button, Box, Spacer } from '@chakra-ui/react'

import React from 'react'

const CategoryCard = ({ title, img }) => {
    return (
        <Card
            maxW={140}
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