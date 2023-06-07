import FormButton from "@components/FormButton/FormButton";
import Title from "@components/Title/Title";
import { useForm, SubmitHandler } from "react-hook-form";
import style from "../Sign.module.scss";
import LinkTo from "@components/Link/Link";
import useUserSignup from "../../../utils/useUserSignup";
import SignFormInput from "@components/SignFormInput/SignFormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const validationSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "Firstname is required" })
      .optional(),
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" })
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });

export type ValidationSchemaSignUp = z.infer<typeof validationSchema>;

export default function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ValidationSchemaSignUp>({
    resolver: zodResolver(validationSchema),
  });
  const { userSignup, firebaseErrors } = useUserSignup();

  const onSubmit: SubmitHandler<ValidationSchemaSignUp> = async (
    data: ValidationSchemaSignUp
  ) => {
    await userSignup(data);
    reset();
  };

  return (
    <main className={style.sign}>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <Title
          elementType="h1"
          elementClass="signTitle"
          elementText="Sign Up"
        />
        <SignFormInput
          register={register}
          fieldName="firstName"
          inputType="text"
          inputPlaceholder="John Doe"
        />
        {errors.firstName && (
          <span className={style.errorWarning}>{errors.firstName.message}</span>
        )}
        <SignFormInput
          register={register}
          fieldName="email"
          inputType="email"
          inputPlaceholder="johndoe@gmail.com"
        />
        {errors.email && (
          <span className={style.errorWarning}>{errors.email.message}</span>
        )}
        <SignFormInput
          register={register}
          fieldName="password"
          inputType="password"
          inputPlaceholder="johndoe123"
        />
        {errors.password && (
          <span className={style.errorWarning}>{errors.password.message}</span>
        )}
        <SignFormInput
          register={register}
          fieldName="confirmPassword"
          inputType="password"
          inputPlaceholder="johndoe123"
        />
        {errors.confirmPassword && (
          <span className={style.errorWarning}>
            {errors.confirmPassword.message}
          </span>
        )}
        {firebaseErrors && (
          <span className={style.errorWarning}>{firebaseErrors.code}</span>
        )}
        <FormButton buttonType="submit" buttonText="Create Account" />
        <LinkTo linkValue="/signin" textValue="Already have an account?" />
      </form>
    </main>
  );
}
