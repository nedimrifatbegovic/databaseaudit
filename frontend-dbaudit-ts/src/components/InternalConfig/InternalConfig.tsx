import { IInternalConfig } from "../../assets/interfaces/Interfaces";
import React from "react";
import { description } from "./InternalConfig.resources";

export default function InternalConfig(props: IInternalConfig) {
  return (
    <React.Fragment>
      {props.email !== undefined ? (
        // TODO: Check if there is a config for email "x..."
        // TODO: If YES enable edit of configuration
        // * Select attribute
        // * Add / Upload new value
        // * Save new value in DB
        // TODO: If NO enable creation of the configuration
        // * Elements of the config:
        // * Upload Files: private key (jira)
        // * Insert Fields: consumer key (jira), token (jira), token secret (jira), signature method (jira), jira url (jira), jira port (jira),
        // * backup / restoration / error / change project key (jira), db type, db host, db port, db username, db password
        <React.Fragment>
          <h1>{description.title}</h1>
          <hr />
          <h5>{description.subtitleNone}</h5>
        </React.Fragment>
      ) : (
        <p>Configuration status is loading...</p>
      )}
    </React.Fragment>
  );
}
