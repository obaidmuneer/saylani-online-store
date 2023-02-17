import { Box, Button, Heading, HStack, Spacer, Text } from '@chakra-ui/react'
import React from 'react'
import { MdDelete } from 'react-icons/md'

const Cart = () => {
  return (
    <Box px={5} >
        <HStack>
            <Heading color={'green.400'} >
                Shopping 
                <Text color={'blue.400'} >Cart</Text>
            </Heading>
            <Spacer />
            <Button color={'green.400'} rounded='full' p={0} >
            <MdDelete size={26} />
            </Button>
        </HStack>
    </Box>
  )
}

export default Cart