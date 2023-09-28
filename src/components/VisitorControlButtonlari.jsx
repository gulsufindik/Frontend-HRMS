import { NavLink } from "react-router-dom";
import "../App.css";

export function VisitorControlButtonlari(){

    return(
        <div>
        <NavLink to="/visitorpagepersonelinfo"> <button className="visitorSideBarButton" >Kişisel Bilgiler </button></NavLink>
        <NavLink to="/visitorpagepecontact"><button className="visitorSideBarButton" >Şirket İletişim Bigileri </button></NavLink>
        
        </div>
         
       
    );
}