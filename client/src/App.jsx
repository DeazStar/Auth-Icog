import "./index.css";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate();
  return (
    <>
      <h1>Welcome to Dedstar Portal</h1>
      <div className="btn-container">
        <Button colorScheme="teal" onClick={() => navigate("/signup")}>
          Sign up
        </Button>
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => navigate("/login")}
        >
          Log in
        </Button>
      </div>
    </>
  );
}

export default App;
