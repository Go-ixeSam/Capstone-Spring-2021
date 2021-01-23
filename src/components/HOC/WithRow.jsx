//* Đây là 1 hoc component có tác dụng truyền vào row đc click vào bên trong những action button ở super table
//*
import React from "react";

/**
 * * Tham số ở đây là đại diên cho component đc bọc bên trong cái HOC component này
 * Tên của cái HOC thường bắt đầu với chữ with
 * @param {*} WrappedComponent
 */
export default function withWrraper(WrappedComponent) {
    //! 1. Ta sẽ tạo 1 component mới với tham số là props của cái withWrraper
  const NewComponent = (props) => {
    <WrappedComponent {...props} />;
  };
  return NewComponent;
}

export default withWrraper;
// Để bọc component khác thì viết thế này: withWrraper(component)