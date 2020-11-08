import { Col, Form, Row } from "react-bootstrap";
import {
  ILogin,
  IUserCall,
  LoginData,
} from "../../assets/interfaces/Interfaces";

import { CustomLink } from "../../style/CustomLink";
import { Label } from "../../style/Label";
import React from "react";
import { description } from "./Login.resources";
import { paths } from "../../App/AppRouter.resources";
import { setUser } from "../../redux/Redux-actions/UserActions";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

export default function Login(props: ILogin) {
  let history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const loginUser = (data: LoginData) => {
    const user: IUserCall = {
      email: data.email,
      password: data.password,
      type: props.type,
    };
    dispatch(setUser(user));

    switch (props.type) {
      case "admin":
        history.push(paths.admin.loginstatus);
        break;
      case "internal":
        history.push(paths.internal.loginstatus);
        break;
      case "external":
        history.push(paths.external.loginstatus);
        break;
      default:
        break;
    }
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
