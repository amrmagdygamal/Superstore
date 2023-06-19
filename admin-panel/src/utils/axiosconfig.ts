const localStorageItem = localStorage.getItem("admin");
const getTokenFromLocalStorage = localStorageItem !== null ? JSON.parse(localStorageItem) : '';



export const config = {
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage?.token || ""}`,
    Accept: "application/json",
  },
};