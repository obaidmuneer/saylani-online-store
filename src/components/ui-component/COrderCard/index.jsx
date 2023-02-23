import { CheckIcon, PhoneIcon } from '@chakra-ui/icons'
import { Card, CardBody, Text, Heading, Image, Stack, Grid, GridItem, CardFooter, Select, Button, InputRightElement, InputGroup, IconButton } from '@chakra-ui/react'
import moment from 'moment/moment'
import { useContext } from 'react'
import { MdArrowDropDown } from 'react-icons/md'
import { GlobalContext } from '../../../context/context'
import useOrder from '../../../hooks/useOrder'
const COrderCard = ({ order }) => {
    const { state } = useContext(GlobalContext)
    const { updateOrder, isLoading, sucess } = useOrder()
    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            // overflow='hidden'
            variant='outline'
        >
            <Stack>
                <CardBody>
                    <Grid
                        templateRows='repeat(2, 1fr)'
                        templateColumns='repeat(5, 1fr)'
                        gap={4}
                    >
                        <GridItem rowSpan={2} colSpan={4}  >
                            <Heading size='md'>{order?.name}</Heading>
                            <Text fontSize={'xs'} >{moment(order?.createdAt).fromNow()} - {order?.status}</Text>
                            {
                                order?.cart?.orders?.map(orderedItem => (
                                    <Text key={orderedItem?.product?._id} fontSize={'md'} color={'gray.400'} >
                                        {orderedItem?.quantity}x
                                        - {orderedItem?.product?.title}
                                        - {orderedItem?.total} rs </Text>
                                ))
                            }

                        </GridItem>
                        <GridItem rowSpan={2} colSpan={1} display={'flex'} flexDir={'column'} justifyContent={'space-between'} >

                            <Text py='2'>
                                {order.user_id.phone || "Add another input to get phone no"}
                            </Text>
                            <Text py='2'>
                                Total : {order?.cart?.total}
                            </Text>
                        </GridItem>
                    </Grid>
                </CardBody>
                {
                    state?.user?.isAdmin && (
                        <CardFooter>
                            <InputGroup>
                                <Select
                                    defaultValue={order?.status}
                                    disabled={isLoading}
                                    icon={'none'}
                                    onChange={(e) => updateOrder(order._id, e.target.value)}
                                    placeholder='Change Status' >
                                    <option value='pending'>Pending</option>
                                    <option value='inprogress'>In-Progress</option>
                                    <option value='delivered'>Delivered</option>
                                    <option value='canceled'>Canceled</option>
                                </Select>
                                <InputRightElement pointerEvents={'none'} >
                                    <IconButton
                                        bg={'none'}
                                        isLoading={isLoading}
                                        icon={sucess ?
                                            <CheckIcon color='green.500' /> :
                                            <MdArrowDropDown size={18} />}
                                    />
                                </InputRightElement>

                            </InputGroup>

                        </CardFooter>
                    )
                }
            </Stack>
        </Card>
    )
}

export default COrderCard