import { LogoLogin } from "../../components/LogoLogin";
import { PersonelControlButtonlari } from "../../components/PersonelControlButtonlari ";
import { Logout } from "../../components/LogoutButton";
export function PersonelPageCompanyInfo(){
    return(
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
             <PersonelControlButtonlari/> 
            </div>

            <div className="personelViewSection">
                <h3>Personel:Şirket Bilgileri</h3>
            </div>
        </main>
        

      </div>
    )
}