import { useFormik } from 'formik';
import * as yup from 'yup';
import {
    Stack, Box,
} from '@chakra-ui/react';
import useProduct from '../../hooks/useProduct';
import { BsSearch } from 'react-icons/bs'
import FormikForm from '../formikForm';

const validationSchema = yup.object().shape({
    text: yup.string().min(3).required('Please enter something to search'),
});

const ProductSearch = () => {
    const { searchProducts } = useProduct()

    const formik = useFormik({
        initialValues: {
            text: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, actions) => {
            await searchProducts(values.text)
            actions.setSubmitting(false)
            // actions.resetForm()
        },
    });

    return (
        <Box my={4} width='full'>
            <Stack direction={'row'}>
                <FormikForm
                    formik={formik}
                    color={'green'}
                    nameLabel={'text'}
                    placeHolder={'Enter Product Name to Search'}
                    icon={<BsSearch />} />
            </Stack>
        </Box>
    )
}

export default ProductSearch