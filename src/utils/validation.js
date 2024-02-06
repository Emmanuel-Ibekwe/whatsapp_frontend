import * as yup from "yup";

export const signUpSchema = yup.object({
  name: yup
    .string()
    .required("Name is required.")
    .matches(/^[a-zA-Z_ ]*$/, "No special characters required.")
    .min(2, "Name must be between 2 and 25 characters.")
    .max(25, "Name must be between 2 and 25 characters."),
  email: yup
    .string()
    .required("Email address is required.")
    .email("Invalid email address."),
  status: yup.string().max(140, "Status cannot be more than 140 characters."),
  password: yup
    .string()
    .required("Password is required.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&._+-]{6,}$/,
      ' "Password must contain a minimum of 6 characters, atleast an uppercase, a lowercase, a number and a special character."'
    )
});

export const signInSchema = yup.object({
  email: yup
    .string()
    .required("Email address is required.")
    .email("Invalid email address."),
  password: yup.string().required("Password is required.")
});
