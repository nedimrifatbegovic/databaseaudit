import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { Container } from "react-bootstrap";
import React from "react";
import styled from "styled-components";

const MainSection = styled.div`
  flex-grow: 1;
`;

export default function AppRouter() {
  return (
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
  );
}
