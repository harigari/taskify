import PrimaryButton from "@/components/buttons/Button/PrimaryButton";
import DefaultButton from "@/components/buttons/Button/DefaultButton";

import ArrowButton from "@/components/buttons/ArrowButton/ArrowButton";
import CreateDefaultButton from "@/components/buttons/CreateButton/DefaultCreateButton";
import DeleteDashBoardButton from "@/components/buttons/DeleteDashBoardButton/DeleteDashBoardButton";

export default function Home() {
  return (
    <>
      <div style={{ display: "flex", padding: "90px", flexDirection: "column", gap: "30px" }}>
        <ArrowButton />
        <ArrowButton leftDisabled />
        <ArrowButton rightDisabled />
        <ArrowButton leftDisabled rightDisabled />

        <DeleteDashBoardButton>대시보드 삭제하기</DeleteDashBoardButton>

        <PrimaryButton size="full">로그인</PrimaryButton>
        <DefaultButton size="lg">확인</DefaultButton>
        <PrimaryButton size="sm">수락</PrimaryButton>

        <div style={{ width: "10rem", height: "5rem" }}>
          <PrimaryButton size="custom">확인</PrimaryButton>
        </div>

        <CreateDefaultButton purpose={"plus"}>+</CreateDefaultButton>
        <CreateDefaultButton purpose={"column"}>새로운 컬럼 추가하기</CreateDefaultButton>
        <CreateDefaultButton purpose={"dashboard"}>새로운 대시보드</CreateDefaultButton>
      </div>
    </>
  );
}
