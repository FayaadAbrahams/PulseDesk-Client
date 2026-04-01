import { FieldError, UseFormRegister } from "react-hook-form";

export type FormData = {
  email: string;
  githubUrl: string;
  password: string;
  confirmPassword: string;
};

export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

export type ValidFieldNames =
  | "fullname"
  | "email"
  | "password"
  | "confirmPassword";

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
}
