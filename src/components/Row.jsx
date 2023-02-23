import "./Row.css";
import React from "react";
import { useState, useEffect } from "react";
import api from "../api/api";

import { Grid, Box, Heading, Image, Container } from "@chakra-ui/react";
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
    <Container border="1px solid" maxW="9xl" p="1rem">
      <Heading size="lg" mb="1rem">
        {title}
      </Heading>
      <Grid className="row--posters">
        {animes.map((anime) => (
          <Box key={anime.mal_id}>
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
                  color: "#003049",
                }}
                color="#415a77"
                mt="8px"
                as="h5"
                size="md"
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
