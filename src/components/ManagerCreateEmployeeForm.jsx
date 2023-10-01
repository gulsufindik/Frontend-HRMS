import { useState } from "react";
// Backend URL

const createDayOffUrl = "http://localhost:8080/permission/save";

// Backend baglanti

function createDayOffMethod(dayOffData) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dayOffData),
  };
  return fetch(createDayOffUrl, options)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err.message));
}

//   Front End Sayfa Form

export function CreateDayOffForm() {
  const [dayOffData, setDayOffData] = useState({
    authid: "",
    userType: localStorage.getItem("userType"),
    companyName: localStorage.getItem("companyName"),
    typeOfPermit: "",
    startDate: "",
    endDate: "",
  });

  const [notificationStatus, setNotificationStatus] = useState(false);
  const [error, setError] = useState(null);
  const permitTypes = ["MARRIAGE", "HOLIDAY", "FUNERAL", "ANNUAL"];

  function handleChange(e) {
    setDayOffData({
      ...dayOffData,
      [e.target.name]: e.target.value,
    });
  }

  function handleCreateDayOffSubmit(e) {
    e.preventDefault();
    createDayOffMethod(dayOffData)
      .then((data) => {
        if (data.successMessage) {
          setNotificationStatus(true);
        }
        if (data.fields) {
          setError(data.fields[0]);
        } else {
          setError(data.message);
        }
        console.log(typeof error);
      })
      .catch((err) => console.log(err.message));
  }

  return (
    <>
      <form onSubmit={handleCreateDayOffSubmit}>
        <h2>Izin Ekle</h2>

        <input
          type="number"
          name="authid"
          id="authid"
          placeholder="Authid giriniz"
          onChange={handleChange}
          value={dayOffData.authid}
        />

        <select
          name="typeOfPermit"
          id="typeOfPermit"
          onChange={handleChange}
          value={dayOffData.typeOfPermit}
        >
          <option value="">Izin Turu Seciniz</option>
          {permitTypes.map((permitType) => (
            <option key={permitType} value={permitType}>
              {permitType}
            </option>
          ))}
        </select>

        
        <input
          type="date"
          name="startDate"
          id="startDate"
          placeholder="Izin baslangic gunu"
          onChange={handleChange}
          value={dayOffData.startDate}
        />

        <input
          type="date"
          name="endDate"
          id="endDate"
          placeholder="Izin bitis gunu(bu gun calisma gunu baslar)"
          onChange={handleChange}
          value={dayOffData.endDate}
        />

        <button type="submit">Ekle</button>
        {notificationStatus && <p>Izin Eklenmistir</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </>
  );
}
