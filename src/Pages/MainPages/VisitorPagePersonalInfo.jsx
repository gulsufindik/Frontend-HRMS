import { LogoLogin } from "../../components/LogoLogin";
// import { PersonelControlButtonlari } from "../../components/PersonelControlButtonlari ";
import { VisitorControlButtonlari } from "../../components/VisitorControlButtonlari";
import { Logout } from "../../components/LogoutButton";
export function VisitorPagePersonalInfo(){
    return(
      <div className="visitorPage">

        <header>
        <nav >
            <LogoLogin/>
            <Logout />
          </nav>
        </header>
        <main className="main">
            <div className="visitorSideBar">
             <h4 className="visitorSideBarTitle" >Visitor Araç Çubuğu</h4>  
             <VisitorControlButtonlari/>
            </div>

            <div className="visitorViewSection">
                <h3>Visitor:Kişisel Bilgileri</h3>
            </div>
        </main>
        

      </div>
    )
}