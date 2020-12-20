import { Container, Nav, Navbar } from "react-bootstrap";
import { descriptions, paths } from "../../../../App/AppRouter.resources";

import React from "react";
import logo from "../../../../assets/img/dbauditlogo.png";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }

  .navbar-bra,
  .navbar-nav .nav-link {
    color: white;

    &:hover {
      color: #1cd679;
    }
  }
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
  margin: 1px;
`;

export default function INavBar() {
  let history = useHistory();
  const handleClick = (link: string) => {
    history.push(link);
  };

  return (
    <Styles>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <a onClick={() => handleClick("/")}>
              <Logo src={logo} alt="Logo" />
            </a>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={() => handleClick(paths.internal.home)}>
                {descriptions.internal.home}
              </Nav.Link>
              <Nav.Link onClick={() => handleClick(paths.internal.password)}>
                {descriptions.internal.password}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Styles>
  );
}
