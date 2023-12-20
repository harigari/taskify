import PrimaryButton from "@/components/buttons/Button/PrimaryButton";
import DefaultButton from "@/components/buttons/Button/DefaultButton";

import ArrowButton from "@/components/buttons/ArrowButton/ArrowButton";
import CreateDefaultButton from "@/components/buttons/CreateButton/DefaultCreateButton";

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
        <PrimaryButton style={{ "border-radius": "30rem", "font-size": "2rem" }} size="custom" disabled>
          로그인
        </PrimaryButton>
      </div>
      <PrimaryButton size="sm">확인</PrimaryButton>
      <div style={{ "margin-bottom": "30px" }}></div>
      <DefaultButton size="sm">확인</DefaultButton>
      <div style={{ "margin-bottom": "30px" }}></div>

      <ArrowButton />

      <CreateDefaultButton>새로운 컬럼 추가하기</CreateDefaultButton>
    </>
  );
}
