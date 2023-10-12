import { useState, useEffect } from "react"

function fetchCompanyExpenses() {
    const url=`http://localhost:8080/upcoming/findallwithcompanyname?companyName=${localStorage.getItem("companyName")}`
    const urlCloud=`http://34.123.15.45/upcoming/findallwithcompanyname?companyName=${localStorage.getItem("companyName")}`

    return fetch(url)
        .then((resp) => {
            return resp.json();
        })
        .then((data) => {
            return data;
        })
        .catch((err) => console.log(err.message));
}




export function CompanyExpensesTable() {

    const [listAllYears, setListAllYears] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCompanyExpenses()
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
                <h1>Şirket Giderler Tablosu</h1>
                <table className="financial-table" >
                    <thead>
                        <tr>
                            <th>Sirket Ismi</th>
                            <th>Odeme Ismi</th>
                            <th>Odeme Miktari</th>
                            <th>Odeme Tarihi</th>
                            <th>Durum</th>
                            <th>Odeme Tipi</th>
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
                                    <td>{item.companyName}</td>
                                    <td>{item.paymentName}</td>
                                    <td>{item.paymentAmount}</td>
                                    <td>{item.paymentDate}</td>
                                    <td>{item.status}</td>
                                    <td>{item.type}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>}
        </>
    )
}