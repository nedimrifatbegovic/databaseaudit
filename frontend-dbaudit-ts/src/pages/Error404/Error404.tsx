import { Image } from "react-bootstrap";
import React from "react";
import database from "./img/database-152091_960_720.png";
import styled from "styled-components";

// Bild von <a href="https://pixabay.com/de/users/openclipart-vectors-30363/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=152091">OpenClipart-Vectors</a> auf <a href="https://pixabay.com/de/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=152091">Pixabay</a>

const Logo = styled(Image)`
  width: 50px;
  height: 50px;
  margin: 1rem;
  @media (min-width: 1024px) {
    width: 200px;
    height: 200px;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 1rem;
  @media (min-width: 1024px) {
    font-size: 2rem;
  }
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
`;

export default function Error404() {
  return (
    <Center>
      <Title>Error 404: Page Not Found</Title>
      <Logo src={database} fluid />
    </Center>
  );
}
