import { LogoLogin } from "../../components/LogoLogin";
import { ManagerControlButtonlari } from "../../components/ManagerControlButtonlari";
import { FinancialPerformanceTable } from "../../components/KarZararTablosu";
import { CreateFinancialPerformanceForm } from "../../components/CreateFinancialPerformance";
import { SelectedYearFinancialPerformanceTable } from "../../components/ShowSelectedYearFinancial";
import { useState } from "react";
import { Logout } from "../../components/LogoutButton";
import { SwitchButtonToEmployee } from "../../components/SwitchManagerToEmployeeButton";

export function ManagerPageProfitLoss(){
    const [selectedComponent, setSelectedComponent] = useState("create");

    function showComponent(componentName) {
        setSelectedComponent(componentName);
      }
    return(
        <div className="managerPage">

         <header>
         <nav >
            <LogoLogin/>
            <SwitchButtonToEmployee />
            <Logout />
          </nav>
        </header>

        <main>
            <div className="managerSideBar">
            <h4 className="managerSideBarTitle">Yönetici Araç Çubuğu</h4>
           <ManagerControlButtonlari/>
           
            </div>
            <div className="managerViewSection">
        <h3>Yönetici: Kar zarar</h3>
        <div>
          <button onClick={() => showComponent("create")}>Kar-Zarar Oluştur +</button>
          <button onClick={() => showComponent("all")}>Tüm Kar Zararı Göster ◕‿◕</button>
          <button onClick={() => showComponent("selectedYear")}>Seçili Yıl Kar-Zarar Göster -‿◕</button>
        </div>
        {selectedComponent === "create" && <CreateFinancialPerformanceForm />}
        {selectedComponent === "all" && <FinancialPerformanceTable />}
        {selectedComponent === "selectedYear" && <SelectedYearFinancialPerformanceTable />}
      </div>
        </main>
        </div>
        
    )

}