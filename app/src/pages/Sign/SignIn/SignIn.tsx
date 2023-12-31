import FormButton from "@components/FormButton/FormButton";
import SignFormInput from "@components/SignFormInput/SignFormInput";
import Title from "@components/Title/Title";
import { useForm, SubmitHandler } from "react-hook-form";
import style from "../Sign.module.scss";
import LinkTo from "@components/Link/Link";
import useUserSignin from "../../../utils/useUserSignin";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import Loading from "@pages/Loading/Loading";

const validationSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type ValidationSchemaSignIn = z.infer<typeof validationSchema>;

export default function SignIn() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ValidationSchemaSignIn>({
    resolver: zodResolver(validationSchema),
  });

  const { userSignin, firebaseErrors } = useUserSignin();

  const onSubmit: SubmitHandler<ValidationSchemaSignIn> = async (
    data: ValidationSchemaSignIn
  ) => {
    setIsLoading(true);
    await userSignin(data);
    setIsLoading(false);
    reset();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className={style.sign}>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <Title
          elementClass="signTitle"
          elementType="h1"
          elementText="Sign In"
        />
        <SignFormInput
          inputType="email"
          inputPlaceholder="johndoe@gmail.com"
          register={register}
          fieldName="email"
        />
        {errors.email && (
          <span className={style.errorWarning}>{errors.email.message}</span>
        )}
        <SignFormInput
          inputType="password"
          inputPlaceholder="johndoe123"
          register={register}
          fieldName="password"
        />
        {errors.password && (
          <span className={style.errorWarning}>{errors.password.message}</span>
        )}
        {firebaseErrors && (
          <span className={style.errorWarning}>{firebaseErrors.code}</span>
        )}
        <FormButton buttonType="submit" buttonText="Login" />
        <LinkTo linkValue="/signup" textValue="Create account" />
      </form>
    </main>
  );
}
