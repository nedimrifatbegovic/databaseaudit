import { CustomButton } from "../../../../style/CustomButton";
import React from "react";
import { description } from "./IOverviewRequests.resources";

export interface OverviewRequetsProps {
  email: string;
}

export default function IOverviewRequests(props: OverviewRequetsProps) {
  // Show all external audits, and their status / pending / declined / accepted, add buttons for accept / decline, send audit id with the response

  return (
    <React.Fragment>
      {/* <CustomButton onClick={() => handleLoadReports(props.email)}>
        {description.button}
      </CustomButton> */}
    </React.Fragment>
  );
}
