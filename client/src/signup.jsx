import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Button,
  Flex,
  CardFooter,
  Link,
} from "@chakra-ui/react";
import Oauth from "./oauth.jsx";
import "./index.css";

export default function Singup() {
  return (
    <Flex
      height="100vh"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Card maxW="sm" padding={[5, 5]}>
        <CardHeader>
          <Heading size="lg" textAlign={["center"]}>
            Sing up
          </Heading>
        </CardHeader>

        <CardBody>
          <Flex alignItems="center" justifyContent="center" gap="8">
            <Oauth />
          </Flex>
          <FormControl>
            <FormLabel mt={4}>Full Name</FormLabel>
            <Input type="text" />
            <FormLabel mt={4}>Email</FormLabel>
            <Input type="email" />
            <FormLabel mt={4}>Password</FormLabel>
            <Input type="password" />
            <Button mt={4} colorScheme="teal" type="submit">
              Sign up
            </Button>
          </FormControl>
        </CardBody>

        <CardFooter>
          <p>
            Have an account?{" "}
            <Link color="teal" href="/login">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </Flex>
  );
}
