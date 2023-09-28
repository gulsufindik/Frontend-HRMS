import { NavLink } from "react-router-dom";
import { LogoLogin } from "../../components/LogoLogin";
import { ManagerControlButtonlari } from "../../components/ManagerControlButtonlari";
import CalisanTablosu from "../../components/CalisanTablosu";
import { Logout } from "../../components/LogoutButton";
export function ManagerPagePersonel() {
    return (
        <div className="managerPage">

            <header>
            <nav >
            <LogoLogin/>
            <Logout />
          </nav>
            </header>

            <main>
                <div className="managerSideBar">
                    <h4 className="managerSideBarTitle">Yönetici Araç Çubuğu</h4>
                    <ManagerControlButtonlari />

                </div>
                <div className="managerViewSection">
                    <CalisanTablosu />
                </div>
            </main>
        </div>





    )
}
