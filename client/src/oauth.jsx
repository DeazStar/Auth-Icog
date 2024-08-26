import { Flex, Link } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function Oauth() {
  return (
    <>
      <Link>
        <Flex flexDirection="row" alignItems="center" gap="2">
          <FcGoogle />
          Google
        </Flex>
      </Link>

      <Link>
        <Flex flexDirection="row" alignItems="center" gap="2">
          <FaGithub />
          Github
        </Flex>
      </Link>
    </>
  );
}
