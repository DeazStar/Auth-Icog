import { useState } from "react";
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
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import Oauth from "./oauth.jsx";
import "./index.css";
import axios from "axios";
import BASE_URL from "./utils/apis.js";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleLogin() {
    const url = `${BASE_URL}/auth/login`;
    setError(null);
    if (!email || !password) {
      setError("All Fileds are required");
      return;
    }

    if (error) return;

    try {
      const response = await axios.post(
        url,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
          credentials: "include",
        },
      );
      const data = response.data;

      if (data.status === "success") {
        const accessToken = response.headers["authorization"];
        const refreshToken = response.headers["x-refresh-token"];
        Cookies.set("token", accessToken, {
          expires: parseInt(import.meta.env.VITE_COOKIE_EXPIRES_IN_DAYS),
        });

        const time = parseInt(import.meta.env.VITE_COOKIE_EXPIRES_IN_DAYS);
        Cookies.set("refreshToken", refreshToken, {
          expires: time,
        });
        console.log("redirecting");
        navigate("/profile");
      } else {
        setError("Opps something went wrong");
      }
    } catch (err) {
      const error = err.response.data;
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
            Log in
          </Heading>
        </CardHeader>

        <CardBody>
          <Flex alignItems="center" justifyContent="center" gap="8">
            <Oauth />
          </Flex>
          <FormControl>
            <FormLabel mt={4}>Email</FormLabel>
            <Input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormLabel mt={4}>Password</FormLabel>
            <Input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              onClick={(e) => {
                console.log("handling login");
                e.preventDefault();
                handleLogin();
              }}
            >
              Log in
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
            Don't have an account{" "}
            <Link color="teal" href="/signup">
              sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </Flex>
  );
}
