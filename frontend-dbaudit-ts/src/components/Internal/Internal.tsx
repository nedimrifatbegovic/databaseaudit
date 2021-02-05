import React from "react";
import { description } from "./Internal.resources";

export interface IInternalProps {
  email: string;
}

export default function Internal(props: IInternalProps) {
  return (
    <React.Fragment>
      <h1>{description.title}</h1>
      <hr />
      <h3>{description.auditTitle}</h3>
      <p>TODO: 1 add Button {props.email}</p>
      <hr />
      <h3>{description.configRequestTitle}</h3>
      <p>TODO: 2 List of pending requests</p>
      <hr />
      <h3>{description.overviewTitle}</h3>
      <p>TODO: 3 List of pending requests</p>
      <hr />
      <h3>{description.previousAuditsTitle}</h3>
      <p>TODO: 4 add Button</p>
      <hr />
    </React.Fragment>
  );
}
