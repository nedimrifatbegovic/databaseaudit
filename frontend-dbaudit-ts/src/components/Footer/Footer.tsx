import React from "react";
import styled from "styled-components";
import unilogo from "./img/uni_logo.png";

const StyledFooter = styled.footer`
  width: 100%;
  line-height: 60px;
  background-color: #222;
  padding: 1rem;
  margin-top: 1rem;
`;

const Logo = styled.img`
  width: 200px;
  height: 80px;
  margin: 1px;
`;

const Paragraph = styled.p`
  margin-bottom: 0;
  color: whitesmoke;
  text-align: center;
`;

export default function Footer() {
  return (
    <StyledFooter>
      <Paragraph>
        <Logo src={unilogo} alt="Universität Wien" />
      </Paragraph>
      <Paragraph>
        <a href="https://github.com/nedimrifatbegovic" target="_blank">
          Author: Nedim Rifatbegovic
        </a>
      </Paragraph>
    </StyledFooter>
  );
}
