import React, { useRef } from "react";

import { CustomButton } from "../../../../../style/CustomButton";
import ReactToPrint from "react-to-print";
import TableTr from "./TableTr";

export interface BalancedScorecardProps {
  // * Table Titles
  field: string;
  availability: string;
  compliance: string;
  reliability: string;
  confidentiality: string;
  // * Database Version
  databaseVersion: string;
  dbversionAvailability: boolean;
  dbversionCompliance: boolean;
  dbversionReliability: boolean;
  dbversionConfidentality: boolean;
  dbversionvalue: string;
  // * User Groups
  userGroups: string;
  userrightsAvailability: boolean;
  userrightsCompliance: boolean;
  userrightsReliability: boolean;
  userrightsConfidentality: boolean;
  userrightsvalue: string;
  //* User Groups Check
  userGroupsRights: string;
  userrightscheckAvailability: boolean;
  userrightscheckCompliance: boolean;
  userrightscheckReliability: boolean;
  userrightscheckConfidentality: boolean;
  userrightscheckvalue: string;
  // * Password Check
  passwordCheck: string;
  passwordAvailability: boolean;
  passwordCompliance: boolean;
  passwordReliability: boolean;
  passwordConfidentality: boolean;
  passwordvalue: string;
  // * Interuptions Check
  interuptionsCheck: string;
  interuptionsAvailability: boolean;
  interuptionsCompliance: boolean;
  interuptionsReliability: boolean;
  interuptionsConfidentality: boolean;
  interuptionsvalue: string;
  // * Backup / Restoration Check
  backuprestorationCheck: string;
  backuprestorationAvailability: boolean;
  backuprestorationCompliance: boolean;
  backuprestorationReliability: boolean;
  backuprestorationConfidentality: boolean;
  backuprestorationvalue: string;
  // * Changes Check
  changesCheck: string;
  changesAvailability: boolean;
  changesCompliance: boolean;
  changesReliability: boolean;
  changesConfidentality: boolean;
  changesvalue: string;
  // * Button
  buttondescription: string;
}
export default function BalancedScorecard(props: BalancedScorecardProps) {
  const componentRef = useRef<HTMLDivElement>(null);
  return (
    <React.Fragment>
      <div style={{ display: "none" }}>
        <div
          style={{ margin: "1rem", padding: "1rem", fontSize: "2rem" }}
          ref={componentRef}
        >
          <thead>
            <tr>
              <th>{props.field}</th>
              <th>{props.availability}</th>
              <th>{props.compliance}</th>
              <th>{props.reliability}</th>
              <th>{props.confidentiality}</th>
            </tr>
          </thead>
          <tbody>
            {/* Database Version */}
            <TableTr
              description={props.databaseVersion}
              availability={props.dbversionAvailability}
              compliance={props.dbversionCompliance}
              reliability={props.dbversionReliability}
              confidentiality={props.dbversionConfidentality}
              value={props.dbversionvalue}
            />
            {/* User Groups */}
            <TableTr
              description={props.userGroups}
              availability={props.userrightsAvailability}
              compliance={props.userrightsCompliance}
              reliability={props.userrightsReliability}
              confidentiality={props.userrightsConfidentality}
              value={props.userrightsvalue}
            />
            {/* User Groups Check */}
            <TableTr
              description={props.userGroupsRights}
              availability={props.userrightscheckAvailability}
              compliance={props.userrightscheckCompliance}
              reliability={props.userrightscheckReliability}
              confidentiality={props.userrightscheckConfidentality}
              value={props.userrightscheckvalue}
            />
            {/* Password Check */}
            <TableTr
              description={props.passwordCheck}
              availability={props.passwordAvailability}
              compliance={props.passwordCompliance}
              reliability={props.passwordReliability}
              confidentiality={props.passwordConfidentality}
              value={props.passwordvalue}
            />
            {/* Interuptions Check */}
            <TableTr
              description={props.interuptionsCheck}
              availability={props.interuptionsAvailability}
              compliance={props.interuptionsCompliance}
              reliability={props.interuptionsReliability}
              confidentiality={props.interuptionsConfidentality}
              value={props.interuptionsvalue}
            />
            {/* Backup / Restoration Check */}
            <TableTr
              description={props.backuprestorationCheck}
              availability={props.backuprestorationAvailability}
              compliance={props.backuprestorationCompliance}
              reliability={props.backuprestorationReliability}
              confidentiality={props.backuprestorationConfidentality}
              value={props.backuprestorationvalue}
            />
            {/* Changes Check */}
            <TableTr
              description={props.changesCheck}
              availability={props.changesAvailability}
              compliance={props.changesCompliance}
              reliability={props.changesReliability}
              confidentiality={props.changesConfidentality}
              value={props.changesvalue}
            />
          </tbody>
        </div>
      </div>
      <ReactToPrint
        trigger={() => <CustomButton>{props.buttondescription}</CustomButton>}
        content={() => componentRef.current}
      />
    </React.Fragment>
  );
}
