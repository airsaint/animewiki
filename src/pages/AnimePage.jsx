import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Heading,
  SimpleGrid,
  StatLabel,
  Stat,
  StatNumber,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
} from "@chakra-ui/react";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

function Anime() {
  let params = useParams();
  const [details, setDetails] = useState([]);

  const handleTooManyRequests = (error) => {
    if (error.response.status === 429) {
      return new Promise((resolve) => setTimeout(resolve, 1500));
    }

    return Promise.reject(error);
  };

  const fetchData = async (id) => {
    try {
      const result = await api.get(`/anime/${id}`);
      setDetails(result.data.data);
    } catch (error) {
      handleTooManyRequests(error);
    }
  };

  useEffect(() => {
    fetchData(params.id);
  }, [params.id]);
  // console.log(details.trailer.embed_url);

  function StatsCard({ title, stat }) {
    return (
      <Stat
        px={{ base: 4, md: 8 }}
        py={"5"}
        shadow={"md"}
        border={"1px solid"}
        borderColor={useColorModeValue("#61688C", "#61688C")}
        rounded={"lg"}
      >
        <StatLabel color={"#61688C"} fontWeight={"medium"} isTruncated>
          {title}
        </StatLabel>
        <StatNumber color={"#61688C"} fontSize={"2xl"} fontWeight={"mesmdium"}>
          {stat}
        </StatNumber>
      </Stat>
    );
  }

  return (
    <Container maxW={{ base: "container.xs", md: "container.md", lg: "7xl" }}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <VStack>
          <Image
            rounded={"md"}
            alt={details.title}
            src={details.images?.jpg.large_image_url}
            fit={"contain"}
            align={"top"}
            w={"100%"}
            h={{ base: "50%", sm: "400px", lg: "50%" }}
            mb="1.5rem"
          />
          <Box ratio={1}>
            <iframe
              width="400"
              height="300"
              src={details.trailer?.embed_url}
              title={details.title}
              allowFullScreen
            />
          </Box>
        </VStack>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={300}
              align="center"
              color="#4F5573"
              fontSize={{ base: "4xl", sm: "4xl", lg: "4xl" }}
            >
              {details.title}{" "}
            </Heading>
            <Text
              ml="0.25rem"
              color={"#4F5573"}
              fontWeight={300}
              fontSize={"lg"}
              align="center"
            >
              {" Episodes: "}
              {details.episodes || "Ongoing"}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue("gray.500", "gray.400")}
                fontSize={"xl"}
                fontWeight={"300"}
              >
                Description
              </Text>
              <Text color={"#61688C"} fontSize={{ base: "16px", lg: "18px" }}>
                {details.synopsis}
              </Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Details
              </Text>

              <Box
                maxW={{ base: "container.xs", md: "container.md", lg: "7xl" }}
                mx={"auto"}
                pt={5}
                px={{ base: 2, md: 12, lg: 17 }}
              >
                <SimpleGrid
                  columns={{ base: 1, md: 3 }}
                  spacing={{ base: 5, lg: 8 }}
                >
                  <StatsCard title={"Score"} stat={details.score} />
                  <StatsCard
                    title={"Popularity"}
                    stat={"#" + details.popularity}
                  />
                  <StatsCard title={"Ranked"} stat={"#" + details.rank} />
                </SimpleGrid>
              </Box>
            </Box>
            <Box>
              <List spacing={2}>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"} color={"#61688C"}>
                    Year:
                  </Text>{" "}
                  {details.year}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"} color={"#61688C"}>
                    Members:
                  </Text>{" "}
                  {details.members}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"} color={"#61688C"}>
                    Status:
                  </Text>{" "}
                  {details.status}
                </ListItem>

                <ListItem>
                  <Text as={"span"} fontWeight={"bold"} color={"#61688C"}>
                    Rating:
                  </Text>{" "}
                  {details.rating}
                </ListItem>

                <ListItem>
                  <Text as={"span"} fontWeight={"bold"} color={"#61688C"}>
                    Japanese Title:
                  </Text>{" "}
                  {details.title_japanese}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"} color={"#61688C"}>
                    BackGround:
                  </Text>{" "}
                  {details.background}
                </ListItem>
              </List>
            </Box>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
export default Anime;
