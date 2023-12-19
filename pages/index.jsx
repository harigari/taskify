import Button from "@/components/buttons/Button";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import DefaultButton from "@/components/buttons/DefaultButton";
import styles from "../components/buttons/Button.module.css";
export default function Home() {
  return (
    <>
      <PrimaryButton size="full" disabled>
        로그인
      </PrimaryButton>
      <div style={{ "margin-bottom": "30px" }}></div>
      <DefaultButton size="lg">확인</DefaultButton>
      <div style={{ "margin-bottom": "30px" }}></div>
      <PrimaryButton size="sm">확인</PrimaryButton>
      <div style={{ "margin-bottom": "30px" }}></div>
      <div style={{ width: "50rem", height: "20rem" }}>
        <DefaultButton style={{ "border-radius": "30rem", "font-size": "20rem" }} size="custom" disabled>
          로그인
        </DefaultButton>
      </div>
      <PrimaryButton size="sm">확인</PrimaryButton>
      <div style={{ "margin-bottom": "30px" }}></div>
      <DefaultButton size="sm">확인</DefaultButton>
      <div style={{ "margin-bottom": "30px" }}></div>
    </>
  );
}
