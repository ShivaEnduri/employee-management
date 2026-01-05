export const login = (email, password) => {
  if (email && password) {
    localStorage.setItem("isAuth", "true");
    localStorage.setItem("userEmail", email); // store email
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem("isAuth");
  localStorage.removeItem("userEmail"); // remove email on logout
};

export const isAuthenticated = () => {
  return localStorage.getItem("isAuth") === "true";
};

export const getUserEmail = () => {
  return localStorage.getItem("userEmail") || "";
};
