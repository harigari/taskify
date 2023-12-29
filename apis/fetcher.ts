import apiConfig from "./apiConfigs";

const fetcher = async <T>(path: string, option: RequestInit): Promise<T | undefined> => {
  const BASE_URL = apiConfig.BASE_URL;
  const res = await fetch(`${BASE_URL}${path}`, option);

  try {
    const result: T = await res.json();
    return result;
  } catch (error) {
    throw new Error("Failed to parse JSON");
  }
};

export default fetcher;
