import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route, Navigate } from 'react-router-dom'
import { Box, Center, Spinner } from '@chakra-ui/react';
import Home from './components/home';
import Navbar from './components/navbar';
import Signin from './components/signin';
import Signup from './components/signup';
import { GlobalContext } from './context/context';
import AddCategory from './components/addCategory';
import AddProduct from './components/addProduct';
import Footer from './components/footer';
import './App.css';
import Cart from './components/cart';
import { getFeatures } from 'detect-features';


function App() {
  const { state, dispatch } = useContext(GlobalContext)
  const [features, setFeatures] = useState('')

  useEffect(() => {

    (async () => {
      try {
        const feature = await getFeatures()
        setFeatures(feature)
        const result = await axios.get(`${state.api}users/profile`, {
          withCredentials: true
        })
        // console.log(result.data.orders);
        dispatch({
          type: 'signin',
          payload: result.data.user
        })
        dispatch({
          type: 'cart',
          payload: result.data.cart
        })
        dispatch({
          type: 'orders',
          payload: result.data.orders
        })
      } catch (error) {
        console.log(error);
        dispatch({
          type: 'signin',
          payload: false
        })
        console.log('please signin to enjoy all our features');
      }
    })()
  }, [])

  return (
    <>
      {
        state.user === null ? <Center minH={'100vh'}  >
          <Spinner color='green.400' thickness='6px' minH={100} minW={100} speed='0.6s' emptyColor='gray' />
        </Center>
          : <Navbar />}
      <Box py={'70px'} >
        {
          state.user === false ? <>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/signin' element={<Signin />} />
              <Route path='*' element={<Navigate to={'/'} replace={true} />} />
            </Routes>
          </>
            : null
        }
        {
          state.user ? <>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/add-category' element={<AddCategory />} />
              <Route path='/add-product' element={<AddProduct />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='*' element={<Navigate to={'/'} replace={true} />} />
            </Routes>
            {
              features.browserFeatures.browserType.isMobile ? <Footer /> : null
            }

          </> : null
        }
      </Box>
    </>

  )
}

export default App;
