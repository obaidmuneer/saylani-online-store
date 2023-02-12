import { useFormik } from 'formik';
import * as yup from 'yup';
import {
    Stack, Box,
} from '@chakra-ui/react';
import useDoc from '../../hooks/useProduct';
import { BsSearch } from 'react-icons/bs'
import FormikForm from '../formikForm';

const validationSchema = yup.object().shape({
    link: yup.string().min(3).required('Please enter a link'),
});

const ProductSearch = () => {
    const { postLink } = useDoc()

    const formik = useFormik({
        initialValues: {
            link: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, actions) => {
            await postLink(values)
            actions.setSubmitting(false)
            actions.resetForm()
        },
    });

    return (
        <Box my={4} width='full'>
            <Stack direction={'row'}>
                <FormikForm
                    formik={formik}
                    color={'green'}
                    nameLabel={'product-search'}
                    placeHolder={'Enter Product Name to Search'}
                    icon={<BsSearch />} />
            </Stack>
        </Box>
    )
}

export default ProductSearch