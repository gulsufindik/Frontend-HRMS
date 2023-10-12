import { useState } from "react";

// URL
const leaveACommentUrl = "http://localhost:8080/comment/save";
const leaveACommentUrlCloud = "http://34.123.15.45/comment/save";

// backend baglantisi
function leaveACommentMethod(commentData) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(commentData),
  };
  return fetch(leaveACommentUrl, options)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err.message));
}

// =============Sayfa Componentleri============
export function LeaveAComment() {

  const [commentData, setCommentData] = useState({
    token: localStorage.getItem("token"),
    comment: "",
    companyName: localStorage.getItem("companyName"),
    userType: localStorage.getItem("userType"),
  });
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [error, setError] = useState(null);
  const [pendingMessage, setPendingMessage] = useState("");

  function handleChange(e) {
    setCommentData({ ...commentData, [e.target.name]: e.target.value });
  }

  function handleRegisterVisitorSubmit(e) {
    e.preventDefault();
    leaveACommentMethod(commentData)
      .then((data) => {
        if (data.pendingMessage) {
          setNotificationStatus(!notificationStatus);
          setPendingMessage(data.pendingMessage);
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

  return (
    <>
      {!notificationStatus && (
        <form onSubmit={handleRegisterVisitorSubmit}>
          <textarea
            name="comment"
            id="comment"
            placeholder="Yorumunuz..."
            onChange={handleChange}
            value={commentData.comment}
            className="comment-input" 
            maxLength={500}
          />
  
          <button type="submit" className="submit-button">Yorum Yap</button>
        </form>
      )}
      {notificationStatus && <p>{pendingMessage}</p>}
      {error !== null && (
        <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
      )}
    </>
  );

}