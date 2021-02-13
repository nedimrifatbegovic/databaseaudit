import React from "react";
import styled from "styled-components";

export interface TRProps {
  description: string;
  availability: boolean;
  compliance: boolean;
  reliability: boolean;
  confidentiality: boolean;
  value: string;
}

interface TdProps {
  value: string;
}
export const StyledTd = styled.td<TdProps>`
  background-color: ${(props) =>
    props.value === "OK"
      ? "green"
      : props.value === "LOW"
      ? "yellow"
      : props.value === "MID"
      ? "orange"
      : props.value === "HIGH"
      ? "red"
      : "grey"};
  /* "LOW" | "MID" | "HIGH" | "OK" */
`;

export default function TableTr(props: TRProps) {
  return (
    <tr>
      <td>{props.description}</td>

      {props.availability ? (
        <StyledTd value={props.value}>
          <React.Fragment>{props.value}</React.Fragment>
        </StyledTd>
      ) : (
        <td>
          <b>-</b>
        </td>
      )}
      {props.compliance ? (
        <StyledTd value={props.value}>
          <React.Fragment>{props.value}</React.Fragment>
        </StyledTd>
      ) : (
        <td>
          <b>-</b>
        </td>
      )}
      {props.reliability ? (
        <StyledTd value={props.value}>
          <React.Fragment>{props.value}</React.Fragment>
        </StyledTd>
      ) : (
        <td>
          <b>-</b>
        </td>
      )}
      {props.confidentiality ? (
        <StyledTd value={props.value}>
          <React.Fragment>{props.value}</React.Fragment>
        </StyledTd>
      ) : (
        <td>
          <b>-</b>
        </td>
      )}
    </tr>
  );
}
