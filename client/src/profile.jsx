import {
  Box,
  Flex,
  Image,
  FormControl,
  Button,
  Input,
  FormLabel,
} from "@chakra-ui/react";

export default function Profile() {
  return (
    <Flex
      height="100vh"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        padding={[5, 5]}
      >
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src="https://bit.ly/dan-abramov"
            alt="profile"
            borderRadius="full"
          />
        </Flex>
        <FormControl>
          <FormLabel mt={4}>Full Name</FormLabel>
          <Input type="text" value="Naod Ararsa" />
          <FormLabel mt={4}>Email</FormLabel>
          <Input type="email" value="naodararsa7@gmail.com" />
          <Button mt={4} colorScheme="teal" type="submit">
            Update
          </Button>
        </FormControl>
      </Box>
    </Flex>
  );
}
