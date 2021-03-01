import { LoadRequests, ResponseProps } from "./api/overviewrequest";
import React, { useState } from "react";

import { CustomButton } from "../../../../style/CustomButton";
import { Table } from "react-bootstrap";
import { description } from "./IOverviewRequests.resources";
import styled from "styled-components";

export interface OverviewRequetsProps {
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

export default function IOverviewRequests(props: OverviewRequetsProps) {
  // Show all external audits, and their status / pending / declined / accepted, add buttons for accept / decline, send audit id with the response
  const [requestState, setRequestState] = useState<
    ResponseProps[] | "ERROR" | undefined
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

  // TODO: * Update request
  const handleSelect = async (updatevalue: string, auditid?: number) => {
    console.log(auditid, updatevalue);
  };

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
                      <th>Audit Status</th>
                      <th>Update Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requestState.map(function (item, i) {
                      return (
                        <tr key={i}>
                          <td>{item.auditid}</td>
                          <td>{item.extenralauditormail}</td>
                          <td>{item.status}</td>
                          <td>
                            <CustomButton
                              onClick={() =>
                                handleSelect("ACCEPTED", item.auditid)
                              }
                            >
                              {description.buttonaccept}
                            </CustomButton>
                            <CustomButton
                              onClick={() =>
                                handleSelect("DECLINED", item.auditid)
                              }
                            >
                              {description.buttonaccept}
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
