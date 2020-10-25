import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { Container } from "react-bootstrap";
import React from "react";
import styled from "styled-components";

// * Styled Components
const AppWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const MainSection = styled.div`
  flex-grow: 1;
`;

function App() {
  return (
    <AppWrapper>
      <Router>
        <MainSection>
          <Switch>
            <Route exact path="/">
              <div>Home Page</div>
            </Route>
            <Route exact path="/login">
              <div>Login Page</div>
            </Route>
            <Route>
              <div>Error 404</div>
            </Route>
          </Switch>
        </MainSection>
      </Router>
    </AppWrapper>
  );
}

export default App;
