import { LogoLogin } from "../../components/LogoLogin";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

function GetAllCompany() {
  const url = `http://localhost:8080/company/findall2`;
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  return fetch(url, options)
    .then((resp) => {
      if (!resp.ok) {
        return resp.json().then((error) => {
          throw new Error(error.message); // API'den dönen hata mesajını yakala ve fırlat
        });
      }
      return resp.json();
    })
    .then((data) => {
      console.log("Veri Tipi:", typeof data);
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.error(err.message);
      throw err;
    });
}

function GetCompanyWith(companyName) {
  const url = `http://localhost:8080/company/findbycompanyname?companyName=${companyName}`;
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  return fetch(url, options)
    .then((resp) => {
      if (!resp.ok) {
        return resp.json().then((error) => {
          throw new Error(error.message); // API'den dönen hata mesajını yakala ve fırlat
        });
      }
      return resp.json();
    })
    .then((data) => {
      console.log("Veri Tipi:", typeof data);
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.error(err.message);
      throw err;
    });
}

export function MainPage() {

  return (
    <div className="mainPageContainer">
      <header>
        <LogoLogin />
        <button className="loginMainbtn">Giriş</button>
      </header>
      <main>
        <div className="abotUsContainer">
          <div className="aboutİnfo">
            <h3 className="aboutTitle">Hakkımızda:</h3>
            <p className="aboutParagraf">
             
            Yonca ile tanışalım. Yonca, dört kişilik bir girişimci grubu tarafından 2023 yılında kurulmuştur. Amacı, yüksek kullanıcı memnuniyetini basit arayüzü ve işlevselliği sayesinde sağlamaktır. Artık her şey daha kolay.
            </p>
           
          </div>
          <div className="aboutView">
            <img className="resim1" src="https://cdn.ankaramasasi.com/2023/9/23/dgs-insan-kaynaklari-yonetimi-2023-taban-puanlari-ve-basari-siralamalari-irltdjwg.jpeg" alt="Güzel Bir Manzara Resmi" />
            
          </div>
        </div>

        <div className="companySectionMainPage"> 
            <div className="companyview">
                <img className="resim2" src="https://blog.experlize.com/wp-content/uploads/2020/11/ekip-yonetimi-nedir.jpg"></img>
            </div>
            <div className="findCompany">
            <FindWithName/>            
              
            </div>
        </div>

        <div className="allCompanySectionMainPage">
        <div className="companylist">
        <h1>İş Ortaklarımız</h1>
         <FindAllCompany/>  
        </div>   

        <div className="companyview">
                <img className="resim2" src="https://d6xcmfyh68wv8.cloudfront.net/learn-content/uploads/2019/09/register-company-online.png"></img>

            </div>
        </div>

        
      </main>
     
    </div>
  );
}

function FindAllCompany(){


  const [companyData, setCompanyData] = useState([]);
  const [error, setError] = useState(null);
  const navigateTo = useNavigate(); 

  const handleClick = (value) => {
    navigateTo(`/companypage?value=${value}`);
  };

  useEffect(() => {
    GetAllCompany()
      .then((data) => {
        setCompanyData(data);
      })
      .catch((err) => {
        setError(err.message);
        console.log("Hata:", err.message);
      });
  }, []);
  
  if (error) {
    return <div className="hata">{error}</div>;
  }

  return(
    <div className="btnCompanyContainer">
      <NavLink to="/companypage">
    {companyData.map((obj) => (
         <button  className="btnCompanyName" key={obj.id} onClick={() => handleClick(obj.id)}>
        {obj.companyName}
      </button>
      ))}
    </NavLink>
  </div>
  );
}

function FindWithName(){
  const [companyName, setCompanyName] = useState("");
  const [databaseData, setDatabaseData] = useState([]);
  
  const handleQueryClick = () => {
    if (companyName) {
      GetCompanyWith(companyName)
        .then((data) => {
          setDatabaseData(data);
        })
        .catch((err) => console.log("Hata:", err.message));
    }
  };



  return(
<div className="findCompany">
            
            <input className="findCompanyInput"
            placeholder="Şirket Bul..."
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            />
          
            <button className="findCompanybtn1"></button> 
             <button className="findCompanybtn2"  onClick={() => handleQueryClick(companyName)}>ARA</button> 
            <button className="findCompanybtn3"></button>
            {databaseData.companyName && (
        <div className="databaseCompany">
          <h1>{databaseData.companyName}</h1>
          <hr></hr>
          <p>{databaseData.about}</p>
          <NavLink to="/companypage"> <button className="goCompany">Şirkete Git</button></NavLink>
        </div>
      )}
           
            
          </div>
  );
}