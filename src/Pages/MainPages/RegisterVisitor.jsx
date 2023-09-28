import { LogoLogin } from "../../components/LogoLogin";
import { GirisYap } from "../../components/GirisYap";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// ===================Metodlar========================
const registerVisitorUrl="http://localhost:8080/auth/registervisitor"

// ==========Backend baglanti ============
function registerVisitorMethod(visitorForm){
// console.log(visitorForm.username,visitorForm.email,visitorForm.password)
  const options={
    method:"POST",
    headers: {"Content-Type":"application/json"},
    body:JSON.stringify(visitorForm),
}
  return fetch (registerVisitorUrl,options).then((resp)=>{
    return resp.json();
  }).then((data)=>{return data}).catch((err)=>console.log(err.message));
}

// =================Sayfa===============
export function RegisterVisitor() {

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
      <RegisterVisitorFrm  registerVisitorMethod={registerVisitorMethod}/>
        </div>
      </main>
      <footer>
        <img src="../../../public/images/Footer_upscaled.png" alt="" />
      </footer>
    </>
  );
}

// =============Sayfa Componentleri============
function RegisterVisitorFrm({registerVisitorMethod}){

  // const navigate= useNavigate();

  const [visitorForm, setVisitorForm] = useState({
    name: "",
    surname: "",
    username: "",
    personalEmail: "",
    password: "",
  });
  const[notificationStatus,setNotificationStatus]=useState(false);
  const[error,setError]=useState(null);

  function handleChange(e){
    setVisitorForm({...visitorForm,[e.target.name]:e.target.value})
  }

  function handleRegisterVisitorSubmit(e){
    e.preventDefault();
    registerVisitorMethod(visitorForm).then((data)=>{
      console.log(data);
      if(data.token){
        setNotificationStatus(!notificationStatus);
      }

      if(data.fields){
        setError(data.fields[0])
      }else{
        setError(data.message)
      }
      console.log(typeof(error))
    }).catch((err)=>console.log(err.message))
  }

  return(
    <>
           {!notificationStatus && <form onSubmit={handleRegisterVisitorSubmit}>
          <h2>Kayit Ol</h2>

          
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Ad"
            onChange={handleChange}
            value={visitorForm.name}
          />

          <input
            type="text"
            name="surname"
            id="surname"
            placeholder="Soyad"
            onChange={handleChange}
            value={visitorForm.surname}
          />

          <input
            type="text"
            name="username"
            id="username"
            placeholder="Kullanici Adi"
            onChange={handleChange}
            value={visitorForm.username}
          />

          <input
            type="email"
            name="personalEmail"
            id="personalEmail"
            placeholder="Email"
            onChange={handleChange}
            value={visitorForm.personalEmail}
          />

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Sifre"
            onChange={handleChange}
            value={visitorForm.password}
          />
          <section>
          <NavLink to="/registerManager"><p>Yonetici kaydi </p></NavLink>
          {/* <NavLink to="resetPw"><p>Sifremi unuttum</p></NavLink> */}
          </section>
          <button type="submit">Kayit Ol</button>
           {/* {visitorForm.email}{visitorForm.password}{visitorForm.username} */} 
        </form>}
        {notificationStatus && <p>Lutfen paylastiginiz email adresine gelen aktivasyon butonuna tiklayarak hesabinizi aktif ediniz</p>}
        {error !== null && <p style={{color:"red", marginTop:"10px"}}>{error}</p> }
    </>
  )
}