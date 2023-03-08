import React from "react";
import Row from "../components/Row";
import requests from "../api/request";

function Home() {
  return (
    <div>
      <Row title="Top Airing Anime" fetchUrl={requests.airing} />
      <Row title="Top Upcoming Anime" fetchUrl={requests.upcoming} />
      <Row title="Top Rated Anime" fetchUrl={requests.bypopularity} />
      <Row title="Most Popular Anime" fetchUrl={requests.all} />
    </div>
  );
}
export default Home;
