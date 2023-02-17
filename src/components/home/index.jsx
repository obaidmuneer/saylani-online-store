import {
    Container,
    Stack,
    Image,
    Text,
} from '@chakra-ui/react';
import { GlobalContext } from '../../context/context';
import { useContext, useEffect } from 'react';
import ProductCard from '../ui-component/productCard';
import ProductSearch from '../productSearch';
import CategoryCard from '../ui-component/categoryCard';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import useCategory from '../../hooks/useCategory';
import useProducts from '../../hooks/useProduct';



const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5
    },
    tablet: {
        breakpoint: { max: 1024, min: 636 },
        items: 4
    },
    mobile: {
        breakpoint: { max: 636, min: 0 },
        items: 3
    }
};


const Home = () => {
    const { state } = useContext(GlobalContext)
    const { getCategory } = useCategory()
    const { getProducts } = useProducts()

    useEffect(() => {
        (async () => {
            await getProducts()
            await getCategory()
        })();
    }, [])

    return (
        <div>
            <Image
                src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                alt='Green double couch with wooden legs'
                w={'full'}
                borderRadius='lg'
            />
            <Container maxW={'5xl'}>
                <Stack spacing={5} my={5}
                >

                    <ProductSearch />
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

                    {
                        state.products.length > 0 ? state.products.map(product => {
                            return <ProductCard
                                key={product._id}
                                img={product.file}
                                title={product.title}
                                unit_name={product.unit_name}
                                unit_price={product.unit_price}
                                desc={product.description} />
                        }) :
                            <Text>
                                Product Not Found
                            </Text>
                    }
                </Stack>
            </Container>
        </div >
    )
}

export default Home