import { useState, useEffect } from "react";
const employeeInfoUrl = `http://localhost:8080/user/employeeinfo?token=${localStorage.getItem("token")}`

console.log(localStorage.getItem("token"))
function fetchPersonelInfo() {
    return fetch(employeeInfoUrl).then((resp) => {
        return resp.json();
    })
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch((err) => console.log(err.message));
}

export function PersonalInfo() {
    const [personalInfo, setPersonalInfo] = useState("");


    useEffect(() => {
        fetchPersonelInfo().then((data) => {
            console.log(data);
            setPersonalInfo(data)
        }).catch((err) => {
            console.log(err.message)
        });
    }, []);
    return (
        <div className="personelInfoPage">
            <h1>Personel Kisisel Bilgiler</h1>
            <ul>
                <li>
                    <div>
                        <h4>İsim</h4>
                        <p>{personalInfo.name}</p>
                    </div>
                    <div>
                        <h4>Soyisim</h4>
                        <p>{personalInfo.surname}</p>
                    </div>
                    <div>
                        <h4>Kullanıcı adı</h4>
                        <p>{personalInfo.username}</p>
                    </div>
                    <div>
                        <h4>Şifre</h4>
                        <p>{personalInfo.password}</p>
                    </div>
                    <div>
                        <h4>Personel E-posta</h4>
                        <a href={`mailto:${personalInfo.personalEmail}`}>{personalInfo.personalEmail}</a>
                    </div>
                    <div>
                        <h4>Şirket E-posta</h4>
                        <a href={`mailto:${personalInfo.companyEmail}`}>{personalInfo.companyEmail}</a>
                    </div>
                    <div>
                        <h4>Şirket Adı</h4>
                        <p>{personalInfo.name} {personalInfo.surname}</p>
                    </div>
                </li>
            </ul>
        </div>
    );
}
