import { useState } from "react";

//  URL
const createExpenseRequestUrl= "http://localhost:8080/expense/save"

// Backend Baglantisi

function createExpenseRequestMethod(expenseRequestData){

    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expenseRequestData),
      };

      return fetch(createExpenseRequestUrl,options).then((resp)=>{
        return resp.json();
      }).then((data)=>{return data;}).catch((err)=>console.log(err.message))
}


export function CreateExpenseRequestForm(){

    const[expenseRequestData,setExpenseRequestData]=useState({
        token: localStorage.getItem("token"),
        userType: localStorage.getItem("userType"),
        companyName: localStorage.getItem("companyName"),
        amount: "",
        expenseType: "",
        currency: "",
    })

    const [notificationStatus, setNotificationStatus] = useState(false);
    const [error, setError] = useState(null);
    const expenseTypes = ["ACCOMMODATION","ABROAD","FOOD","DONATION"];
    const currencyTypes = ["TL","EURO","DOLLAR"];

    function handleChange(e){
        setExpenseRequestData({...expenseRequestData,[e.target.name]:e.target.value})
    }

    function handleCreateExpenseRequestSubmit(e){
        e.preventDefault();

        createExpenseRequestMethod(expenseRequestData)
        .then((data) => {
          if (data.successMessage) {
            setNotificationStatus(true);
          }
          if (data.fields) {
            setError(data.fields[0]);
          } else {
            setError(data.message);
          }
          console.log(typeof error);
        })
        .catch((err) => console.log(err.message));
    }

    return(
        <>
        <form onSubmit={handleCreateExpenseRequestSubmit}>
            <h2>Harcama Istegi Olustur</h2>

        <input 
        type="number"
        name="amount"
        id="amount" 
        placeholder="Harcanacak miktar"
        onChange={handleChange}
        value={expenseRequestData.amount}
        />

        <select
          name="expenseType"
          id="expenseType"
          onChange={handleChange}
          value={expenseRequestData.expenseType}
        >
          <option value="">Izin Turu Seciniz</option>
          {expenseTypes.map((expenseType) => (
            <option key={expenseType} value={expenseType}>
              {expenseType}
            </option>
          ))}
        </select>



        <select
          name="currency"
          id="currency"
          onChange={handleChange}
          value={expenseRequestData.currency}
        >
          <option value="">Para Birimi Seciniz</option>
          {currencyTypes.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>

        <button type="submit">Harcama Istegi Olustur</button>
        {notificationStatus && <p>Harcama talebi onaya gitmistir</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
        </>
    )

}