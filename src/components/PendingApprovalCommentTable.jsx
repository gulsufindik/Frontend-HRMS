import { useEffect, useState } from "react";

const commentUrl="http://localhost:8080/comment/getallpendingcomments"
const commentApproveUrl = "http://localhost:8080/user/approvecommentofemployee"
const denyCommentUrl = "http://localhost:8080/user/denycomment"

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
// =============== Red Metodu ======================
function fetchDenyCommentMethod(deniedData){

    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deniedData),
      };

     return fetch(denyCommentUrl,options).then((resp)=>{
        return resp.json();
      }).then((data)=>{return data}).catch((err)=>console.log(err.message))
}

export function PendingCommentTable(){
    // listeleme icin gerekli useStateler
    const[pendingCommentList,setPendingCommentList]=useState([]);
    const[error,setError]=useState(null);


    // Listeyi Yenileme Icin Gerekli Metod
    function removeCommentFromList(commentId) {
        // Yorumu listeden kaldır
        const updatedComments = pendingCommentList.filter(comment => comment.id !== commentId);
        setPendingCommentList(updatedComments);
      }



    // Onaylama icin gerekli Hooklar
    const[approveData,setApproveData]= useState({
        userType:localStorage.getItem("userType"),
        commentId:null,
    })
    const[approveError,setApproveError]=useState(null);
    const [approvedMessage,setApprovedMessage] = useState(null);
    
    // Red icin gerekli Hooklar

    const[deniedData,setDeniedData]=useState({
        userType: localStorage.getItem("userType"),
        commentId: null,
    })

    // onaylama butonu handleClick
    function handleApproveClick(IdOfComment){
        setApproveData({userType:localStorage.getItem("userType"),commentId:IdOfComment})
        removeCommentFromList(IdOfComment);
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

    // red butonu handleClick
    function handleDenyClick(IdOfComment){
        setDeniedData({userType:localStorage.getItem("userType"),commentId:IdOfComment})
        removeCommentFromList(IdOfComment);
    }

    useEffect(()=>{
        if(deniedData.commentId !== null){
            console.log(deniedData);

            fetchDenyCommentMethod(deniedData).then((data)=>{
                if(data){
                    setApprovedMessage("Basarili")
                }
                if(data.fields){
                    setApproveError(data.fields)
                  }else{
                    setApproveError(data.message)
                  }
            }).catch((err)=>console.log(err.message))
        }
    },[deniedData])


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
                                <td><button className="btn-approve" onClick={()=>handleApproveClick(comment.id)}>✔️</button><button className="btn-deny"  onClick={()=>handleDenyClick(comment.id)}>🗙</button></td>
                            </tr>
                        ))
                    )}
                </tbody>
                </table>
        </div>}
        </>
    )

}