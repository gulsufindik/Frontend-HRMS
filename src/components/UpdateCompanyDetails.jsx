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
      phone:"",
      address:"",
      companyEmail:"",
      fax:"",
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
            setCompanyDetailsData({
              id: data.id,
              companyName: data.companyName,
              taxNo: data.taxNo,
              numOfEmployees: data.numOfEmployees.toString(),
              about: data.about,
              phone: data.phone,
              address: data.address,
              companyEmail: data.companyEmail,
              fax :  data.fax
            });
            console.log(companyDetailsData);
          }
          setLoading(false);
        })
        .catch((err) => console.log(err.message));
    }, []);
  
    function handleChange(e) {
        setCompanyDetailsData({ ...companyDetailsData, [e.target.name]:e.target.value });
    }

    

  
    function handleCompanyDetailsDataSubmit(e) {
      e.preventDefault();
      console.log(companyDetailsData)
      updateCompanyDetailsMethod(companyDetailsData)
        .then((data) => {
          if (data.successMessage) {
            setNotificationStatus(true);
            setError(null)
            localStorage.getItem("companyName") !== companyDetailsData.companyName && localStorage.setItem('companyName', companyDetailsData.companyName )
          }
          if (data.fields) {
            setError(data.fields[0]);
          } else {
            setError(data.message);
          }
        })
        .catch((err) => console.log(err.message));
        
    }
    function handleEditCompanyNameClick() {
        setIsCompanyNameEditable(!isCompanyNameEditable); 
      }

      function formatPhoneNumber(value){
        if(!value) return value;
        const phoneNumber = value.replace(/[^\d]/g,'');
        const phoneNumberLength = phoneNumber.length;
        if(phoneNumberLength < 4) return phoneNumber;
        if(phoneNumberLength < 7){
          return `(${phoneNumber.slice(0,3)}) ${phoneNumber.slice(3)}`;
        }
        return `(${phoneNumber.slice(0,3)}) ${phoneNumber.slice(3,6)}-${phoneNumber.slice(6,9)}`;
      }

      function phoneNumberFormatter(e){
        const inputField= e.target;
        const formattedInputValue = formatPhoneNumber(inputField.value);
        inputField.value=formattedInputValue;
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
              <button type="button" style={{height:"20px"}} onClick={handleEditCompanyNameClick}>
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

            <div className="form-group">
              <label htmlFor="phone">Sirket Telefon Numarasi</label>
              <input onKeyDown={phoneNumberFormatter}
                type="tel"
                name="phone"
                id="phone"
                placeholder="(xxx)-xxx-xxxx"
                onChange={handleChange}
                required
                pattern="^\(\d{3}\) \d{3}-\d{4}$"
                value={companyDetailsData.phone}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Sirket Adres Bilgisi</label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Adres Bilgisi"
                onChange={handleChange}
                value={companyDetailsData.address}
              />
            </div>

            <div className="form-group">
              <label htmlFor="companyEmail">Sirket Mail Adresi</label>
              <input
                type="text"
                name="companyEmail"
                id="companyEmail"
                placeholder="Mail Adresi"
                onChange={handleChange}
                value={companyDetailsData.companyEmail}
              />
            </div>

            <div className="form-group">
              <label htmlFor="fax">Sirket Fax Numarasi</label>
              <input
                type="text"
                name="fax"
                id="fax"
                placeholder="Fax Numarasi"
                onChange={handleChange}
                value={companyDetailsData.fax}
              />
            </div>
  
            <button type="submit" style={{height:"30px"}}>Guncelle</button>
          </form>
        )}
        {notificationStatus && <p style={{ color: "green", marginTop: "10px" }}>Guncelleme Basarili</p>}
        {error !== null && (
          <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
        )}
      </>
    );
  }