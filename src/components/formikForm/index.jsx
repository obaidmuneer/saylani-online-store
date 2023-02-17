import { FormControl, FormErrorMessage } from '@chakra-ui/react';
import {
    Stack,
    useColorModeValue,
    Input,
    IconButton,
} from '@chakra-ui/react';

const FormikForm = ({ color, icon, placeHolder, hideBtn, formik, nameLabel, type, children }) => {
    const c = color || 'orange';
    const sec_c = useColorModeValue('white', 'gray.800')

    return (
        <>
            <Stack direction={'row'} width={'full'} as={'form'} onSubmit={formik.handleSubmit} >
                {children}
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