import { Col, Form, Row } from "react-bootstrap";
import React, { useState } from "react";

import { CustomLink } from "../../../../style/CustomLink";
import { Label } from "../../../../style/Label";
import { NewUser } from "../../../../assets/interfaces/Interfaces";
import { description } from "./AddUser.resources";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

export default function AddUser() {
  let history = useHistory();
  const { register, handleSubmit, errors } = useForm();

  const addUser = (data: NewUser) => {
    console.log("I got the data");
  };

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit(addUser)}>
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
        <Form.Group as={Row} controlId="fromPassword">
          <Form.Label column>{description.password}</Form.Label>
          <Col sm="10">
            <Form.Control
              style={{ marginBottom: "2vh" }}
              placeholder={description.passwordmsg}
              name="password"
              type="text"
              maxLength={40}
              ref={register({ required: true, maxLength: 40 })}
            />
            {errors.password && (
              <p>
                <b>{description.passwordmsg}</b>
              </p>
            )}
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="fromCompanyname">
          <Form.Label column>{description.companyname}</Form.Label>
          <Col sm="10">
            <Form.Control
              style={{ marginBottom: "2vh" }}
              placeholder={description.companynamemsg}
              name="companyname"
              type="text"
              maxLength={40}
              ref={register({ required: true, maxLength: 40 })}
            />
            {errors.companyname && (
              <p>
                <b>{description.companynamemsg}</b>
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
