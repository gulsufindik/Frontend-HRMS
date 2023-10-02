import { useState, useEffect } from "react";

// URL
const findDaysOffUrl = `http://localhost:8080/permission/finddayoffbycompany?companyName=${localStorage.getItem(
  "companyName"
)}`;

// Backend Baglantisi Metodu

function findDaysOffMethod() {
  return fetch(findDaysOffUrl)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err.message));
}



export function EmployeeDaysOffTable(){

    const [listDaysOff,setListDaysOff]=useState([]);
    const [error,setError]=useState(null);
   
    useEffect(() => {
        findDaysOffMethod()
            .then(data => {
                if(Array.isArray(data)){
                    setListDaysOff(data);
                }else{
                if(data.fields){
                    setError(data.fields)
                  }else{
                    setError(data.message)
                  }
                }

               
            })
            .catch(error => console.log(error.message));
    }, []);

    return(
        <>
        {error && <p style={{color: "red", marginTop:"20px" }}>Henuz Sirkete ait bir veri bulunamadi</p> }
        {!error && <div>
                <h1>{localStorage.getItem("companyName").toUpperCase()} Sirketi Izin listesi</h1>
                <table className="financial-table" >
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Authid</th>
                            <th>Sirket Ismi</th>
                            <th>Izin Turu</th>
                            <th>Baslangic Tarihi</th>
                            <th>Bitis Tarihi</th>
                            <th>Izin Istek Gunu</th>
                            <th>Izin Gunu</th>
                        </tr>
                    </thead>
                    <tbody>
                    {listDaysOff.length === 0 ? (
                        <tr>
                            <td colSpan="6">Henuz veri yukleniyor...</td>
                        </tr>
                    ) : (
                        listDaysOff.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.authid}</td>
                                <td>{item.companyName}</td>
                                <td>{item.typeOfPermit}</td>
                                <td>{item.startDate}</td>
                                <td>{item.endDate}</td>
                                <td>{item.dateOfRequest}</td>
                                <td>{item.numberOfDays}</td>
                            </tr>
                        ))
                    )}
                </tbody>
                </table>
        </div>}
        </>
    )
}
