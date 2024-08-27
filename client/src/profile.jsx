import {
  Box,
  Flex,
  Image,
  FormControl,
  Button,
  Input,
  FormLabel,
  SkeletonCircle,
  SkeletonText,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BASE_URL from "./utils/apis";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const url = `${BASE_URL}/user/profile`;
  const refreshURL = `${BASE_URL}/auth/refresh`;

  async function handleUpdate() {
    setError(null);
    try {
      const token = Cookies.get("token");

      const response = await axios.put(
        url,
        {
          fullName: name,
          email: email,
        },
        {
          headers: {
            Authorization: token,
          },
          withCredentials: true,
          credentials: "include",
        },
      );

      const data = response.data.data;

      setName(data.user.fullName);
      setEmail(data.user.email);
    } catch (e) {
      const error = e.response.data;
      setError(error.message);
    }
  }

  async function fetchRefreshToken(accessToken, refreshToken) {
    try {
      const response = await axios.post(
        refreshURL,
        {},
        {
          headers: {
            Authorization: accessToken,
            "X-Refresh-Token": refreshToken,
          },
          withCredentials: true,
          credentials: "include",
        },
      );

      const data = response.data;
      if (data.status === "success") {
        const accessToken = response.headers["authorization"];
        Cookies.set("token", accessToken, {
          expires: import.meta.env.VITE_COOKIE_EXPIRES_IN / 1440,
        });

        fetchUserProfile();
      }
    } catch (e) {
      const error = e.response.data;
      if (
        error.message === "Unautorized" ||
        error.message === "Token is not valid"
      )
        navigate("/login");
    }
  }

  async function fetchUserProfile() {
    try {
      setIsLoading(true);
      const token = Cookies.get("token");

      if (!token) window.location = "/login";
      const response = await axios.get(url, {
        headers: {
          Authorization: `${token}`,
        },
        withCredentials: true,
        credentials: "include",
      });

      const data = response.data.data;

      setName(data.user.fullName);
      setEmail(data.user.email);
    } catch (e) {
      const error = e.response.data;
      if (error.message === "Unautorized") window.location = "/login";

      if (error.message === "Token is not valid") {
        const refreshToken = Cookies.get("refreshToken");
        const accessToken = Cookies.get("token");
        fetchRefreshToken(accessToken, refreshToken);
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUserProfile();
  }, []);

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
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
        {isLoading && (
          <>
            <SkeletonCircle size="60" />
            <SkeletonText mt="8" noOfLines={4} spacing="4" skeletonHeight="2" />
          </>
        )}
        {!isLoading && (
          <>
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
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <FormLabel mt={4}>Email</FormLabel>
              <Input
                type="email"
                value={email}
                id="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Button
                mt={4}
                colorScheme="teal"
                type="submit"
                onClick={handleUpdate}
              >
                Update
              </Button>
            </FormControl>
          </>
        )}
      </Box>
    </Flex>
  );
}
