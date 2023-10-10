import { useState, useEffect } from "react"

function fetchPersonalTable() {
    return fetch(`http://localhost:8080/user/listworkers?companyName=${localStorage.getItem("companyName")}`)
        .then((resp) => {
            return resp.json();
        })
        .then((data) => {
            return data;
        })
        .catch((err) => console.log(err.message));
}




export function AllPersonalTable() {

    const [listAllYears, setListAllYears] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPersonalTable()
            .then(data => {
                if (Array.isArray(data)) {
                    setListAllYears(data);
                } else {
                    if (data.fields) {
                        setError(data.fields)
                    } else {
                        setError(data.message)
                    }
                }

            })
            .catch(error => console.log(error.message));
    }, []);

    return (
        <>
            {error && <p style={{ color: "red", marginTop: "20px" }}>Henuz Sirkete ait bir veri bulunamadi</p>}
            {!error && <div>
                <h1>Çalışan Tablosu</h1>
                <table className="employeeTable" >
                    <thead>
                        <tr>
                            
                            <th>İsim Soyisim</th>
                            <th>Kullanıcı Adı</th>
                            <th>Personel Maili</th>
                            <th>Şirket Maili</th>
                            <th>Çalısan Tipi</th>
                            <th>Şirket İsmi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listAllYears.length === 0 ? (
                            <tr>
                                <td colSpan="6">Henuz veri yukleniyor...</td>
                            </tr>
                        ) : (
                            listAllYears.map(item => (
                                <tr key={item.id}>
                                   
                                    <td>{item.name} {item.surname}</td>
                                    <td>{item.username}</td>
                                    <td>{item.personalEmail}</td>
                                    <td>{item.companyEmail}</td>
                                    <td>{item.userType}</td>
                                    <td>{item.companyName}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>}
        </>
    )
}