export const getLS = <T,>(key: string) => {
  const item = localStorage.getItem(key);
  let returnValue;
  try {
    if (item) {
      returnValue = JSON.parse(item);
      return returnValue as T;
    }
  } catch (err) {
    return null;
  }
};

export const setLS = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeLS = (key: string) => {
  localStorage.removeItem(key);
};

export const cleanLS = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
