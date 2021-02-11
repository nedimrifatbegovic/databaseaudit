import React from "react";

export interface TRProps {
  description: string;
  availability: boolean;
  compliance: boolean;
  reliability: boolean;
  confidentiality: boolean;
  value: string;
}

export default function TableTr(props: TRProps) {
  return (
    <tr>
      <td>{props.description}</td>
      <td>
        {props.availability ? (
          <React.Fragment>{props.value}</React.Fragment>
        ) : (
          <b>-</b>
        )}
      </td>
      <td>
        {props.compliance ? (
          <React.Fragment>{props.value}</React.Fragment>
        ) : (
          <b>-</b>
        )}
      </td>
      <td>
        {props.reliability ? (
          <React.Fragment>{props.value}</React.Fragment>
        ) : (
          <b>-</b>
        )}
      </td>
      <td>
        {props.confidentiality ? (
          <React.Fragment>{props.value}</React.Fragment>
        ) : (
          <b>-</b>
        )}
      </td>
    </tr>
  );
}
