
const { createContext, useState, useContext } = require("react");

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI3ZmExNzE1Yi0xNzRmLTQ5YmYtYmI4Yi0xMDJmOThmNTAwNzciLCJlbWFpbCI6ImhoYXJzaG5hLm5AZ21haWwuY29tIn0.Nf6kMg_TacP_ql9aibjnnTeFx3P9DSgd_NENH29VCXI"
  );
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, token, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };

