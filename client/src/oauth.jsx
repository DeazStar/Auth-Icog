import { Flex, Link } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function Oauth() {
  return (
    <>
      <Link href="http://localhost:5000/api/v1/auth/oauth/google">
        <Flex
          border="2px solid teal"
          borderRadius="md"
          borderWidth="1px"
          padding="4px 12px"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          gap="2"
        >
          <FcGoogle />
          Google
        </Flex>
      </Link>
    </>
  );
}
