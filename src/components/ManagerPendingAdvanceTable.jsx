import { useState, useEffect } from "react"

// ========= URL ==========
const pendingAdvanceRequestUrl= `http://localhost:8080/advancepayment/listsadvancepaymentrequests?companyName=${localStorage.getItem("companyName")}`
const approveAdvanceRequestUrl= "http://localhost:8080/advancepayment/approveadvancerequest"
const denyAdvanceRequestUrl = "http://localhost:8080/advancepayment/denyadvancerequest"

// ========= URL CLOUD ==========
const pendingAdvanceRequestUrlCloud= `http://34.155.184.89/advancepayment/listsadvancepaymentrequests?companyName=${localStorage.getItem("companyName")}`
const approveAdvanceRequestUrlCloud= "http://34.155.184.89/advancepayment/approveadvancerequest"
const denyAdvanceRequestUrlCloud = "http://34.155.184.89/advancepayment/denyadvancerequest"

// ========= BACKEND METODLARI =========
// ====LISTELEME===
function pendingAdvanceRequestMethod(){
    return fetch(pendingAdvanceRequestUrl).then((resp)=>{
      return resp.json()  
    }).then((data)=>{
        return data;
    }).catch((err)=>{
        console.log(err.message)
    })
}

// ==== Onaylama =======
function approveAdvanceRequestMethod(approvedAdvance){
    const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(approvedAdvance),
      };
      return fetch(approveAdvanceRequestUrl,options).then((resp)=>{
        return resp.json();
      }).then((data)=>{return data}).catch((err)=>console.log(err.message))
}


// ==== Reddet =======
function denyAdvanceRequestMethod(deniedAdvance){
    const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deniedAdvance),
      };
      return fetch(denyAdvanceRequestUrl,options).then((resp)=>{
        return resp.json();
      }).then((data)=>{return data}).catch((err)=>console.log(err.message))
}

export function AdvanceRequestsTable(){
    // Listeleme icin gerekli hooklar
    const [pendingAdvanceRequests,setPendingAdvanceRequests]= useState([]);
    const [error,setError]=useState(null);

    // Onaylama icin gerekli hooklar
    const [approvedAdvance,setApprovedAdvance]=useState({
        userType: localStorage.getItem("userType"), 
        advanceId: null,
    })
    const[approveError,setApproveError]=useState(null);
    const [approvedMessage,setApprovedMessage] = useState(null);

    // Red icin gerekli hooklar
    const [deniedAdvance,setDeniedAdvance]=useState({
        userType: localStorage.getItem("userType"),
        advanceId: null,
    })

      // Listeyi Yenileme Icin Gerekli Metod
      function removeRequestFromList(advanceId) {
        // Yorumu listeden kaldır
        const updateAdvanceRequestList = pendingAdvanceRequests.filter(advance => advance.id !== advanceId);
        setPendingAdvanceRequests(updateAdvanceRequestList);
      }

    // Listeleme metodu
    useEffect(()=>{
        pendingAdvanceRequestMethod().then((data)=>{
            if(Array.isArray(data)){
                setPendingAdvanceRequests([...data]);
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
    function handleApproveClick(IdOfAdvance){
        setApprovedAdvance({...approvedAdvance, advanceId:IdOfAdvance});
        removeRequestFromList(IdOfAdvance)
    }

    useEffect(() => {
        if (approvedAdvance.expenseId !== null) {

            console.log(approvedAdvance.advanceId)
            approveAdvanceRequestMethod(approvedAdvance)
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
    }, [approvedAdvance]);

     // Red Metodu
     function handleDenyClick(IdOfAdvance){
        
        setDeniedAdvance({...deniedAdvance, advanceId:IdOfAdvance});
        removeRequestFromList(IdOfAdvance)
    }

    useEffect(() => {
        if (deniedAdvance.advanceId !== null) {
            
            denyAdvanceRequestMethod(deniedAdvance)
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
    }, [deniedAdvance]);

    return(
        <>
        {error && <p style={{color: "red", marginTop:"20px" }}>Onay bekleyen avans istegi yok ¯\_(ツ)_/¯</p>}
        {!error && <div>
                <h1>Onay Bekleyen Avans Istekleri</h1>
                <table className="financial-table" >
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Auth Id</th>
                            <th>Sirket Ismi</th>
                            <th>Miktar</th>
                            <th>Onay Durumu</th>
                            <th>Yanit Tarihi</th>
                            <th>Onay/Red</th>
                        </tr>
                    </thead>
                    <tbody>
                    {pendingAdvanceRequests.length === 0 ? (
                        <tr>
                            <td colSpan="12">Henuz veri yukleniyor...</td>
                        </tr>
                    ) : (
                        pendingAdvanceRequests.map(advance => (
                            <tr key={advance.id}>
                                <td>{advance.id}</td>
                                <td>{advance.authid}</td>
                                <td>{advance.companyName}</td>
                                <td>{advance.amount}</td>
                                <td>{advance.status}</td>
                                <td>{advance.replyDate}</td>
                                <td><button className="btn-approve" onClick={()=>handleApproveClick(advance.id)}>✔️</button> <button onClick={()=>handleDenyClick(advance.id)} className="btn-deny">🗙</button></td>
                            </tr>
                        ))
                    )}
                </tbody>
                </table>
        </div>}
        </>
    )
}