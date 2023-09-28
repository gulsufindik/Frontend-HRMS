import { LogoLogin } from "../../components/LogoLogin";
import { PersonelControlButtonlari } from "../../components/PersonelControlButtonlari ";
import { PersonalInfo } from "../../components/PersonalInfo";

export function PersonelPagePersonalInformation() {
  return (
    <div className="personelPage">

      <header>
        <LogoLogin />
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