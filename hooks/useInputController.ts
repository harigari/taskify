import { ValidateFunc } from "@/utils/vaildate";
import { ChangeEvent, useState } from "react";

interface Props {
  errorConfig?: [boolean | ValidateFunc, string][];
  inputConfig: {
    id: string;
    type?: string;
    name?: string;
    eyeButton?: boolean;
    placeholder?: string | undefined;
  };
  labelConfig: {
    labelName: string;
    mobile?: boolean;
    star?: boolean;
  };
}

function useInputController({ errorConfig, inputConfig, labelConfig }: Props) {
  const [value, setValue] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [errorText, setErrorText] = useState("");
  const [eyesValue, setEyesValue] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setValue(value);
  };

  const onBlur = () => {
    errorConfig?.find((error) => {
      if (error[0] instanceof Function) {
        const res = error[0]({ id: inputConfig.id, value });
        if (!(res instanceof Object)) {
          setErrorText(res);
        }
        return;
      }
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

  const typeChanger = (type: string | undefined) => {
    if (!eyesValue) return type;
    return "text";
  };

  const changedType = typeChanger(inputConfig.type);

  return {
    wrapper: {
      errorText,
      onBlur,
      onFocus,
      htmlFor: inputConfig.id,
      ...labelConfig,
    },
    input: {
      value,
      setValue,
      onChange,
      eyesValue,
      onEyesClick,
      ...inputConfig,
      type: changedType,
    },
    dateTime: { date, setDate, id: inputConfig.id },
    etc: {
      setErrorText,
      setValue,
    },
  };
}

export default useInputController;
