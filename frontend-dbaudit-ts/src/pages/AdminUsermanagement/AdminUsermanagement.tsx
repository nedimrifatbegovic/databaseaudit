import { IREDUX, IUserState } from "../../assets/interfaces/Interfaces";
import React, { useEffect } from "react";

import AUser from "../../components/Admin/components/AUser/AUser";
import { Container } from "react-bootstrap";
import LoginCheck from "../../assets/functions/LoginCheck";
import Logout from "../../components/Logout/Logout";
import { paths } from "../../App/AppRouter.resources";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminUsermanagement() {
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
      <AUser />
      <hr />
      <Logout />
    </Container>
  );
}
