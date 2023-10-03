import { NavLink } from "react-router-dom";
import "../App.css";

export function PersonelControlButtonlari(){

    return(
        <div>
        <NavLink to="/personelpagepersonalinformation"> <button className="personelSideBarButton" >Kişisel Bilgiler </button></NavLink>
        <NavLink to="/personelpagepecompanyinfo"><button className="personelSideBarButton" >Şirket Bilgileri </button></NavLink>
        <NavLink to="/personelpagepebreaktime"><button className="personelSideBarButton" >Vardiya ve Mola Saatleri </button></NavLink>
        <NavLink to="/personelpagepecontact"><button className="personelSideBarButton" >Şirket İletişim Bigileri </button></NavLink>
        <NavLink to="/personelpagepublicholiday"><button className="personelSideBarButton" >Resmi Tatiller </button></NavLink>
        <NavLink to="/personelleaveacomment"><button className="personelSideBarButton" >Yorum Ekle</button></NavLink>
        <NavLink to="/employeerequestdayoff"><button className="managerSideBarButton" >Izin Istegi Olustur +</button></NavLink>
        <NavLink to="/employeeexpenserequest"><button className="managerSideBarButton" >Harcama Butce Istegi Olustur +</button></NavLink>
        </div>
         
       
    );
}