import React, { useState, useEffect } from "react";
import axios from "axios";
import Coffee from "./Coffee";
import Header from "./Header";
import styled from "styled-components";

const Home = styled.div`
  text-align: center;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  width: 100%;
  padding: 20px;
  > div {
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
  }
`;

const Coffees = () => {
  const [coffees, setCoffees] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/coffees.json")
      .then((resp) => setCoffees(resp.data.data))
      .catch((resp) => console.log(resp));
  }, [coffees.length]);

  const grid = coffees.map( (coffee, index) => {
    const { name, image_url, slug, avg_score } = coffee.attributes

    return (
      <Coffee 
        key={index}
        name={name}
        image_url={image_url}
        slug={slug}
        average_score={avg_score}
      />
    )
  })

  return (
    <Home>
      <Header />
      <Grid>{grid}</Grid>
    </Home>
  );
};

export default Coffees;
