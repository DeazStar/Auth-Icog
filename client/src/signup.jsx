import {
  FormControl,
  FormLabel,
  Input,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Button,
  Flex,
  CardFooter,
  Link,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { isEmail } from "validator";
import Oauth from "./oauth.jsx";
import "./index.css";
import { useState } from "react";
import BASE_URL from "./utils/apis.js";
import axios from "axios";

export default function Singup() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);

  async function handleSignup() {
    const url = `${BASE_URL}/auth/signup`;
    setError(null);

    if (!name || !email || !password) {
      setError("All Fileds are required");
      return;
    }

    if (password.length < 8) {
      setError("Password must have length more than 8");
      return;
    }
  
    if (!isEmail(email)) {
      setError("Provide valid email");
      return;
    }

    if (error) return;
    try {
      const response = await axios.post(url, {
        fullName: name,
        email: email,
        password: password,
      });
      const data = response.data;

      if (data.status === "success") {
        window.location = "/login";
      } else {
        console.log("Something went wrong");
      }
    } catch (err) {
      const error = e.response.data;
      setError(error.message);
    }
  }
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
            Sign up
          </Heading>
        </CardHeader>

        <CardBody>
          <Flex alignItems="center" justifyContent="center" gap="8">
            <Oauth />
          </Flex>
          <FormControl isRequired>
            <FormLabel mt={4}>Full Name</FormLabel>
            <Input type="text" onChange={(e) => setName(e.target.value)} />
            <FormLabel mt={4}>Email</FormLabel>
            <Input type="email" onChange={(e) => setEmail(e.target.value)} />
            <FormLabel mt={4}>Password</FormLabel>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSignup();
              }}
            >
              Sign up
            </Button>
          </FormControl>
        </CardBody>
        <CardFooter flexDirection="column">
          {error && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}
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
