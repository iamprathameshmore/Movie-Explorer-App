export const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return token !== null;
  };
  
  export const getUserEmail = () => {
    return localStorage.getItem("userEmail") || "";
  };
  
  export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
  };
  