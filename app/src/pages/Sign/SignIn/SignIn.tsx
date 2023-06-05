import FormButton from "@components/FormButton/FormButton";
import SignFormInput from "@components/SignFormInput/SIgnFormInput";
import Title from "@components/Title/Title";
import { useForm, SubmitHandler } from "react-hook-form";
import IForm from "../../../types/IForm";
import style from "../Sign.module.scss";
import LinkTo from "@components/Link/Link";

export default function SignIn() {
  const { register, handleSubmit, reset } = useForm<IForm>();

  const onSubmit: SubmitHandler<IForm> = (data: IForm) => {
    console.log(data);
    reset();
  };

  return (
    <main className={style.sign}>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <Title elementType="h1" elementText="Sign In" />
        <SignFormInput
          inputType="email"
          inputPlaceholder="johndoe@gmail.com"
          register={register}
          fieldName="email"
        />
        <SignFormInput
          inputType="password"
          inputPlaceholder="johndoe123"
          register={register}
          fieldName="password"
        />
        <span>Forgot password?</span>
        <FormButton buttonType="submit" buttonText="Login" />
        <LinkTo linkValue="/signup" textValue="Create account" />
      </form>
    </main>
  );
}
