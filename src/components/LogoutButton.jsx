import { NavLink } from "react-router-dom"
export function Logout(){

    function handleClick(){
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
        localStorage.getItem("companyName") && localStorage.removeItem("companyName")
        
    }

    return (
        <>
        <NavLink to="/" className="navButtons" ><button onClick={handleClick}>Cikis Yap</button></NavLink>
        </>
    )
}