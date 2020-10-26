import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { Container } from "react-bootstrap";
import Footer from "../components/Footer/Footer";
import Home from "../pages/Home/Home";
import NavigationBar from "../components/NavigationBar/NavigationBar";
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
            <NavigationBar />
            <Container>
              <Home />
            </Container>
          </Route>
          <Route exact path="/login">
            <div>Login Page</div>
          </Route>
          <Route>
            <div>Error 404</div>
          </Route>
        </Switch>
      </MainSection>
      <Footer />
    </Router>
  );
}
