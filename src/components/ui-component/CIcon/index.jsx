import { Button, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const CIcon = ({ children }) => {
    const sec_c = useColorModeValue('white', 'gray.800')
    return (
        <Button
            bg='green.400'
            color={sec_c}
            _hover={{
                bg: `green.600`,
            }}
            p={"0"}
            borderRadius={"full"}
        >
            {children}
        </Button>
    )
}

export default CIcon