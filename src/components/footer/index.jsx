import { HStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react'
import { BiHome, BiTransfer } from 'react-icons/bi'
import { IoMdAddCircleOutline } from 'react-icons/io';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';
import CIcon from '../ui-component/CIcon';

const btns = [
    {
        icon: <BiHome size={"18"} />,
        path: '/'
    }, {
        icon: <IoMdAddCircleOutline size={"18"} />,
        path: '/add-product'
    }, {
        icon: <MdOutlineAccountCircle size={"18"} />,
        path: '/'
    },

]


const Footer = () => {
    const sec_c = useColorModeValue('white', 'gray.800')

    return (
        <HStack bg={sec_c} padding={2} position={'fixed'} bottom={0} width={'100%'} justifyContent={'space-evenly'} >
            {
                btns.map((btn, index) => <CIcon key={index} comp={Link} path={btn.path} >{btn.icon} </CIcon>)
            }
        </HStack>
    )
}

export default Footer
