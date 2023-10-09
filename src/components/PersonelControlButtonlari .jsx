import { NavLink } from "react-router-dom";
import "../App.css";

export function PersonelControlButtonlari() {

    return (
        <div>
            <NavLink to="/personel/personelpagepersonalinformation"> <button className="personelSideBarButton" >Kişisel Bilgiler </button></NavLink>
            <NavLink to="/personel/personelpageupdateinformation"><button className="personelSideBarButton" >Personel Bilgileri Güncelle</button></NavLink>
            <NavLink to="/personel/personelpagepecompanyinfo"><button className="personelSideBarButton" >Şirket Bilgileri </button></NavLink>
            <NavLink to="/personel/personelpagepebreaktime"><button className="personelSideBarButton" >Vardiya ve Mola Saatleri </button></NavLink>
            <NavLink to="/personel/personelpagepecontact"><button className="personelSideBarButton" >Şirket İletişim Bigileri </button></NavLink>
            <NavLink to="/personel/personelpagepublicholiday"><button className="personelSideBarButton" >Resmi Tatiller </button></NavLink>
            <NavLink to="/personel/personelleaveacomment"><button className="personelSideBarButton" >Yorum Ekle</button></NavLink>
            <NavLink to="/personel/employeerequestdayoff"><button className="personelSideBarButton" >Izin Istegi Olustur +</button></NavLink>
            <NavLink to="/personel/employeeexpenserequest"><button className="personelSideBarButton" >Harcama Butce Istegi Olustur +</button></NavLink>
            <NavLink to="/personel/employeeadvancepaymentrequest"><button className="personelSideBarButton" >Avans Istegi Olustur +</button></NavLink>
        </div>


    );
}