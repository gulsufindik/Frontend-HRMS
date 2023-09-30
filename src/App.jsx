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
import { ForgotPassword } from "./Pages/MainPages/ForgotPassword";
import { PersonelPagePersonalInformation } from "./Pages/MainPages/PersonelPagePersonalInformation";
import { PersonelPageCompanyInfo } from "./Pages/MainPages/PersonelPageCompanyInfo";
import { PersonelPageCompanyBreakTime } from "./Pages/MainPages/PersonelPageCompanyBreakTime";
import { PersonelPageCompanyContact } from "./Pages/MainPages/PersonelPageCompanyContact";
import { PersonelPageCompanyPublicHoliday } from "./Pages/MainPages/PersonelPageCompanyPublicHoliday";
import { AdminCommentApprove } from "./Pages/MainPages/AdminApproveComment";
import { AdminManagerRegisterApprove } from "./Pages/MainPages/AdminApproveRegisterManager";
import { VisitorPagePersonalInfo } from "./Pages/MainPages/VisitorPagePersonalInfo";
import { VisitorPageCompanyContact } from "./Pages/MainPages/VisitorPageCompanyContact";
import { ManagerRegisterEmployee } from "./Pages/MainPages/ManagerRegisterEmployee";

function App() {

  return (
   <>
   <Routes>
    {/* herkesin ulasabilecegi sayfalar */}
    <Route path="/" element={<Login />}></Route>
    <Route path="/registerVisitor" element={<RegisterVisitor />}></Route>
    <Route path="/registerManager" element={<RegisterManager />}></Route>
    <Route path="/forgotpassword" element={<ForgotPassword />}></Route>

    {/* sadece managerin ulasabilecegi sayfalar */}
    <Route path="/managerpersonel" element={<ManagerPagePersonel />}></Route>
    <Route path="/managerpendingapproval" element={<ManagerPendingApproval />}></Route>
    <Route path="/managerprofitloss" element={<ManagerPageProfitLoss />}></Route>
    <Route path="/managercompanyexpenses" element={<ManagerPageCompanyExpenses />}></Route>
    <Route path="/managerupcomingpayment" element={<ManagerPageUpcomingPayment />}></Route>
    <Route path="/managerpublicholiday" element={<ManagerPagePublicHoliday />}></Route>
    <Route path="/managerpersoneltraces" element={<ManagerPagePersonelTraces />}></Route>
    <Route path="/managerregisteremployee" element={<ManagerRegisterEmployee />}></Route>

    {/* personel ve manager'in ulasabilecegi sayfalar */}
    <Route path="/personelpagepersonalinformation" element={<PersonelPagePersonalInformation/>} ></Route>
    <Route path="/personelpagepecompanyinfo" element={<PersonelPageCompanyInfo/>} ></Route>
    <Route path="/personelpagepebreaktime" element={<PersonelPageCompanyBreakTime/>} ></Route>
    <Route path="/personelpagepecontact" element={<PersonelPageCompanyContact/>} ></Route>
    <Route path="/personelpagepublicholiday" element={<PersonelPageCompanyPublicHoliday/>} ></Route>

    {/* sadece adminin ulasabilecegi sayfa */}
    <Route path="/admincommentapprove" element={<AdminCommentApprove/>} ></Route>
    <Route path="/registermanagerapprove" element={<AdminManagerRegisterApprove/>} ></Route>
    
    <Route path="/visitorpagepersonelinfo" element={<VisitorPagePersonalInfo/>} ></Route>
    <Route path="/visitorpagepecontact" element={<VisitorPageCompanyContact/>} ></Route>
   </Routes>

    
   
   </>
   
  )
}

export default App
