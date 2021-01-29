import React from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import firebaseConfig from "util/firebase";
var rand = require("random-key");
function TestingDatabaseRealTime() {
  function writeUserData(userId, fistname, lastname) {
    const ref = firebaseConfig.database().ref("users/" + userId);

    const data = {
      fistname: fistname,
      lastname: lastname,
    };
    ref.push(data);
  }
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    onSubmit: (values) => {
      //   alert(JSON.stringify(values, null, 2));
      console.log(values);
      writeUserData(rand.generate(7), values.firstName, values.lastName);
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
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default TestingDatabaseRealTime;
