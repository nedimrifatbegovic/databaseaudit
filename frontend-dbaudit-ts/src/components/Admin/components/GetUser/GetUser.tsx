import { Col, Form, Row } from "react-bootstrap";

import { CustomLink } from "../../../../style/CustomLink";
import { ExistingUser } from "../../../../assets/interfaces/Interfaces";
import { Label } from "../../../../style/Label";
import React from "react";
import { description } from "./GetUser.resources";
import { getUser } from "../../../../redux/Redux-actions/ExistingUserActions";
import { paths } from "../../../../App/AppRouter.resources";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

export default function GetUser() {
  let history = useHistory();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  const getUserFunc = (data: ExistingUser) => {
    console.log("I got the data", data);
    dispatch(getUser(data));
    console.log("I got the user!");
    history.push(paths.admin.user);
  };

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit(getUserFunc)}>
        <Label>
          <b>{description.title}</b>
        </Label>
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
        <Form.Group as={Row} controlId="fromType">
          <Form.Label column>{description.type}</Form.Label>
          <Col sm="10">
            <Form.Control
              style={{ marginBottom: "2vh" }}
              as="select"
              name="type"
              ref={register}
            >
              <option value={description.internalValue}>
                {description.internalText}
              </option>
              <option value={description.externalValue}>
                {description.externalText}
              </option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Row className="justify-content-md-center">
          <CustomLink type="submit" value="Submit" />
        </Row>
      </Form>
    </React.Fragment>
  );
}
