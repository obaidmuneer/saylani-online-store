import { Card, CardBody, Text, Heading, Image, Stack, Grid, GridItem } from '@chakra-ui/react'
import moment from 'moment/moment'
const COrderCard = ({ order, phone }) => {
    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            // overflow='hidden'
            variant='outline'
        >
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
                            order?.cart?.orders.map(orderedItem => <Text key={orderedItem?.product?._id} fontSize={'md'} >{orderedItem?.quantity}x
                                - {orderedItem?.product?.title}
                                - {orderedItem?.total} rs </Text>)
                        }

                        {/* <Text>Total</Text> */}
                    </GridItem>
                    <GridItem rowSpan={2} colSpan={1} display={'flex'} flexDir={'column'} justifyContent={'space-between'} >

                        <Text py='2'>
                            {phone || "Add another input to get phone no"}
                        </Text>
                        <Text py='2'>
                            Total : {order?.cart?.total}
                        </Text>
                    </GridItem>
                </Grid>
            </CardBody>
        </Card>
    )
}

export default COrderCard