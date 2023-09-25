import { NavLink } from "react-router-dom";
import "../App.css";

export function ManagerControlButtonlari(){

    return(
        <div>
        <NavLink to="/managerpersonel"> <button className="managerSideBarButton" >Personeller </button></NavLink>
        <NavLink to="/managerpendingapproval"><button className="managerSideBarButton" >Onay Bekleyen Personeller </button></NavLink>
        <NavLink to="/managerprofitloss"><button className="managerSideBarButton" >Kar Zarar Durumu </button></NavLink>
        <NavLink to="/managercompanyexpenses"><button className="managerSideBarButton" >Şirket Giderleri </button></NavLink>
        <NavLink to="/managerupcomingpayment"><button className="managerSideBarButton" >Yaklaşan Ödemeler </button></NavLink>
        <NavLink to="/managerpublicholiday"><button className="managerSideBarButton" >Resmi Tatiller </button></NavLink>
        <NavLink to="/managerpersoneltraces"><button className="managerSideBarButton" >Personel İzinleri </button></NavLink>
        </div>
         
       
    );
       
        
}