import SENDER_CONFIG from "@/constants/senderConfig";
import { HTTP, PathFinder } from "@/types/api.type";

class Api {
  #BASE_URL;

  constructor() {
    this.#BASE_URL = SENDER_CONFIG.BASE_URL;
  }

  #pathFinder: PathFinder = (method, obj) => {
    const result = SENDER_CONFIG[method][obj.path];
    if (typeof result === "string") {
      return result;
    }
    if (typeof result === "function") {
      return result(obj);
    }
  };

  get: HTTP<"get"> = async (obj) => {
    const url = this.#pathFinder("get", obj);
    const res = await fetch(this.#BASE_URL + url, {
      method: "GET",
      headers: { Authorization: `Bearer ${obj.accessToken}` },
    });
    const data = await res.json();

    return { status: res.status, data };
  };

  post: HTTP<"post"> = async (obj) => {
    const url = this.#pathFinder("post", obj);
    const isImage = obj.path.includes("Image");
    const res = await fetch(this.#BASE_URL + url, {
      method: "POST",
      body: isImage ? (obj.data as FormData) : JSON.stringify(obj.data),
      headers: {
        Authorization: `Bearer ${obj.accessToken}`,
        ...(isImage ? {} : { "Content-Type": "application/json" }),
      },
    });
    const data = await res.json();
    return { status: res.status, data, message: data.message };
  };

  put: HTTP<"put"> = async (obj) => {
    const url = this.#pathFinder("put", obj);
    const res = await fetch(this.#BASE_URL + url, {
      method: "PUT",
      body: JSON.stringify(obj.data),
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${obj.accessToken}` },
    });

    if (res.status === 204) {
      return { status: res.status, data: null as any };
    }
    const data = await res.json();

    return { status: res.status, data, message: data.message };
  };

  delete: HTTP<"delete"> = async (obj) => {
    const url = this.#pathFinder("delete", obj);
    const res = await fetch(this.#BASE_URL + url, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${obj.accessToken}` },
    });
    return { status: res.status, data: null };
  };
}

const sender = new Api();

export default sender;
