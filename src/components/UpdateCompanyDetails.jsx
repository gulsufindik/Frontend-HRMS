import { useState, useEffect } from "react";

const updateCompanyDetailsUrl = "http://localhost:8080/company/update";
const findByCompanyNameUrl = `http://localhost:8080/company/findbycompanyname?companyName=${localStorage.getItem(
  "companyName"
)}`;

function updateCompanyDetailsMethod(companyDetailsData) {
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(companyDetailsData),
  };
  return fetch(updateCompanyDetailsUrl, options)
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

export function UpdateCompanyDetails() {
    const [companyDetailsData, setCompanyDetailsData] = useState({
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
      setCompanyDetailsData({
        id: "",
        companyName: "",
        taxNo: "",
        numOfEmployees: "",
        about: "",
      });
  
      findByCompanyNameMethod()
        .then((data) => {
          if (data.companyName) {
            setCompanyDetailsData({
              id: data.id,
              companyName: data.companyName,
              taxNo: data.taxNo,
              numOfEmployees: data.numOfEmployees.toString(),
              about: data.about,
            });
          }
          setLoading(false);
        })
        .catch((err) => console.log(err.message));
    }, []);
  
    function handleChange(e) {
      setCompanyDetailsData({ ...companyDetailsData, [e.target.name]: e.target.value });

    }
  
    function handleCompanyDetailsDataSubmit(e) {
      e.preventDefault();
  
      updateCompanyDetailsMethod(companyDetailsData)
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
            <h2>Sirket Bilgisi Guncelle</h2>
  
            <div className="form-group">
              <label htmlFor="companyName">Sirket Adi</label>
              <input
                type="text"
                name="companyName"
                id="companyName"
                placeholder="Sirket Adi"
                onChange={handleChange}
                value={companyDetailsData.companyName}
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
                value={companyDetailsData.id}
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
                value={companyDetailsData.taxNo}
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
                value={companyDetailsData.numOfEmployees}
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
                value={companyDetailsData.about}
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