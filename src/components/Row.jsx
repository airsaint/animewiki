import "./Row.css";
import React from "react";
import { useState, useEffect } from "react";
import api from "../api/api";

import { Text, Grid, Box, Heading, Image, Container } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Row({ title, fetchUrl }) {
  const [animes, setAnimes] = useState([]);

  const handleTooManyRequests = (error) => {
    if (error.response.status === 429) {
      console.log("Too many requests, waiting for a minute...");
      return new Promise((resolve) => setTimeout(resolve, 2000));
    }

    return Promise.reject(error);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.get(fetchUrl);
        setAnimes(result.data.data);
      } catch (error) {
        handleTooManyRequests(error).then(() => {
          fetchData();
        });
      }
    };
    fetchData();
  }, [fetchUrl]);

  //

  return (
    <Container maxW="10xl">
      <Text fontWeight="bold" fontSize="2xl" color="#47545D" mb="0.5rem">
        {title}
      </Text>
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={4}
        maxW="1200px"
        mx="auto"
        px={{ base: "4", md: "6", lg: "8" }}
        py={{ base: "4", md: "6", lg: "8" }}
      >
        {animes.map((anime) => (
          <Box
            key={anime.mal_id}
            d="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Link to={`/anime/` + anime.mal_id}>
              <Image
                className="poster"
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
                mt="8px"
                as="h5"
                size="sm"
                noOfLines={2}
              >
                {anime.title}
              </Heading>
            </Link>
          </Box>
        ))}
      </Grid>
    </Container>
  );
}
