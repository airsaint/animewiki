import React from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import SearchBar from "./components/SearchBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Searched from "./pages/Searched";
import Anime from "./pages/AnimePage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ChakraProvider>
          <SearchBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/searched/:search" element={<Searched />} />
            <Route path="/anime/:id" element={<Anime />} />
          </Routes>
        </ChakraProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
