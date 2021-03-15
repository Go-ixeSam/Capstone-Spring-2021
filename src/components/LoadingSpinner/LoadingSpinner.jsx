import React from "react";
import { useState } from "react";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import * as variable from "variables/Variables"
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function LoadingSpinner() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState(variable.alternativePrimaryColor);

  return (
    <div className="sweet-loading">
      <ClipLoader color={color} loading={loading} size={80} />
    </div>
  );
}

export default LoadingSpinner;
