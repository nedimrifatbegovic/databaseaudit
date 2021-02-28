import { LoadReports, ResponseProps } from "./api/loadreports";
import React, { useState } from "react";

import BalancedScorecard from "../IAudit/components/BalancedScorecard";
import { CustomButton } from "../../../../style/CustomButton";
import { CustomHr } from "../../../../style/CustomHr";
import Proof from "../IAudit/components/Proof";
import { Table } from "react-bootstrap";
import TableTr from "../IAudit/components/TableTr";
import { description } from "./IAllReports.resources";
import styled from "styled-components";

export interface AllReportsProps {
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

export default function IAllReports(props: AllReportsProps) {
  const [reportState, setreportState] = useState<
    ResponseProps[] | undefined | "ERROR"
  >();
  const [selectedState, setselectedState] = useState<
    ResponseProps | undefined
  >();
  // * Handle load all reports
  const handleLoadReports = async (email: string) => {
    let data = {
      email: email,
    };
    const response: ResponseProps[] | any = await LoadReports(data);
    if (response.length === undefined || response.length === 0) {
      setreportState("ERROR");
    } else {
      setreportState(response);
    }
  };

  const handleSelect = async (report: ResponseProps) => {
    setselectedState(report);
  };

  return (
    <React.Fragment>
      <CustomButton onClick={() => handleLoadReports(props.email)}>
        {description.button}
      </CustomButton>
      {reportState &&
        (reportState === "ERROR" ? (
          <React.Fragment>
            <p>
              An error has occured while loading the reports. Please contact the
              system administrator!
            </p>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <StyledTable striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Report Date</th>
                  <th>Report ID</th>
                  <th>Show Report</th>
                </tr>
              </thead>
              <tbody>
                {reportState.map(function (item, i) {
                  return (
                    <tr key={i}>
                      <td>{item.companyname}</td>
                      <td>{item.reportdate}</td>
                      <td>{item.reportid}</td>
                      <td>
                        <CustomButton onClick={() => handleSelect(item)}>
                          Select
                        </CustomButton>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </StyledTable>
            <React.Fragment>
              {selectedState && (
                <React.Fragment>
                  <CustomHr />
                  <p>{description.auditdescription}</p>
                  <StyledTable striped bordered hover>
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
                          availability={
                            selectedState.report.scorecardTable.dbversion.cobit
                              .Compliance
                          }
                          compliance={
                            selectedState.report.scorecardTable.dbversion.cobit
                              .Compliance
                          }
                          reliability={
                            selectedState.report.scorecardTable.dbversion.cobit
                              .Reliability
                          }
                          confidentiality={
                            selectedState.report.scorecardTable.dbversion.cobit
                              .Confidentality
                          }
                          value={
                            selectedState.report.scorecardTable.dbversion.value
                          }
                        />
                        {/* User Groups */}
                        <TableTr
                          description={description.userGroups}
                          availability={
                            selectedState.report.scorecardTable.userrights.cobit
                              .Availability
                          }
                          compliance={
                            selectedState.report.scorecardTable.userrights.cobit
                              .Compliance
                          }
                          reliability={
                            selectedState.report.scorecardTable.userrights.cobit
                              .Reliability
                          }
                          confidentiality={
                            selectedState.report.scorecardTable.userrights.cobit
                              .Confidentality
                          }
                          value={
                            selectedState.report.scorecardTable.userrights.value
                          }
                        />
                        {/* User Groups Check */}
                        <TableTr
                          description={description.userGroupsRights}
                          availability={
                            selectedState.report.scorecardTable.userrightscheck
                              .cobit.Availability
                          }
                          compliance={
                            selectedState.report.scorecardTable.userrightscheck
                              .cobit.Compliance
                          }
                          reliability={
                            selectedState.report.scorecardTable.userrightscheck
                              .cobit.Reliability
                          }
                          confidentiality={
                            selectedState.report.scorecardTable.userrightscheck
                              .cobit.Confidentality
                          }
                          value={
                            selectedState.report.scorecardTable.userrightscheck
                              .value
                          }
                        />
                        {/* Password Check */}
                        <TableTr
                          description={description.passwordCheck}
                          availability={
                            selectedState.report.scorecardTable.password.cobit
                              .Availability
                          }
                          compliance={
                            selectedState.report.scorecardTable.password.cobit
                              .Compliance
                          }
                          reliability={
                            selectedState.report.scorecardTable.password.cobit
                              .Reliability
                          }
                          confidentiality={
                            selectedState.report.scorecardTable.password.cobit
                              .Confidentality
                          }
                          value={
                            selectedState.report.scorecardTable.password.value
                          }
                        />
                        {/* Interuptions Check */}
                        <TableTr
                          description={description.interuptionsCheck}
                          availability={
                            selectedState.report.scorecardTable.interuptions
                              .cobit.Availability
                          }
                          compliance={
                            selectedState.report.scorecardTable.interuptions
                              .cobit.Compliance
                          }
                          reliability={
                            selectedState.report.scorecardTable.interuptions
                              .cobit.Reliability
                          }
                          confidentiality={
                            selectedState.report.scorecardTable.interuptions
                              .cobit.Confidentality
                          }
                          value={
                            selectedState.report.scorecardTable.interuptions
                              .value
                          }
                        />
                        {/* Backup / Restoration Check */}
                        <TableTr
                          description={description.backuprestorationCheck}
                          availability={
                            selectedState.report.scorecardTable
                              .backuprestoration.cobit.Availability
                          }
                          compliance={
                            selectedState.report.scorecardTable
                              .backuprestoration.cobit.Compliance
                          }
                          reliability={
                            selectedState.report.scorecardTable
                              .backuprestoration.cobit.Reliability
                          }
                          confidentiality={
                            selectedState.report.scorecardTable
                              .backuprestoration.cobit.Confidentality
                          }
                          value={
                            selectedState.report.scorecardTable
                              .backuprestoration.value
                          }
                        />
                        {/* Changes Check */}
                        <TableTr
                          description={description.changesCheck}
                          availability={
                            selectedState.report.scorecardTable.changes.cobit
                              .Availability
                          }
                          compliance={
                            selectedState.report.scorecardTable.changes.cobit
                              .Compliance
                          }
                          reliability={
                            selectedState.report.scorecardTable.changes.cobit
                              .Reliability
                          }
                          confidentiality={
                            selectedState.report.scorecardTable.changes.cobit
                              .Confidentality
                          }
                          value={
                            selectedState.report.scorecardTable.changes.value
                          }
                        />
                      </tbody>
                    </div>
                  </StyledTable>
                  <div>
                    <BalancedScorecard
                      field={description.field}
                      availability={description.availability}
                      compliance={description.compliance}
                      reliability={description.reliability}
                      confidentiality={description.confidentiality}
                      databaseVersion={description.databaseVersion}
                      dbversionAvailability={
                        selectedState.report.scorecardTable.dbversion.cobit
                          .Availability
                      }
                      dbversionCompliance={
                        selectedState.report.scorecardTable.dbversion.cobit
                          .Compliance
                      }
                      dbversionReliability={
                        selectedState.report.scorecardTable.dbversion.cobit
                          .Reliability
                      }
                      dbversionConfidentality={
                        selectedState.report.scorecardTable.dbversion.cobit
                          .Confidentality
                      }
                      dbversionvalue={
                        selectedState.report.scorecardTable.dbversion.value
                      }
                      userGroups={description.userGroups}
                      userrightsAvailability={
                        selectedState.report.scorecardTable.userrights.cobit
                          .Availability
                      }
                      userrightsCompliance={
                        selectedState.report.scorecardTable.userrights.cobit
                          .Compliance
                      }
                      userrightsReliability={
                        selectedState.report.scorecardTable.userrights.cobit
                          .Reliability
                      }
                      userrightsConfidentality={
                        selectedState.report.scorecardTable.userrights.cobit
                          .Confidentality
                      }
                      userrightsvalue={
                        selectedState.report.scorecardTable.userrights.value
                      }
                      userGroupsRights={description.userGroupsRights}
                      userrightscheckAvailability={
                        selectedState.report.scorecardTable.userrightscheck
                          .cobit.Availability
                      }
                      userrightscheckCompliance={
                        selectedState.report.scorecardTable.userrightscheck
                          .cobit.Compliance
                      }
                      userrightscheckReliability={
                        selectedState.report.scorecardTable.userrightscheck
                          .cobit.Reliability
                      }
                      userrightscheckConfidentality={
                        selectedState.report.scorecardTable.userrightscheck
                          .cobit.Confidentality
                      }
                      userrightscheckvalue={
                        selectedState.report.scorecardTable.userrightscheck
                          .value
                      }
                      passwordCheck={description.passwordCheck}
                      passwordAvailability={
                        selectedState.report.scorecardTable.password.cobit
                          .Availability
                      }
                      passwordCompliance={
                        selectedState.report.scorecardTable.password.cobit
                          .Compliance
                      }
                      passwordReliability={
                        selectedState.report.scorecardTable.password.cobit
                          .Reliability
                      }
                      passwordConfidentality={
                        selectedState.report.scorecardTable.password.cobit
                          .Confidentality
                      }
                      passwordvalue={
                        selectedState.report.scorecardTable.password.value
                      }
                      interuptionsCheck={description.interuptionsCheck}
                      interuptionsAvailability={
                        selectedState.report.scorecardTable.interuptions.cobit
                          .Availability
                      }
                      interuptionsCompliance={
                        selectedState.report.scorecardTable.interuptions.cobit
                          .Compliance
                      }
                      interuptionsReliability={
                        selectedState.report.scorecardTable.interuptions.cobit
                          .Reliability
                      }
                      interuptionsConfidentality={
                        selectedState.report.scorecardTable.interuptions.cobit
                          .Confidentality
                      }
                      interuptionsvalue={
                        selectedState.report.scorecardTable.interuptions.value
                      }
                      backuprestorationCheck={
                        description.backuprestorationCheck
                      }
                      backuprestorationAvailability={
                        selectedState.report.scorecardTable.backuprestoration
                          .cobit.Availability
                      }
                      backuprestorationCompliance={
                        selectedState.report.scorecardTable.backuprestoration
                          .cobit.Compliance
                      }
                      backuprestorationReliability={
                        selectedState.report.scorecardTable.backuprestoration
                          .cobit.Reliability
                      }
                      backuprestorationConfidentality={
                        selectedState.report.scorecardTable.backuprestoration
                          .cobit.Confidentality
                      }
                      backuprestorationvalue={
                        selectedState.report.scorecardTable.backuprestoration
                          .value
                      }
                      changesCheck={description.changesCheck}
                      changesAvailability={
                        selectedState.report.scorecardTable.changes.cobit
                          .Availability
                      }
                      changesCompliance={
                        selectedState.report.scorecardTable.changes.cobit
                          .Compliance
                      }
                      changesReliability={
                        selectedState.report.scorecardTable.changes.cobit
                          .Reliability
                      }
                      changesConfidentality={
                        selectedState.report.scorecardTable.changes.cobit
                          .Confidentality
                      }
                      changesvalue={
                        selectedState.report.scorecardTable.changes.value
                      }
                      buttondescription={description.buttontable}
                      reportdate={selectedState.reportdate}
                      reportcompany={selectedState.companyname}
                    />

                    <Proof
                      proof={selectedState.report.balancedScorecards}
                      buttondescription={description.buttonproof}
                      reportdate={selectedState.reportdate}
                      reportcompany={selectedState.companyname}
                    />
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </React.Fragment>
        ))}
    </React.Fragment>
  );
}
