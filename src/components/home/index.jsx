import {
    Container,
    Stack,
    Image,
    Text,
} from '@chakra-ui/react';
import { GlobalContext } from '../../context/context';
import { useContext } from 'react';
import ProductCard from '../ui-component/productCard';
import ProductSearch from '../productSearch';
import CategoryCard from '../ui-component/categoryCard';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";



const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 3
    }
};


const Home = () => {
    const { state } = useContext(GlobalContext)
    return (
        <div>
            <Container maxW={'5xl'}>
                <Stack>
                    <Image
                        src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                        alt='Green double couch with wooden legs'
                        w={'full'}
                        borderRadius='lg'
                    />
                    <ProductSearch />
                    <Text fontWeight={600} fontSize={'small'} >
                        Shop by Category
                    </Text>
                    <Carousel responsive={responsive}>
                        <CategoryCard title={'sofa'} img={'https://images.unsplash.com/photo-1555041469-a586c61ea9bc'} />
                        <CategoryCard title={'sofa'} img={'https://images.unsplash.com/photo-1555041469-a586c61ea9bc'} />
                        <CategoryCard title={'sofa'} img={'https://images.unsplash.com/photo-1555041469-a586c61ea9bc'} />
                        <CategoryCard title={'sofa'} img={'https://images.unsplash.com/photo-1555041469-a586c61ea9bc'} />
                        <CategoryCard title={'sofa'} img={'https://images.unsplash.com/photo-1555041469-a586c61ea9bc'} />
                        <CategoryCard title={'sofa'} img={'https://images.unsplash.com/photo-1555041469-a586c61ea9bc'} />
                        <CategoryCard title={'sofa'} img={'https://images.unsplash.com/photo-1555041469-a586c61ea9bc'} />
                    </Carousel>


                    <ProductCard img={'https://images.unsplash.com/photo-1555041469-a586c61ea9bc'}
                        title='this is title'
                        unit_name={'kg'}
                        unit_price={800}
                        desc={'this is desc for product'} />
                    <ProductCard img={'https://images.unsplash.com/photo-1555041469-a586c61ea9bc'}
                        title='this is title'
                        unit_name={'kg'}
                        unit_price={800}
                        desc={'this is desc for product'} />
                    <ProductCard img={'https://images.unsplash.com/photo-1555041469-a586c61ea9bc'}
                        title='this is title'
                        unit_name={'kg'}
                        unit_price={800}
                        desc={'this is desc for product'} />
                </Stack>
            </Container>
        </div >
    )
}

export default Home