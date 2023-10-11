import { useEffect, useState } from "react";
import { LogoLogin } from "../../components/LogoLogin";
import { ManagerControlButtonlari } from "../../components/ManagerControlButtonlari";
import { Logout } from "../../components/LogoutButton";
import { SwitchButtonToEmployee } from "../../components/SwitchManagerToEmployeeButton";

function PaymentContactApiMethod() {

  const url = `http://localhost:8080/upcoming/findallwithcompanyname?companyName=${localStorage.getItem("companyName")}`;
  const urlCloud = `http://34.155.184.89/upcoming/findallwithcompanyname?companyName=${localStorage.getItem("companyName")}`;
  

  return fetch(url)
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("Veriler alınamadı. HTTP hatası");
      }
      return resp.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error(err.message);
      throw err;
    });
}

export function ManagerPageUpcomingPayment() {
  return (
    <div className="managerPage">
      <header>
        <nav>
          <LogoLogin />
          <SwitchButtonToEmployee />
          <Logout />
        </nav>
      </header>
      <main>
        <div className="managerSideBar">
          <h4 className="managerSideBarTitle">Yönetici Araç Çubuğu</h4>
          <ManagerControlButtonlari />
        </div>
        <div className="managerViewSection">
          <h3>Yönetici: Yaklaşan Ödemeler</h3>
          <div className="companentContainer">
            <Table />
          </div>
        </div>
      </main>
    </div>
  );
}

function Table() {
  const [upcomingPaymentData, setUpcomingPaymentData] = useState([]);
  const [error, setError] = useState(null);
  const [paymentNameInput, setPaymentNameInput] = useState("");
  const [paymentAmountInput, setPaymentAmountInput] = useState("");
  const [paymentDateInput, setPaymentDateInput] = useState("");
  const [error1, setError1] = useState(null);

  useEffect(() => {
    PaymentContactApiMethod()
      .then((data) => {
        console.log(data);
        if (Array.isArray(data)) {
          console.log(data);
          setUpcomingPaymentData(data);
        } else if (data && data.code) {
          setError(data.message);
        } else {
          setError("Veri alınamadı.");
        }
      })
      .catch((err) => {
        setError(err.message);
        console.log("Hata:", err.message);
      });
  }, []);

  function handlePayButtonClick(id) {
    const isConfirmed = window.confirm("Ödeme yapıldı mı?");
    if (isConfirmed) {
      fetch(`http://localhost:8080/upcoming/deletebyid/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((resp) => {
          if (!resp.ok) {
            console.log("Silme işlemi başarısız oldu.");
          } else {
            setUpcomingPaymentData((prevData) =>
              prevData.filter((obj) => obj.id !== id)
            );
          }
        })
        .catch((err) => {
          console.error("Hata:", err);
        });

      window.alert("Ödeme başarıyla tamamlandı!");
    } else {
      window.alert("Ödeme iptal edildi.");
    }
  }
  function handleCreatePayment(paymentNameInput, paymentAmountInput, paymentDateInput) {
    const companyName = localStorage.getItem("companyName");
    const paymentObj = {
      companyName,
      paymentName: paymentNameInput,
      paymentAmount: paymentAmountInput,
      paymentDate: paymentDateInput,
    };
  
    const paymentsaveurl = "http://localhost:8080/upcoming/saveupcomingpayment";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentObj),
    };
  
    // Hata mesajını temizle
    setError1(null);
  
    return fetch(paymentsaveurl, options)
      .then((resp) => {
        if (!resp.ok) {
          // Sunucudan gelen hata mesajını al
          return resp.json().then((data) => {
            setError1(data.message);
  
            // Hata mesajını belirli bir süre sonra temizle
            setTimeout(() => {
              setError1(null);
            }, 10000); // 5 saniye sonra temizle
          });
        }
        return resp.json();
      })
      .then((data) => {
        // Başarılı işlem durumunda işleme devam edin
        return data;
      })
      .catch((err) => {
        console.log(err.message);
        setError1(err.message);
      });
  }
  
  

  return (
    <div>
      <form>
        <title>Ödeme Oluşturma</title>
        <h3>Ödeme Olusturma</h3>

        <input
          type="text"
          value={paymentNameInput}
          onChange={(e) => setPaymentNameInput(e.target.value)}
          required
          placeholder="Ödeme Başlığı"
        />

        <input
          type="text"
          value={paymentAmountInput}
          onChange={(e) => setPaymentAmountInput(e.target.value)}
          required
          placeholder="Ödenecek Tutar"
        />

        <input
          type="date"
          value={paymentDateInput}
          onChange={(e) => setPaymentDateInput(e.target.value)}
          required
          placeholder="Ödeme Tarihi"
        />
        <button
          onClick={() =>
            handleCreatePayment(
              paymentNameInput,
              paymentAmountInput,
              paymentDateInput
            )
          }
        >
          Ödeme oluştur
        </button>
       
      </form>
      {upcomingPaymentData.length > 0 ? (
        <table className="tablo" border="1">
          <thead>
            <tr className="tableROW">
              <th className="th">Ödeme Adı</th>
              <th className="th">Ödeme Miktarı</th>
              <th className="th">Ödeme Tarihi</th>
              <th className="th">Kontrol</th>
            </tr>
          </thead>
          <tbody>
            {upcomingPaymentData.map((obj) => (
              <tr className="tableROW" key={obj.id}>
                <td className="td">{obj.paymentName}</td>
                <td className="td">{obj.paymentAmount}</td>
                <td className="td">{obj.paymentDate}</td>
                <td>
                  <button
                    className="tdbtn"
                    onClick={() => handlePayButtonClick(obj.id)}
                  >
                    Ödendi Yap
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="hata"> Gösterilecek veri yok</div>
      )}
    </div>
  );
}
