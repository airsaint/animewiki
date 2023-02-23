import React from "react";
import { useState } from "react";
import { Input, InputGroup, Container, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/search/" + input);
  };

  return (
    <Container p="15px" minW="7xl">
      <Text> Search for Anime </Text>
      <form onChange={submitHandler} onSubmit={submitHandler}>
        <InputGroup size={{ base: "md", lg: "lg" }} borderRadius="5px">
          <Input
            bg="white"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search"
            value={input}
            // size="lg"
          />
        </InputGroup>
      </form>
    </Container>
  );
}

export default SearchBar;
