import { NavLink } from "react-router-dom";
import "../App.css";

export function ManagerControlButtonlari(){

    return(
        <div>

        <NavLink to="/managerregisteremployee"><button className="managerSideBarButton" >Personel Ekle +</button></NavLink>
        <NavLink to="/managerdeleteemployee"><button className="managerSideBarButton" >Personel Sil -</button></NavLink>
        <NavLink to="/managerpersonel"> <button className="managerSideBarButton" >Personeller </button></NavLink>
        <NavLink to="/managerpendingapproval"><button className="managerSideBarButton" >Sirket Bilgilerini Guncelle </button></NavLink>
        <NavLink to="/managerprofitloss"><button className="managerSideBarButton" >Kar Zarar Durumu </button></NavLink>
        <NavLink to="/managercompanyexpenses"><button className="managerSideBarButton" >Şirket Giderleri </button></NavLink>
        <NavLink to="/managerupcomingpayment"><button className="managerSideBarButton" >Yaklaşan Ödemeler </button></NavLink>
        <NavLink to="/managerpublicholiday"><button className="managerSideBarButton" >Resmi Tatiller </button></NavLink>
        <NavLink to="/managerpersoneltraces"><button className="managerSideBarButton" >Bekleyen Personel İzin Istekleri</button></NavLink>

        <NavLink to="/manager/managerregisteremployee"><button className="managerSideBarButton" >Personel Ekle +</button></NavLink>
        <NavLink to="/manager/managerpersonel"> <button className="managerSideBarButton" >Personeller </button></NavLink>
        <NavLink to="/manager/managerpendingapproval"><button className="managerSideBarButton" >Sirket Bilgilerini Guncelle </button></NavLink>
        <NavLink to="/manager/managerprofitloss"><button className="managerSideBarButton" >Kar Zarar Durumu </button></NavLink>
        <NavLink to="/manager/managercompanyexpenses"><button className="managerSideBarButton" >Şirket Giderleri </button></NavLink>
        <NavLink to="/manager/managerupcomingpayment"><button className="managerSideBarButton" >Yaklaşan Ödemeler </button></NavLink>
        <NavLink to="/manager/managerpublicholiday"><button className="managerSideBarButton" >Resmi Tatiller </button></NavLink>
        <NavLink to="/manager/managerpersoneltraces"><button className="managerSideBarButton" >Bekleyen Personel İzin Istekleri</button></NavLink>
        <NavLink to="/manager/managerpendingexpenserequests"><button className="managerSideBarButton" >Bekleyen Harcama Istekleri</button></NavLink>
        </div>
    );
       
        
}