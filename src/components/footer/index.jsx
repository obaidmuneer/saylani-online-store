import { HStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react'
import { BiHome } from 'react-icons/bi'
import { IoMdAddCircleOutline } from 'react-icons/io';
import { MdOutlineAccountCircle } from 'react-icons/md';
import CIcon from '../ui-component/CIcon';


const Footer = () => {
    const sec_c = useColorModeValue('white', 'gray.800')

    return (
        <HStack bg={sec_c} padding={2} position={'fixed'} bottom={0} width={'100%'} justifyContent={'space-evenly'} >
            <CIcon >
                <BiHome size={"18"} />
            </CIcon>
            <CIcon>
                <IoMdAddCircleOutline size={"18"} />
            </CIcon>
            <CIcon>
                <MdOutlineAccountCircle size={"18"} />
            </CIcon>
        </HStack>
    )
}

export default Footer
