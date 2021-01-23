import Modal from "react-awesome-modal";
import React, { Component } from "react";
import "./Popup.css";
/**
 * * Mở popup lên
 */
export function openPopup() {
  return true;
}
/**
 * * Đóng popup lại
 */
export function closePopup() {
  return false;
}
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
