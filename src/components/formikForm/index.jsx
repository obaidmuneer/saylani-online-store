import { FormControl, FormErrorMessage } from '@chakra-ui/react';
import {
    Stack,
    useColorModeValue,
    Input,
    IconButton,
} from '@chakra-ui/react';

const FormikForm = ({ color, icon, placeHolder, hideBtn, formik, nameLabel, type }) => {
    const c = color || 'orange';
    const sec_c = useColorModeValue('white', 'gray.800')

    return (
        <>
            <Stack direction={'row'} width={'full'} as={'form'} onSubmit={formik.handleSubmit} >
                <FormControl isInvalid={formik.errors[nameLabel] && formik.touched[nameLabel]}>
                    <Input
                        bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                        border={0}
                        _focus={{
                            bg: 'whiteAlpha.300',
                        }}
                        id={nameLabel}
                        name={nameLabel}
                        value={formik.values[nameLabel]}
                        onChange={formik.handleChange}
                        placeholder={placeHolder}
                        type={type || 'text'}
                        autoComplete='off'
                    />
                    <FormErrorMessage>{formik.errors[nameLabel]}</FormErrorMessage>
                </FormControl>
                {
                    !hideBtn && <IconButton
                        bg={`${c}.400`}
                        color={sec_c}
                        _hover={{
                            bg: `${c}.600`,
                        }}
                        aria-label="Subscribe"
                        icon={icon}
                        isLoading={formik.isSubmitting}
                        type='submit'
                    />
                }
            </Stack>
        </>
    )
}

export default FormikForm