import { IREDUX, IUserState } from "../../assets/interfaces/Interfaces";
import React, { useEffect } from "react";

import { Container } from "react-bootstrap";
import LoginCheck from "../../assets/functions/LoginCheck";
import Logout from "../../components/Logout/Logout";
import { paths } from "../../App/AppRouter.resources";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ExternalHome() {
  let history = useHistory();
  const userState: IUserState = useSelector((state: IREDUX) => state.user);

  useEffect(() => {
    async function viewUser() {
      const userStatus = LoginCheck(userState, "external");
      if (userStatus === false) {
        history.push(paths.external.login);
      }
    }
    viewUser();
  }, []);

  return (
    <Container>
      {userState.email !== undefined ? (
        <React.Fragment>
          <div>TODO: Add Client</div>
          <div>
            TODO: Get Clients + Get Client Details (forward to new page)
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p>External user could not be found!</p>
        </React.Fragment>
      )}
      <Logout />
    </Container>
  );
}
