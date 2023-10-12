import { useState, useEffect } from "react";

const updatePersonalDetailsUrl = "http://localhost:8080/user/update";
const updatePersonalDetailsUrlCloud = "http://34.123.15.45/user/update";
const findUserByTokenUrl = `http://localhost:8080/user/employeeinfo?token=${localStorage.getItem(
    "token"
)}`;
const findUserByTokenUrlCloud = `http://34.123.15.45/user/employeeinfo?token=${localStorage.getItem(
    "token"
)}`;

function updatePersonalDetailsMethod(personalDetailsData) {
    const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(personalDetailsData),
    };
    console.log(personalDetailsData)
    return fetch(updatePersonalDetailsUrl, options)
        .then((resp) => resp.json())
        .then((data) => {
            return data;
        })
        .catch((err) => console.log(err.message));
}

function findUserByTokenMethod() {
    return fetch(findUserByTokenUrl)
        .then((resp) => resp.json())
        .then((data) => data)
        .catch((err) => console.log(err.message));
}

export function UpdatePersonalDetails() {
    const [personalDetailsData, setPersonalDetailsData] = useState({
        token: `${localStorage.getItem("token")}`,
        username: "",
        name: "",
        surname: "",
        password: "",
        personalEmail: "",
        phoneNumber: "",
        salary: "",
    });

    const [notificationStatus, setNotificationStatus] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        console.log("Burdayiz")
        findUserByTokenMethod()
            .then((data) => {
                if (data.name) {
                    console.log(data)
                    setPersonalDetailsData({
                        token: localStorage.getItem("token"),
                        username: data.username,
                        name: data.name,
                        surname: data.surname,
                        password: data.password,
                        personalEmail: data.personalEmail,
                        phoneNumber: data.phoneNumber,
                        salary: data.salary,
                    });
                    console.log(personalDetailsData);
                }
                setLoading(false);
            })
            .catch((err) => console.log(err.message));
    }, []);

    function handleChange(e) {
        console.log(personalDetailsData)
        setPersonalDetailsData({ ...personalDetailsData, [e.target.name]: e.target.value });
        console.log(personalDetailsData)
    }

    function handlePersonalDetailsDataSubmit(e) {
        e.preventDefault();
        console.log(personalDetailsData)
        updatePersonalDetailsMethod(personalDetailsData)
            .then((data) => {
                if (data) {
                    setNotificationStatus(!notificationStatus);
                }

                if (data.fields) {
                    setError(data.fields);
                } else {
                    setError(data.message);
                }
            })
            .catch((err) => console.log(err.message));
    }

    return (
        <>
            {loading ? (
                <p>Bilgiler yükleniyor...</p>
            ) : (
                <form onSubmit={handlePersonalDetailsDataSubmit}>
                    <h2>Personel Bilgisi Guncelle</h2>

                    <div className="form-group">
                        <label htmlFor="username">Kullanici Adi</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Kullanici Adi"
                            onChange={handleChange}
                            value={personalDetailsData.username}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Isim</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Isim"
                            onChange={handleChange}
                            value={personalDetailsData.name}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="surname">Soyisim</label>
                        <input
                            type="text"
                            name="surname"
                            id="surname"
                            placeholder="Soyisim"
                            onChange={handleChange}
                            value={personalDetailsData.surname}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Sifre</label>
                        <input
                            type="text"
                            name="password"
                            id="password"
                            placeholder="Sifre"
                            onChange={handleChange}
                            value={personalDetailsData.password}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="personalEmail">Personel Email</label>
                        <input
                            type="text"
                            name="personalEmail"
                            id="personalEmail"
                            placeholder="Personel Email"
                            onChange={handleChange}
                            value={personalDetailsData.personalEmail}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phoneNumber">Telefon Numarasi</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            placeholder="Telefon Numarasi"
                            onChange={handleChange}
                            value={personalDetailsData.phoneNumber}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="salary">Maas</label>
                        <input
                            type="number"
                            name="salary"
                            id="salary"
                            placeholder="Maas"
                            onChange={handleChange}
                            value={personalDetailsData.salary}
                            readOnly={localStorage.getItem("userType") !== "MANAGER"}
                        />
                    </div>

                    <button type="submit">Guncelle</button>
                </form>
            )}
            {notificationStatus && <p>Guncelleme Basarili</p>}
            {error !== null && (
                <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
            )}
        </>
    );
}
