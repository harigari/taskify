import { ChangeEvent, useState } from "react";

interface func {
  value: string;
  setErrorText: React.Dispatch<React.SetStateAction<string>>;
  valueToCompare?: string;
}

interface Props {
  func?: ({ value, setErrorText }: func) => void;
  valueToCompare?: string;
  inputConfig: {
    id: string;
    type: string;
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

function useInputController({ func, valueToCompare, inputConfig, labelConfig }: Props) {
  const [value, setValue] = useState("");
  const [errorText, setErrorText] = useState("");
  const [eyesValue, setEyesValue] = useState(false);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setValue(value);
  }

  const onBlur = () => {
    if (func) {
      func({ value, setErrorText, valueToCompare });
    }
  };

  const onFocus = () => {
    if (errorText) {
      setErrorText("");
    }
  };

  const onEyesClick = () => {
    setEyesValue((current) => !current);
  };

  const typeChanger = () => {
    if (!eyesValue) return "password";
    return "text";
  };

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
      onChange,
      eyesValue,
      onEyesClick,
      typeChanger,
      ...inputConfig,
    },
    etc: {
      setErrorText,
      setValue,
    },
  };
}

export default useInputController;
