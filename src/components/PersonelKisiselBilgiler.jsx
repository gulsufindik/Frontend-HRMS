import { useState, useEffect } from "react";
import axios from "axios";
const PersonalInfo = () => {
    const [personalInfo, setPersonalInfo] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8080/user/personelinfo?token=${localStorage.getItem("token")}`).then((response) => {
            setPersonalInfo(response.data);
        });
    }, []);
    return (
        <div className="personelInfoPage">
            <h1>Personel Kisisel Bilgiler</h1>
            <ul>
                {personalInfo.map((info) => (
                    <li key={info.id}>
                        <h4>İsim Soyisim</h4>
                        {info.name} {info.surname}
                        <br />
                        <h4>Personel Mail</h4>
                        <a href={`mailto:${info.personalEmail}`}>{info.personalEmail}</a>
                        <br />
                        <h4>Şirket Mail</h4>
                        <a href={`mailto:${info.companyEmail}`}>{info.companyEmail}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default PersonalInfo;