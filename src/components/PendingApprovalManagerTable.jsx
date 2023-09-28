import { useEffect, useState } from "react";

//==================== URL ===============================
const pendingApprovalListManagerUrl= "http://localhost:8080/user/listpendingmanagerapproval"
const pendingApprovalManagerUrl = "http://localhost:8080/user/approvemanager"
const denyRegisterManagerUrl = "http://localhost:8080/user/denymanager"
//==================== Backend Fetch ===============================
// =========== listeleme metodu ==============
function pendingApprovalManagerMethod(){
    return fetch(pendingApprovalListManagerUrl).then((resp)=>{
        return resp.json();
    }).then((data)=>{ return data}).catch((err)=>console.log(err.message))
}

// ============= Onaylama Metodu =================
function fetchApprovalManagerMethod(approvedManager){
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(approvedManager),
      };
      return fetch(pendingApprovalManagerUrl,options).then((resp)=>{
        return resp.json();
      }).then((data)=>{return data}).catch((err)=>console.log(err.message))
}

// ============= Red Metodu ==================
function fetchDenyManagerMethod(deniedManager){
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deniedManager),
      };
      return fetch(denyRegisterManagerUrl,options).then((resp)=>{
        return resp.json();
      }).then((data)=>{return data}).catch((err)=>console.log(err.message))
}


// ======================= Table ================
export function PendingApprovalManagerTable(){
    // listeleme icin gerkeli Hooklar
    const[pendingManagerList,setPendingManagerList]=useState([]);   
    const[error,setError]=useState(null);

    // Onaylama icin gerekli Hooklar
    const[approvedManager,setApprovedManager]= useState({
        token:localStorage.getItem("token"),
        managerAuthId: null,
    })
    const[approveError,setApproveError]=useState(null);
    const [approvedMessage,setApprovedMessage] = useState(null);

    // Red icin gerekli Hooklar
    const[deniedManager,setDeniedManager] = useState({
        userType: localStorage.getItem("userType"),
        authId: null,
    })

    // Listeyi Yenileme Icin Gerekli Metod
    function removeManagerFromList(authId) {
        // Yorumu listeden kaldır
        const updatedManagerList = pendingManagerList.filter(manager => manager.id !== authId);
        setPendingManagerList(updatedManagerList);
      }

    // Listeleme metodu
    useEffect(()=>{
        pendingApprovalManagerMethod().then((data)=>{
            if(Array.isArray(data)){
                setPendingManagerList([...data]);
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
    function handleApproveClick(AuthIdOfManager){
        console.log(AuthIdOfManager);
        setApprovedManager({ token: localStorage.getItem("token"), managerAuthId: AuthIdOfManager });
        removeManagerFromList(AuthIdOfManager)
    }
    
    useEffect(() => {
        if (approvedManager.managerAuthId !== null) {
            console.log(approvedManager);
    
            fetchApprovalManagerMethod(approvedManager)
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
    }, [approvedManager]);

    // Red Metodu
    function handleDenyClick(AuthIdOfManager){
        console.log(AuthIdOfManager);
        setDeniedManager({ userType: localStorage.getItem("userType"), authId: AuthIdOfManager });
        removeManagerFromList(AuthIdOfManager)
    }

    useEffect(() => {
        if (deniedManager.authId !== null) {
            console.log(deniedManager);
            fetchDenyManagerMethod(deniedManager)
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
    }, [deniedManager]);

    return(
        <>
        {error && <p style={{color: "red", marginTop:"20px" }}>Onay bekleyen yonetici yok ¯\_(ツ)_/¯</p>}
        {!error && <div>
                <h1>Onay Bekleyen Yoneticiler</h1>
                <table className="financial-table" >
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Auth Id</th>
                            <th>Ad</th>
                            <th>Soyad</th>
                            <th>Kullanici Adi</th>
                            <th>Sahsi Mail</th>
                            <th>Sirket Ismi</th>
                            <th>Kullanici Rolu</th>
                            <th>Onay/Red</th>
                        </tr>
                    </thead>
                    <tbody>
                    {pendingManagerList.length === 0 ? (
                        <tr>
                            <td colSpan="6">Henuz veri yukleniyor...</td>
                        </tr>
                    ) : (
                        pendingManagerList.map(manager => (
                            <tr key={manager.id}>
                                <td>{manager.id}</td>
                                <td>{manager.authid}</td>
                                <td>{manager.name}</td>
                                <td>{manager.surname}</td>
                                <td>{manager.username}</td>
                                <td>{manager.personalEmail}</td>
                                <td>{manager.companyName}</td>
                                <td>{manager.userType}</td>
                                <td><button className="btn-approve" onClick={()=>handleApproveClick(manager.authid)}>✔️</button><button onClick={()=>handleDenyClick(manager.authid)} className="btn-deny" >🗙</button></td>
                            </tr>
                        ))
                    )}
                </tbody>
                </table>
        </div>}
        </>
    )
}