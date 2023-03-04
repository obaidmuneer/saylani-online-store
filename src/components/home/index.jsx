import {
    Image,
} from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import "react-multi-carousel/lib/styles.css";
import { GlobalContext } from '../../context/context';
import useCategory from '../../hooks/useCategory';
import useProducts from '../../hooks/useProduct';
import ProductBody from '../productBody';


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
            {/* <Container maxW={'7xl'} > */}
            <Image
                src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                alt='Green double couch with wooden legs'
                w={'full'}
                borderRadius='lg'
            />
            {/* </Container> */}
            {/* <Container maxW={'6xl'}> */}
            <ProductBody />
            {/* </Container> */}
        </div >
    )
}

export default Home