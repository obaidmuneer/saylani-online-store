import { useContext, useState } from "react";
import {
    AspectRatio,
    Box,
    Center,
    Container,
    Input,
    Spinner,
    Stack,
    Text,
    useColorModeValue,
    Icon
} from "@chakra-ui/react";
import { GlobalContext } from "../../context/context";
import useDoc from "../../hooks/useProduct";
import { BsCamera } from "react-icons/bs";

export default function SelectImg({ file, handleFile }) {
    const { isLoading } = useDoc()
    const [preview, setPreview] = useState('')

    return (
        <Container >
            {isLoading ? <Center minH={'36vh'}  >
                <Spinner color='green.400' thickness='6px' minH={100} minW={100} speed='0.6s' emptyColor='gray' />
            </Center> :
                <Stack alignItems={'center'} >
                    {
                        preview ? <img src={preview} alt="my file" /> : <AspectRatio width="64" ratio={2 / 1}>
                            <Box
                                borderColor="gray.300"
                                borderStyle="dashed"
                                borderWidth="2px"
                                rounded="md"
                                shadow="sm"
                                role="group"
                                transition="all 150ms ease-in-out"
                                _hover={{
                                    shadow: "md"
                                }}
                                initial="rest"
                                animate="rest"
                                whilehover="hover"
                            >


                                <Box position="relative" height="100%" width="500%">
                                    <Box
                                        position="absolute"
                                        top="0"
                                        left="0"
                                        height="100%"
                                        width="100%"
                                        display="flex"
                                        flexDirection="column"
                                    >
                                        <Stack
                                            height="100%"
                                            width="100%"
                                            display="flex"
                                            alignItems="center"
                                            justify="center"
                                            spacing="4"
                                        >

                                            <Stack p="8" textAlign="center" spacing="1">
                                                <Text fontWeight="light">
                                                    {file ? `${file.target.files[0].name} selected` : <Icon as={BsCamera} boxSize='16' />}
                                                </Text>
                                            </Stack>
                                        </Stack>
                                    </Box>
                                    <Input
                                        type="file"
                                        height="100%"
                                        width="100%"
                                        position="absolute"
                                        top="0"
                                        left="0"
                                        opacity="0"
                                        aria-hidden="true"
                                        onChange={(e) => {
                                            handleFile(e)
                                            if (e.target.files[0].type.split('/')[0] === 'image') {
                                                let url = URL.createObjectURL(e.target.files[0])
                                                setPreview(url)
                                            }
                                        }}
                                    />
                                </Box>
                            </Box>
                        </AspectRatio>
                    }

                </Stack>
            }
        </Container>
    );
}
