import { useState, useEffect } from "react";
import axios from "axios";

function getPersonelInfo() {
    return axios.get(`http://localhost:8080/user/personelinfo?token=${localStorage.getItem("token")}`).then((response) => {
        return response.json()
    }).then((data) => {

        return data
    }).catch((err) => {
        console.log(err.message)
    });
}
console.log(localStorage.getItem("token"))
function fetchPersonelInfo() {
    return fetch(`http://localhost:8080/user/personelinfo?token=${localStorage.getItem("token")}`)
        .then((resp) => {
            return resp.json();
        })
        .then((data) => {
            return data;
        })
        .catch((err) => console.log(err.message));
}

export function PersonalInfo() {
    const [personalInfo, setPersonalInfo] = useState(null);
    // useEffect(() => {
    //     getPersonelInfo().then((data) => {
    //         console.log(data)
    //         setPersonalInfo(data)
    //     }).catch((err) => {
    //         console.log(err.message)
    //     });
    // }, []);
    useEffect(() => {
        fetchPersonelInfo().then((data) => {
            console.log(data)
            setPersonalInfo(data)
        }).catch((err) => {
            console.log(err.message)
        });
    }, []);
    return (
        <div className="personelInfoPage">
            <h1>Personel Kisisel Bilgiler</h1>
            <ul> {personalInfo.id &&
                <li key={personalInfo.id}>
                    <h4>İsim Soyisim</h4>
                    {personalInfo.name} {personalInfo.surname}
                    <br />
                    <h4>Kullanici adi</h4>
                    {personalInfo.username}
                    <br />
                    <h4>Sifre</h4>
                    {personalInfo.password}
                    <br />
                    <h4>Personel Mail</h4>
                    <a href={`mailto:${personalInfo.personalEmail}`}>{personalInfo.personalEmail}</a>
                    <br />
                    <h4>Şirket Mail</h4>
                    <a href={`mailto:${personalInfo.companyEmail}`}>{personalInfo.companyEmail}</a>
                    <br />
                    <h4>Sirket Ismi</h4>
                    {personalInfo.name} {personalInfo.surname}
                    <br />
                </li>}

            </ul>
        </div>
    );
}
