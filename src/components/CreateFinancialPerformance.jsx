import { useState } from "react";

// ===================Metodlar========================
const createFinancialUrl = "http://localhost:8080/financialperformance/save";
const createFinancialUrlCloud = "http://34.123.15.45/financialperformance/save";


// ==========Backend baglanti ==========
function createFinancialMethod(financialPerformanceData) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(financialPerformanceData),
    };
    return fetch(createFinancialUrl, options)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err.message));
  }


export function CreateFinancialPerformanceForm() {
  const [financialPerformanceData, setFinancialPerformanceData] = useState({
    companyName: localStorage.getItem("companyName"),
    financialYear: "",
    annualRevenue: "",
    annualExpenses: "",
    userType: localStorage.getItem("userType"),
  });

  const[notificationStatus,setNotificationStatus]=useState(false);
  const[error,setError]=useState(null);



  function handleChange(e) {
    setFinancialPerformanceData({
      ...financialPerformanceData,
      [e.target.name]: e.target.value,
    });
  }

  function handleCreateFinancialPerformanceSubmit(e) {
    e.preventDefault();
    createFinancialMethod(financialPerformanceData).then((data)=>{
        
        if(data){
            setNotificationStatus(!notificationStatus);
        }
        if(data.fields){
          setError(data.fields)
        }else{
          setError(data.message)
        }
        console.log(typeof(error))
      }).catch((err)=>console.log(err.message))
  }

  return (
    <>
      <form onSubmit={handleCreateFinancialPerformanceSubmit}>
        <h2>Sirket Yillik Gelir Gider Bilgisi Ekle</h2>

        <input
          type="date"
          name="financialYear"
          id="financialYear"
          placeholder="financialYear"
          onChange={handleChange}
          value={financialPerformanceData.financialYear}
        />

        <input
          type="text"
          name="annualRevenue"
          id="annualRevenue"
          placeholder="Yillik Gelir"
          onChange={handleChange}
          value={financialPerformanceData.annualRevenue}
        />

        <input
          type="text"
          name="annualExpenses"
          id="annualExpenses"
          placeholder="Yillik Gider"
          onChange={handleChange}
          value={financialPerformanceData.annualExpenses}
        />

        <button type="submit">Ekle</button>   
        {notificationStatus && <p>Bilgiler Eklenmistir</p> }
      </form>
    </>
  );
}
