import React from "react";
import { useState, useEffect } from "react";
import { Input, Box, InputGroup, Text, HStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Search2Icon } from "@chakra-ui/icons";

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

  const yearOptions = [
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
    { value: "2020 ", label: "2020" },
  ];

  const genreOptions = [
    { value: "Action ", label: "Action" },
    { value: "Adventure", label: "Adventure" },
    { value: "Fantasy", label: "Fantasy" },
  ];

  return (
    <div>
      <HStack
        p="1rem"
        maxW={{ base: "100%", md: "720px", lg: "960px", xl: "1200px" }}
        mx="auto"
      >
        <Box>
          <form onSubmit={handleSubmit}>
            <InputGroup bg="white" size="md" w="xxs" borderRadius="35px">
              <Input
                color="#6B7E8C"
                onChange={handleChange}
                placeholder="Search"
              />
            </InputGroup>
          </form>
        </Box>
        <Box>
          <Button leftIcon={<Search2Icon />} onClick={handleSubmit}>
            Search
          </Button>
        </Box>
      </HStack>

      <HStack
        spacing={8}
        p="1rem"
        maxW={{ base: "100%", md: "720px", lg: "960px", xl: "1200px" }}
        mx="auto"
      >
        <Box w="8rem">
          <Text> Genre: </Text>
          <Select placeholder="Any" options={genreOptions} />
        </Box>
        <Box w="8rem">
          <Text> Year: </Text>
          <Select placeholder="Any" options={yearOptions} />
        </Box>
      </HStack>
    </div>
  );
}

export default SearchBar;
