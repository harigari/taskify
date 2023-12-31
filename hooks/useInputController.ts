import { Configs } from "@/constants/inputConfig";
import { ChangeEvent, useState } from "react";

function useInputController({ errorConfig, inputConfig, labelConfig }: Configs) {
  const [value, setValue] = useState(inputConfig.initialvalue || "");
  const [date, setDate] = useState<Date | null>(inputConfig.initialvalue ? new Date(inputConfig.initialvalue) : null);
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
      const callback = error[0];
      if ("type" in callback) {
        if (!inputConfig.name) return;
        const res = callback({ name: inputConfig.name, value });

        if (typeof res === "string") {
          setErrorText(res);
        }
        return;
      }
      if (callback(value) && error[1]) {
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

  const typeChanger = (type: string | undefined) => {
    if (!type) return "text";
    if (!eyesValue) return type;
    return "text";
  };

  const changedType = typeChanger(inputConfig.type);

  return {
    wrapper: {
      errorText,
      onBlur,
      onFocus,
      setErrorText,
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
