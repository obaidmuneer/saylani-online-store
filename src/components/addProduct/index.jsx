import { Avatar, Box, Button, Center, Heading, HStack, IconButton, Image, Input, Select, Spinner, Stack, Text, Textarea, useColorModeValue } from '@chakra-ui/react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { GlobalContext } from '../../context/context'
import useCategory from '../../hooks/useCategory'
import useProducts from '../../hooks/useProduct'
import SelectImg from '../selectImg'
import CategoryHCard from '../ui-component/categoryHCard'

const AddProduct = () => {
    const { getCategory } = useCategory()
    const { postProduct, isLoading } = useProducts()
    const { state } = useContext(GlobalContext)
    const [file, setFile] = useState('')

    const bgColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.100')
    const c = 'green';
    const sec_c = useColorModeValue('white', 'gray.800')


    const handleData = async (e) => {
        e.preventDefault()
        const { title, description, category, unit_name, unit_price } = e.target
        let formData = new FormData();
        formData.append("file", file.target.files[0]);
        formData.append("title", title.value);
        formData.append("description", description.value);
        formData.append("category", category.value);
        formData.append("unit_name", unit_name.value);
        formData.append("unit_price", unit_price.value);
        await postProduct(formData)
        setFile('')
        e.target.reset()
    }

    useEffect(() => {
        getCategory()
    }, [])


    return (
        <Center>

            <Stack my={2} align='center' width={'100%'} as='form' onSubmit={handleData} >
                <Heading color={'blue.500'} >
                    Add New Item
                </Heading>
                {
                    isLoading ? <Spinner color='green.400' thickness='6px' minH={50} minW={50} speed='1s' emptyColor='gray' />
                        :
                        <SelectImg file={file} handleFile={setFile} />
                }



                <Box my={2} >
                    <Input
                        bg={bgColor}
                        border={0}
                        _focus={{
                            bg: 'whiteAlpha.300',
                        }}
                        id="title"
                        name="title"
                        placeholder="Enter Product Title Here..."
                    />
                    <Select
                        placeholder='Select Category'
                        my={1}
                        bg={bgColor}
                        border={0}
                        id="category"
                        name="category"
                        _focus={{
                            bg: 'whiteAlpha.300',
                        }} >
                        {
                            state.category.map(category => <option key={category._id} value={category.title}>{category.title}</option>)
                        }
                    </Select>
                    <Textarea
                        bg={bgColor}
                        border={0}
                        _focus={{
                            bg: 'whiteAlpha.300',
                        }}
                        id="description"
                        name="description"
                        placeholder='Here is a sample placeholder'
                        size='sm'
                    />

                    <HStack>
                        <Text  >
                            Unit Name
                        </Text>
                        <Input
                            bg={bgColor}
                            border={0}
                            _focus={{
                                bg: 'whiteAlpha.300',
                            }}
                            id="unit_name"
                            name="unit_name"
                            placeholder="Enter Product Title Here..."
                        />
                    </HStack>
                    <HStack>
                        <Text >
                            Unit Price
                        </Text>
                        <Input
                            bg={bgColor}
                            border={0}
                            _focus={{
                                bg: 'whiteAlpha.300',
                            }}
                            id="unit_price"
                            name="unit_price"
                            placeholder="Enter Product Title Here..."
                        />
                    </HStack>
                    <Button
                        bg={`${c}.400`}
                        color={sec_c}
                        _hover={{
                            bg: `${c}.600`,
                        }}
                        width={'full'}
                        // isLoading={formik.isSubmitting}
                        type='submit'
                    >
                        Add Product
                    </Button>
                </Box>






            </Stack>



        </Center>
    )
}

export default AddProduct