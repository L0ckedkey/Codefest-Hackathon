import { Box, Text, VStack } from '@chakra-ui/react'

const list = [
  {
    id: 1,
    name: 'Total Collection',
    value: 100,
    color: 'yellow',
  },
  {
    id: 2,
    name: 'Total Volume',
    value: 100,
    color: 'green',
  },
]

function Data() {
  return (
    <div>asd</div>
    // <VStack as="ul" spacing={0} listStyleType="none">
    //   {list.map(item => (
    //     <Box
    //       key={item.id}
    //       as="li"
    //       w="full"
    //       py={3}
    //       px={5}
    //       display="flex"
    //       alignItems="center"
    //       justifyContent="space-between"
    //       borderBottomWidth={1}
    //       borderColor="brand.light"
    //     >
    //       <Text color="brand.dark">{item.name}</Text>
    //       <Text color={`brand.${item.color}`} fontWeight="bold">
    //         {item.value}
    //       </Text>
    //     </Box>
    //   ))}
    // </VStack>
  )
}

export default Data