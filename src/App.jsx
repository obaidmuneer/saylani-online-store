import { Routes, Route, Navigate } from 'react-router-dom'
import { Box, Center, Spinner } from '@chakra-ui/react';
import Home from './components/home';
import Navbar from './components/navbar';
import Signin from './components/signin';
import Signup from './components/signup';
import AddCategory from './components/addCategory';
import AddProduct from './components/addProduct';
import BottomNavBar from './components/bottomNavbar';
import Cart from './components/cart';
import Orders from './components/orders';
import useAuth from './hooks/useAuth';
import Chatbot from './components/chatbot';
import './App.css';
import ChatbotBeta from './components/chatbot-beta';
import Payment from './components/payment';

const App = () => {
  const { user, cart } = useAuth()

  return (
    <>
      {user === null ? (
        <Center minH={'100vh'}>
          <Spinner color='green.400' thickness='6px' minH={100} minW={100} speed='0.6s' emptyColor='gray' />
        </Center>
      ) : (
        <>
          <Navbar />
          <Box py={'70px'}>
            <Routes>
              <Route path='/' element={<Home />} />
              {
                !user ? <>
                  <Route path='/signup' element={<Signup />} />
                  <Route path='/signin' element={<Signin />} />
                </> : <>
                  <Route path='/add-category' element={user.isAdmin ? <AddCategory /> : <Navigate to={'/'} replace />} />
                  <Route path='/add-product' element={user.isAdmin ? <AddProduct /> : <Navigate to={'/'} replace />} />
                  <Route path='/cart' element={<Cart />} />
                  <Route path='/payment' element={<Payment />} />
                  <Route path='/orders' element={<Orders />} />
                </>
              }
              <Route path='*' element={<Navigate to={'/'} replace={true} />} />
            </Routes>
            <BottomNavBar />
            {/* {user && <Chatbot userId={user._id} />} */}
            {user && <ChatbotBeta userId={user._id} />}
          </Box>
        </>
      )}
    </>
  )
}

export default App;
