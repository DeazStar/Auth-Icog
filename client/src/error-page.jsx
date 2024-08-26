import { useRouteError } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import "./index.css";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div id="error-page">
      <Heading>Sorry, an unexpected error has occured.</Heading>
      <Heading>
        <i>{error.statusText || error.message}</i>
      </Heading>
    </div>
  );
}
