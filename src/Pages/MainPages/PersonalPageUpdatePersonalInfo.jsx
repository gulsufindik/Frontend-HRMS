import { LogoLogin } from "../../components/LogoLogin";
import { Logout } from "../../components/LogoutButton";
import { PersonelControlButtonlari } from "../../components/PersonelControlButtonlari ";
import { UpdatePersonalDetails } from "../../components/UpdatePersonalDetails";
import { SwitchButtonToManager } from "../../components/SwitchEmployeeToManagerButton";

export function PersonalPageUpdatePersonalInfo(){
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
            <PersonelControlButtonlari />
          </div>
  
          <div className="personelViewSection">
            <UpdatePersonalDetails />
          </div>
        </main>
  
  
      </div>
    )
  }