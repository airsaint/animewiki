import React from "react";
import { useState, useEffect } from "react";
import api from "../api/api";
import {
  Box,
  Heading,
  Image,
  Container,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useParams, Link } from "react-router-dom";
import "./Search.css";

function Searched() {
  const [searchedAnime, setSearchedAnime] = useState<Array<any>>([]);
  let params = useParams();

  const handleTooManyRequests = (error) => {
    if (error.response.status === 429) {
      console.log("Too many requests, waiting for a minute...");
      return new Promise((resolve) => setTimeout(resolve, 2000));
    }

    return Promise.reject(error);
  };

  useEffect(() => {
    const fetchData = async (name) => {
      try {
        const result = await api.get(
          `/anime?q=${name}&order_by=popularity&type=tv`
        );
        setSearchedAnime(result.data.data);
      } catch (error) {
        handleTooManyRequests(error).then(() => {
          fetchData(name);
        });
      }
    };
    fetchData(params.search);
  }, [params.search]);

  return (
    <Container maxW="10xl">
      <Heading ml="1.5rem" color="#47545D" mt="1.5rem" size="lg" mb="1rem">
        Results
      </Heading>
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(auto-fit, minrmax(5, 1fr))",
          lg: "repeat(5, 1fr)",
        }}
        placeContent="center"
        gap={4}
        maxW="1200px"
        mx="auto"
        px={{ base: "4", md: "6", lg: "8" }}
        py={{ base: "4", md: "6", lg: "8" }}
      >
        {searchedAnime.map((anime) => (
          <GridItem
            key={anime.mal_id}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Link to={`/anime/` + anime.mal_id}>
              <Image
                boxSize={{
                  base: "80%",
                  sm: "100px",
                  md: "300px",
                  lg: "300px",
                }}
                pos="relative"
                borderRadius="0.5rem"
                objectFit={"cover"}
                mb="0.5rem"
                _hover={{
                  transform: "scale(1.02)",
                  transition: "transform 450ms",
                }}
                alt={anime.name}
                src={anime.images.webp.large_image_url}
              />

              <Heading
                _hover={{
                  color: "#C05746",
                }}
                color="#415a77"
                mt="0.5rem"
                as="h6"
                size="sm"
                noOfLines={2}
                mb="1.5rem"
              >
                {anime.title}
              </Heading>
            </Link>
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
}

export default Searched;
