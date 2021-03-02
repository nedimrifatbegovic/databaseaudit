import { Col, Container, Form, Row } from "react-bootstrap";
import {
  IPassword,
  IREDUX,
  IUserState,
  IPasswordChange as InterfacePasswordChange,
} from "../../../../assets/interfaces/Interfaces";
import React, { useState } from "react";

import { CustomLink } from "../../../../style/CustomLink";
import { description } from "./EPasswordChange.resources";
import { updatePassword } from "./api/PSWApi";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function EPasswordChange() {
  const { register, handleSubmit, errors } = useForm();
  const [sentState, setsentState] = useState(false);

  const existingUserState: IUserState = useSelector(
    (state: IREDUX) => state.user
  );

  const updateUser = (data: IPassword) => {
    setsentState(false);
    const formatedRequest: InterfacePasswordChange = {
      email: existingUserState.email,
      newpassword: data.newValue,
    };
    updatePassword(formatedRequest);
    setsentState(true);
  };

  return (
    <Container>
      <h1>{description.title}</h1>
      <Form onSubmit={handleSubmit(updateUser)}>
        <Form.Group as={Row} controlId="fromPassword">
          <Col xs="12" md="2">
            <Form.Label>{description.passwordLabel}</Form.Label>
          </Col>
          <Col xs="12" md="10">
            <Form.Control
              style={{ marginBottom: "2vh" }}
              placeholder={description.passwordPlaceholder}
              name="newValue"
              type="text"
              maxLength={40}
              ref={register({ required: true, maxLength: 40 })}
            />
            {errors.newValue && (
              <p>
                <b>{description.passwordMissingPassword}</b>
              </p>
            )}
          </Col>
        </Form.Group>
        <Row className="justify-content-center">
          <CustomLink type="submit" value="Update" />
        </Row>
        {sentState === true ? (
          <Row>
            <p>{description.passwordUpdated}</p>
          </Row>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </Form>
    </Container>
  );
}
