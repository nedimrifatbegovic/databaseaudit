import React from "react";
import resources from "./Home.resources.json";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
  @media (min-width: 1024px) {
    font-size: 2rem;
  }
`;

const Paragraph = styled.p`
  text-align: justify;
  font-size: 1.2rem;
`;

export default function Home() {
  return (
    <React.Fragment>
      <Title>{resources.title}</Title>
      <Paragraph>{resources.subtitle}</Paragraph>
      <Paragraph>{resources.description}</Paragraph>
    </React.Fragment>
  );
}
