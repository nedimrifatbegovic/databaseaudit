import { IREDUX, IUserState } from "../../assets/interfaces/Interfaces";
import React, { useEffect } from "react";

import { Container } from "react-bootstrap";
import { EAddClients } from "../../components/External/components/EAddClients/EAddClients";
import { EClientsList } from "../../components/External/components/EClientsList/EClientsList";
import LoginCheck from "../../assets/functions/LoginCheck";
import Logout from "../../components/Logout/Logout";
import { Row } from "react-bootstrap";
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
    <React.Fragment>
      {userState.email !== undefined ? (
        <React.Fragment>
          <div>
            <h3>Add new client</h3>
            <EAddClients email={userState.email} />
          </div>
          <div>
            <h3>Get all clients</h3>
            <EClientsList email={userState.email} />
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p>External user could not be found!</p>
        </React.Fragment>
      )}
      <Row>
        <Logout />
      </Row>
    </React.Fragment>
  );
}
