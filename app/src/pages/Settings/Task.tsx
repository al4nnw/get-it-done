import IconHome from "../../assets/icons/iconHome.svg";
import IconLogout from "../../assets/icons/iconLogout.svg";
import FloatingLink from "@components/FloatingLink/FloatingLink";
import FloatingButton from "@components/FloatingButton/FloatingButton";
import Title from "@components/Title/Title";
import ConfigInput from "./ConfigInput/ConfigInput";
import FormButton from "@components/FormButton/FormButton";

export default function Settings() {
  return (
    <main>
      <div>
        <FloatingLink
          elementText="Home"
          elementLink="/home"
          imageIcon={IconHome}
        />
        <FloatingButton
          elementType="button"
          elementText="Logout"
          imageIcon={IconLogout}
        />
      </div>
      <section>
        <Title elementType="h1" elementText="Settings" />
        <div>
          <ConfigInput inputValue="John Doe" canBeChanged />
          <ConfigInput inputValue="johndoe@gmail.com" canBeChanged={false} />
          <ConfigInput inputValue="Password" canBeChanged />
          <ConfigInput inputValue="5 tasks/day" canBeChanged />
        </div>
        <FormButton buttonType="button" buttonText="Delete account" />
      </section>
    </main>
  );
}
