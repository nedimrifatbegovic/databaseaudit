import { CustomButton } from "../../../../style/CustomButton";
import React from "react";
import { description } from "./IAllReports.resources";

export interface AllReportsProps {
  email: string;
}

export default function IAllReports(props: AllReportsProps) {
  // * Handle generate new audit
  const handleLoadReports = async (email: string) => {};

  return (
    <React.Fragment>
      <CustomButton onClick={() => handleLoadReports(props.email)}>
        {description.button}
      </CustomButton>
    </React.Fragment>
  );
}
