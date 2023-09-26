import { LogoLogin } from "../../components/LogoLogin";
import { AdminControlButtonlari } from "../../components/AdminControlButonlari";
export function AdminCommentApprove(){
    return(
      <div className="adminPage">

        <header>
            <LogoLogin/>
        </header>
        <main className="main">
            <div className="adminSideBar">
             <h4 className="adminSideBarTitle" >Admin Araç Çubuğu</h4>  
             <AdminControlButtonlari/> 
            </div>

            <div className="adminViewSection">
                <h3>Admin:Sirket Yorum Onay</h3>
            </div>
        </main>
        

      </div>
    )
}