import sender from "@/apis/sender";
import { HTTP, Method, PathProps, RequireId, ReturnData } from "@/apis/types";
import { useCallback, useEffect, useState } from "react";

const useApi = <T extends Method, U extends PathProps<T>>(method: T, obj?: RequireId<T, U>) => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<ReturnData<T, U>>();

  const asyncFunction = sender[method] as HTTP<T>;
  const wrappedFunction: HTTP<T> = useCallback(
    async (arg) => {
      try {
        setPending(true);
        setError("");
        return await asyncFunction(arg);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
        return;
      } finally {
        setPending(false);
      }
    },
    [asyncFunction]
  );

  useEffect(() => {
    (async function () {
      if (!obj) return;

      const res = await wrappedFunction(obj);
      if (!res) return;
      const { status, data } = res;

      if (status < 300) {
        setData(data);
      }
    })();
  }, [wrappedFunction, obj]);

  return { pending, error, data, wrappedFunction };
};

export default useApi;
