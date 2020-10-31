import { Col, Form, Row } from "react-bootstrap";
import { IREDUX, IUserState } from "../../assets/interfaces/Interfaces";
import React, { useEffect } from "react";

import { CustomLink } from "../../style/CustomLink";
import { paths } from "../../App/AppRouter.resources";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

interface ILoginStatus {
  type: string;
}
export default function LoginStatus(props: ILoginStatus) {
  let history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const user: IUserState = useSelector((state: IREDUX) => state.user);

  useEffect(() => {
    async function fetchUserData() {
      if (user.status === true && user.type === props.type) {
        switch (props.type) {
          case "admin":
            history.push(paths.admin.home);
            break;
          case "internal":
            history.push(paths.internal.home);
            break;
          case "external":
            history.push(paths.external.home);
            break;
          default:
            break;
        }
      }
    }
    fetchUserData();
  });

  const getLogin = () => {
    switch (props.type) {
      case "admin":
        history.push(paths.admin.login);
        break;
      case "internal":
        history.push(paths.internal.login);
        break;
      case "external":
        history.push(paths.external.login);
        break;
      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit(getLogin)}>
        <Col>
          <Row>
            <h1>Your login has failed.</h1>
          </Row>
          <Row>
            <h3>Please try again, entering the correct credentials.</h3>
          </Row>
          <Row>
            <p>Press the button and you will be forwarded to the login:</p>
          </Row>
          <Row>
            <CustomLink type="submit" value="Forward to login" />
          </Row>
        </Col>
      </Form>
    </React.Fragment>
  );
}
