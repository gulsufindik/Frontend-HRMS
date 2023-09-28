import { LogoLogin } from "../../components/LogoLogin";
import { AdminControlButtonlari } from "../../components/AdminControlButonlari";
import { PendingCommentTable } from "../../components/PendingApprovalCommentTable";
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
                <h3 style={{backgroundColor: "#093545",color:"white", display: "flex", border:"2px solid black", width:"100%", justifyContent:"center" }}>Admin:Sirket Yorum Onay</h3>
                <PendingCommentTable />
            </div>
        </main>
      </div>
    )
}