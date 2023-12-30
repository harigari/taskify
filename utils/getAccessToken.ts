const getAccessToken = () => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    // 쿠키 이름이 'accessToken'인 경우 값을 반환
    if (cookie.startsWith("accessToken=")) {
      return cookie.substring("accessToken=".length, cookie.length);
    }
  }
  // 해당하는 쿠키를 찾지 못한 경우 null 반환
  return null;
};

export default getAccessToken;
