import apiConfig from "./apiConfigs";

const fetcher = async (path: string, option: { header; method; body }) => {
  const BASE_URL = apiConfig.BASE_URL;
  const res = await fetch(`${BASE_URL}${path}`, option);

  try {
    const data = res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default fetcher;
