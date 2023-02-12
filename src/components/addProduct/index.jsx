import { Avatar, Box, Button, Center, Heading, HStack, IconButton, Image, Input, Select, Stack, Text, Textarea, useColorModeValue } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { GlobalContext } from '../../context/context'
import useDoc from '../../hooks/useProduct'
import SelectImg from '../selectImg'
import CategoryHCard from '../ui-component/categoryHCard'

const AddProduct = () => {
    const { postFile } = useDoc()
    const { state } = useContext(GlobalContext)
    const [name, setName] = useState('')
    const [file, setFile] = useState('')

    const bgColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.100')
    const c = 'green';
    const sec_c = useColorModeValue('white', 'gray.800')


    const handleData = async () => {
        // console.log(file.target.files[0]);
        let formData = new FormData();
        formData.append("myFile", file.target.files[0]);
        formData.append("name", name);
        formData.append("contentType", 'file');
        formData.append("classId", state.classId);
        // console.log(formData);
        await postFile(formData)
        // props.onClose()
    }

    return (
        <Center>
            <Stack my={2} align='center' width={'100%'} >
                <Heading color={'blue.500'} >
                    Add New Item
                </Heading>

                <SelectImg file={file} handleFile={setFile} />
                <Box >
                    <Input
                        bg={bgColor}
                        border={0}
                        _focus={{
                            bg: 'whiteAlpha.300',
                        }}
                        id="name"
                        name="name"
                        placeholder="Enter Product Title Here..."
                        // width="110"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <Select
                        placeholder='Select Category'
                        my={1}
                        bg={bgColor}
                        border={0}
                        _focus={{
                            bg: 'whiteAlpha.300',
                        }} >
                        <option value='option1'>Option 1</option>
                        <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3</option>
                    </Select>
                    <Textarea
                        bg={bgColor}
                        border={0}
                        _focus={{
                            bg: 'whiteAlpha.300',
                        }}
                        // value={value}
                        // onChange={handleInputChange}
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
                            id="name"
                            name="name"
                            placeholder="Enter Product Title Here..."
                            onChange={(e) => setName(e.target.value)}
                            value={name}
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
                            id="name"
                            name="name"
                            placeholder="Enter Product Title Here..."
                            onChange={(e) => setName(e.target.value)}
                            value={name}
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