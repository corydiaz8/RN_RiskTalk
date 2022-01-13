import * as Yup from "yup";

export const required = value =>
  value || typeof value === "number" ? undefined : "This field is required";

export const LoginValidation = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("This field is required"),
  password: Yup.string()
    .min(6, "Password is too short")
    .required("This field is required")
});

export const ChangePasswordValidation = Yup.object().shape({
  old_password: Yup.string()
    .min(6, "Password is too short")
    .required("This field is required"),
  new_password: Yup.string()
    .min(6, "Password is too short")
    .required("This field is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("new_password"), null], "Passwords must match")
    .min(6, "Password is too short")
    .required("This field is required")
});

export const ChangeForgotPasswordValidation = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password is too short")
    .required("This field is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .min(6, "Password is too short")
    .required("This field is required")
});
