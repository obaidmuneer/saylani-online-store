import { useContext } from 'react'
import { Heading, Text } from '@chakra-ui/react'
import { GlobalContext } from '../../context/context'

const HeadingTitle = ({ nav }) => {
  const { state } = useContext(GlobalContext)
  return (
    <Heading
      fontWeight={600}
      textAlign={'center'}
      fontSize={nav ? { base: '1xl', sm: '2xl' } : { base: '3xl', sm: '4xl', md: '6xl' }}
      lineHeight={'110%'}>
      Saylani Walfare {' '}
      <br />
      <Text as={'span'} color={'green.400'}

        fontSize={nav ? { base: '1xl', sm: 'sm' } : { base: '1xl', sm: '1xl', md: '3xl' }}
      >
        Discount Store
      </Text>
    </Heading>
  )
}

export default HeadingTitle