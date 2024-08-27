import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Spinner, Flex } from "@chakra-ui/react";

export default function OauthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (accessToken && refreshToken) {
      Cookies.set("token", accessToken, {
        expires: parseInt(import.meta.env.VITE_COOKIE_EXPIRES_IN_DAYS),
      });

      Cookies.set("refreshToken", refreshToken, {
        expires: parseInt(import.meta.env.VITE_COOKIE_EXPIRES_IN_DAYS),
      });
      navigate("/profile");
    }
  }, [navigate]);

  return (
    <>
      <Flex
        height="100vh"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="xl" />
      </Flex>
    </>
  );
}
