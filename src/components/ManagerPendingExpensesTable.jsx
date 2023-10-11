import { useState, useEffect } from "react"

// ========= URL ==========
const pendingExpenseRequestUrl= `http://localhost:8080/expense/findexpensebycompany?companyName=${localStorage.getItem("companyName")}`
const approveExpenseRequestUrl= "http://localhost:8080/expense/approveStatus"
const denyExpenseRequestUrl = "http://localhost:8080/expense/denyStatus"

// ========= URL CLOUD ==========
const pendingExpenseRequestUrlCloud= `http://34.155.184.89/expense/findexpensebycompany?companyName=${localStorage.getItem("companyName")}`
const approveExpenseRequestUrlCloud= "http://34.155.184.89/expense/approveStatus"
const denyExpenseRequestUrlCloud = "http://34.155.184.89/expense/denyStatus"

// ========= BACKEND METODLARI =========
// ====LISTELEME===
function pendingExpenseRequestMethod(){
    return fetch(pendingExpenseRequestUrl).then((resp)=>{
      return resp.json()  
    }).then((data)=>{
        return data;
    }).catch((err)=>{
        console.log(err.message)
    })
}

// ==== Onaylama =======
function approveExpenseRequestMethod(approvedExpense){
    const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(approvedExpense),
      };
      return fetch(approveExpenseRequestUrl,options).then((resp)=>{
        return resp.json();
      }).then((data)=>{return data}).catch((err)=>console.log(err.message))
}


// ==== Reddet =======
function denyExpenseRequestMethod(deniedExpense){
    const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deniedExpense),
      };
      return fetch(denyExpenseRequestUrl,options).then((resp)=>{
        return resp.json();
      }).then((data)=>{return data}).catch((err)=>console.log(err.message))
}

export function ExpenseRequestsTable(){
    // Listeleme icin gerekli hooklar
    const [pendingExpenseRequests,setPendingExpenseRequests]= useState([]);
    const [error,setError]=useState(null);

    // Onaylama icin gerekli hooklar
    const [approvedExpense,setApprovedExpense]=useState({
        userType: localStorage.getItem("userType"), 
        expenseId: null,
    })
    const[approveError,setApproveError]=useState(null);
    const [approvedMessage,setApprovedMessage] = useState(null);

    // Red icin gerekli hooklar
    const [deniedExpense,setDeniedExpense]=useState({
        userType: localStorage.getItem("userType"),
        expenseId: null,
    })

      // Listeyi Yenileme Icin Gerekli Metod
      function removeRequestFromList(expenseId) {
        // Yorumu listeden kaldır
        const updateExpenseRequestList = pendingExpenseRequests.filter(expense => expense.id !== expenseId);
        setPendingExpenseRequests(updateExpenseRequestList);
      }

    // Listeleme metodu
    useEffect(()=>{
        pendingExpenseRequestMethod().then((data)=>{
            if(Array.isArray(data)){
                setPendingExpenseRequests([...data]);
            }else{
                if(data.fields){
                    setError(data.fields);
                }else{
                    setError(data.message)
                }
            }
        }).catch((err)=>console.log(err.message))
    },[])

    // Onaylama Metodu
    function handleApproveClick(IdOfExpense){
        setApprovedExpense({...approvedExpense, expenseId:IdOfExpense});
        removeRequestFromList(IdOfExpense)
    }

    useEffect(() => {
        if (approvedExpense.expenseId !== null) {

            console.log(approvedExpense.expenseId)
            approveExpenseRequestMethod(approvedExpense)
                .then((data) => {
                    if (data) {
                        setApprovedMessage("Başarılı");
                    }
                    if (data.fields) {
                        setApproveError(data.fields);
                    } else {
                        setApproveError(data.message);
                    }
                })
                .catch((err) => console.log(err.message));
        }
    }, [approvedExpense]);

     // Red Metodu
     function handleDenyClick(IdOfExpense){
        
        setDeniedExpense({...deniedExpense, expenseId:IdOfExpense});
        removeRequestFromList(IdOfExpense)
    }

    useEffect(() => {
        if (deniedExpense.expenseId !== null) {
            
            denyExpenseRequestMethod(deniedExpense)
                .then((data) => {
                    if (data) {
                        setApprovedMessage("Başarılı");
                    }
                    if (data.fields) {
                        setApproveError(data.fields);
                    } else {
                        setApproveError(data.message);
                    }
                })
                .catch((err) => console.log(err.message));
        }
    }, [deniedExpense]);

    return(
        <>
        {error && <p style={{color: "red", marginTop:"20px" }}>Onay bekleyen harcama yok ¯\_(ツ)_/¯</p>}
        {!error && <div>
                <h1>Onay Bekleyen Harcamalar</h1>
                <table className="financial-table" >
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Auth Id</th>
                            <th>Sirket Ismi</th>
                            <th>Miktar</th>
                            <th>Harcama Turu</th>
                            <th>Yuklenen Dosya</th>
                            <th>Para Birimi</th>
                            <th>Onay Durumu</th>
                            <th>Onay/Red</th>
                        </tr>
                    </thead>
                    <tbody>
                    {pendingExpenseRequests.length === 0 ? (
                        <tr>
                            <td colSpan="12">Henuz veri yukleniyor...</td>
                        </tr>
                    ) : (
                        pendingExpenseRequests.map(expense => (
                            <tr key={expense.id}>
                                <td>{expense.id}</td>
                                <td>{expense.authid}</td>
                                <td>{expense.companyName}</td>
                                <td>{expense.amount}</td>
                                <td>{expense.expenseType}</td>
                                <td>{expense.file}</td>
                                <td>{expense.currency}</td>
                                <td>{expense.approvalStatus}</td>
                                <td><button className="btn-approve" onClick={()=>handleApproveClick(expense.id)}>✔️</button> <button onClick={()=>handleDenyClick(expense.id)} className="btn-deny">🗙</button></td>
                            </tr>
                        ))
                    )}
                </tbody>
                </table>
        </div>}
        </>
    )
}