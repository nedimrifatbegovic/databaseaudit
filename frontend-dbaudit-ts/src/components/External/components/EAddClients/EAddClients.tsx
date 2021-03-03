import { AddClientApi, AddClientApiResponse, addClient } from "./api/addclient";
import { Col, Form, Row } from "react-bootstrap";
import React, { useState } from "react";

import { CustomLink } from "../../../../style/CustomLink";
import { description } from "./EAddClients.resources";
import { useForm } from "react-hook-form";

export interface AddClientInterface {
  uniqueid: string;
}

export interface AddClientProps {
  email: string;
}

export function EAddClients(props: AddClientProps) {
  const { register, handleSubmit, errors } = useForm();
  const [email, setEmail] = useState<string>(props.email);
  const [outputState, setoutputState] = useState<string | undefined>();

  const AddClient = async (data: AddClientInterface) => {
    setoutputState(undefined);
    const datainput: AddClientApi = {
      email: email,
      uniqueid: data.uniqueid,
    };
    const result: AddClientApiResponse | any = await addClient(datainput);
    console.log(result);
    if (result.result) {
      setoutputState(result.result);
    }
  };

  return (
    <Form onSubmit={handleSubmit(AddClient)}>
      <Form.Group
        as={Row}
        controlId="fromUniqueid"
        style={{ marginTop: "2rem" }}
      >
        <Form.Label column>{description.uniqueid}</Form.Label>
        <Col sm="10">
          <Form.Control
            style={{ marginBottom: "2vh" }}
            placeholder={description.uniqueidmsg}
            name="uniqueid"
            type="text"
            maxLength={40}
            ref={register({ required: true, maxLength: 40 })}
          />
          {errors.uniqueid && (
            <p>
              <b>{description.error}</b>
            </p>
          )}
        </Col>
      </Form.Group>
      {outputState && (
        <p>
          <b>{outputState}</b>
        </p>
      )}
      <Row>
        <CustomLink type="submit" value="Submit" />
      </Row>
      <hr />
    </Form>
  );
}
