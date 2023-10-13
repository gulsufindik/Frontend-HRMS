import { LogoLogin } from "../../components/LogoLogin";
import { GirisYap } from "../../components/GirisYap";
import { useState } from "react";

import { NavLink } from "react-router-dom";

// ===================Metodlar========================
const registerManagerUrl = "http://localhost:8080/auth/registermanager";
const registerManagerUrlCloud = "http://34.123.15.45/auth/registermanager";

// ==========Backend baglanti ==========
function registerManagerMethod(managerForm) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(managerForm),
  };
  return fetch(registerManagerUrl, options)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err.message));
}

// =================Sayfa===============
export function RegisterManager() {
  return (
    <>
      <header style={{backgroundColor:"rgb(239, 230, 232)"}}>
        <nav>
          <LogoLogin />
          <GirisYap />
        </nav>
      </header>
      <main style={{backgroundColor:"rgb(239, 230, 232)"}}>
      <NavLink to="/managerpackageselect"><p >🔙 Paket Secimine Geri don</p></NavLink>
        <div>
          <RegisterManagerFrm registerManagerMethod={registerManagerMethod} />
        </div>
      </main>
      <footer style={{backgroundColor:"rgb(239, 230, 232)"}}>
        <img src="../../../public/images/Footer_upscaled.png" alt="" />
      </footer>
    </>
  );
}

// =============Sayfa Componentleri============
function RegisterManagerFrm({ registerManagerMethod }) {
  const [managerForm, setManagerForm] = useState({
    name:"",
    surname:"",
    username: "",
    password: "",
    personalEmail: "",
    taxNo: "",
    companyName: "",
    userType: sessionStorage.getItem("userType"),
    packageType: sessionStorage.getItem("selectedPack")
  });
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [error,setError] = useState(null)
  function handleChange(e) {
    setManagerForm({ ...managerForm, [e.target.name]: e.target.value });
  }


  function handleRegisterManagerSubmit(e){
    e.preventDefault();
    
    registerManagerMethod(managerForm).then((data)=>{
      console.log(data);
      if(data.token){
        setNotificationStatus(!notificationStatus)
      }
      if(data.fields){
        setError(data.fields[0])
      }else{
        setError(data.message)
      }
    }).catch((err)=>console.log(err.message))
}

  return (
    <>
      <form onSubmit={handleRegisterManagerSubmit}> 
        <h2>Yetkili Kayit</h2>

        <input
            type="text"
            name="name"
            id="name"
            placeholder="Ad"
            onChange={handleChange}
            value={managerForm.name}
          />

          <input
            type="text"
            name="surname"
            id="surname"
            placeholder="Soyad"
            onChange={handleChange}
            value={managerForm.surname}
          />

        <input
          type="text"
          name="username"
          id="username"
          placeholder="Kullanici Adi"
          onChange={handleChange}
          value={managerForm.username}
        />

        <input
          type="email"
          name="personalEmail"
          id="personalEmail"
          placeholder="Email"
          onChange={handleChange}
          value={managerForm.personalEmail}
        />

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Sifre"
          onChange={handleChange}
          value={managerForm.password}
        />

        <input
          type="text"
          name="taxNo"
          id="taxNo"
          placeholder="Vergi No"
          onChange={handleChange}
          value={managerForm.taxNo}
        />

        <input
          type="text"
          name="companyName"
          id="companyName"
          placeholder="Firma Adi"
          onChange={handleChange}
          value={managerForm.companyName}
        />
        <section>
          <NavLink to="/registerVisitor">
            <p>Ziyaretci kayit</p>
          </NavLink>
        </section>
        <button type="submit">Kayit Ol</button>
      </form>
      {notificationStatus && <p style={{marginTop:"10px"}}>Kayit admin onayina gitmistir. Onaylandigi taktirde bildirim alacaksiniz!</p> }
      {error !== null && <p style={{color:"red", marginTop:"10px"}}>{error}</p> }
    </>
  );
}
