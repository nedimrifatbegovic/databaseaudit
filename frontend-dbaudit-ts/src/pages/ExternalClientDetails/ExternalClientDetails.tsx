import React from "react";
import { useLocation } from "react-router-dom";

export interface ClientLocationProps {
  state: {
    auditid: string;
  };
}
export default function ExternalClientDetails() {
  const location: ClientLocationProps = useLocation();

  console.log(location.state.auditid);

  return (
    <React.Fragment>
      Props list: {location.state.auditid}
      <div>Add button -- Take me back to home</div>
      <div>TODO: Add new report</div>
      <div>TODO: List all reports</div>
      <div>TODO: Add input field for requesting config fix</div>
    </React.Fragment>
  );
}
