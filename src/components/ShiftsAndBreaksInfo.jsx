import { useState, useEffect } from "react";
const employeeInfoUrl = `http://localhost:8080/shiftsandbreaks/shiftinfo?companyName=${localStorage.getItem("companyName")}`
const employeeInfoUrlCloud = `http://34.123.15.45/shiftsandbreaks/shiftinfo?companyName=${localStorage.getItem("companyName")}`

console.log(localStorage.getItem("companyName"))
function fetchShiftsAndBreaksInfo() {
    return fetch(employeeInfoUrl).then((resp) => {
        return resp.json();
    })
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch((err) => console.log(err.message));
}

export function ShiftsAndBreaksInfo() {

    const [listShiftInfo, setListShiftInfo] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchShiftsAndBreaksInfo()
            .then(data => {
                if (Array.isArray(data)) {
                    setListShiftInfo(data);
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
                <div className="personelInfoPage">
                    <h1>Mola ve Vardiya Saatleri</h1>
                    <ul>
                        <li>
                            {listShiftInfo.length === 0 ? (
                                <tr>
                                    <td colSpan="6">Henuz veri yukleniyor...</td>
                                </tr>
                            ) : (
                                listShiftInfo.map(item => (
                                    <tr key={item.id}>
                                        <div>
                                            <h4>Sirket Ismi</h4>
                                            <p>{item.companyName}</p>
                                        </div>
                                        <div>
                                            <h4>Vardiya</h4>
                                            <p>{item.shiftTypes}</p>
                                        </div>
                                        <div>
                                            <h4>Vardiya Baslangic - Bitis</h4>
                                            <p>{item.shiftStartsAt} - {item.shiftEndsAt}</p>
                                        </div>
                                        <div>
                                            <h4>Mola Baslangic - Bitis</h4>
                                            <p>{item.breakStartsAt} - {item.breakEndsAt}</p>
                                        </div>
                                    </tr>
                                ))
                            )}
                        </li>
                    </ul>
                </div>
            </div>}
        </>
    );
}
