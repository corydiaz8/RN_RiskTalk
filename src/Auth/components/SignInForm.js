import React, { Fragment } from "react";
import { Field } from "formik";
import { InputField } from "../../Common/components/Fields";
import styles from "../style";

const SignInForm = () => (
  <Fragment>
    <Field
      name="email"
      component={InputField}
      customProps={{
        placeholder: "Email Address",
        inputStyle: styles.inputField,
        formWrapper: styles.formWrapper,
        keyboardType: "email-address"
      }}
    />
    <Field
      name="password"
      component={InputField}
      customProps={{
        secure: true,
        placeholder: "Password",
        inputStyle: styles.inputField,
        formWrapper: styles.formWrapper,
        keyboardType: "default"
      }}
    />
  </Fragment>
);

export default SignInForm;
