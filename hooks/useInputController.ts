import { ChangeEvent, useState } from "react";

interface Props {
  errorConfig?: [boolean, string][];
  inputConfig: {
    id: string;
    initialValue?: string;
    type: string;
    name?: string;
    eyeButton?: boolean;
    placeholder?: string | undefined;
  };
  labelConfig: {
    labelName?: string;
    mobile?: boolean;
    star?: boolean;
  };
}

function useInputController({ errorConfig, inputConfig, labelConfig }: Props) {
  const [value, setValue] = useState(inputConfig.initialValue || "");
  const [date, setDate] = useState<Date | null>(null);
  const [errorText, setErrorText] = useState("");
  const [eyesValue, setEyesValue] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
  };

  const onTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setValue(value);
  };

  const onBlur = () => {
    // 에러 핸들링 로직에 거대한 수정이 필요하다
    errorConfig?.find((error) => {
      if (error[0]) {
        setErrorText(error[1]);
      }
    });
  };

  const onFocus = () => {
    if (errorText) {
      setErrorText("");
    }
  };

  const onEyesClick = () => {
    setEyesValue((current) => !current);
  };

  const typeChanger = (type: string) => {
    if (!eyesValue) return type;
    return "text";
  };

  const changedType = typeChanger(inputConfig.type);

  return {
    wrapper: {
      errorText,
      onBlur,
      onFocus,
      ...labelConfig,
      htmlFor: inputConfig.id,
    },
    input: {
      value,
      setValue,
      onChange,
      eyesValue,
      onEyesClick,
      ...inputConfig,
      autoComplete: "off",
      type: changedType,
    },
    textarea: {
      value,
      onChange: onTextAreaChange,
      ...inputConfig,
      autoComplete: "off",
    },
    dateTime: { date, setDate, id: inputConfig.id },
    etc: {
      setErrorText,
      setValue,
    },
  };
}

export default useInputController;
