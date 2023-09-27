import { useEffect, useState } from "react";

const commentUrl="http://localhost:8080/comment/getallpendingcomments"

function fetchAllPendingCommentsMethod(){
    return fetch(commentUrl).then((resp)=>{
        return resp.json();
    }).then((data)=>{
        return data;
    }).catch((err)=>console.log(err.message));
}


export function PendingCommentTable(){
    const[pendingCommentList,setPendingCommentList]=useState([]);
    const[error,setError]=useState(null);


    useEffect(()=>{
        fetchAllPendingCommentsMethod().then((data)=>{
            if(Array.isArray(data)){
                setPendingCommentList(data)
            }else{
                if(data.fields){
                    setError(data.fields)
                }else{
                    setError(data.message)
                }
            }
            
        }).catch((err)=>console.log(err.message))
    },[]);

    return(
        <>
        {error && <p style={{color: "red", marginTop:"20px" }}>Onay bekleyen yorum yok ¯\_(ツ)_/¯</p>}
        {!error && <div>
                <h1>Onay Bekleyen Yorumlar</h1>
                <table className="financial-table" >
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Auth Id</th>
                            <th>Yorum</th>
                            <th>Sirket Ismi</th>
                            <th>Kullanici Rolu</th>
                        </tr>
                    </thead>
                    <tbody>
                    {pendingCommentList.length === 0 ? (
                        <tr>
                            <td colSpan="6">Henuz veri yukleniyor...</td>
                        </tr>
                    ) : (
                        pendingCommentList.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.authid}</td>
                                <td>{item.comment}</td>
                                <td>{item.companyName}</td>
                                <td>{item.userType}</td>
                            </tr>
                        ))
                    )}
                </tbody>
                </table>
        </div>}
        </>
    )

}