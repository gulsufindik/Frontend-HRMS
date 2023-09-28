import { LogoLogin } from "../../components/LogoLogin";
import { PersonelControlButtonlari } from "../../components/PersonelControlButtonlari ";
import { PersonalInfo } from "../../components/PersonalInfo";
import { Logout } from "../../components/LogoutButton";
export function PersonelPagePersonalInformation() {
  return (
    <div className="personelPage">

      <header>
      <nav >
            <LogoLogin/>
            <Logout />
          </nav>
      </header>
      <main className="main">
        <div className="personelSideBar">
          <h4 className="personelSideBarTitle" >Personel Araç Çubuğu</h4>
          <PersonelControlButtonlari />
        </div>

        <div className="personelViewSection">
          <PersonalInfo />
        </div>
      </main>


    </div>
  )
}