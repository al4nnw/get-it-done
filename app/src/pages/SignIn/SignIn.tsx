import FormButton from "@components/FormButton/FormButton";
import SignFormInput from "@components/SignFormInput/SIgnFormInput";
import Title from "@components/Title/Title";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import IForm from "../../types/IForm";
import useUserSignin from "../../utils/useUserSignin";

export default function SignIn() {
  const { register, handleSubmit, reset } = useForm<IForm>();
  const userSignin = useUserSignin();

  const onSubmit: SubmitHandler<IForm> = (data: IForm) => {
    userSignin(data);
    reset();
  };

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title elementType="h1" elementText="Sign In" />
        <div>
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
        </div>
        <span>Forgot password?</span>
        <FormButton buttonType="submit" buttonText="Login" />
        <Link to="/signup">Create account</Link>
      </form>
    </main>
  );
}
