import { LogoLogin } from "../../components/LogoLogin";
import { GirisYap } from "../../components/GirisYap";
import { useState } from "react";

// ===================Metodlar========================
const forgotPasswordUrl="http://localhost:8080/auth/forgotpassword"
const forgotPasswordUrlCloud="http://34.155.184.89/auth/forgotpassword"

// ==========Backend baglanti ============
function forgotPasswordMethod(forgotPasswordInput){
// console.log(visitorForm.username,visitorForm.email,visitorForm.password)
  const options={
    method:"POST",
    headers: {"Content-Type":"application/json"},
    body:JSON.stringify(forgotPasswordInput),
}
  return fetch (forgotPasswordUrl,options).then((resp)=>{
    return resp.json();
  }).then((data)=>{return data}).catch((err)=>console.log(err.message));
}

// =================Sayfa===============
export function ForgotPassword() {

  return (
    <>
      <header style={{backgroundColor:"rgb(239, 230, 232)"}}>
        <nav>
        <LogoLogin />
        <GirisYap />
        </nav>
      </header>
      <main style={{backgroundColor:"rgb(239, 230, 232)"}}>
        <div>
      <ForgotPasswordFrm  forgotPasswordMethod={forgotPasswordMethod}/>
        </div>
      </main>
      <footer style={{backgroundColor:"rgb(239, 230, 232)"}}>
        <img src="../../../public/images/Footer_upscaled.png" alt="" />
      </footer>
    </>
  );
}

// =============Sayfa Componentleri============
function ForgotPasswordFrm({forgotPasswordMethod}){

  // const navigate= useNavigate();

  const [forgotPasswordInput, setforgotPasswordInput] = useState({email:""});
  const[notificationStatus,setNotificationStatus]=useState(false);
  const[error,setError]=useState(null);

  function handleChange(e){
    setforgotPasswordInput({...forgotPasswordInput,[e.target.name]:e.target.value})
  }

  function handleForgotPasswordSubmit(e){
    e.preventDefault();
    forgotPasswordMethod(forgotPasswordInput).then((data)=>{
      console.log(data);
      if(data.successMessage){
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

  return(
    <>
           {!notificationStatus && <form onSubmit={handleForgotPasswordSubmit}>
          <h2>Sifremi Unuttum</h2>

          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
            value={forgotPasswordInput.personalEmail}
          />

          <section>
          {/* <NavLink to="/registerManager"><p>Yonetici kaydi </p></NavLink> */}
          {/* <NavLink to="resetPw"><p>Sifremi unuttum</p></NavLink> */}
          </section>
          <button type="submit">Sifremi Gonder</button>
           {/* {visitorForm.email}{visitorForm.password}{visitorForm.username} */} 
        </form>}
        {notificationStatus && <p>Sifreniz paylastiginiz emaile gonderilmistir.</p>}
        {error !== null && <p style={{color:"red", marginTop:"10px"}}>{error}</p> }
    </>
  )
}