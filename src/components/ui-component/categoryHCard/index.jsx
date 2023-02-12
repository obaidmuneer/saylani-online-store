import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, ButtonGroup, Button, Box, Spacer } from '@chakra-ui/react'

import React from 'react'

const CategoryHCard = ({ title, img }) => {
    return (
        <Card
            w={'full'}
            variant='outline'
        >
            <CardBody>
                <Stack align={'center'} direction='row' spacing='2'>
                    <Image
                        w={50}
                        h={50}
                        src={img}
                        alt='product img'
                        borderRadius='lg'
                    />
                    <Text color={'green.400'} >
                        {title}
                    </Text>
                </Stack>
            </CardBody>
        </Card>
    )
}

export default CategoryHCard