import { useEffect, useState } from "react";

const commentUrl="http://localhost:8080/comment/getallpendingcomments"
const commentApproveUrl = "http://localhost:8080/user/approvecommentofemployee"

// ================== BACKEND BAGLANTILARI ================
// ================== listeleme metodu====================
function fetchAllPendingCommentsMethod(){
    return fetch(commentUrl).then((resp)=>{
        return resp.json();
    }).then((data)=>{
        return data;
    }).catch((err)=>console.log(err.message));
}
// =============== Onaylama Metodu ======================
function fetchCommentApproveMethod(approveData){

    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(approveData),
      };

     return fetch(commentApproveUrl,options).then((resp)=>{
        return resp.json();
      }).then((data)=>{return data}).catch((err)=>console.log(err.message))
}


export function PendingCommentTable(){
    // listeleme icin gerekli useStateler
    const[pendingCommentList,setPendingCommentList]=useState([]);
    const[error,setError]=useState(null);

    // Onaylama icin gerekli
    const[approveData,setApproveData]= useState({
        userType:localStorage.getItem("userType"),
        commentId:null,
    })
    const[approveError,setApproveError]=useState(null);
    const [approvedMessage,setApprovedMessage] = useState(null);

    // onaylama butonu handleClick
    function handleApproveClick(IdOfComment){
        setApproveData({userType:localStorage.getItem("userType"),commentId:IdOfComment})
    }

    useEffect(()=>{
        if(approveData.commentId !== null){
            console.log(approveData);

            fetchCommentApproveMethod(approveData).then((data)=>{
                if(data.successMessage){
                    console.log(data.successMessage)
                    setApprovedMessage(data.successMessage)
                }
                if(data.fields){
                    setApproveError(data.fields)
                  }else{
                    setApproveError(data.message)
                  }
            }).catch((err)=>console.log(err.message))
        }
    },[approveData])

    // =========== Listeleme MEtodu ===================
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
    },[approveData]);

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
                            <th>Onay/Red</th>
                        </tr>
                    </thead>
                    <tbody>
                    {pendingCommentList.length === 0 ? (
                        <tr>
                            <td colSpan="6">Henuz veri yukleniyor...</td>
                        </tr>
                    ) : (
                        pendingCommentList.map(comment => (
                            <tr key={comment.id}>
                                <td>{comment.id}</td>
                                <td>{comment.authid}</td>
                                <td>{comment.comment}</td>
                                <td>{comment.companyName}</td>
                                <td>{comment.userType}</td>
                                <td><button className="btn-approve" onClick={()=>handleApproveClick(comment.id)}>✔️</button><button className="btn-deny">🗙</button></td>
                            </tr>
                        ))
                    )}
                </tbody>
                </table>
        </div>}
        </>
    )

}