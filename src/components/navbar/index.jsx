import { useContext } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom'
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
    IconButton,
    Hide,
    Show,
    Text,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { GlobalContext } from '../../context/context';
import HeadingTitle from '../headingTitle';
import { BsCart4 } from 'react-icons/bs';

const Links = [{ title: 'Home', path: '/' }];

const NavLink = ({ children, path }) => (
    <Link
        as={RouterLink}
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        to={path}
    >
        {children}
    </Link>
);


export default function Navbar() {
    const { state, dispatch } = useContext(GlobalContext)
    // console.log(state.user);
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleLogout = async () => {
        try {
            const result = await axios.get(`${state.api}users/logout`, { withCredentials: true })
            console.log(result.data);
            dispatch({
                type: 'logout',
            })
        } catch (error) {
            console.log(error);
        }
    }

    const bg_c = useColorModeValue('gray.200', 'gray.700')
    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Show below='md' >
                            <HeadingTitle nav={true} />
                        </Show>
                        <Show above='md' >
                            <Box>
                                <Text>
                                    Saylani {' '}
                                    <Text as={'span'} color={'green.400'} >
                                        Walfare
                                    </Text>
                                </Text>

                                <Text color={'blue.400'} fontSize={'xs'} >
                                    Discount Store
                                </Text>
                            </Box>
                        </Show>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) => (
                                <NavLink path={link.path} key={link.title}>{link.title}</NavLink>
                            ))}
                        </HStack>
                    </HStack>

                    <Flex alignItems={'center'} >
                        <Stack direction={'row'} spacing={3}>
                            <Button>
                                <BsCart4 />
                            </Button>
                            <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button>

                            {
                                state.user ? <Menu>
                                    <MenuButton
                                        as={Button}
                                        rounded={'full'}
                                        variant={'link'}
                                        cursor={'pointer'}
                                        minW={0}>
                                        <Avatar
                                            size={'sm'}
                                            src={'https://avatars.dicebear.com/api/male/username.svg'}
                                        />
                                    </MenuButton>
                                    <MenuList alignItems={'center'}>
                                        <br />
                                        <Center>
                                            <Avatar
                                                size={'2xl'}
                                                src={'https://avatars.dicebear.com/api/male/username.svg'}
                                            />
                                        </Center>
                                        <br />
                                        <Center>
                                            <p>{state?.user?.firstName} {state?.user?.lastName}</p>
                                        </Center>
                                        <br />
                                        <MenuDivider />
                                        <MenuItem as={RouterLink} to={'/add-category'} >Add Category</MenuItem>
                                        <MenuItem as={RouterLink} to={'/add-product'} >Add Product</MenuItem>
                                        <MenuItem>Profile Setting</MenuItem>
                                        <MenuItem>Change Password</MenuItem>
                                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                    </MenuList>
                                </Menu> : <Stack
                                    flex={{ base: 1, md: 0 }}
                                    justify={'flex-end'}
                                    direction={'row'}
                                    spacing={6}>
                                    <Button
                                        as={RouterLink}
                                        fontSize={'sm'}
                                        fontWeight={400}
                                        variant={'link'}
                                        to={'/signin'}>
                                        Sign In
                                    </Button>
                                    <Button
                                        display={{ base: 'none', md: 'inline-flex' }}
                                        fontSize={'sm'}
                                        as={RouterLink}
                                        fontWeight={600}
                                        color={'white'}
                                        bg={'orange.400'}
                                        to={'/signup'}
                                        _hover={{
                                            bg: 'orange.600',
                                        }}>
                                        Sign Up
                                    </Button>
                                </Stack>
                            }
                        </Stack>
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link.title}>{link.title}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}