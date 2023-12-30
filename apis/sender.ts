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
    if (typeof result === "function" && "dashboardId" in obj) {
      return result(obj.dashboardId, obj.invitationId);
    }
    if (typeof result === "function" && "id" in obj) {
      return result(obj.id);
    }
    if (typeof result === "function" && "method" in obj) {
      return result(obj.method);
    }
  };

  get: HTTP<"get"> = async (obj) => {
    const url = this.#pathFinder("get", obj);
    const res = await fetch(this.#BASE_URL + url, {
      method: "GET",
      headers: { Authorization: obj.accessToken ? `Bearer ${obj.accessToken}` : "" },
    });
    const data = await res.json();

    return { status: res.status, data };
  };

  post: HTTP<"post"> = async (obj) => {
    const url = this.#pathFinder("post", obj);
    const res = await fetch(this.#BASE_URL + url, {
      method: "POST",
      body: JSON.stringify(obj.data),
      headers: {
        "Content-Type": obj.path.includes("image") ? "multipart/form-data" : "application/json",
        Authorization: obj.accessToken ? `Bearer ${obj.accessToken}` : "",
      },
    });
    const data = await res.json();
    return { status: res.status, data };
  };

  put: HTTP<"put"> = async (obj) => {
    const url = this.#pathFinder("put", obj);
    const res = await fetch(this.#BASE_URL + url, {
      method: "PUT",
      body: JSON.stringify(obj.data),
      headers: {
        Authorization: obj.accessToken ? `Bearer ${obj.accessToken}` : "",
      },
    });
    const data = await res.json();
    return { status: res.status, data };
  };

  delete: HTTP<"delete"> = async (obj) => {
    const url = this.#pathFinder("delete", obj);
    const res = await fetch(this.#BASE_URL + url, {
      method: "DELETE",
      headers: {
        Authorization: obj.accessToken ? `Bearer ${obj.accessToken}` : "",
      },
    });
    const data = await res.json();
    return { status: res.status, data };
  };
}

const sender = new Api();

export default sender;
