import { LogoLogin } from "../../components/LogoLogin";
import { PersonelControlButtonlari } from "../../components/PersonelControlButtonlari ";
import { Logout } from "../../components/LogoutButton";
import { ShiftsAndBreaksInfo } from "../../components/ShiftsAndBreaksInfo";
import { SwitchButtonToManager } from "../../components/SwitchEmployeeToManagerButton";


export function PersonelPageCompanyBreakTime() {
  
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
          <ShiftsAndBreaksInfo />
        </div>
      </main>


    </div>
  )
}