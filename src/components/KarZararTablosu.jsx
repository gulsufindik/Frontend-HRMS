import { useState, useEffect } from "react"

function fetchAllYearsFinancialPerformanceMethod(){
    return  fetch(`http://localhost:8080/financialperformance/findall?companyName=${localStorage.getItem("companyName")}`)
    .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err.message));
}




export function FinancialPerformanceTable(){
    
    const [listAllYears,setListAllYears]=useState([]);
    const [error,setError]=useState(null);
   
    useEffect(() => {
        fetchAllYearsFinancialPerformanceMethod()
            .then(data => {
                if(Array.isArray(data)){
                    setListAllYears(data);
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
                <h1>Kar-Zarar Tablosu</h1>
                <table className="financial-table" >
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Sirket Ismi</th>
                            <th>Yil</th>
                            <th>Yillik Gelir</th>
                            <th>Yillik Gider</th>
                            <th>Kar/Zarar</th>
                        </tr>
                    </thead>
                    <tbody>
                    {listAllYears.length === 0 ? (
                        <tr>
                            <td colSpan="12">Henuz veri yukleniyor...</td>
                        </tr>
                    ) : (
                        listAllYears.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.companyName}</td>
                                <td>{item.financialYear}</td>
                                <td>{item.annualRevenue}</td>
                                <td>{item.annualExpenses}</td>
                                <td>{item.annualRevenue - item.annualExpenses >= 0 ? `+${item.annualRevenue - item.annualExpenses}` : `-${item.annualExpenses - item.annualRevenue}`}</td>
                            </tr>
                        ))
                    )}
                </tbody>
                </table>
        </div>}
        </>
    )
}