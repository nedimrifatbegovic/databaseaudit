import { CustomButton } from "../../../../style/CustomButton";
import { CustomHr } from "../../../../style/CustomHr";
import React from "react";
import { description } from "./IAudit.resources";
import { generateReport } from "./api/report";

// * Audit Props
interface IAuditProps {
  email: string;
}

// * Handle generate new audit
const handleGenerateAudit = async (email: string) => {
  const data = {
    email: email,
  };
  const report = await generateReport(data);
  console.log(report);
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
