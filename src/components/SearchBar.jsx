import React from "react";
import { useState } from "react";
import {
  Input,
  InputGroup,
  Container,
  Text,
  InputRightElement,
  Button,
  InputRightAddon,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Search2Icon } from "@chakra-ui/icons";
import api from "../api/api";

function SearchBar() {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleChange = async (event) => {
    const inputText = event.target.value;
    setInput(inputText);

    try {
      const response = await api.get(
        `/anime?q=${inputText}&order_by=popularity&type=tv`
      );
      const data = response.data.data;
      setSuggestions(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/search/" + input);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    navigate("/search/" + suggestion);
  };

  return (
    <Container p="15px" minW="7xl">
      <Text> Search for Anime </Text>
      <form>
        <InputGroup bg="white" size="lg" w="auto" borderRadius="35px">
          <Input onChange={handleChange} placeholder="Search"></Input>
        </InputGroup>
        {suggestions.length > 0 && (
          <Box
            position="absolute"
            zIndex="1"
            bg="white"
            w="full"
            py="2"
            borderRadius="lg"
          >
            {suggestions.map((suggestion) => (
              <Box
                key={suggestion}
                px="4"
                py="2"
                _hover={{ bg: "gray.100" }}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </Box>
            ))}
          </Box>
        )}
      </form>
    </Container>

    // <Container p="15px" minW="3xl">
    //   <Text> Search for Anime </Text>
    //   <form onSubmit={handleSubmit}>
    //     <InputGroup bg="white" size="lg" w="auto" borderRadius="35px">
    //       <Input
    //         onChange={handleChange}
    //         placeholder="Search"
    //       />
    //     </InputGroup>
    //   </form>
    // </Container>
  );
}

export default SearchBar;
