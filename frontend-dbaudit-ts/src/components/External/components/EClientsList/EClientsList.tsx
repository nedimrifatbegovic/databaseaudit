import React, { useState } from "react";
import { ResponseProps, getClients } from "./api/getclients";
import { Row, Table } from "react-bootstrap";

import { CustomButton } from "../../../../style/CustomButton";
import { description } from "./EClientsList.resources";
import { paths } from "../../../../App/AppRouter.resources";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

export interface EClientsListProps {
  email: string;
}

// * Style of the balanced scorecards table
const StyledTable = styled(Table)`
  overflow-x: auto;
  white-space: nowrap;

  @media only screen and (max-width: 767px) {
    display: block;
  }
`;

export function EClientsList(props: EClientsListProps) {
  let history = useHistory();
  const [requestState, setRequestState] = useState<
    ResponseProps[] | "ERROR" | undefined
  >();
  // * Handle load all clients
  const handleLoadClients = async (email: string) => {
    setRequestState(undefined);
    let data = {
      email: email,
    };
    const response: ResponseProps[] | any = await getClients(data);

    if (response.length === undefined || response.length === 0) {
      setRequestState("ERROR");
    } else {
      setRequestState(response);
    }
  };

  // * Forward to new page for specific audit
  const handleSelect = async (
    auditid: string,
    companyname?: string,
    companyemail?: string
  ) => {
    let state = {
      auditid: auditid,
      companyname: companyname,
      email: companyemail,
    };

    history.push(paths.external.client, state);
  };

  return (
    <React.Fragment>
      <Row>
        <CustomButton onClick={() => handleLoadClients(props.email)}>
          {description.button}
        </CustomButton>
      </Row>
      {requestState !== undefined &&
        (requestState === "ERROR" ? (
          <React.Fragment>
            <p>No clients have been found.</p>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {requestState.length === 0 ? (
              <p>No pending requests.</p>
            ) : (
              <React.Fragment>
                <StyledTable striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Company Name</th>
                      <th>Unique ID</th>
                      <th>Audit Status</th>
                      <th>Reques Date</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requestState.map(function (item, i) {
                      return (
                        <tr key={i}>
                          <td>{item.companyname}</td>
                          <td>{item.uniqueid}</td>
                          <td>{item.auditstatus}</td>
                          <td>{item.auditdate}</td>
                          <td>
                            {item.auditstatus === "Accepted" ? (
                              <CustomButton
                                onClick={() =>
                                  handleSelect(
                                    item.auditid,
                                    item.companyname,
                                    item.companyemail
                                  )
                                }
                              >
                                {description.details}
                              </CustomButton>
                            ) : (
                              "-"
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </StyledTable>
              </React.Fragment>
            )}
          </React.Fragment>
        ))}
      <hr />
    </React.Fragment>
  );
}
