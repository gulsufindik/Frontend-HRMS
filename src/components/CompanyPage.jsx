import { LogoLogin } from "./LogoLogin";
import { Logout } from "./LogoutButton";
import { useEffect, useState } from "react";

function CompanyContactApiMethod() {
  const url = `http://localhost:8080/company/findbyid2?id=${localStorage.getItem("gotoCompanyId")}`;
  const urlCloud = `http://34.123.15.45/company/findbyid2?id=${localStorage.getItem("gotoCompanyId")}`;

  return fetch(url)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      console.log(data);
      localStorage.setItem("findcommentcompany", data.companyName)
      return data;
    })
    .catch((err) => {
        const customErrorMessage = "Sever iletişim hatası " + err.message;
        console.error(customErrorMessage);
    });
}

function CommentContactApiMethod(companyName) {
    const url = `http://localhost:8080/comment/findbycompanyname?companyName=${companyName}`;
    const urlCloud = `http://34.123.15.45/comment/findbycompanyname?companyName=${companyName}`;
  
    return fetch(url)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.error(err.message);
      });
  }


export function CompanyPage() {
  const [companyData, setCompanyData] = useState({});
  const [commentData, setCommentData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    CompanyContactApiMethod()
      .then((data) => {
        console.log(data);

        if (data.id) {
          console.log("veri geldi");
          setCompanyData(data);
        } else {
          setError("Şirket verisi bulunamadı.");
        }
      })
      .catch((err) => {
        setError(err.message);
        console.log("Hata server hatası:", err.message);
      });
  }, []);

  useEffect(() => {
    CommentContactApiMethod(localStorage.getItem("findcommentcompany"))
      .then((data) => {
        console.log(data);
        console.log("levent")
        console.log("veri geldi");
         setCommentData(data);
      })
      .catch((err) => {
        setError(err.message);
        console.log("Hata:", err.message);
      });
  }, []);

  if (error) {
    return <div className="hata">Server hatası server kontorlü yap:{error}</div>;
  }

  return (
    <>
      <header className="companyPageHeader">
        <LogoLogin />
        <Logout />
      </header>
      <main className="companyPageMain">
        <div className="companyİnfosecction">
          <div key={companyData.id}>
            <h1>Şirket Adı: {companyData.companyName}</h1>
            <h1 className="contentCompanyTitle">Hakkında:</h1>
            {companyData.about !== null ? (
                <p >{companyData.about}</p>
                ) : (
                <p className="contentCompany"> &nbsp;Şirket hakkında bilgi bulunmamaktadır.<br></br>Şirket hakkında bilgi yakında eklenecektir.</p>
    )}
          </div>
        </div>
        <div className="companyCommentsecction">
          <h1>Yorumlar:</h1>
          
          {commentData != null &&  commentData.map((obj)=>(
            <ul key= {obj.id}>
            <li className="comment">-- {obj.comment}</li>
             </ul>
          ))}
          
        </div>
      </main>
    </>
  );
}
