import { Box, HStack, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import React, { useContext } from 'react'
import { BiCategory, BiHome, BiTransfer } from 'react-icons/bi'
import { BsCart4 } from 'react-icons/bs';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { RiLuggageCartFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/context';
import CIcon from '../ui-component/CIcon';

const BottomNavBar = () => {
    const { state: { user: { isAdmin } } } = useContext(GlobalContext)

    const navLinks = [
        { icon: <BiHome size="18" />, label: 'Home', to: '/' },
        isAdmin ?
            { icon: <IoMdAddCircleOutline size="18" />, label: 'Add Item', to: '/add-product' } :
            { icon: <BsCart4 size="18" />, label: 'Cart', to: '/cart' },
        isAdmin ?
            { icon: <BiCategory size="18" />, label: 'Category', to: '/add-category' } :
            { icon: <RiLuggageCartFill size="18" />, label: 'Orders', to: '/orders' },
    ];

    const sec_c = useColorModeValue('white', 'gray.800')

    return (
        <HStack zIndex={1} bg={sec_c} padding={2} position={'fixed'} flexDir='row' bottom={0} width={'100%'} justifyContent={'space-evenly'} >

            {
                navLinks.map((link, index) => (
                    <Stack key={index} spacing={0} alignItems='center' >
                        <CIcon comp={Link} path={link.to} >{link.icon} </CIcon>
                        <Text fontSize={'sm'} >{link.label}</Text>
                    </Stack>
                ))
            }

        </HStack>
    )
}

export default BottomNavBar
