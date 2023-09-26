import { LogoLogin } from "../../components/LogoLogin";
import { PersonelControlButtonlari } from "../../components/PersonelControlButtonlari ";
export function PersonelPagePersonalInformation(){
    return(
      <div className="personelPage">

        <header>
            <LogoLogin/>
        </header>
        <main className="main">
            <div className="personelSideBar">
             <h4 className="personelSideBarTitle" >Personel Araç Çubuğu</h4>  
             <PersonelControlButtonlari/> 
            </div>

            <div className="personelViewSection">
                <h3>Personel:Kişisel Bilgiler</h3>
            </div>
        </main>
        

      </div>
    )
}