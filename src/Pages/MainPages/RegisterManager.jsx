import { LogoLogin } from "../../components/LogoLogin";
import { GirisYap } from "../../components/GirisYap";
import { useState } from "react";

import { NavLink } from "react-router-dom";

// ===================Metodlar========================
const registerManagerUrl = "http://localhost:8080/auth/registermanager";

// ==========Backend baglanti ==========
function registerManagerMethod(managerForm) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(managerForm),
  };
  return fetch(registerManagerUrl, options)
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("Kayit basarisiz");
      }
      console.log(resp);
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
      <header>
        <nav>
          <LogoLogin />
          <GirisYap />
        </nav>
      </header>
      <main>
        <div>
          <RegisterManagerFrm registerManagerMethod={registerManagerMethod} />
        </div>
      </main>
      <footer>
        <img src="../../../public/images/Footer_upscaled.png" alt="" />
      </footer>
    </>
  );
}

// =============Sayfa Componentleri============
function RegisterManagerFrm({ registerManagerMethod }) {
  const [managerForm, setManagerForm] = useState({
    username: "",
    password: "",
    personalEmail: "",
    taxNo: "",
    companyName: "",
  });
  const [notificationStatus, setNotificationStatus] = useState(false);

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
    }).catch((err)=>console.log(err.message))
  }

  return (
    <>
      <form onSubmit={handleRegisterManagerSubmit}> 
        <h2>Yetkili Kayit</h2>

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
      {notificationStatus && <p>Kayit admin onayina gitmistir. Onaylandigi taktirde bildirim alacaksiniz!</p> }
    </>
  );
}
