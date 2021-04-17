import React from "react";
import * as variable from "variables/Variables";
import richado from "assets/img/richasdo.jpg";
import { Box } from "@material-ui/core";
const vegetableName = {
  color: variable.alternativePrimaryColor,
  margin: 0,
  marginBottom: 5,
};
const normalWord = {
  // color: variable.alternativePrimaryColor,
  margin: 0,
  marginTop: 5,
};
const numberWord = {
  color: variable.materialpinkcolor,
  margin: 0,
  marginTop: 5,
};
function Information(props) {
  const { number, word } = props;
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <p style={numberWord}>{number}</p>
      <Box width={5} />
      <p style={normalWord}>{word}</p>
    </div>
  );
}
function Post(props) {
  const { name, image, likeCount, reportCount, caption } = props;
  return (
    <div
      style={{
        background: "#d3d3d366",
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
        width:300
      }}
    >
      <p style={vegetableName}>Rau cần tây</p>
      <img
        style={{ width: "100%", height: 150, borderRadius: 5 }}
        src={richado}
      />
      <Information number="23" word="lượt thích" />
      <Information number="35" word="lượt báo cáo" />
      <p style={normalWord}>Ngày hôm nay đẹp quá</p>
    </div>
  );
}

export default Post;
