import { LogoLogin } from "../../components/LogoLogin";
import { AdminControlButtonlari } from "../../components/AdminControlButonlari";
import { PendingApprovalManagerTable } from "../../components/PendingApprovalManagerTable";
import { Logout } from "../../components/LogoutButton";
export function AdminManagerRegisterApprove(){
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
             <h4 className="adminSideBarTitle">Admin Araç Çubuğu</h4>  
             <AdminControlButtonlari/> 
            </div>

            <div className="adminViewSection">
                <PendingApprovalManagerTable />
            </div>
        </main>
        

      </div>
    )
}