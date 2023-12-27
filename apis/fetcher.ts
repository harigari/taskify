import apiConfig from "./apiConfigs";

const fetcher = async (path: string, method = "GET", body, headers) => {
  const BASE_URL = apiConfig.BASE_URL;
  const res = await fetch(`${BASE_URL}${path}`, {
    headers,
    body,
    method,
  });

  try {
    const data = res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default fetcher;
