import { LogoLogin } from "../../components/LogoLogin";
import { PersonelControlButtonlari } from "../../components/PersonelControlButtonlari ";
import { VisitorControlButtonlari } from "../../components/VisitorControlButtonlari";
export function VisitorPagePersonalInfo(){
    return(
      <div className="visitorPage">

        <header>
            <LogoLogin/>
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