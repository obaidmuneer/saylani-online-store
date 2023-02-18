import { Box, Button, Heading, HStack, Spacer, Stack, Text } from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as yup from 'yup';
import { MdDelete } from 'react-icons/md'
import CartCard from '../ui-component/cartCatd'
import FormikForm from '../formikForm';
import FormikInput from '../formikInput';
import { useContext } from 'react';
import { GlobalContext } from '../../context/context';

const validationSchema = yup.object().shape({
    name: yup.string().min(3).required('Please Enter Your Name'),
    address: yup.string().min(3).required('Please Enter Address for parcel'),
});

const Cart = () => {
    const { state } = useContext(GlobalContext)

    const formik = useFormik({
        initialValues: {
            name: '',
            address: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, actions) => {
            console.log(values);
        },
    });
    return (
        <Box px={5} >
            <HStack>
                <Heading as={'span'} color={'green.400'} >
                    Shopping
                    <Text color={'blue.400'} >Cart</Text>
                </Heading>
                <Spacer />
                <Button color={'green.400'} rounded='full' p={0} >
                    <MdDelete size={26} />
                </Button>
            </HStack>
            {/* title, unit_price, img */}
            <Stack>
                {
                    state?.cart?.orders.map(order => <CartCard key={order.product._id} title={order.product.title}
                        unit_price={order.product.unit_price}
                        img={order.product.file} />)
                }
            </Stack>
            <HStack fontSize={20} fontWeight={600} my={2} >
                <Text  >
                    Shopping
                </Text>
                <Spacer />
                <Text >Total Price : {state?.cart?.total}</Text>
            </HStack>


            <FormikForm
                formik={formik}
                _dir={'column'}
                color={'green'}
                btnTitle={"Place Order"}
            >
                <FormikInput
                    formik={formik}
                    nameLabel={'name'}
                    placeHolder={'Enter Your Name'} />
                <FormikInput
                    formik={formik}
                    nameLabel={'address'}
                    placeHolder={'Enter Address for parcel'} />
            </FormikForm>


        </Box>
    )
}

export default Cart