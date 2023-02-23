import { useContext, useEffect } from 'react'
import { Avatar, Box, Center, Divider, Heading, Stack } from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as yup from 'yup';

import { GlobalContext } from '../../context/context'
import FormikForm from '../formikForm'
import FormikInput from '../formikInput'
import COrderCard from '../ui-component/COrderCard';
import useOrder from '../../hooks/useOrder';

const validationSchema = yup.object().shape({
    name: yup.string().min(3).required('Please Enter Your Name'),
});

const Orders = () => {
    const { state } = useContext(GlobalContext)
    const { getOrders } = useOrder()

    useEffect(() => {
        if (state.user.isAdmin) {
            (async () => await getOrders())()
        }
    }, [])

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, actions) => {
            console.log(values);
            actions.setSubmitting(false)
        },
    });

    return (
        <Center>
            <Stack alignItems='center'  >
                {!state.user.isAdmin && (
                    <>
                        <Heading color={'blue.500'} fontSize={'3xl'} >
                            Setting
                        </Heading>
                        <Box border={'solid'} p={2} borderRadius={'full'} borderColor={'green.400'}>
                            <Avatar
                                size={'2xl'}
                                src={'https://images.unsplash.com/photo-1555041469-a586c61ea9bc'}
                            />
                        </Box>
                        <FormikForm
                            formik={formik}
                            color={'green'}
                            btnTitle={"Update"}
                        >
                            <FormikInput
                                formik={formik}
                                nameLabel={'name'}
                                placeHolder={'Update Your Name'} />
                        </FormikForm>
                    </>
                )}
                <Box>
                    <Heading fontSize={'2xl'} color={'blue.400'} >
                        Orders
                    </Heading>
                    <Divider my={2} />
                    {
                        state.user.isAdmin ?
                            state?.adminOrders?.map(order => <Box key={order?._id} >
                                <COrderCard order={order} />
                                <Divider my={2} />
                            </Box>) :
                            state.orders.map(order => <Box key={order?._id} >
                                <COrderCard order={order} phone={state?.user?.phone} />
                                <Divider my={2} />
                            </Box>)
                    }
                </Box>

            </Stack>
        </Center>
    )
}

export default Orders