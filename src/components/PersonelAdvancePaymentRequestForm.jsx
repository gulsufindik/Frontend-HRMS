import { useState } from "react";

// URL
const advancePaymentRequestUrl="http://localhost:8080/advancepayment/save"
const advancePaymentRequestUrlCloud="http://34.155.184.89/advancepayment/save"

// Backend Baglantisi
function createAdvancePaymentRequestMethod(advancePaymentRequestData){
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(advancePaymentRequestData),
      };
      
      return fetch(advancePaymentRequestUrl,options).then((resp)=>{
        return resp.json();
      }).then((data)=>{return data}).catch((err)=>console.log(err.message))
}

export function CreateAdvancePaymentRequestForm(){

    const[advancePaymentRequestData,setAdvancePaymentRequestData]=useState({
        token: localStorage.getItem("token"),
        userType: localStorage.getItem("userType"),
        companyName: localStorage.getItem("companyName"),
        amount: "",
    })

    const [notificationStatus, setNotificationStatus] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState(false);
    const [error, setError] = useState(null);

    function handleChange(e){
        setAdvancePaymentRequestData({...advancePaymentRequestData,[e.target.name]:e.target.value})
    }

    function handleCreateAdvancePaymentRequestSubmit(e){
        e.preventDefault();
        console.log(advancePaymentRequestData)
        createAdvancePaymentRequestMethod(advancePaymentRequestData).then((data)=>{
            console.log(advancePaymentRequestData)
            if(data.successMessage){
                setNotificationStatus(true);
                setNotificationMessage(data.successMessage);
            }
            if(data.fields){
                let newData= data.fields[0].split(":");
                setError(newData[1])
            } else{
                setError(data.message)
            }
        }).catch((err)=>console.log(err.message))

    }

    return(
        <>
        <form onSubmit={handleCreateAdvancePaymentRequestSubmit}>

        <input 
        type="number"
        name="amount"
        id="amount" 
        placeholder="Avans miktari"
        onChange={handleChange}
        value={advancePaymentRequestData.amount}
        />

        <button type="submit">Istegi Olustur</button>
        {notificationStatus && <p>{notificationMessage}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
        </>
    )
}