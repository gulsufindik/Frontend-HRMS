import { LogoLogin } from "../../components/LogoLogin";
import { PersonelControlButtonlari } from "../../components/PersonelControlButtonlari ";
import { Logout } from "../../components/LogoutButton";
import { SwitchButtonToManager } from "../../components/SwitchEmployeeToManagerButton";
import { CreateDayOffForm } from "../../components/ManagerCreateEmployeeForm";

export function PersonelPageCreateDayOffRequest(){
  const userType = localStorage.getItem("userType");

  return (
    <div className="personelPage">

      <header>
        <nav >
          <LogoLogin />
          {userType === "MANAGER" && <SwitchButtonToManager/>}
          <Logout />
        </nav>
        </header>
        <main className="main">
            <div className="personelSideBar">
             <h4 className="personelSideBarTitle" >Personel Araç Çubuğu</h4>  
             <PersonelControlButtonlari/> 
            </div>

            <div className="personelViewSection">
                <h3>Personel:Şirket İletişim Bilgileri</h3>
                <CreateDayOffForm />
            </div>
        </main>
        

      </div>
    )
}