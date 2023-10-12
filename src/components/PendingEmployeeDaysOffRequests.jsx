import { useEffect, useState } from "react";

//==================== URL ===============================
const pendingDayOffRequesUrl= `http://localhost:8080/permission/finddayoffbycompany?companyName=${localStorage.getItem("companyName")}`
const approveDayOffRequestUrl = "http://localhost:8080/permission/approveStatus"
const denyDayOffRequestManagerUrl = "http://localhost:8080/permission/denyStatus"

//==================== URL CLOUD ===============================
const pendingDayOffRequesUrlCloud= `http://34.123.15.45/permission/finddayoffbycompany?companyName=${localStorage.getItem("companyName")}`
const approveDayOffRequestUrlCloud = "http://34.123.15.45/permission/approveStatus"
const denyDayOffRequestManagerUrlCloud = "http://34.123.15.45/permission/denyStatus"


//==================== Backend Fetch ===============================
// =========== listeleme metodu ==============
function pendingApprovalDayOffRequestMethod(){
    return fetch(pendingDayOffRequesUrl).then((resp)=>{
        return resp.json();
    }).then((data)=>{ return data}).catch((err)=>console.log(err.message))
}

// ============= Onaylama Metodu =================
function approveDayOffRequestMethod(approvedDayOff){
    const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(approvedDayOff),
      };
      return fetch(approveDayOffRequestUrl,options).then((resp)=>{
        return resp.json();
      }).then((data)=>{return data}).catch((err)=>console.log(err.message))
}

// ============= Red Metodu ==================
function denyDayOffRequestMethod(deniedDayOff){
    const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deniedDayOff),
      };
      return fetch(denyDayOffRequestManagerUrl,options).then((resp)=>{
        return resp.json();
      }).then((data)=>{return data}).catch((err)=>console.log(err.message))
}


// ======================= Table ================
export function EmployeeDaysOffTable(){
    // listeleme icin gerkeli Hooklar
    const[pendingDayOffRequests,setPendingDayOffRequests]=useState([]);   
    const[error,setError]=useState(null);

    // Onaylama icin gerekli Hooklar
    const[approvedDayOff,setApprovedDayOff]= useState({
        userType:localStorage.getItem("userType"),
        permissionId: null,
    })
    const[approveError,setApproveError]=useState(null);
    const [approvedMessage,setApprovedMessage] = useState(null);

    // Red icin gerekli Hooklar
    const[deniedDayOff,setDeniedDayOff] = useState({
        userType: localStorage.getItem("userType"),
        permissionId: null,
    })

    // Listeyi Yenileme Icin Gerekli Metod
    function removeRequestFromList(permissionId) {
        // Yorumu listeden kaldır
        const updateDayOffRequestList = pendingDayOffRequests.filter(permission => permission.id !== permissionId);
        setPendingDayOffRequests(updateDayOffRequestList);
      }

    // Listeleme metodu
    useEffect(()=>{
        pendingApprovalDayOffRequestMethod().then((data)=>{
            if(Array.isArray(data)){
                setPendingDayOffRequests([...data]);
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
    function handleApproveClick(IdOfPermission){
        setApprovedDayOff({...approvedDayOff, permissionId:IdOfPermission});
        removeRequestFromList(IdOfPermission)
    }
    
    useEffect(() => {
        if (approvedDayOff.permissionId !== null) {

            console.log(approvedDayOff.permissionId)
            approveDayOffRequestMethod(approvedDayOff)
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
    }, [approvedDayOff]);

    // Red Metodu
    function handleDenyClick(IdOfPermission){
        
        setDeniedDayOff({...deniedDayOff, permissionId:IdOfPermission});
        removeRequestFromList(IdOfPermission)
    }

    useEffect(() => {
        if (deniedDayOff.permissionId !== null) {
            
            denyDayOffRequestMethod(deniedDayOff)
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
    }, [deniedDayOff]);

    return(
        <>
        {error && <p style={{color: "red", marginTop:"20px" }}>Onay bekleyen izin istegi yok ¯\_(ツ)_/¯</p>}
        {!error && <div>
                <h1>Onay Bekleyen Izinler</h1>
                <table className="financial-table" >
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Auth Id</th>
                            <th>Izin Turu</th>
                            <th>Baslangic Tarihi</th>
                            <th>Bitis Tarihi</th>
                            <th>Toplam Gun</th>
                            <th>Sirket Ismi</th>
                            <th>Onay Durumu</th>
                            <th>Onay/Red</th>
                        </tr>
                    </thead>
                    <tbody>
                    {pendingDayOffRequests.length === 0 ? (
                        <tr>
                            <td colSpan="12">Henuz veri yukleniyor...</td>
                        </tr>
                    ) : (
                        pendingDayOffRequests.map(permission => (
                            <tr key={permission.id}>
                                <td>{permission.id}</td>
                                <td>{permission.authid}</td>
                                <td>{permission.typeOfPermit}</td>
                                <td>{permission.startDate}</td>
                                <td>{permission.endDate}</td>
                                <td>{permission.numberOfDays}</td>
                                <td>{permission.companyName}</td>
                                <td>{permission.approvalStatus}</td>
                                <td><button className="btn-approve" onClick={()=>handleApproveClick(permission.id)}>✔️</button> <button onClick={()=>handleDenyClick(permission.id)} className="btn-deny" >🗙</button></td>
                            </tr>
                        ))
                    )}
                </tbody>
                </table>
        </div>}
        </>
    )
}