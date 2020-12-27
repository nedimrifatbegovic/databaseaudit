import { IREDUX, IUserState } from "../../assets/interfaces/Interfaces";
import React, { useEffect } from "react";

import { Container } from "react-bootstrap";
import InternalConfig from "../../components/InternalConfig/InternalConfig";
import LoginCheck from "../../assets/functions/LoginCheck";
import Logout from "../../components/Logout/Logout";
import { paths } from "../../App/AppRouter.resources";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export default function InternalAddConfig() {
  let history = useHistory();
  const userState: IUserState = useSelector((state: IREDUX) => state.user);

  useEffect(() => {
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
      <InternalConfig email={userState.email} />
      <hr />
      <Logout />
    </Container>
  );
}
