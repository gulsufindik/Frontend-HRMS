import { NavLink } from "react-router-dom";
import { LogoLogin } from "../../components/LogoLogin";
import { ManagerControlButtonlari } from "../../components/ManagerControlButtonlari";
import SirketGiderleri from "../../components/SirketGiderleri";

export function ManagerPageCompanyExpenses() {
    return (
        <div className="managerPage">

            <header>
                <LogoLogin />
            </header>

            <main>
                <div className="managerSideBar">
                    <h4 className="managerSideBarTitle">Yönetici Araç Çubuğu</h4>
                    <ManagerControlButtonlari />

                </div>
                <div className="managerViewSection">
                    <SirketGiderleri />
                </div>
            </main>
        </div>





    )

}