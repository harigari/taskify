import ArrowButton from "@/components/buttons/ArrowButton/ArrowButton";
import Button from "@/components/buttons/Button/Button";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState("");
  const [tagList, setTagList] = useState<string[]>([]);

  const config = { value, setValue, tagList, setTagList, id: "sex" };

  return (
    <>
      <div style={{ display: "flex", padding: "90px", flexDirection: "column", gap: "30px" }}>
        <ArrowButton />
        <ArrowButton right />
        <ArrowButton disabled />

        <Button color="violet" buttonType="login">
          로그인
        </Button>

        <Button color="violet" disabled buttonType="login">
          로그인
        </Button>

        <Button buttonType="dashboard_delete" color="gray">
          대시보드 삭제하기
        </Button>

        <Button buttonType="delete" color="white">
          삭제
        </Button>

        <Button buttonType="add_column" color="white">
          <span>새로운 컬럼 추가하기</span>
        </Button>

        <Button buttonType="plus_icon" color="white">
          +
        </Button>

        <Button buttonType="dashboard" color="white">
          <span>새로운 대시보드</span>
        </Button>

        <Button buttonType="accept_reject" color="violet">
          수락
        </Button>

        <Button buttonType="accept_reject" color="white">
          거절
        </Button>
      </div>
    </>
  );
}
