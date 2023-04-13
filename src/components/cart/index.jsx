import { Box, Button, Heading, HStack, Spacer, Stack, Text } from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as yup from 'yup';
import { MdDelete } from 'react-icons/md'
import CartCard from '../ui-component/cartCard'
import FormikForm from '../formikForm';
import FormikInput from '../formikInput';
import { useContext } from 'react';
import { GlobalContext } from '../../context/context';
import useCart from '../../hooks/useCart';
import useOrder from '../../hooks/useOrder';
import Payment from '../payment'
import { useNavigate } from 'react-router-dom';
import usePatch from '../../hooks/usePatch';


const validationSchema = yup.object().shape({
    name: yup.string().min(3).required('Please Enter Your Name'),
    address: yup.string().min(3).required('Please Enter Address for parcel'),
});

const Cart = () => {
    const navigate = useNavigate()
    const patch = usePatch()
    const { state } = useContext(GlobalContext)
    const { deleteCart, isLoading } = useCart()

    const formik = useFormik({
        initialValues: {
            name: '',
            address: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, actions) => {
            // console.log(values);
            patch('checkout', values)
            actions.setSubmitting(false)
            navigate('/payment')
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
                {
                    state?.cart?.isChecked === false &&
                    <Button onClick={deleteCart} isLoading={isLoading} color={'green.400'} rounded='full' p={0} >
                        <MdDelete size={26} />
                    </Button>
                }

            </HStack>
            {
                state?.cart?.isChecked === false ? <>
                    <Stack>
                        {
                            state?.cart?.orders?.map(order => <CartCard key={order.product._id} title={order.product.title}
                                unit_price={order.product.unit_price}
                                img={order.product.file}
                                total_price={order.total}
                                quantity={order.quantity}
                                id={order.product._id}
                            />)
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
                </> : 'Please order product from home page to see cart '
            }
            {/* <br /> */}
            {/* {
                state.orders.length ?
                    state.orders.map(order => order.status == 'pending' ?
                        `You have ${state.orders.length} orders in pending` : null)
                    : null
            } */}
        </Box>
    )
}

export default Cart