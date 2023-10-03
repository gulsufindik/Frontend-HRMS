import { NavLink } from "react-router-dom";
import "../App.css";

export function AdminControlButtonlari(){

    return(
        <div>
        <NavLink to="/admin/admincommentapprove"> <button className="adminSideBarButton" >Admin Yorum Onay </button></NavLink>
        <NavLink to="/admin/registermanagerapprove"><button className="adminSideBarButton" >Admin Yonetici Onay </button></NavLink>
        </div>
    );
}