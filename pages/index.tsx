import Button from "@/components/Buttons/Button/Button";
import MultiInputModal from "@/modals/MultiInputModal";
import SingleInputModal from "@/modals/SingleInputModal";
import { MouseEvent, useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSingleOpen, setIsSingleOpen] = useState(false);

  const handleModalToggle = (e: MouseEvent) => {
    e.preventDefault();
    setIsOpen((prevValue) => !prevValue);
  };

  const handleSingleModalToggle = (e: MouseEvent) => {
    e.preventDefault();
    setIsSingleOpen((prevValue) => !prevValue);
  };

  return (
    <>
      <Button buttonType="login" color="white" onClick={handleModalToggle}>
        멀티 모달 켜기
      </Button>
      <br />
      <Button buttonType="login" color="white" onClick={handleSingleModalToggle}>
        싱글 모달 켜기
      </Button>
      {isOpen && (
        <MultiInputModal
          title="할 일 생성"
          buttonText="생성"
          columnId={1}
          dashboardId={1}
          handleModalClose={handleModalToggle}
        />
      )}
      {isSingleOpen && (
        <SingleInputModal
          id="newColumn"
          labelName="이름"
          title="새 컬럼 생성"
          deleteButton={true}
          buttonText="생성"
          handleModalClose={handleSingleModalToggle}
        />
      )}
    </>
  );
}
