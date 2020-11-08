import { Col, Form, Row } from "react-bootstrap";
import React, { useState } from "react";

import { CustomLink } from "../../../../style/CustomLink";
import { IAddUser } from "../../../../assets/interfaces/Interfaces";
import { Label } from "../../../../style/Label";
import { addUserApi } from "./Api/addUser";
import { description } from "./AddUser.resources";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

export default function AddUser() {
  let history = useHistory();
  const [userId, setUserId] = useState(undefined);
  const [externalStatus, setexternalStatus] = useState(false);
  const [apiStatus, setApiStatus] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  async function addUser(data: IAddUser) {
    setUserId(undefined);
    setexternalStatus(false);
    setApiStatus(false);
    const user: IAddUser = {
      email: data.email,
      password: data.password,
      companyname: data.companyname,
      type: data.type,
    };

    try {
      const userid: any = await addUserApi(user);

      if (data.type === "internal") {
        if (
          typeof userid.folderid === "string" ||
          userid.folderid !== undefined
        ) {
          setUserId(userid.folderid);
        }
      } else {
        setexternalStatus(true);
      }
    } catch (error) {
      setApiStatus(true);
    }
  }

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
            <Form.Control as="select" name="type" ref={register}>
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
      {userId !== undefined && (
        <p>
          The user has been added, and his folder id is: <b>{userId}</b>
        </p>
      )}
      {externalStatus !== false && <p>The external user has been added!</p>}
      {apiStatus !== false && (
        <p>
          <b>E-Mail already in use!</b>
        </p>
      )}
    </React.Fragment>
  );
}
