import { useState, useEffect } from "react";
const employeeInfoUrl = `http://localhost:8080/company/findbycompanyname?companyName=${localStorage.getItem("companyName")}`
const employeeInfoUrlCloud = `http://34.155.184.89/company/findbycompanyname?companyName=${localStorage.getItem("companyName")}`

console.log(localStorage.getItem("companyName"))
function fetchCompanyInfo() {
    return fetch(employeeInfoUrl).then((resp) => {
        return resp.json();
    })
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch((err) => console.log(err.message));
}

export function CompanyInfo() {
    const [companyInfo, setCompanyInfo] = useState("");


    useEffect(() => {
        fetchCompanyInfo().then((data) => {
            console.log(data);
            setCompanyInfo(data)
        }).catch((err) => {
            console.log(err.message)
        });
    }, []);
    return (
        <div className="personelInfoPage">
            <h1>Şirket Bilgileri</h1>
            <ul>
                <li>
                    <div>
                        <h4>Yönetici ID</h4>
                        <p>{companyInfo.managerId}</p>
                    </div>
                    <div>
                        <h4>Şirket İsmi</h4>
                        <p>{companyInfo.companyName}</p>
                    </div>
                    <div>
                        <h4>Vergi No</h4>
                        <p>{companyInfo.taxNo}</p>
                    </div>
                    <div>
                        <h4>Toplam Çalısan Sayısı</h4>
                        <p>{companyInfo.numOfEmployees}</p>
                    </div>
                    <div>
                        <h4>Hakkında</h4>
                        <p>{companyInfo.about}</p>
                    </div>
                </li>
            </ul>
        </div>
    );
}
