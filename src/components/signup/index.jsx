import { useState, useRef, useContext } from 'react'
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { GlobalContext } from '../../context/context';

export default function Signup() {
    const { state, dispatch } = useContext(GlobalContext)
    const [showPassword, setShowPassword] = useState(false);
    const [err, setErr] = useState('')
    const firstName = useRef('')
    const lastName = useRef('')
    const email = useRef('')
    const phone = useRef('')
    const password = useRef('')

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            const result = await axios.post(`${state.api}users/signup`,
                {
                    firstName: firstName.current.value,
                    lastName: lastName.current.value,
                    email: email.current.value,
                    phone: +phone.current.value,
                    password: password.current.value,
                },
                {
                    withCredentials: true
                })
            dispatch({
                type: 'signin',
                payload: result.data
            })
        } catch (error) {
            console.log(error);
            setErr(error.message);
        }
    }

    return (
        <Flex
            // minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={4} mx={'auto'} maxW={'lg'} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Saylani Walfare Online Discount Store✌️
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        {err}
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}

                >
                    <Stack spacing={4}
                        as={'form'}
                        onSubmit={handleSignUp}>
                        <HStack>
                            <Box>
                                <FormControl id="firstName" isRequired>
                                    <FormLabel>First Name</FormLabel>
                                    <Input type="text" ref={firstName} />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="lastName">
                                    <FormLabel>Last Name</FormLabel>
                                    <Input type="text" ref={lastName} />
                                </FormControl>
                            </Box>
                        </HStack>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" ref={email} />
                        </FormControl>
                        <FormControl id="phone" isRequired>
                            <FormLabel>Phone</FormLabel>
                            <Input type="text" ref={phone} />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'} ref={password} />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() =>
                                            setShowPassword((showPassword) => !showPassword)
                                        }>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                bg={'green.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'green.500',
                                }}
                                type={'submit'}
                            >
                                Create Account
                            </Button>
                        </Stack>
                        <Text alignSelf={'flex-end'}>
                            Already a user? <Link as={RouterLink} to={'/signin'} color={'green.400'}>Login</Link>
                        </Text>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}