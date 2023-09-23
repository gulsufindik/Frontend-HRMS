import "./assets/styles/reset.css";
import "./App.css";

import { RegisterVisitor } from "./Pages/MainPages/RegisterVisitor";
import { RegisterManager } from "./Pages/MainPages/RegisterManager";
import { Login} from "./Pages/MainPages/Login"
import { Route,Routes } from "react-router";
import { ManagerPagePersonel } from "./Pages/MainPages/ManagerPagePersonel";
import { ManagerPendingApproval } from "./Pages/MainPages/ManagerPendingApproval";
import { ManagerPageProfitLoss } from "./Pages/MainPages/ManagerPageProfitLoss";
import { ManagerPageCompanyExpenses } from "./Pages/MainPages/ManagerPageCompanyExpenses";
import { ManagerPageUpcomingPayment } from "./Pages/MainPages/ManagerPageUpcomigPayments";
import { ManagerPagePublicHoliday } from "./Pages/MainPages/ManagerPagePublicHoliday";
import { ManagerPagePersonelTraces } from "./Pages/MainPages/ManagerPagePersonelTraces";


function App() {

  return (
   <>
   <Routes>
    <Route path="/" element={<Login />}></Route>
    <Route path="/registerVisitor" element={<RegisterVisitor />}></Route>
    <Route path="/registerManager" element={<RegisterManager />}></Route>
    <Route path="/managerpersonel" element={<ManagerPagePersonel />}></Route>
    <Route path="/managerpendingapproval" element={<ManagerPendingApproval />}></Route>
    <Route path="/managerprofitloss" element={<ManagerPageProfitLoss />}></Route>
    <Route path="/managercompanyexpenses" element={<ManagerPageCompanyExpenses />}></Route>
    <Route path="/managerupcomingpayment" element={<ManagerPageUpcomingPayment />}></Route>
    <Route path="/managerpublicholiday" element={<ManagerPagePublicHoliday />}></Route>
    <Route path="/managerpersoneltraces" element={<ManagerPagePersonelTraces />}></Route>
   </Routes>
    
   </>
   
  )
}

export default App
