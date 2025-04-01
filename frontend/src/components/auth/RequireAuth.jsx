import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/user/login" />;
};

export default RequireAuth;