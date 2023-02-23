import React from "react";
import { useState, useEffect } from "react";
import api from "../api/api";
import { Box, Heading, Image, Grid } from "@chakra-ui/react";
import { useParams, Link } from "react-router-dom";

function Searched() {
  const [searchedAnime, setSearchedAnime] = useState([]);
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
          fetchData();
        });
      }
    };
    fetchData(params.search);
  }, [params.search]);

  return (
    <div className="row">
      <Heading size="lg" mb="1rem">
        Results
      </Heading>
      <Grid className="row--posters">
        {searchedAnime.map((anime) => (
          <Box key={anime.mal_id}>
            <Link to={`/anime/` + anime.mal_id}>
              <Image
                className="poster"
                _hover={{
                  transform: "scale(1.05)",
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
    </div>

    //   <Container maxW="7xl">
    //     <Heading size="lg" p="1rem" mb="1rem">
    //       Results
    //     </Heading>
    //     <SimpleGrid minChildWidth="12rem" spacing={6}>
    //       {searchedAnime.map((anime) => (
    //         <Container centerContent key={anime.mal_id}>
    //           <Link to={`/anime/` + anime.mal_id}>
    //             <Image
    //               _hover={{
    //                 transform: "scale(1.05)",
    //                 transition: "transform 450ms",
    //               }}
    //               maxHeight="350px"
    //               borderRadius="5px"
    //               alt={anime.name}
    //               src={anime.images.jpg.large_image_url}
    //             />
    //             <Heading color="#415a77" mt="8px" as="h5" size="s" noOfLines={2}>
    //               {anime.title}
    //             </Heading>
    //           </Link>
    //         </Container>
    //       ))}
    //     </SimpleGrid>
  );
}

export default Searched;
