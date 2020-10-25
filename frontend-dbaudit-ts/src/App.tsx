import AppRouter from "./App/AppRouter";
import { Container } from "react-bootstrap";
import React from "react";
import styled from "styled-components";

// * Styled Components
const AppWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

function App() {
  return (
    <AppWrapper>
      <AppRouter />
    </AppWrapper>
  );
}

export default App;
