import { CustomButton } from "../../style/CustomButton";
import { IBalancedScorecard } from "../../assets/interfaces/Interfaces";
import React from "react";
import { ResponsiveEmbedProps } from "react-bootstrap";

export interface DownloadButtonProps {
  table?: ResponsiveEmbedProps;
  proof?: IBalancedScorecard;
  buttontext: string;
}

export function DownloadButton(props: DownloadButtonProps) {
  return (
    <React.Fragment>
      <CustomButton onClick={() => console.log("Clicked!")}>
        Button Text
      </CustomButton>
    </React.Fragment>
  );
}
