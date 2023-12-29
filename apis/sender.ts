import SENDER_CONFIG from "@/constants/senderConfig";

type Method = keyof typeof SENDER_CONFIG;
type Path<T extends Method> = (typeof SENDER_CONFIG)[T];
type PathProps<T extends Method> = keyof (typeof SENDER_CONFIG)[T];

type RequireId<T extends Method, U extends PathProps<T>> = Path<T>[U] extends string
  ? { path: U; data?: any }
  : Path<T>[U] extends (id: number) => string
  ? { path: U; id: number; data?: any }
  : { path: U; dashboardId: number; invitationId: number; data?: any };

type HTTP<T extends Method> = <U extends PathProps<T>>(obj: RequireId<T, U>) => Promise<any>;

class Api {
  #BASE_URL;

  constructor() {
    this.#BASE_URL = SENDER_CONFIG.BASE_URL;
  }

  #makeUrl<T extends Method, U extends PathProps<T>>(method: T, obj: RequireId<T, U>) {
    const result = SENDER_CONFIG[method][obj.path];
    if (typeof result === "string") {
      return result;
    }
    if (typeof result === "function" && "dashboardId" in obj) {
      return result(obj.dashboardId, obj.invitationId);
    }
    if (typeof result === "function" && "id" in obj) {
      return result(obj.id);
    }
    if (typeof result === "function" && !("id" in obj)) {
      throw new Error("id를 입력해주세요.");
    }
  }

  get: HTTP<"get"> = async (obj) => {
    const url = this.#makeUrl("get", obj);
    const res = await fetch(this.#BASE_URL + url, { method: "GET" });
    const data = await res.json();
    return { status: res.status, data };
  };

  post: HTTP<"post"> = async (obj) => {
    const url = this.#makeUrl("post", obj);
    const res = await fetch(this.#BASE_URL + url, { method: "POST", body: obj.data });
    const data = await res.json();
    return { status: res.status, data };
  };

  put: HTTP<"put"> = async (obj) => {
    const url = this.#makeUrl("put", obj);
    const res = await fetch(this.#BASE_URL + url, { method: "PUT", body: obj.data });
    const data = await res.json();
    return { status: res.status, data };
  };

  delete: HTTP<"delete"> = async (obj) => {
    const url = this.#makeUrl("delete", obj);
    const res = await fetch(this.#BASE_URL + url, { method: "DELETE" });
    const data = await res.json();
    return { status: res.status, data };
  };
}

const Sender = new Api();

export default Sender;
