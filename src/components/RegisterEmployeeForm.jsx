import { useState } from "react";

// URL

const registerEmployeeUrl = "http://localhost:8080/auth/registeremployee";

// Backend Baglantisi

function registerEmployeeMethod(employeeData) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employeeData),
  };
  return fetch(registerEmployeeUrl, options)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err.message));
}

// =============Sayfa Componentleri============
export function RegisterEmployeeFrm() {
  // const navigate= useNavigate();

  const [employeeData, setEmployeeData] = useState({
    token: localStorage.getItem("token"),
    name: "",
    surname: "",
    personalEmail: "",
    salary: "",
  });
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  }

  function handleRegisterVisitorSubmit(e) {
    e.preventDefault();
    registerEmployeeMethod(employeeData)
      .then((data) => {
        if (data.successMessage) {
          setNotificationStatus(true);
        }

        if (data.fields) {
          let newError= data.fields[0].split(":")
          setError(newError[1]);
        } else {
          setError(data.message);
        }
        console.log(typeof error);
      })
      .catch((err) => console.log(err.message));
  }

  return (
    <>
      <form onSubmit={handleRegisterVisitorSubmit}>
        <h2>Personel Kaydet</h2>

        <input
          type="text"
          name="name"
          id="name"
          placeholder="Ad"
          onChange={handleChange}
          value={employeeData.name}
        />

        <input
          type="text"
          name="surname"
          id="surname"
          placeholder="Soyad"
          onChange={handleChange}
          value={employeeData.surname}
        />

        <input
          type="email"
          name="personalEmail"
          id="personalEmail"
          placeholder="Email"
          onChange={handleChange}
          value={employeeData.personalEmail}
        />

        <input
          type="number"
          name="salary"
          id="salary"
          placeholder="Maaş"
          onChange={handleChange}
          value={employeeData.salary}
        />

        <button type="submit">Kaydet </button>
      </form>
      {notificationStatus && <p>Kayit islemi basarili</p>}
      {error !== null && (
        <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
      )}
    </>
  );
}
