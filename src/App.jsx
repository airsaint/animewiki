import React from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import SearchBar from "./components/SearchBar";
import { Route, Routes } from "react-router-dom";
import Anime from "./pages/AnimePage";
import Home from "./pages/Home";
import Searched from "./pages/Search";

import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <ChakraProvider>
        <Navbar />
        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:search" element={<Searched />} />
          <Route path="/anime/:id" element={<Anime />} />
        </Routes>
      </ChakraProvider>
    </div>
  );
}

export default App;
