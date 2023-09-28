import { NavLink } from "react-router-dom";
import { LogoLogin } from "../../components/LogoLogin";
import { ManagerControlButtonlari } from "../../components/ManagerControlButtonlari";
import { Logout } from "../../components/LogoutButton";
export function ManagerPageUpcomingPayment(){
    return(
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
            <ManagerControlButtonlari/>
            
           
            </div>
            <div className="managerViewSection">
               <h3>Yönetici: Yaklaşan Ödemeler</h3>
            <Table/>
            </div>
        </main>
        </div>
        
    )

}

function Table(){
    return(
 <>
<head>
    <title>Yaklaşan Ödemeler</title>
</head>
<body>
    
    <table border="1">
        <tr className="tableROW">
            <th className="th">Ödeme Adı</th>
            <th className="th">Ödeme Miktarı</th>
            <th className="th">Ödeme Tarihi</th>
            <th className="th">Kontrol</th>
        </tr>
        <tr className="tableROW">
            <td className="td">Su</td>
            <td className="td">1000 TL</td>
            <td className="td">2023-09-28</td>
        <td className="td"><button className="tdbtn">Ödendi Yap</button></td>
        </tr>
        <tr className="tableROW">
            <td className="td">Elektrik</td>
            <td className="td">750 TL</td>
            <td className="td">2023-09-29</td>
            <td className="td"><button className="tdbtn">Ödendi Yap</button></td>
        </tr>
        <tr className="tableROW">
            <td className="td">Maaş</td>
            <td className="td">1200 TL</td>
            <td className="td">2023-09-30</td>
            <td className="td"><button className="tdbtn">Ödendi Yap</button></td>
        </tr>
        
    </table>
</body>

</>




    )
}