import { LogoLogin } from "../../components/LogoLogin";
import { PersonelControlButtonlari } from "../../components/PersonelControlButtonlari ";
import { Logout } from "../../components/LogoutButton";
import { useState, useEffect } from 'react';
import { SwitchButtonToManager } from "../../components/SwitchEmployeeToManagerButton";


const ManagerPagePublicHolidayUrl = "http://localhost:8080/company/publicholiday";

function publicHolidayData() {
  return fetch(ManagerPagePublicHolidayUrl)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data)
      return data;
    })
    .catch((err) => console.log(err.message));
}

export function PersonelPageCompanyPublicHoliday() {
  const userType = localStorage.getItem("userType");

  return (
    <div className="personelPage">

      <header>
        <nav >
          <LogoLogin />
          {userType === "MANAGER" && <SwitchButtonToManager/>}
          <Logout />
        </nav>
      </header>
      <main className="main">
        <div className="personelSideBar">
          <h4 className="personelSideBarTitle" >Personel Araç Çubuğu</h4>
          <PersonelControlButtonlari />
        </div>

        <div className="personelViewSection">
          <ManagerPageHolidaySection />
        </div>
      </main>


    </div>
  )
}

function ManagerPageHolidaySection() {
  const [holidayData, setHolidayData] = useState([]);

  useEffect(() => {
    publicHolidayData()
      .then((data) => {
        setHolidayData(data);
      })
      .catch((err) => console.log("Hata:", err.message));
  }, []);

  return (
    <div className="holidayRowContainer">
      {holidayData.map((holiday) => (
        <div className="holidayRow" key={holiday.id}>
          <h3>{holiday.name}</h3>
          <p>{holiday.date}</p>
          <p>{holiday.explanation}</p>
        </div>
      ))}
    </div>
  );
}