import React, { useState } from "react";
import { ResolvedApi, addClient } from "./api/changeresolved";

import { CustomButton } from "../../../../style/CustomButton";
import { Spinner } from "react-bootstrap";
import { description } from "./EConfigRequest.resources";

interface ConfigRequestProps {
  auditid: string;
}

export default function EConfigRequest(props: ConfigRequestProps) {
  const [loadingState, setloadingState] = useState<boolean>(false);
  const [messageState, setmessageState] = useState<string | undefined>();
  const handleLoadReports = async (auditid: string) => {
    setmessageState(undefined);
    setloadingState(true);
    let data: ResolvedApi = {
      auditid: auditid,
      action: false,
    };
    await addClient(data);
    setloadingState(false);
    setmessageState("The request has been sent!");
  };

  return (
    <React.Fragment>
      <CustomButton onClick={() => handleLoadReports(props.auditid)}>
        {description.button}
      </CustomButton>
      {loadingState && <Spinner animation="grow" variant="info" />}
      <div>{messageState && <p>{messageState}</p>}</div>
    </React.Fragment>
  );
}
