import { CustomButton } from "../../../../style/CustomButton";
import { CustomHr } from "../../../../style/CustomHr";
import React from "react";
import { description } from "./IAudit.resources";

// * Audit Props
interface IAuditProps {
  email: string;
}

// * Handle generate new audit
const handleGenerateAudit = (email: string) => {
  console.log(email);
};

export default function IAudit(props: IAuditProps) {
  return (
    <React.Fragment>
      {/* Send request */}
      <CustomButton onClick={() => handleGenerateAudit(props.email)}>
        {description.buttonaudit}
      </CustomButton>
      <CustomHr />
      {/* Show balanced scorecard */}
    </React.Fragment>
  );
}
