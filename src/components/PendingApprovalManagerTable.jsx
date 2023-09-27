import { useEffect, useState } from "react";

//==================== URL ===============================
const pendingApprovalManagerUrl= "http://localhost:8080/user/listpendingmanagerapproval"

//==================== Backend Fetch ===============================
function pendingApprovalManagerMethod(){
    return fetch(pendingApprovalManagerUrl).then((resp)=>{
        return resp.json();
    }).then((data)=>{ return data}).catch((err)=>console.log(err.message))
}

// ======================= Table ================
export function PendingApprovalManagerTable(){
    const[pendingManagerList,setPendingManagerList]=useState([]);   
    const[error,setError]=useState(null);

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
                            </tr>
                        ))
                    )}
                </tbody>
                </table>
        </div>}
        </>
    )
}