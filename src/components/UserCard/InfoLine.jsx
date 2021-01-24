import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "@material-ui/core";
import React from "react";

function InfoLine(props) {
  const { icon, text } = props;
  return (
    <div style={{ display: "flex", flexDirection: "row" ,width:"max-content"}}>
      <FontAwesomeIcon icon={icon} />
      <Box width="5px"/>
      <p className="info-line">{text}</p>
    </div>
  );
}

export default InfoLine;
