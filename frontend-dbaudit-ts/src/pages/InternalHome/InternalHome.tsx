import { IREDUX, IUserState } from "../../assets/interfaces/Interfaces";
import React, { useEffect } from "react";

import { Container } from "react-bootstrap";
import Internal from "../../components/Internal/Internal";
import LoginCheck from "../../assets/functions/LoginCheck";
import Logout from "../../components/Logout/Logout";
import { paths } from "../../App/AppRouter.resources";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export default function InternalHome() {
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
      {userState.email !== undefined ? (
        <Internal email={userState.email} />
      ) : (
        <React.Fragment>
          <p>Mail could not be found!</p>
        </React.Fragment>
      )}

      <Logout />
    </Container>
  );
}
