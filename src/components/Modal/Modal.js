import Modal from "react-awesome-modal";
import React, { Component } from "react";
import GreenSuccess from "assets/img/green tick.jpg";
import success from "assets/img/success.png";
import fail from "assets/img/fail.png";
import * as variable from "variables/Variables";
import "./Popup.css";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
/**
 * * Mở popup lên
 */
export function openPopup() {
  return true;
}
// export function openSuccess(){
//   return true
// }
/**
 * * Đóng popup lại
 */
export function closePopup() {
  return false;
}
// export function closeSuccess(){
//   return false
// }
const successTextColor = variable.alternativePrimaryColor;
const popupStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: 10,
};
export const ShowPopUp = (argument) => {
  const width = argument.length;
  return (
    <Modal
      visible={argument.visible}
      width={width}
      effect="fadeInDown"
      onClickAway={argument.onCLose}
    >
      {argument.children}
    </Modal>
  );
};

export const FailPopUp = (argument) => {
  const width = argument.length;
  return (
    <Modal visible={argument.visible} width={width} effect="fadeInDown">
      <div style={popupStyle}>
        <img src={fail} width={100} height={100} />
        <p style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>
          Lỗi hệ thống
        </p>
      </div>
    </Modal>
  );
};

export const LoadingPopUp = (argument) => {
  const width = argument.length;
  return (
    <Modal visible={argument.visible} width={width} effect="fadeInDown">
      <div style={popupStyle}>
        <LoadingSpinner />
        <p
          style={{
            textAlign: "center",
            color: successTextColor,
            fontWeight: "bold",
          }}
        >
          Đang xử lí
        </p>
      </div>
    </Modal>
  );
};
export const SuccessPopUp = (argument) => {
  const width = argument.length;
  return (
    <Modal visible={argument.visible} width={width} effect="fadeInDown">
      <div style={popupStyle}>
        <img src={success} width={100} height={100} />
        <p
          style={{
            textAlign: "center",
            color: successTextColor,
            fontWeight: "bold",
          }}
        >
          {/* Thành công */}
        </p>
      </div>
    </Modal>
  );
};
