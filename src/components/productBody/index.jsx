import {
    Box,
    Center,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import ProductList from '../productList';
import ProductSearch from "../productSearch";
import CategorySlider from '../slider';


export default function ProductBody() {


    return (
        <>
            <Center >
                <Box
                    maxW={'xxl'}
                    w={'full'}
                    h={'full'}
                    bg={useColorModeValue('white', 'gray.900')}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    p={6}
                // textAlign={'center'}
                >
                    <Center >
                        <ProductSearch />
                    </Center>
                    <Text fontWeight={600} fontSize={'small'} >
                        Shop by Category
                    </Text>

                    <CategorySlider />

                    
                    <ProductList />
                </Box>
            </Center>

        </>
    );
}
