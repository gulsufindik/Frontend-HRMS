
import { LogoLogin } from "../../components/LogoLogin";
import { ManagerControlButtonlari } from "../../components/ManagerControlButtonlari";
import { useState, useEffect } from 'react';


//===========Backend Bağlantısı========
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


export function ManagerPagePublicHoliday(){
    return(
        <div className="managerPage">

         <header>
        <LogoLogin/>
        </header>

        <main>
            <div className="managerSideBar">
            <h4 className="managerSideBarTitle">Yönetici Araç Çubuğu</h4>
           <ManagerControlButtonlari/>
           
            </div>
            <div className="managerViewSection">
               <h3>Yönetici:Resmi Tatiller</h3>
               <ManagerPageHolidaySection/>
               
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