import {
    Box,
    Center,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { useContext } from 'react';
import Carousel from 'react-multi-carousel';
import { GlobalContext } from '../../context/context';
import ProductList from '../productList';
import ProductSearch from "../productSearch";
import CategoryCard from '../ui-component/categoryCard';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 860 },
        items: 5
    },
    tablet: {
        breakpoint: { max: 860, min: 636 },
        items: 4
    },
    mobile: {
        breakpoint: { max: 636, min: 0 },
        items: 3
    }
};

export default function ProductBody() {
    const { state } = useContext(GlobalContext)


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
                    <Carousel autoPlay stopAutoPlayOnHover NextIcon='next' responsive={responsive}>
                        {
                            state.category.map(category => {
                                return <CategoryCard key={category._id} title={category.title} img={category.file} />
                            })
                        }
                    </Carousel>
                    <ProductList />
                </Box>
            </Center>

        </>
    );
}
