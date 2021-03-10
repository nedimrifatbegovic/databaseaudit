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

const StyledLi = styled.li`
  font-size: 1.2rem;
`;

export default function Home() {
  return (
    <React.Fragment>
      <Title>{resources.title}</Title>
      <Paragraph>{resources.subtitle}</Paragraph>
      <Paragraph>{resources.description}</Paragraph>
      <ul>
        <StyledLi>{resources.list1}</StyledLi>
        <StyledLi>{resources.list2}</StyledLi>
        <StyledLi>{resources.list3}</StyledLi>
        <StyledLi>{resources.list4}</StyledLi>
        <StyledLi>{resources.list5}</StyledLi>
        <StyledLi>{resources.list6}</StyledLi>
        <StyledLi>{resources.list7}</StyledLi>
        <StyledLi>{resources.list8}</StyledLi>
      </ul>
      <hr />
      <Paragraph>{resources.scenariotitle}</Paragraph>
      <ul>
        <StyledLi>{resources.admin}</StyledLi>
        <StyledLi>{resources.internalauditor}</StyledLi>
        <StyledLi>{resources.externalauditor}</StyledLi>
      </ul>
      <hr />
      <Paragraph>{resources.architecture}</Paragraph>
      <ul>
        <StyledLi>{resources.backend}</StyledLi>
        <StyledLi>{resources.frontend}</StyledLi>
        <StyledLi>{resources.packages}</StyledLi>
      </ul>
      <hr />
      <Paragraph>{resources.author}</Paragraph>
      <Paragraph>{resources.mentor}</Paragraph>
      <Paragraph>{resources.university}</Paragraph>
      <Paragraph>{resources.documentation}</Paragraph>
    </React.Fragment>
  );
}
