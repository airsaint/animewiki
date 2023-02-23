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
          shadow={"xl"}
          border={"1px solid"}
          borderColor={useColorModeValue("gray.800", "gray.500")}
          rounded={"lg"}
        >
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
        </Stat>
      );
    }
  
    return (
      <Container maxW={"7xl"}>
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
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
              >
                {details.title}{" "}
              </Heading>
              <Text
                color={useColorModeValue("gray.900", "gray.400")}
                fontWeight={300}
                fontSize={"md"}
              >
                {details.episodes}
                {" Episodes "}
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
                <AspectRatio maxW="560px" ratio={1}>
                  <iframe
                    title="naruto"
                    src={details.trailer?.embed_url}
                    allowFullScreen
                  />
                </AspectRatio>
                <Text
                  color={useColorModeValue("gray.500", "gray.400")}
                  fontSize={"xl"}
                  fontWeight={"300"}
                >
                  Description
                </Text>
                <Text fontSize={"lg"}>{details.synopsis}</Text>
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
                  maxW="7xl"
                  mx={"auto"}
                  pt={5}
                  px={{ base: 2, sm: 12, md: 17 }}
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
                    <Text as={"span"} fontWeight={"bold"}>
                      Year:
                    </Text>{" "}
                    {details.year}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Members:
                    </Text>{" "}
                    {details.members}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Status:
                    </Text>{" "}
                    {details.status}
                  </ListItem>
  
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Rating:
                    </Text>{" "}
                    {details.rating}
                  </ListItem>
  
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Japanese Title:
                    </Text>{" "}
                    {details.title_japanese}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
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
  