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
  Box,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Oauth from "./oauth.jsx";
import "./index.css";

export default function Login() {
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
            Log in
          </Heading>
        </CardHeader>

        <CardBody>
          <Flex alignItems="center" justifyContent="center" gap="8">
            <Oauth />
          </Flex>
          <FormControl>
            <FormLabel mt={4}>Email</FormLabel>
            <Input type="email" />
            <FormLabel mt={4}>Password</FormLabel>
            <Input type="password" />
            <Button mt={4} colorScheme="teal" type="submit">
              Log in
            </Button>
          </FormControl>
        </CardBody>

        <CardFooter>
          <p>
            Don't have an account{" "}
            <Link color="teal" href="/signup">
              sing up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </Flex>
  );
}
