import { useState, useEffect } from "react";
const employeeInfoUrl = `http://localhost:8080/shiftsandbreaks/shiftinfo?companyName=${localStorage.getItem("companyName")}`

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
    const [shiftInfo, setShiftInfo] = useState("");


    useEffect(() => {
        fetchShiftsAndBreaksInfo().then((data) => {
            console.log(data);
            setShiftInfo(data)
        }).catch((err) => {
            console.log(err.message)
        });
    }, []);
    return (
        <div className="personelInfoPage">
            <h1>Mola ve Vardiya Saatleri</h1>
            <ul>
                <li>
                    <div>
                        <h4>Sirket Ismi</h4>
                        <p>{shiftInfo.companyName}</p>
                    </div>
                    <div>
                        <h4>Vardiya</h4>
                        <p>{shiftInfo.shiftTypes}</p>
                    </div>
                    <div>
                        <h4>Vardiya Baslangic - Bitis</h4>
                        <p>{shiftInfo.shiftStartsAt} - {shiftInfo.shiftEndsAt}</p>
                    </div>
                    <div>
                        <h4>Mola Baslangic - Bitis</h4>
                        <p>{shiftInfo.breakStartsAt} - {shiftInfo.breakEndsAt}</p>
                    </div>
                </li>
            </ul>
        </div>
    );
}
