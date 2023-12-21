import ArrowButton from "@/components/buttons/ArrowButton/ArrowButton";
import Button from "@/components/buttons/Button/Button";

export default function Home() {
  return (
    <>
      <div style={{ display: "flex", padding: "90px", flexDirection: "column", gap: "30px" }}>
        <Button color="gray">대시보드 삭제하기</Button>

        {/* 질문 isLeft는 필수 속성을 타입 지정을 하는 게 좋을까요? */}
        <ArrowButton isLeft />
        <ArrowButton disabled />

        <Button color="violet" box="box1">
          로그인
        </Button>

        <Button disabled box="box1">
          로그인
        </Button>

        <Button box="box2" color="white">
          삭제
        </Button>

        <Button box="box3" color="white">
          <span>새로운 컬럼 추가하기</span>
        </Button>

        <Button box="box4" color="white">
          +
        </Button>

        <Button box="box5" color="white">
          새로운 대시보드
        </Button>

        <Button box="box6" color="violet">
          수락
        </Button>

        <Button box="box6" color="white">
          거절
        </Button>
      </div>
    </>
  );
}
