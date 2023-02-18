import { Button } from '@chakra-ui/react';
import {
    Stack,
    useColorModeValue,
} from '@chakra-ui/react';

const FormikForm = ({ color, icon, hideBtn, formik, _dir, btnTitle, children }) => {
    const c = color || 'orange';
    const sec_c = useColorModeValue('white', 'gray.800')

    return (
        <>
            <Stack direction={_dir || 'row'} width={'full'} as={'form'} onSubmit={formik.handleSubmit} >
                {children}
                {
                    !hideBtn && <Button
                        bg={`${c}.400`}
                        color={sec_c}
                        _hover={{
                            bg: `${c}.600`,
                        }}
                        aria-label="Subscribe"
                        isLoading={formik.isSubmitting}
                        type='submit' >
                        {icon || btnTitle || "Submit"}
                    </Button>

                }
            </Stack>
        </>
    )
}

export default FormikForm