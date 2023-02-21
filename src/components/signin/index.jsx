import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    InputRightElement,
    InputGroup
} from '@chakra-ui/react';
import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../context/context';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';


export default function Signin() {
    const { state, dispatch } = useContext(GlobalContext)
    const [showPassword, setShowPassword] = useState(false);
    const [err, setErr] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSignIn = async (e) => {
        e.preventDefault()
        try {
            const result = await axios.post(`${state.api}users/signin`,
                { email, password },
                { withCredentials: true })
            dispatch({
                type: 'signin',
                payload: result.data.user
            })
            dispatch({
                type: 'cart',
                payload: result.data.cart
            })
            dispatch({
                type: 'cart',
                payload: result.data.orders
            })
            navigate('/')
        } catch (error) {
            console.log(error);
            setErr(error.message);
        }
    }

    return (
        <Flex
            // minH={'100v  h'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign='center'>
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
                    as={'form'}
                    onSubmit={handleSignIn}
                >
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password} />
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
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox>Remember me</Checkbox>
                                <Link color={'green.400'}>Forgot password?</Link>
                            </Stack>
                            <Button
                                bg={'green.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'green.500',
                                }}
                                type={'submit'}>
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}