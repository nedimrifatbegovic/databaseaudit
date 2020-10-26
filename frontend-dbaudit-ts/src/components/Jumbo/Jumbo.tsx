import { Container, Jumbotron } from "react-bootstrap";

import React from "react";
import styled from "styled-components";
import wallpaper from "../../assets/img/kevin-ku-w7ZyuGYNpRQ-unsplash.jpg";

const Styles = styled.div`
  .jumbo {
    background: url(${wallpaper}) no-repeat fixed bottom;
    background-size: cover;
    color: #efefef;
    height: 200px;
    position: relative;
    z-index: -2;
  }

  .overlay {
    background-color: #000;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
`;

export default function Jumbo() {
  return (
    <Styles>
      <Jumbotron fluid className="jumbo">
        <Container>
          <h1>Database Audit</h1>
          <p>Wellcome!</p>
        </Container>
      </Jumbotron>
    </Styles>
  );
}
