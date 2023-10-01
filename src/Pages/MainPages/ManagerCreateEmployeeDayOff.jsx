import { LogoLogin } from "../../components/LogoLogin";
import { ManagerControlButtonlari } from "../../components/ManagerControlButtonlari";
import { Logout } from "../../components/LogoutButton";
import { SwitchButtonToEmployee } from "../../components/SwitchManagerToEmployeeButton";
import { CreateDayOffForm } from "../../components/ManagerCreateEmployeeForm";

export function ManagerCreateEmployeeDayOff(){
    return(
        <div className="managerPage">

         <header>
         <nav >
            <LogoLogin/>
            <SwitchButtonToEmployee />
            <Logout />
          </nav>
        </header>

        <main>
            <div className="managerSideBar">
            <h4 className="managerSideBarTitle">Yönetici Araç Çubuğu</h4>
            <ManagerControlButtonlari/>
            </div>
            <div className="managerViewSection">
               <h3>Yönetici:Personel Izni Olustur</h3>
               <CreateDayOffForm />
            </div>
        </main>
        </div> 
        
    )

}