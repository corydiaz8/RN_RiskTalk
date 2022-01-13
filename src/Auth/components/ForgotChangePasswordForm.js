import React, { Fragment } from "react";
import { Field } from "formik";
import { InputField } from "../../Common/components/Fields";
import styles from "../style";

const ForgotChangePasswordForm = () => (
  <Fragment>
    <Field
      name="password"
      component={InputField}
      customProps={{
        secure: true,
        placeholder: "Password",
        inputStyle: styles.inputField,
        formWrapper: styles.formWrapper
      }}
    />
    <Field
      name="confirm_password"
      component={InputField}
      customProps={{
        secure: true,
        placeholder: "Confirm Password",
        inputStyle: styles.inputField,
        formWrapper: styles.formWrapper
      }}
    />
  </Fragment>
);

export default ForgotChangePasswordForm;
