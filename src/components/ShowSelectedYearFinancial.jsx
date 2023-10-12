import { useState, useEffect } from "react";

function fetchSelectedYearFinancialPerformanceMethod(selectedYearData) {
  const url=`http://localhost:8080/financialperformance/findSelectedYear?companyName=${selectedYearData.companyName}&selectedYear=${selectedYearData.selectedYear}`
  const urlCloud=`http://34.123.15.45/financialperformance/findSelectedYear?companyName=${selectedYearData.companyName}&selectedYear=${selectedYearData.selectedYear}`
  return fetch(url).then((resp) => resp.json())
    .then((data) => data)
    .catch((err) => console.log(err.message));
}

export function SelectedYearFinancialPerformanceTable() {
  const [selectedYearData, setSelectedYearData] = useState({
    companyName: localStorage.getItem("companyName"),
    selectedYear: "",
  });
  const [financialData, setFinancialData] = useState("");

  useEffect(() => {
    if (selectedYearData.selectedYear) {
      fetchSelectedYearFinancialPerformanceMethod(selectedYearData)
        .then((data) => setFinancialData(data))
        .catch((error) => console.log(error.message));
    }
  }, [selectedYearData]);

  function handleChange(e) {
    const { name, value } = e.target;
    setSelectedYearData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <>
      <h2 style={{marginTop: "10px"}} >Seçili Yıl Gelir Gider Bilgisi Ara</h2>

      <input
        type="text"
        name="selectedYear"
        id="selectedYear"
        placeholder="Yıl "
        onChange={handleChange}
        value={selectedYearData.selectedYear}
      />

      {selectedYearData.selectedYear && <div style={{ marginTop: "10px" }}>
        <h1>Kar-Zarar Tablosu</h1>
        <table className="financial-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Şirket İsmi</th>
              <th>Yıl</th>
              <th>Yıllık Gelir</th>
              <th>Yıllık Gider</th>
              <th>Kar/Zarar</th>
            </tr>
          </thead>
          <tbody>
            {financialData && (
              <tr key={financialData.id}>
                <td>{financialData.id}</td>
                <td>{financialData.companyName}</td>
                <td>{financialData.financialYear}</td>
                <td>{financialData.annualRevenue}</td>
                <td>{financialData.annualExpenses}</td>
                <td>
                  {financialData.annualRevenue - financialData.annualExpenses >= 0
                    ? `+${financialData.annualRevenue - financialData.annualExpenses}`
                    : `-${financialData.annualExpenses - financialData.annualRevenue}`}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>}
    </>
  );
}