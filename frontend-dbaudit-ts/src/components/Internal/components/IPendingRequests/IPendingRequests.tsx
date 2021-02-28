import { LoadRequests, ResponseProps } from "./api/loadrequests";
import React, { useState } from "react";

import { CustomButton } from "../../../../style/CustomButton";
import { Table } from "react-bootstrap";
import { description } from "./IPendingRequests.resources";
import styled from "styled-components";

export interface PendingRequestsProps {
  email: string;
}

interface RequestsInterface {
  auditid?: number;
  externalauditoremail?: string;
  externalauditorid?: number;
  error?: string;
}

// * Style of the balanced scorecards table
const StyledTable = styled(Table)`
  overflow-x: auto;
  white-space: nowrap;

  @media only screen and (max-width: 767px) {
    display: block;
  }
`;

export default function IPendingRequests(props: PendingRequestsProps) {
  const [requestState, setRequestState] = useState<
    RequestsInterface[] | "ERROR" | undefined
  >();
  // * Handle load all requests
  const handleLoadReports = async (email: string) => {
    setRequestState(undefined);
    let data = {
      email: email,
    };
    const response: ResponseProps[] | any = await LoadRequests(data);
    console.log(response);
    if (response.length === undefined || response.length === 0) {
      setRequestState("ERROR");
    } else {
      setRequestState(response);
    }
  };

  // * Update request
  const handleSelect = async (auditid?: number) => {
    console.log(auditid);
  };

  //** Show all cases where the config has not been resolved - Audit ID, External Auditor ID and Email, Button to set status to resolved */
  return (
    <React.Fragment>
      <CustomButton onClick={() => handleLoadReports(props.email)}>
        {description.button}
      </CustomButton>
      {requestState !== undefined &&
        (requestState === "ERROR" ? (
          <React.Fragment>
            <p>No pending requests.</p>
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
                      <th>Audit ID</th>
                      <th>External Auditor Email</th>
                      <th>Show Report</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requestState.map(function (item, i) {
                      return (
                        <tr key={i}>
                          <td>{item.auditid}</td>
                          <td>{item.externalauditoremail}</td>
                          <td>
                            <CustomButton
                              onClick={() => handleSelect(item.auditid)}
                            >
                              {description.buttonupdate}
                            </CustomButton>
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
    </React.Fragment>
  );
}