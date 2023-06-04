import FormButton from "@components/FormButton/FormButton";
import SignFormInput from "@components/SignFormInput/SIgnFormInput";
import Title from "@components/Title/Title";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import IForm from "../../types/IForm";
import useUserSignup from "../../utils/useUserSignup";

export default function SignUp() {
  const { register, handleSubmit, reset } = useForm<IForm>();
  const userSignup = useUserSignup();

  const onSubmit: SubmitHandler<IForm> = (data) => {
    userSignup(data);
    reset();
  };

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title elementType="h1" elementText="Sign Up" />
        <div>
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
        </div>
        <FormButton buttonType="submit" buttonText="Create Account" />
        <Link to="/signin">Already have an account?</Link>
      </form>
    </main>
  );
}
