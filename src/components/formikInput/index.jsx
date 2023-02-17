import { FormControl, FormErrorMessage } from '@chakra-ui/react';
import {
    useColorModeValue,
    Input,
} from '@chakra-ui/react';


const FormikInput = ({ formik, nameLabel, type, placeHolder }) => {
    return (
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
    )
}

export default FormikInput