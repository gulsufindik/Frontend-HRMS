import { useState, useEffect } from "react";

const updatePersonalDetailsUrl = "http://localhost:8080/user/update";
const findByCompanyNameUrl = `http://localhost:8080/company/findbycompanyname?companyName=${localStorage.getItem(
  "companyName"
)}`;

function updatePersonalDetailsMethod(personalDetailsData) {
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(personalDetailsData),
  };
  return fetch(updatePersonalDetailsUrl, options)
    .then((resp) => resp.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err.message));
}

function findByCompanyNameMethod() {
  return fetch(findByCompanyNameUrl)
    .then((resp) => resp.json())
    .then((data) => data)
    .catch((err) => console.log(err.message));
}

export function UpdatePersonalDetails() {
    const [personalDetailsData, setPersonalDetailsData] = useState({
      id: "",
      companyName: "",
      taxNo: "",
      numOfEmployees: "",
      about: "",
    });
  
    const [notificationStatus, setNotificationStatus] = useState(false);
    const [error, setError] = useState(null);
    const [isCompanyNameEditable, setIsCompanyNameEditable] = useState(false);
    const [loading, setLoading] = useState(true);
  

    useEffect(() => {
      console.log("Burdayiz")
      findByCompanyNameMethod()
        .then((data) => {
          if (data.companyName) {
            setPersonalDetailsData({
              id: data.id,
              companyName: data.companyName,
              taxNo: data.taxNo,
              numOfEmployees: data.numOfEmployees.toString(),
              about: data.about,
            });
            console.log(personalDetailsData);
          }
          setLoading(false);
        })
        .catch((err) => console.log(err.message));
    }, []);
  
    function handleChange(e) {
      setPersonalDetailsData({ ...personalDetailsData, [e.target.name]: e.target.value });

    }
  
    function handleCompanyDetailsDataSubmit(e) {
      e.preventDefault();
      console.log(personalDetailsData)
      updatePersonalDetailsMethod(personalDetailsData)
        .then((data) => {
          if (data) {
            setNotificationStatus(!notificationStatus);
          }
  
          if (data.fields) {
            setError(data.fields);
          } else {
            setError(data.message);
          }
        })
        .catch((err) => console.log(err.message));
    }
    function handleEditCompanyNameClick() {
        setIsCompanyNameEditable(!isCompanyNameEditable); 
      }
  
    return (
      <>
        {loading ? (
          <p>Bilgiler yükleniyor...</p>
        ) : (
          <form onSubmit={handleCompanyDetailsDataSubmit}>
            <h2>Personel Bilgisi Guncelle</h2>
  
            <div className="form-group">
              <label htmlFor="companyName">Personel Adi</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Personel Adi"
                onChange={handleChange}
                value={personalDetailsData.companyName}
                readOnly={!isCompanyNameEditable}
              />
              {!isCompanyNameEditable ?  (
              <button type="button" onClick={handleEditCompanyNameClick}>
                Düzenle
              </button>
            ) : (
                <button type="button" onClick={handleEditCompanyNameClick}>
                  Kapat
                </button>
              )}
            </div>
  
            <div className="form-group">
              <label htmlFor="id">Sirket Id</label>
              <input
                type="number"
                name="id"
                id="id"
                placeholder="Sirket Id"
                onChange={handleChange}
                value={personalDetailsData.id}
                readOnly
              />
            </div>

            <div className="form-group">
              <label htmlFor="taxNo">Vergi Numarasi</label>
              <input
                type="text"
                name="taxNo"
                id="taxNo"
                placeholder="Vergi numarasi"
                onChange={handleChange}
                value={personalDetailsData.taxNo}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="numOfEmployees">Sirket Calisan Sayisi</label>
              <input
                type="number"
                name="numOfEmployees"
                id="numOfEmployees"
                placeholder="Sirket Calisan Sayisi"
                onChange={handleChange}
                value={personalDetailsData.numOfEmployees}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="about">Sirket Aciklamasi</label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Sirket Aciklamasi"
                onChange={handleChange}
                value={personalDetailsData.about}
              />
            </div>
  
            <button type="submit">Guncelle</button>
          </form>
        )}
        {notificationStatus && <p>Guncelleme Basarili</p>}
        {error !== null && (
          <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
        )}
      </>
    );
  }