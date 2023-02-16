import { Avatar, Box, Button, Center, Heading, IconButton, Input, Spinner, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { GlobalContext } from '../../context/context'
import useCategory from '../../hooks/useCategory'
import SelectImg from '../selectImg'
import CategoryHCard from '../ui-component/categoryHCard'

const AddCategory = () => {
    const { state } = useContext(GlobalContext)
    const { postCategory, getCategory, isLoading } = useCategory()
    const [title, setTitle] = useState('')
    const [file, setFile] = useState('')

    const bgColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.100')
    const c = 'green';
    const sec_c = useColorModeValue('white', 'gray.800')


    const handleData = async (e) => {
        e.preventDefault()
        // console.log(file.target.files[0]);
        let formData = new FormData();
        formData.append("file", file.target.files[0]);
        formData.append("title", title);
        await postCategory(formData)
        setFile('')
        setTitle('')
    }

    useEffect(() => {
        getCategory()
    }, [])


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
                <Center>
                    {isLoading ?
                        <Spinner color='green.400' thickness='6px' minH={50} minW={50} speed='1s' emptyColor='gray' />
                        :
                        <Box as='form' onSubmit={handleData} >
                            <SelectImg file={file} handleFile={setFile} />
                            <Box my={2} display={'flex'}  >
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
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
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
                        </Box>
                    }
                </Center>
                <Box width={'80%'} >
                    <Text alignSelf={'flex-start'} color={'blue.400'} fontWeight={600} >
                        All Categories
                    </Text>
                    <Stack maxH={'xs'} overflowY='auto'>
                        {
                            state.category.map(category => {
                                return <CategoryHCard key={category._id} title={category.title} img={category.file} />
                            })
                        }

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