import { Col, Form, Row } from "react-bootstrap";
import React, { useState } from "react";

import { CustomLink } from "../../style/CustomLink";
import { ILogin } from "./Api/loginApi.resources";
import { Label } from "../../style/Label";
import { LoginData } from "../../assets/interfaces/Interfaces";
import { connectUser } from "./Api/loginApi";
import { description } from "./Login.resources";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

export default function Login(props: ILogin) {
  let history = useHistory();
  const { register, handleSubmit, errors } = useForm();

  const loginUser = (data: LoginData) => {
    console.log("I got the data");

    // TODO: Get type from redux (admin, internal or external)
    const loginData = {
      email: data.email,
      password: data.password,
      type: props.type,
    };

    connectUser(
      loginData,
      (res: any) => {
        console.log(res);
        // TODO - add to redux credentials

        // TODO - forward to admin home page
      },
      (err: any) => {
        alert(err);
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit(loginUser)}>
      <Label>{description.title}</Label>
      <Form.Group as={Row} controlId="fromEmail">
        <Form.Label column>{description.email}</Form.Label>
        <Col sm="10">
          <Form.Control
            style={{ marginBottom: "2vh" }}
            placeholder={description.emailmsg}
            name="email"
            type="text"
            maxLength={40}
            ref={register({ required: true, maxLength: 40 })}
          />
          {errors.email && (
            <p>
              <b>{description.emailmsg}</b>
            </p>
          )}
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="fromPassword">
        <Form.Label column>{description.psw}</Form.Label>
        <Col sm="10">
          <Form.Control
            style={{ marginBottom: "2vh" }}
            placeholder={description.pswmsg}
            name="password"
            type="text"
            maxLength={40}
            ref={register({ required: true, maxLength: 40 })}
          />
          {errors.password && (
            <p>
              <b>{description.pswmsg}</b>
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
