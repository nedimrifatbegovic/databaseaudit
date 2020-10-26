import { Col, Form, Row } from "react-bootstrap";
import React, { useState } from "react";

import { LoginData } from "../../assets/interfaces/Interfaces";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const Label = styled.label`
  margin-bottom: 2vh;
`;

const CustomLink = styled.input`
  background-color: #222;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #222;
  border-radius: 3px;

  &:hover {
    color: grey;
    text-decoration: none;
  }
`;

export default function Login() {
  let history = useHistory();
  const { register, handleSubmit, errors } = useForm();

  const loginUser = (data: LoginData) => {
    console.log("I got the data");
  };

  return (
    <Form onSubmit={handleSubmit(loginUser)}>
      <Label>Please enter your email and password!</Label>
      <Form.Group as={Row} controlId="fromEmail">
        <Form.Label column>Email:</Form.Label>
        <Col sm="10">
          <Form.Control
            style={{ marginBottom: "2vh" }}
            placeholder="Please enter your email"
            name="email"
            ref={register({ required: true, maxLength: 30 })}
          />
          {errors.email && (
            <p>
              <b>Please enter your email.</b>
            </p>
          )}
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="fromPassword">
        <Form.Label column>Password:</Form.Label>
        <Col sm="10">
          <Form.Control
            style={{ marginBottom: "2vh" }}
            placeholder="Please enter your password"
            name="password"
            ref={register({ required: true, maxLength: 30 })}
          />
          {errors.password && (
            <p>
              <b>Please enter your password.</b>
            </p>
          )}
        </Col>
      </Form.Group>
      <Row className="justify-content-md-center">
        <CustomLink type="submit" value="Submit" />
      </Row>
    </Form>
  );
}
