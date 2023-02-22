import { Button, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const CIcon = ({ children, handleClick, isLoading, comp, path }) => {
    const sec_c = useColorModeValue('white', 'gray.800')
    return (
        <Button
            as={comp}
            to={path}
            bg='green.400'
            color={sec_c}
            _hover={{
                bg: `green.600`,
            }}
            p={"0"}
            borderRadius={"full"}
            onClick={handleClick}
            isLoading={isLoading}
        >
            {children}
        </Button>
    )
}

export default CIcon