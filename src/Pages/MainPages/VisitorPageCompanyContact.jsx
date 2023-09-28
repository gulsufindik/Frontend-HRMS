import { LogoLogin } from "../../components/LogoLogin";
import { VisitorControlButtonlari } from "../../components/VisitorControlButtonlari";
import { Logout } from "../../components/LogoutButton";
export function VisitorPageCompanyContact(){
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
                <h3>Visitor:Şirket iletişim</h3>
            </div>
        </main>
        

      </div>
    )
}