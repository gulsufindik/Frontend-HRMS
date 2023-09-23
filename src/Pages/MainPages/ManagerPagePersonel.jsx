import { NavLink } from "react-router-dom";
import { LogoLogin } from "../../components/LogoLogin";
import { ManagerControlButtonlari } from "../../components/ManagerControlButtonlari";
export function ManagerPagePersonel(){
    return(
        <div className="managerPage">

         <header>
        <LogoLogin/>
        </header>

        <main>
            <div className="managerSideBar">
            <h4 className="managerSideBarTitle">Yönetici Araç Çubuğu</h4>
            <ManagerControlButtonlari/>
           
            </div>
            <div className="managerViewSection">
               <h3>Yönetici:Personel Sayfası</h3>
            </div>
        </main>
        </div>

     
     
      
        
    )

}