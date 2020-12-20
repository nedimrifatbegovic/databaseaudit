import { IREDUX, IUserState } from "../../assets/interfaces/Interfaces";
import React, { useEffect } from "react";

import { Container } from "react-bootstrap";
import IPasswordChange from "../../components/Internal/components/IPasswordChange/IPasswordChange";
import LoginCheck from "../../assets/functions/LoginCheck";
import Logout from "../../components/Logout/Logout";
import { paths } from "../../App/AppRouter.resources";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export default function InternalPasswordChange() {
  let history = useHistory();
  const userState: IUserState = useSelector((state: IREDUX) => state.user);

  useEffect(() => {
    console.log("I am here");
    async function viewUser() {
      const userStatus = LoginCheck(userState, "internal");
      if (userStatus === false) {
        history.push(paths.internal.login);
      }
    }
    viewUser();
  }, []);

  return (
    <Container>
      <IPasswordChange />
      <hr />
      <Logout />
    </Container>
  );
}
