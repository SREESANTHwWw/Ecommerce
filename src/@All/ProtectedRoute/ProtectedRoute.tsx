
import { Navigate } from "react-router-dom";
import  {jwtDecode} from "jwt-decode"

const AdminProtectedRoute = ({children}:any)=>{

    const token = localStorage.getItem("token");
    
    if(!token){
        return <Navigate to="/login"  replace/>;
    }
    try {

        const decode = jwtDecode<{role: string}>(token);
     

        if(decode.role !=="admin"){
            return <Navigate to="/login"  replace/>;
        }
        return children
        
    } catch (error) {
        return <Navigate to="/login"  replace/>
        
    }
 
   
}
export default AdminProtectedRoute