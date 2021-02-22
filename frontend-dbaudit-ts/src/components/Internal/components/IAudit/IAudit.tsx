import {
  IBalancedScorecard,
  ICombinedScorecard,
  IScorecardTable,
} from "../../../../assets/interfaces/Interfaces";
import React, { useState } from "react";
import { Spinner, Table } from "react-bootstrap";

import BalancedScorecard from "./components/BalancedScorecard";
import { CustomButton } from "../../../../style/CustomButton";
import { CustomHr } from "../../../../style/CustomHr";
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

interface AuditStateProps {
  auditstate: "non" | "loading";
}

export default function IAudit(props: IAuditProps) {
  const [reportState, setreportState] = useState<
    ResponseProps | undefined | any
  >();

  const [proofState, setproofState] = useState<
    IBalancedScorecard | undefined
  >();
  const [tableState, settableState] = useState<IScorecardTable | undefined>();
  const [loadingState, setloadingState] = useState<boolean | undefined>();

  const initialAudit: AuditStateProps = {
    auditstate: "non",
  };
  const [auditState, setauditState] = useState<AuditStateProps>(initialAudit);

  // * Handle generate new audit
  const handleGenerateAudit = async (email: string) => {
    let loading: AuditStateProps = {
      auditstate: "loading",
    };
    setauditState(loading);
    setloadingState(false);
    const data = {
      email: email,
    };
    const response: ResponseProps | any = await generateReport(data);

    setreportState(response.report);
    setproofState(response.report.report.balancedScorecards);
    settableState(response.report.report.scorecardTable);
    setloadingState(true);
    loading = {
      auditstate: "non",
    };
    setauditState(loading);
  };

  return (
    <React.Fragment>
      {/* Send request */}
      <CustomButton onClick={() => handleGenerateAudit(props.email)}>
        {description.buttonaudit}
      </CustomButton>
      {/* Show balanced scorecard */}
      {auditState.auditstate === "loading" ? (
        <div>
          <Spinner animation="grow" variant="info" />
        </div>
      ) : (
        ""
      )}
      {reportState !== undefined && reportState.report !== undefined ? (
        <React.Fragment>
          {/* Show Balanced Scorecards Results */}
          <CustomHr />
          <p>{description.auditdescription}</p>
          <StyledTable striped bordered hover>
            {tableState === undefined ? (
              <React.Fragment>
                <p>{description.loadingFailed}</p>
                <p>{reportState.report.message}</p>
              </React.Fragment>
            ) : loadingState === false ? (
              <React.Fragment>{description.loadingMessage}</React.Fragment>
            ) : (
              loadingState === true && (
                <div>
                  <thead>
                    <tr>
                      <th>{description.field}</th>
                      <th>{description.availability}</th>
                      <th>{description.compliance}</th>
                      <th>{description.reliability}</th>
                      <th>{description.confidentiality}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Database Version */}
                    <TableTr
                      description={description.databaseVersion}
                      availability={tableState.dbversion.cobit.Availability}
                      compliance={tableState.dbversion.cobit.Compliance}
                      reliability={tableState.dbversion.cobit.Reliability}
                      confidentiality={
                        tableState.dbversion.cobit.Confidentality
                      }
                      value={tableState.dbversion.value}
                    />
                    {/* User Groups */}
                    <TableTr
                      description={description.userGroups}
                      availability={tableState.userrights.cobit.Availability}
                      compliance={tableState.userrights.cobit.Compliance}
                      reliability={tableState.userrights.cobit.Reliability}
                      confidentiality={
                        tableState.userrights.cobit.Confidentality
                      }
                      value={tableState.userrights.value}
                    />
                    {/* User Groups Check */}
                    <TableTr
                      description={description.userGroupsRights}
                      availability={
                        tableState.userrightscheck.cobit.Availability
                      }
                      compliance={tableState.userrightscheck.cobit.Compliance}
                      reliability={tableState.userrightscheck.cobit.Reliability}
                      confidentiality={
                        tableState.userrightscheck.cobit.Confidentality
                      }
                      value={tableState.userrightscheck.value}
                    />
                    {/* Password Check */}
                    <TableTr
                      description={description.passwordCheck}
                      availability={tableState.password.cobit.Availability}
                      compliance={tableState.password.cobit.Compliance}
                      reliability={tableState.password.cobit.Reliability}
                      confidentiality={tableState.password.cobit.Confidentality}
                      value={tableState.password.value}
                    />
                    {/* Interuptions Check */}
                    <TableTr
                      description={description.interuptionsCheck}
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
                      description={description.backuprestorationCheck}
                      availability={
                        tableState.backuprestoration.cobit.Availability
                      }
                      compliance={tableState.backuprestoration.cobit.Compliance}
                      reliability={
                        tableState.backuprestoration.cobit.Reliability
                      }
                      confidentiality={
                        tableState.backuprestoration.cobit.Confidentality
                      }
                      value={tableState.backuprestoration.value}
                    />
                    {/* Changes Check */}
                    <TableTr
                      description={description.changesCheck}
                      availability={tableState.changes.cobit.Availability}
                      compliance={tableState.changes.cobit.Compliance}
                      reliability={tableState.changes.cobit.Reliability}
                      confidentiality={tableState.changes.cobit.Confidentality}
                      value={tableState.changes.value}
                    />
                  </tbody>
                </div>
              )
            )}
          </StyledTable>
          {loadingState === true && (
            <div>
              {/* Download table - balanced scorecards */}
              {tableState !== undefined ? (
                <BalancedScorecard
                  field={description.field}
                  availability={description.availability}
                  compliance={description.compliance}
                  reliability={description.reliability}
                  confidentiality={description.confidentiality}
                  databaseVersion={description.databaseVersion}
                  dbversionAvailability={
                    tableState.dbversion.cobit.Availability
                  }
                  dbversionCompliance={tableState.dbversion.cobit.Compliance}
                  dbversionReliability={tableState.dbversion.cobit.Reliability}
                  dbversionConfidentality={
                    tableState.dbversion.cobit.Confidentality
                  }
                  dbversionvalue={tableState.dbversion.value}
                  userGroups={description.userGroups}
                  userrightsAvailability={
                    tableState.userrights.cobit.Availability
                  }
                  userrightsCompliance={tableState.userrights.cobit.Compliance}
                  userrightsReliability={
                    tableState.userrights.cobit.Reliability
                  }
                  userrightsConfidentality={
                    tableState.userrights.cobit.Confidentality
                  }
                  userrightsvalue={tableState.userrights.value}
                  userGroupsRights={description.userGroupsRights}
                  userrightscheckAvailability={
                    tableState.userrightscheck.cobit.Availability
                  }
                  userrightscheckCompliance={
                    tableState.userrightscheck.cobit.Compliance
                  }
                  userrightscheckReliability={
                    tableState.userrightscheck.cobit.Reliability
                  }
                  userrightscheckConfidentality={
                    tableState.userrightscheck.cobit.Confidentality
                  }
                  userrightscheckvalue={tableState.userrightscheck.value}
                  passwordCheck={description.passwordCheck}
                  passwordAvailability={tableState.password.cobit.Availability}
                  passwordCompliance={tableState.password.cobit.Compliance}
                  passwordReliability={tableState.password.cobit.Reliability}
                  passwordConfidentality={
                    tableState.password.cobit.Confidentality
                  }
                  passwordvalue={tableState.password.value}
                  interuptionsCheck={description.interuptionsCheck}
                  interuptionsAvailability={
                    tableState.interuptions.cobit.Availability
                  }
                  interuptionsCompliance={
                    tableState.interuptions.cobit.Compliance
                  }
                  interuptionsReliability={
                    tableState.interuptions.cobit.Reliability
                  }
                  interuptionsConfidentality={
                    tableState.interuptions.cobit.Confidentality
                  }
                  interuptionsvalue={tableState.interuptions.value}
                  backuprestorationCheck={description.backuprestorationCheck}
                  backuprestorationAvailability={
                    tableState.backuprestoration.cobit.Availability
                  }
                  backuprestorationCompliance={
                    tableState.backuprestoration.cobit.Compliance
                  }
                  backuprestorationReliability={
                    tableState.backuprestoration.cobit.Reliability
                  }
                  backuprestorationConfidentality={
                    tableState.backuprestoration.cobit.Confidentality
                  }
                  backuprestorationvalue={tableState.backuprestoration.value}
                  changesCheck={description.changesCheck}
                  changesAvailability={tableState.changes.cobit.Availability}
                  changesCompliance={tableState.changes.cobit.Compliance}
                  changesReliability={tableState.changes.cobit.Reliability}
                  changesConfidentality={
                    tableState.changes.cobit.Confidentality
                  }
                  changesvalue={tableState.changes.value}
                  buttondescription={description.buttontable}
                />
              ) : (
                ""
              )}
              {/* Download Balanced Scorecards Proof */}
              {/* <ReactToPrint
                trigger={() => (
                  <CustomButton>{description.buttonproof}</CustomButton>
                )}
                content={() => componentRef.current}
              /> */}
            </div>
          )}
        </React.Fragment>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}
