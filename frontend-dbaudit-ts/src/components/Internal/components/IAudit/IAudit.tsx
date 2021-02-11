import {
  IBalancedScorecard,
  ICombinedScorecard,
  IScorecardTable,
} from "../../../../assets/interfaces/Interfaces";
import React, { useState } from "react";

import { CustomButton } from "../../../../style/CustomButton";
import { CustomHr } from "../../../../style/CustomHr";
import { Table } from "react-bootstrap";
import TableTr from "./components/TableTr";
import { description } from "./IAudit.resources";
import { generateReport } from "./api/report";
import styled from "styled-components";

// import { IPasswordCheck } from "../../../../assets/interfaces/Interfaces";

// * Style of the balanced scorecards table
const StyledTable = styled(Table)`
  overflow-x: auto;
  white-space: nowrap;

  @media only screen and (max-width: 767px) {
    display: block;
  }
`;

// * Audit Props
interface IAuditProps {
  email: string;
}

interface ResponseProps {
  report: ICombinedScorecard;
}

export default function IAudit(props: IAuditProps) {
  const [reportState, setreportState] = useState<
    ResponseProps | undefined | any
  >();

  const [proofState, setproofState] = useState<
    IBalancedScorecard | undefined
  >();
  const [tableState, settableState] = useState<IScorecardTable | undefined>();
  // * Handle generate new audit
  const handleGenerateAudit = async (email: string) => {
    const data = {
      email: email,
    };
    const response: ResponseProps | any = await generateReport(data);
    setreportState(response);

    // export interface IBalancedScorecard {
    //   dbversion: IERROR | IDBVersion;
    //   usergroups: IERROR | any[];
    //   usergroupscheck: ICheckUserGroupsStatus | undefined;
    //   users: IERROR | any[];
    //   passwords: IERROR | IPasswordCheck[];
    //   ticketsystem: ITicketSystemReply[];
    // }

    // export interface ICombinedScorecard {
    //   balancedScorecards: IBalancedScorecard;
    //   scorecardTable: IScorecardTable;
    // }

    // export interface ITableValues {
    //   cobit: ICOBITFIELDS;
    //   value: "LOW" | "MID" | "HIGH" | "OK";
    // }

    // export interface IScorecardTable {
    //   // * I - Format Table - DB Version
    //   dbversion: ITableValues;
    //   // * II - PO2.3 - User Rights
    //   userrights: ITableValues;
    //   // * III - PO2.3 - DBA Users (Admin Rights)
    //   userrightscheck: ITableValues;
    //   // * IV - DS5 / EU Policy - Password check
    //   password: ITableValues;
    //   //* V - AC 4 - Interuptions
    //   interuptions: ITableValues;
    //   // * VI - DS11.5 - Backup, Restoration
    //   backuprestoration: ITableValues;
    //   //* VII - AI 6.1, AI 6.2 - Changes Cobit
    //   changes: ITableValues;
    // }

    // export interface IERROR {
    //   level?: string;
    //   errordescription?: string;
    // }
    setproofState(response.report.balancedScorecards);
    settableState(response.report.scorecardTable);
    console.log(response.report);
  };

  return (
    <React.Fragment>
      {/* Send request */}
      <CustomButton onClick={() => handleGenerateAudit(props.email)}>
        {description.buttonaudit}
      </CustomButton>
      {/* Show balanced scorecard */}
      {reportState !== undefined && reportState.report !== undefined ? (
        <React.Fragment>
          {/* Show Balanced Scorecards Results */}
          <CustomHr />
          <StyledTable striped bordered hover>
            {tableState === undefined ? (
              "Results loading failed. Please contact the page admin!"
            ) : (
              <React.Fragment>
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Availability</th>
                    <th>Compliance</th>
                    <th>Reliability</th>
                    <th>Confidentality</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Database Version */}
                  <TableTr
                    description={"Database Version (supported version)"}
                    availability={tableState.dbversion.cobit.Availability}
                    compliance={tableState.dbversion.cobit.Compliance}
                    reliability={tableState.dbversion.cobit.Reliability}
                    confidentiality={tableState.dbversion.cobit.Confidentality}
                    value={tableState.dbversion.value}
                  />
                  {/* User Groups */}
                  <TableTr
                    description={"User Groups"}
                    availability={tableState.userrights.cobit.Availability}
                    compliance={tableState.userrights.cobit.Compliance}
                    reliability={tableState.userrights.cobit.Reliability}
                    confidentiality={tableState.userrights.cobit.Confidentality}
                    value={tableState.userrights.value}
                  />
                  {/* User Groups Check */}
                  <TableTr
                    description={"User Groups"}
                    availability={tableState.userrightscheck.cobit.Availability}
                    compliance={tableState.userrightscheck.cobit.Compliance}
                    reliability={tableState.userrightscheck.cobit.Reliability}
                    confidentiality={
                      tableState.userrightscheck.cobit.Confidentality
                    }
                    value={tableState.userrightscheck.value}
                  />
                  {/* Password Check */}
                  <TableTr
                    description={"Password Check"}
                    availability={tableState.password.cobit.Availability}
                    compliance={tableState.password.cobit.Compliance}
                    reliability={tableState.password.cobit.Reliability}
                    confidentiality={tableState.password.cobit.Confidentality}
                    value={tableState.password.value}
                  />
                  {/* Interuptions Check */}
                  <TableTr
                    description={"Interuptions"}
                    availability={tableState.interuptions.cobit.Availability}
                    compliance={tableState.interuptions.cobit.Compliance}
                    reliability={tableState.interuptions.cobit.Reliability}
                    confidentiality={
                      tableState.interuptions.cobit.Confidentality
                    }
                    value={tableState.interuptions.value}
                  />
                  {/* Backup / Restoration Check */}
                  <TableTr
                    description={"Backup / Restoration"}
                    availability={
                      tableState.backuprestoration.cobit.Availability
                    }
                    compliance={tableState.backuprestoration.cobit.Compliance}
                    reliability={tableState.backuprestoration.cobit.Reliability}
                    confidentiality={
                      tableState.backuprestoration.cobit.Confidentality
                    }
                    value={tableState.backuprestoration.value}
                  />
                  {/* Changes Check */}
                  <TableTr
                    description={"Changes Check"}
                    availability={tableState.changes.cobit.Availability}
                    compliance={tableState.changes.cobit.Compliance}
                    reliability={tableState.changes.cobit.Reliability}
                    confidentiality={tableState.changes.cobit.Confidentality}
                    value={tableState.changes.value}
                  />
                </tbody>
              </React.Fragment>
            )}
          </StyledTable>
          <div>
            {/* Download Balanced Scorecards Results */}
            <CustomButton onClick={() => handleGenerateAudit(props.email)}>
              {description.buttontable}
            </CustomButton>
            {/* Download Balanced Scorecards Proof */}
            <CustomButton onClick={() => handleGenerateAudit(props.email)}>
              {description.buttonproof}
            </CustomButton>
          </div>
        </React.Fragment>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}
