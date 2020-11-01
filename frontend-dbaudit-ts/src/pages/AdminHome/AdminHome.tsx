import { IREDUX, IUserState } from "../../assets/interfaces/Interfaces";
import React, { useEffect } from "react";

import Admin from "../../components/Admin/Admin";
import { Container } from "react-bootstrap";
import LoginCheck from "../../assets/functions/LoginCheck";
import { paths } from "../../App/AppRouter.resources";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminHome() {
  let history = useHistory();
  const userState: IUserState = useSelector((state: IREDUX) => state.user);
  useEffect(() => {
    async function viewUser() {
      const userStatus = LoginCheck(userState, "admin");
      if (userStatus === false) {
        history.push(paths.admin.login);
      }
    }
    viewUser();
  }, []);

  return (
    <Container>
      <Admin />
    </Container>
  );
}
