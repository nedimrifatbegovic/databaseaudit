import { IREDUX, IUserState } from "../../assets/interfaces/Interfaces";
import React, { useEffect } from "react";

import { CustomButton } from "../../style/CustomButton";
import EAllReports from "../../components/External/components/EAllReports/EAllReports";
import ENewReport from "../../components/External/components/ENewReport/ENewReport";
import LoginCheck from "../../assets/functions/LoginCheck";
import Logout from "../../components/Logout/Logout";
import { Row } from "react-bootstrap";
import { description } from "./ExternalClientDetails.resources";
import { paths } from "../../App/AppRouter.resources";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export interface ClientLocationProps {
  state: {
    auditid: string;
    companyname: string;
    email: string;
  };
}
export default function ExternalClientDetails() {
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
  const location: ClientLocationProps = useLocation();
  console.log(location.state);
  // * Forward to home page for specific audit
  const handleSelect = async () => {
    history.push(paths.external.home);
  };

  return (
    <React.Fragment>
      {location.state.auditid ? (
        <React.Fragment>
          {userState.email !== undefined ? (
            <React.Fragment>
              <h1>
                Audit Page{" "}
                {location.state.companyname && location.state.companyname}
              </h1>
              <Row>
                <CustomButton onClick={() => handleSelect()}>
                  {description.button}
                </CustomButton>
              </Row>
              <hr />
              <Row>
                <ENewReport
                  auditid={location.state.auditid}
                  email={location.state.email}
                  companyname={location.state.companyname}
                />
              </Row>
              <hr />
              <Row>
                <EAllReports
                  auditid={location.state.auditid}
                  companyname={location.state.companyname}
                />
              </Row>
              <hr />
              <div>TODO: Add input field for requesting config fix</div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <p>External user could not be found!</p>
            </React.Fragment>
          )}
        </React.Fragment>
      ) : (
        <p>No Audit ID Found. Please go back to the overview page.</p>
      )}
      <hr />
      <Row>
        <Logout />
      </Row>
    </React.Fragment>
  );
}
