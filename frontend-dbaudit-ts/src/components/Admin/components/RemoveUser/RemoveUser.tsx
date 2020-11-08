import { Col, Form, Row } from "react-bootstrap";
import React, { useState } from "react";

import { CustomLink } from "../../../../style/CustomLink";
import { ExistingUser } from "../../../../assets/interfaces/Interfaces";
import { Label } from "../../../../style/Label";
import { deleteUserApi } from "./Api/deleteUser";
import { description } from "./RemoveUser.resources";
import { useForm } from "react-hook-form";

export default function RemoveUser() {
  const { register, handleSubmit, errors } = useForm();
  const [apiStatus, setApiStatus] = useState(false);
  const [errorMsg, seterrorMsg] = useState(false);

  async function removeUser(data: ExistingUser) {
    setApiStatus(false);
    seterrorMsg(false);

    const user: ExistingUser = {
      email: data.email,
      type: data.type,
    };

    try {
      const userstatus: any = await deleteUserApi(user);
      if (userstatus.status === true) {
        setApiStatus(true);
      } else {
        seterrorMsg(true);
      }
    } catch (error) {
      seterrorMsg(true);
      console.log(error);
    }
  }

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit(removeUser)}>
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
      {apiStatus !== false && (
        <p>
          <b>{description.apistatus}</b>
        </p>
      )}
      {errorMsg !== false && (
        <p>
          <b>{description.errormsg}</b>
        </p>
      )}
    </React.Fragment>
  );
}
