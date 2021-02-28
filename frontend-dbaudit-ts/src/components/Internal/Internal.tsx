import IAllReports from "./components/IAllReports/IAllReports";
import IAudit from "./components/IAudit/IAudit";
import IOverviewRequests from "./components/IOverviewRequests/IOverviewRequests";
import IPendingRequests from "./components/IPendingRequests/IPendingRequests";
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
      <IAudit email={props.email} />
      <hr />
      <h3>{description.configRequestTitle}</h3>
      <IPendingRequests email={props.email} />
      <hr />
      <h3>{description.overviewTitle}</h3>
      <IOverviewRequests email={props.email} />
      <hr />
      <h3>{description.previousAuditsTitle}</h3>
      <IAllReports email={props.email} />
      <hr />
    </React.Fragment>
  );
}
