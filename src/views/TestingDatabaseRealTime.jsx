import React from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import firebaseConfig from "util/firebase";
var rand = require("random-key");
function TestingDatabaseRealTime() {
  function writeUserData(userId, fistname, lastname, status) {
    const ref = firebaseConfig
      .database()
      .ref("users/" + userId)
      .set({
        // username:userId,
        fistname: fistname,
        lastname: lastname,
        status: status,
      });
  }
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      status: "",
    },
    onSubmit: (values) => {
      //   alert(JSON.stringify(values, null, 2));
      // console.log(values);
      writeUserData(
        rand.generate(7),
        values.firstName,
        values.lastName,
        values.status
      );
    },
  });
  return (
    <div>
      <Form onSubmit={formik.handleSubmit}>
        <label htmlFor="firstname">First name1</label>
        <input
          type="text"
          id="firstName"
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />
        <label htmlFor="lastname">Last name1</label>
        <input
          type="text"
          id="lastName"
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />
        <select
          id="status"
          onChange={formik.handleChange}
          value={formik.values.status}
        >
          <option value="ok">Duyệt</option>
          <option value="not">Chưa duyệt</option>
        </select>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default TestingDatabaseRealTime;
