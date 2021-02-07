import {
  IBalancedScorecard,
  IUserGroups,
} from "../../../../assets/interfaces/Interfaces";
import React, { useState } from "react";

import { CustomButton } from "../../../../style/CustomButton";
import { CustomHr } from "../../../../style/CustomHr";
import { IPasswordCheck } from "../../../../assets/interfaces/Interfaces";
import { description } from "./IAudit.resources";
import { generateReport } from "./api/report";

// * Audit Props
interface IAuditProps {
  email: string;
}

interface ResponseProps {
  report: IBalancedScorecard;
}

export default function IAudit(props: IAuditProps) {
  const [reportState, setreportState] = useState<
    ResponseProps | undefined | any
  >();
  // * Handle generate new audit
  const handleGenerateAudit = async (email: string) => {
    const data = {
      email: email,
    };
    const response: ResponseProps | any = await generateReport(data);
    setreportState(response);
    console.log(response);
  };

  return (
    <React.Fragment>
      {/* Send request */}
      <CustomButton onClick={() => handleGenerateAudit(props.email)}>
        {description.buttonaudit}
      </CustomButton>
      {/* Show balanced scorecard */}
      {reportState !== undefined && reportState.report !== undefined ? (
        <React.Fragment>
          {/* Show Balanced Scorecards Results */}
          <CustomHr />
          <div>TODO</div>
          {/* Download Balanced Scorecards Results */}
          <CustomHr />
          <div>TODO 2</div>
          {/* Download Balanced Scorecards Proof */}
          <CustomHr />
          <div>TODO 3</div>
        </React.Fragment>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}
