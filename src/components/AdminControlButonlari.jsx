import { NavLink } from "react-router-dom";
import "../App.css";

export function AdminControlButtonlari(){

    return(
        <div>
        <NavLink to="/admincommentapprove"> <button className="adminSideBarButton" >Admin Yorum Onay </button></NavLink>
        <NavLink to="/registermanagerapprove"><button className="adminSideBarButton" >Admin Yonetici Onay </button></NavLink>
        </div>
    );
}