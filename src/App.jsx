import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ChakraProvider>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </ChakraProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
