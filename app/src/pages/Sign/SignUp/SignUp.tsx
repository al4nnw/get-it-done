import FormButton from "@components/FormButton/FormButton";
import SignFormInput from "@components/SignFormInput/SIgnFormInput";
import Title from "@components/Title/Title";
import { useForm, SubmitHandler } from "react-hook-form";
import IForm from "../../../types/IForm";
import style from "../Sign.module.scss";
import LinkTo from "@components/Link/Link";

export default function SignUp() {
  const { register, handleSubmit, reset } = useForm<IForm>();

  const onSubmit: SubmitHandler<IForm> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <main className={style.sign}>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <Title elementType="h1" elementText="Sign Up" />
        <SignFormInput
          register={register}
          fieldName="email"
          inputType="email"
          inputPlaceholder="johndoe@gmail.com"
        />
        <SignFormInput
          register={register}
          fieldName="password"
          inputType="password"
          inputPlaceholder="johndoe123"
        />
        <FormButton buttonType="submit" buttonText="Create Account" />
        <LinkTo linkValue="/signin" textValue="Already have an account?" />
      </form>
    </main>
  );
}
