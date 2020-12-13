import { Col, Container, Form, Row } from "react-bootstrap";
import {
  IExistingUser,
  IREDUX,
  UpdateUserApiInput,
  UpdateUserNewValue,
} from "../../../../assets/interfaces/Interfaces";
import React, { useState } from "react";

import { CustomLink } from "../../../../style/CustomLink";
import { Label } from "../../../../style/Label";
import { description } from "./AUser.resources";
import { editUserApi } from "./Api/editUser";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

/* Styled Components */
const StyledParagraph = styled.p`
  font-size: 1.2rem;
`;

/* Component Rendering */
export default function AUser() {
  let history = useHistory();
  const [sentState, setsentState] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const existingUserState: IExistingUser = useSelector(
    (state: IREDUX) => state.existinguser
  );

  const updateUser = (data: UpdateUserNewValue) => {
    setsentState(false);
    console.log("I got the data", data);
    const formatedRequest: UpdateUserApiInput = {
      email: existingUserState.userdetails.email,
      userType: existingUserState.usertype,
      newValue: data,
    };
    editUserApi(formatedRequest);
    setsentState(true);
  };

  return (
    <React.Fragment>
      {existingUserState.usertype !== undefined ? (
        <Container>
          <h3>
            {description.title} {existingUserState.userdetails.email}
          </h3>
          <StyledParagraph>
            {description.password}{" "}
            <b>{existingUserState.userdetails.password}</b>
          </StyledParagraph>
          <StyledParagraph>
            {description.companyName}{" "}
            <b>{existingUserState.userdetails.companyName}</b>
          </StyledParagraph>
          {existingUserState.userdetails.folderId !== undefined ? (
            <StyledParagraph>
              {description.folderId}{" "}
              <b>{existingUserState.userdetails.folderId}</b>
            </StyledParagraph>
          ) : (
            <br />
          )}
          <hr />
          <Form onSubmit={handleSubmit(updateUser)}>
            <Label>
              <b>{description.question}</b>
            </Label>
            <Form.Group as={Row} controlId="fromattributeType">
              <Col xs="12" md="2">
                <Form.Label>{description.changemsg}</Form.Label>
              </Col>
              <Col xs="12" md="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  as="select"
                  name="type"
                  ref={register}
                >
                  <option value={description.pswchangeValue}>
                    {description.pswchange}
                  </option>
                  <option value={description.companyNameValue}>
                    {description.companyNameChange}
                  </option>
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="fromnewValue">
              <Col xs="12" md="2">
                <Form.Label>{description.attributeValue}</Form.Label>
              </Col>
              <Col xs="12" md="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  placeholder={description.valuePlaceholder}
                  name="newValue"
                  type="text"
                  maxLength={40}
                  ref={register({ required: true, maxLength: 40 })}
                />
                {errors.newValue && (
                  <p>
                    <b>{description.attributeValue}</b>
                  </p>
                )}
              </Col>
            </Form.Group>
            <Row className="justify-content-center">
              <CustomLink type="submit" value="Update" />
            </Row>
            {sentState === true ? (
              <Row>
                <p>{description.submitMsg}</p>
              </Row>
            ) : (
              <React.Fragment></React.Fragment>
            )}
          </Form>
        </Container>
      ) : (
        <h3>{description.notfound}</h3>
      )}
    </React.Fragment>
  );
}
