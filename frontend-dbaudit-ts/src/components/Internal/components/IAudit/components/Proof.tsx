import React, { useRef } from "react";

import { CustomButton } from "../../../../../style/CustomButton";
import { IBalancedScorecard } from "../../../../../assets/interfaces/Interfaces";
import ReactToPrint from "react-to-print";
import { descripiton as proofdescription } from "./Proof.resources";

export interface ProofProps {
  proof: IBalancedScorecard;
  // * Button
  buttondescription: string;
  reportdate: Date;
  reportcompany: string;
}

export default function Proof(props: ProofProps) {
  const componentRef = useRef<HTMLDivElement>(null);
  return (
    <React.Fragment>
      <div style={{ display: "none" }}>
        <div
          style={{
            margin: "1rem",
            padding: "1rem",
            fontSize: "1.8rem",
          }}
          ref={componentRef}
        >
          <h2>Company: {props.reportcompany}</h2>
          <h3>Audit date: {props.reportdate}</h3>
          <hr />
          <h4>{proofdescription.text}</h4>
          <br />
          {props.proof.dbversion.level === undefined ? (
            <React.Fragment>
              <p>
                Database Version: <b>{props.proof.dbversion.version}</b>
              </p>
              <p>
                Database Status:{" "}
                <b>
                  {props.proof.dbversion.status
                    ? "Supported Version"
                    : "The Version is not Supported"}
                </b>
              </p>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <p>
                An error has occured while auditing the database version. Error:{" "}
                {props.proof.dbversion.errordescription}. Error Level:{" "}
                {props.proof.dbversion.level}.
              </p>
            </React.Fragment>
          )}
          <hr />
          <p>User Groups:</p>
          {Array.isArray(props.proof.usergroups) ? (
            <ul>
              {props.proof.usergroups.map(function (item, i) {
                return <li key={i}>{item.GroupName}</li>;
              })}
            </ul>
          ) : (
            <p>
              An error has occured while auditing the database version. Error:{" "}
              {props.proof.usergroups.errordescription}. Error Level:{" "}
              {props.proof.usergroups.level}.
            </p>
          )}
          <hr />
          {props.proof.usergroupscheck !== undefined && (
            <React.Fragment>
              <p>User Groups Issues:</p>
              <ul>
                {props.proof.usergroupscheck.errors.map(function (item, i) {
                  return (
                    <li key={i}>
                      Error message: {item.description}. For: {item.type}. Risk
                      level: {item.level}. User ID: {item.userid}
                    </li>
                  );
                })}
              </ul>
            </React.Fragment>
          )}
          <hr />
          <p>Password Check:</p>
          {Array.isArray(props.proof.passwords) ? (
            <ul>
              {props.proof.passwords.map(function (item, i) {
                return (
                  <li key={i}>
                    Error message: {item.error}. Risk level: {item.level}. User
                    ID: {item.userid}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>
              An error has occured while auditing the user passwords. Error:{" "}
              {props.proof.passwords.errordescription}. Error Level:{" "}
              {props.proof.passwords.level}.
            </p>
          )}
          <hr />
          {props.proof.ticketsystem !== undefined && (
            <React.Fragment>
              <p>Tickets for Interuptions, Backup / Restoration and Changes:</p>

              {props.proof.ticketsystem.map(function (item, i) {
                return (
                  <React.Fragment>
                    {item.errortype !== undefined ? (
                      <div key={i}>
                        <p>
                          During the check from Log ID: {item.logid}, an error
                          has occured: {item.errordescription}. Error Type:{" "}
                          {item.errortype}. Risk Level: {item.level}{" "}
                        </p>
                      </div>
                    ) : (
                      <div key={i}>
                        <p>
                          Log ID: {item.logid}. Ticket status:{" "}
                          {item.ticketStatus}. Ticket assignee: {item.assignee}.
                          Issue description: {item.ticketDescription}.
                        </p>
                        {item.ticketComments !== undefined && (
                          <React.Fragment>
                            <p>Ticket Comments:</p>
                            <ul>
                              {item.ticketComments.map(function (item, i) {
                                return (
                                  <li key={i}>
                                    Author: {item.author}. Comment: {item.text}
                                  </li>
                                );
                              })}
                            </ul>
                          </React.Fragment>
                        )}
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          )}
        </div>
      </div>
      <ReactToPrint
        trigger={() => <CustomButton>{props.buttondescription}</CustomButton>}
        content={() => componentRef.current}
      />
    </React.Fragment>
  );
}
