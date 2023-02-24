import {
  Box,
  AspectRatio,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StatLabel,
  Stat,
  StatNumber,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  Skeleton,
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
      return new Promise((resolve) => setTimeout(resolve, 2000));
    }

    return Promise.reject(error);
  };

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const result = await api.get(`/anime/${id}`);
        setDetails(result.data.data);
      } catch (error) {
        handleTooManyRequests(error).then(() => {
          fetchData();
        });
      }
    };
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
        <StatLabel fontColor={"#61688C"} fontWeight={"medium"} isTruncated>
          {title}
        </StatLabel>
        <StatNumber
          fontColor={"#61688C"}
          fontSize={"2xl"}
          fontWeight={"mesmdium"}
        >
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
        <Flex>
          <Image
            rounded={"md"}
            alt={details.title}
            src={details.images?.jpg.large_image_url}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "100%" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={300}
              color="#4F5573"
              fontSize={{ base: "4xl", sm: "4xl", lg: "6xl" }}
            >
              {details.title}{" "}
            </Heading>
            <Text
              ml="0.25rem"
              color={"#4F5573"}
              fontWeight={300}
              fontSize={"lg"}
            >
              {" Episodes: "}
              {details.episodes || "Ongoing"}
            </Text>
          </Box>
          <Box ratio={1}>
            <iframe
              width="600"
              height="300"
              src={details.trailer?.embed_url}
              title={details.title}
              allowFullScreen
            />
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
              <Text color={"#61688C"} fontSize={"lg"}>
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
