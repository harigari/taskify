import sender from "@/apis/sender";
import { HTTP, Method, PathProps, RequireId, ReturnData, Wrapped } from "@/types/api.type";
import { useCallback, useEffect, useMemo, useState } from "react";

const useApi = <T extends Method, U extends PathProps<T>>(method: T, obj?: RequireId<T, U>) => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<ReturnData<T, U>>();

  const asyncFunction = useMemo(() => sender[method] as HTTP<T>, [method]);
  const wrappedFunction: Wrapped<T> = useCallback(
    async (arg) => {
      try {
        setPending(true);
        setError("");
        return await asyncFunction(arg);
      } catch (e) {
        if (e instanceof Error) {
          console.error(e);
          setError(e.message);
        }
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
  }, []);

  return { pending, error, data, setData, wrappedFunction };
};

export default useApi;
