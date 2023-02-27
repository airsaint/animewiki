import React from "react";
import { useState } from "react";
import { Input, InputGroup, Text, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const inputText = event.target.value;
    setInput(inputText);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/search/" + input);
  };

  return (
    <Box
      p="1rem"
      maxW={{ base: "100%", md: "720px", lg: "960px", xl: "1200px" }}
      mx="auto"
    >
      <Text mb="0.5rem" fontWeight={"bold"} color={"#47545D"}>
        {" "}
        Search any anime...{" "}
      </Text>
      <form onSubmit={handleSubmit}>
        <InputGroup bg="white" size="lg" w="auto" borderRadius="35px">
          <Input color="#6B7E8C" onChange={handleChange} placeholder="Search" />
        </InputGroup>
      </form>
    </Box>
  );
}

export default SearchBar;
