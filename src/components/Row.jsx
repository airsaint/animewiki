import React from "react";
import { useState, useEffect } from "react";
import api from "../api/api";

import {
  Text,
  Grid,
  Heading,
  Image,
  Container,
  GridItem,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Row({ title, fetchUrl }) {
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
    <Container maxW="12xl">
      <Text
        ml="1rem"
        mt="2rem"
        fontWeight="bold"
        fontSize="2xl"
        color="#47545D"
      >
        {title}
      </Text>
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
        {animes.map((anime) => (
          <GridItem mb="0.75rem" key={anime.mal_id}>
            <Link to={`/anime/` + anime.mal_id}>
              <Image
                boxSize={{
                  base: "90%",
                  sm: "100px",
                  md: "300px",
                  lg: "300px",
                }}
                borderRadius="0.4rem"
                objectFit={"cover"}
                _hover={{
                  transform: "scale(1.03)",
                  transition: "transform 450ms",
                }}
                alt={anime.name}
                src={anime.images.webp.large_image_url}
              />

              <Heading
                _hover={{
                  color: "#C1C4C7",
                }}
                color="#415a77"
                mt="8px"
                as="h5"
                fontSize={["sm", "md"]}
                noOfLines={2}
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
export default Row;
