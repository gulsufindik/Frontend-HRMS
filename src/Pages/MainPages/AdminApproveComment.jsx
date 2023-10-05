import { LogoLogin } from "../../components/LogoLogin";
import { AdminControlButtonlari } from "../../components/AdminControlButonlari";
import { PendingCommentTable } from "../../components/PendingApprovalCommentTable";
import { Logout } from "../../components/LogoutButton";
export function AdminCommentApprove(){
    return(
      <div className="adminPage">

        <header>
          <nav >
            <LogoLogin/>
            <Logout />
          </nav>
        </header>
        <main className="main">
            <div className="adminSideBar">
             <h4 className="adminSideBarTitle" >Admin Araç Çubuğu</h4>  
             <AdminControlButtonlari/> 
            </div>

            <div className="adminViewSection">
                <PendingCommentTable />
            </div>
        </main>
      </div>
    )
}