import { Avatar, Box, Button, Center, Heading, IconButton, Image, Input, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { GlobalContext } from '../../context/context'
import SelectImg from '../selectImg'
import CategoryHCard from '../ui-component/categoryHCard'

const AddCategory = () => {
    const { state } = useContext(GlobalContext)
    const [category, setCategory] = useState('')
    const [file, setFile] = useState('')
    const [preview, setPreview] = useState('')

    const bgColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.100')
    const c = 'green';
    const sec_c = useColorModeValue('white', 'gray.800')


    const handleData = async () => {
        // console.log(file.target.files[0]);
        let formData = new FormData();
        formData.append("myFile", file.target.files[0]);
        formData.append("category", category);
        formData.append("contentType", 'file');
        formData.append("classId", state.classId);
        // console.log(formData);
        // props.onClose()
    }

    return (
        <Center>
            <Stack my={2} align='center' width={'100%'} >
                <Heading color={'blue.500'} >
                    Setting
                </Heading>
                <Box border={'solid'} p={2} borderRadius={'full'} borderColor={'green.400'}>
                    <Avatar
                        size={'2xl'}
                        src={'https://images.unsplash.com/photo-1555041469-a586c61ea9bc'}
                    />

                </Box>
                <SelectImg file={file} handleFile={setFile} />
                <Box display={'flex'}  >
                    <Input
                        bg={bgColor}
                        border={0}
                        _focus={{
                            bg: 'whiteAlpha.300',
                        }}
                        id="category"
                        name="category"
                        placeholder="Enter Category Title Here..."
                        width="60"
                        mx={1}
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                    />
                    <IconButton
                        bg={`${c}.400`}
                        color={sec_c}
                        _hover={{
                            bg: `${c}.600`,
                        }}
                        icon={<IoMdAdd />}
                        type='submit'
                    />
                </Box>
                <Box width={'80%'} >
                    <Text alignSelf={'flex-start'} color={'blue.400'} fontWeight={600} >
                        All Categories
                    </Text>
                    <Stack maxH={'xs'} overflowY='auto'>
                        <CategoryHCard title={'sofa'} img={'https://images.unsplash.com/photo-1555041469-a586c61ea9bc'} />
                        <CategoryHCard title={'sofa'} img={'https://images.unsplash.com/photo-1555041469-a586c61ea9bc'} />
                        <CategoryHCard title={'sofa'} img={'https://images.unsplash.com/photo-1555041469-a586c61ea9bc'} />
                        <CategoryHCard title={'sofa'} img={'https://images.unsplash.com/photo-1555041469-a586c61ea9bc'} />
                        <CategoryHCard title={'sofa'} img={'https://images.unsplash.com/photo-1555041469-a586c61ea9bc'} />
                        <CategoryHCard title={'sofa'} img={'https://images.unsplash.com/photo-1555041469-a586c61ea9bc'} />
                        <CategoryHCard title={'sofa'} img={'https://images.unsplash.com/photo-1555041469-a586c61ea9bc'} />
                    </Stack>
                    <Button bg={'green.400'} _hover={
                        { bg: 'green.600' }
                    } my={5} w={'full'} >
                        Logout
                    </Button>
                </Box>
            </Stack>
        </Center>
    )
}

export default AddCategory