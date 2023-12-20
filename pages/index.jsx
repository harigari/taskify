import PrimaryButton from "@/components/buttons/Button/PrimaryButton";
import DefaultButton from "@/components/buttons/Button/DefaultButton";

import ArrowButton from "@/components/buttons/ArrowButton/ArrowButton";
import CreateDefaultButton from "@/components/buttons/CreateButton/DefaultCreateButton";
import DeleteDashBoardButton from "@/components/buttons/DeleteDashBoardButton/DeleteDashBoardButton";

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

      <ArrowButton leftDisabled rightDisabled />
      <CreateDefaultButton purpose={"plus"}>+</CreateDefaultButton>
      <CreateDefaultButton purpose={"column"}>새로운 컬럼 추가하기</CreateDefaultButton>
      <CreateDefaultButton purpose={"dashboard"}>새로운 대시보드</CreateDefaultButton>
      <DeleteDashBoardButton>대시보드 삭제하기</DeleteDashBoardButton>
    </>
  );
}
