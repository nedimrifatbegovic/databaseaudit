import React, { useState } from "react";
import { ResponseProps, getClients } from "./api/getclients";
import { Row, Table } from "react-bootstrap";

import { CustomButton } from "../../../../style/CustomButton";
import { description } from "./EClientsList.resources";
import styled from "styled-components";

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
    console.log(response);
    if (response.length === undefined || response.length === 0) {
      setRequestState("ERROR");
    } else {
      setRequestState(response);
    }
  };

  // TODO: * Forward to new page for specific audit
  const handleSelect = async (auditid: string) => {
    console.log(auditid);
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
                                onClick={() => handleSelect(item.auditid)}
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
