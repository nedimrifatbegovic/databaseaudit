import React from "react";
import { description } from "./Internal.resources";

export default function Internal() {
  return (
    <React.Fragment>
      <h1>{description.title}</h1>
      <hr />
      <h3>{description.overviewTitle}</h3>
      <p>TODO: 4 List of pending requests</p>
      <hr />
      <h3>{description.configRequestTitle}</h3>
      <p>TODO: 5 List of pending requests</p>
      <hr />
      <h3>{description.configTitle}</h3>
      <p>TODO: 1 add Button</p>
      <hr />
      <h3>{description.auditTitle}</h3>
      <p>TODO: 2 add Button</p>
      <hr />
      <h3>{description.previousAuditsTitle}</h3>
      <p>TODO: 3 add Button</p>
      <hr />
    </React.Fragment>
  );
}
