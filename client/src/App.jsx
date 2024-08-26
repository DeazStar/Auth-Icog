import { useState } from "react";
import "./index.css";
import { Button } from "@chakra-ui/react";

function App() {
  function handleNavigation(link) {
    window.location = `/${link}`;
  }

  return (
    <>
      <h1>Welcome to Dedstar Portal</h1>
      <div className="btn-container">
        <Button colorScheme="teal" onClick={() => handleNavigation("signup")}>
          Sign up
        </Button>
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => handleNavigation("login")}
        >
          Log in
        </Button>
      </div>
    </>
  );
}

export default App;
