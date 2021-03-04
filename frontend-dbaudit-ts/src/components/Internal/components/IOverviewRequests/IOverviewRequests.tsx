import {
  LoadRequests,
  ResponseProps,
  StatusUpdateProps,
  UpdateInternalAuditStatus,
} from "./api/overviewrequest";
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
  const [statusupdateState, setstatusupdateState] = useState<
    "OK" | "ERROR" | undefined
  >();
  // * Handle load all requests
  const handleLoadReports = async (email: string) => {
    setRequestState(undefined);
    let data = {
      email: email,
    };
    const response: ResponseProps[] | any = await LoadRequests(data);
    console.log("Overview response: ", response.report);
    if (response.report.length === undefined || response.report.length === 0) {
      setRequestState("ERROR");
    } else {
      setRequestState(response.report);
    }
  };

  // * Update request
  const handleSelect = async (updatevalue: string, auditid?: number) => {
    setstatusupdateState(undefined);
    const data: StatusUpdateProps = {
      auditid: auditid,
      status: updatevalue,
    };

    try {
      await UpdateInternalAuditStatus(data);
      setstatusupdateState("OK");
    } catch (error) {
      console.log(error);
      setstatusupdateState("ERROR");
    }
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
                                handleSelect("Accepted", item.auditid)
                              }
                            >
                              {description.buttonaccept}
                            </CustomButton>
                            <CustomButton
                              onClick={() =>
                                handleSelect("Declined", item.auditid)
                              }
                            >
                              {description.buttondecline}
                            </CustomButton>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </StyledTable>
                {statusupdateState ? (
                  <React.Fragment>
                    {statusupdateState === "ERROR" && (
                      <p>{statusupdateState}</p>
                    )}
                    {statusupdateState === "OK" && (
                      <p>
                        Your request has been sent! Please load the overview
                        again in order to see the changes!
                      </p>
                    )}
                  </React.Fragment>
                ) : (
                  ""
                )}
              </React.Fragment>
            )}
          </React.Fragment>
        ))}
    </React.Fragment>
  );
}
