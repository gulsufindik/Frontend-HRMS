import { useEffect, useState } from "react";

// ========== URL =============
const contactInformationUrl= `http://localhost:8080/company/contactinformation?companyName=${localStorage.getItem("companyName")}`
const contactInformationUrlCloud= `http://34.123.15.45/company/contactinformation?companyName=${localStorage.getItem("companyName")}`

// ========== BACKEND ===========

function contactInformationMethod(){

    return fetch(contactInformationUrl).then((resp)=>{
        return resp.json();
    }).then((data)=>{return data}).catch((err)=>{err.message})
}

export function ContactInformationTable(){
    const[contactInformation,setContactInformation]=useState({
        phone:"",
        address:"",
        companyEmail:"",
        fax:"",
    })

    const[ error, setError]= useState(null);

    useEffect(()=>{
        contactInformationMethod().then((data)=>{
            if(data.phone || data.address || data.companyEmail || data.fax){
                setContactInformation(data)
            }else{
                setError("Sirkete Ait Herhangi Bir Iletisim Bilgisi Paylasilmamistir.")
            }
        }).catch((err)=>{console.log(err.message)})
    },[])


    return(
        <>
        <h1>{localStorage.getItem("companyName").toLocaleUpperCase()} Sirketine Ait Iletisim Bilgileri</h1>
<div className="personelInfoPage">
            {error && <p>{error}</p> }
            {!error && <ul>
                <li>
                    <div>
                        <h4>Telefon</h4>
                        <p>{contactInformation.phone}</p>
                    </div>
                    <div>
                        <h4>Adres</h4>
                        <p>{contactInformation.address}</p>
                    </div>
                    <div>
                        <h4>Mail</h4>
                        <p>{contactInformation.companyEmail}</p>
                    </div>
                    <div>
                        <h4>Fax</h4>
                        <p>{contactInformation.fax}</p>
                    </div>
                   
                </li>
            </ul>} 
        </div>

        </>
    )
}
