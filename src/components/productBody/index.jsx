import {
    Box,
    Center,
    useColorModeValue,
} from '@chakra-ui/react';
import ProductSearch from "../productSearch";

export default function ProductBody() {

    return (
        <>
            <Center>
                <Box
                    maxW={'xxl'}
                    w={'full'}
                    h={'full'}
                    bg={useColorModeValue('white', 'gray.900')}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    p={6}
                    textAlign={'center'}>
                    <Center >
                        <ProductSearch />
                    </Center>
                </Box>
            </Center>

        </>
    );
}
