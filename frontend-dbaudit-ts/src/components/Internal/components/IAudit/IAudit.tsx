import React, { useState } from "react";

import { CustomButton } from "../../../../style/CustomButton";
import { CustomHr } from "../../../../style/CustomHr";
import { ICombinedScorecard } from "../../../../assets/interfaces/Interfaces";
import { Table } from "react-bootstrap";
import { description } from "./IAudit.resources";
import { generateReport } from "./api/report";
import styled from "styled-components";

// import { IPasswordCheck } from "../../../../assets/interfaces/Interfaces";

// * Style of the balanced scorecards table
const StyledTable = styled(Table)`
  overflow-x: auto;
  white-space: nowrap;

  @media only screen and (max-width: 767px) {
    display: block;
  }
`;

// * Audit Props
interface IAuditProps {
  email: string;
}

interface ResponseProps {
  report: ICombinedScorecard;
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
          <StyledTable striped bordered hover>
            <thead>
              <tr>
                <th>Field</th>
                <th>Availability</th>
                <th>Compliance</th>
                <th>Reliability</th>
                <th>Confidentality</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>@fat</td>
              </tr>
            </tbody>
          </StyledTable>
          <div>
            {/* Download Balanced Scorecards Results */}
            <CustomButton onClick={() => handleGenerateAudit(props.email)}>
              {description.buttontable}
            </CustomButton>
            {/* Download Balanced Scorecards Proof */}
            <CustomButton onClick={() => handleGenerateAudit(props.email)}>
              {description.buttonproof}
            </CustomButton>
          </div>
        </React.Fragment>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}
