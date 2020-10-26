import { Container, Nav, Navbar } from "react-bootstrap";

import React from "react";
import logo from "../../assets/img/dbauditlogo.png";
import styled from "styled-components";

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

export default function NavigationBar() {
  return (
    <Styles>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <a href="/">
              <Logo src={logo} alt="Logo" />
            </a>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/admin">Admin</Nav.Link>
              <Nav.Link href="/internal">Internal Audit</Nav.Link>
              <Nav.Link href="/external">External Audit</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Styles>
  );
}