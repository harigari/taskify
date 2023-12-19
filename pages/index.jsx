import Button from "@/components/buttons/Button";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import DefaultButton from "@/components/buttons/DefaultButton";

export default function Home() {
  return (
    <>
      {/* <LoginButton disabled={false}>로그인</LoginButton> */}

      <PrimaryButton buttonType="full" disabled>
        로그인
      </PrimaryButton>
      <div style={{ "margin-bottom": "30px" }}></div>
      <DefaultButton buttonType="lg">확인</DefaultButton>
      <div style={{ "margin-bottom": "30px" }}></div>
      <PrimaryButton buttonType="sm">확인</PrimaryButton>
      <div style={{ "margin-bottom": "30px" }}></div>
      <div style={{ width: "50rem", height: "20rem" }}>
        <DefaultButton buttonType="lg" withoutSize={true} disabled>
          로그인
        </DefaultButton>
      </div>
      <PrimaryButton buttonType="sm">확인</PrimaryButton>
      <div style={{ "margin-bottom": "30px" }}></div>
      <DefaultButton buttonType="sm">확인</DefaultButton>
      <div style={{ "margin-bottom": "30px" }}></div>
    </>
  );
}
