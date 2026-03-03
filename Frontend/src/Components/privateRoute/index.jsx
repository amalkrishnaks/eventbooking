import { Outlet,Navigate } from "react-router-dom";
import { checkToken } from "../../Utils/check-token";

const PrivateRoute=()=>{

    return checkToken() ? <Outlet/> : <Navigate to='/'/>
}

export default PrivateRoute;