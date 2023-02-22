import React from "react";
import { useState, useEffect } from "react";
import api from "../api/api";
import { SimpleGrid, Container, Heading, Image } from "@chakra-ui/react";
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
    <Container p="1.5rem" minW="7xl">
      <Heading mt="1.5rem" ml="0.8rem" mb="2rem" size="lg">
        {title}
      </Heading>
      <SimpleGrid minChildWidth="11rem" spacing={6}>
        {animes.map((anime) => (
          <Container key={anime.mal_id}>
            <Link to={`/anime/` + anime.mal_id}>
              <Image
                _hover={{
                  transform: "scale(1.05)",
                  transition: "transform 450ms",
                }}
                maxH="350px"
                borderRadius="5px"
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
                size="s"
                noOfLines={2}
              >
                {anime.title}
              </Heading>
            </Link>
          </Container>
        ))}
      </SimpleGrid>
    </Container>

    // <Grid className="row">
    //   <h2>{title}</h2>
    //   <div className="row--posters">
    //     {animes.map((anime) => (
    //       <img
    //         className="row--poster"
    //         key={anime.mal_id}
    //         alt={anime.name}
    //         src={anime.images.webp.large_image_url}
    //       />
    //     ))}
    //   </div>
    // </Grid>
  );
}
