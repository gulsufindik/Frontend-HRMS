import { useEffect, useState } from "react";
import { LogoLogin } from "../../components/LogoLogin";
import { ManagerControlButtonlari } from "../../components/ManagerControlButtonlari";
import { Logout } from "../../components/LogoutButton";
import { SwitchButtonToEmployee } from "../../components/SwitchManagerToEmployeeButton";

function PaymentContactApiMethod() {
  const url = `http://localhost:8080/upcoming/findallwithcompanyname?companyName=${localStorage.getItem("companyName")}`;
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };


  return fetch(url, options)
    .then((resp) => {
      if (!resp.ok) {
        return resp.json().then((error) => {
          throw new Error(error.message); // API'den dönen hata mesajını yakala ve fırlat
        });
      }
      return resp.json();
    })
    .then((data) => {
      console.log("Veri Tipi:", typeof data);
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.error(err.message);
      throw err;
    });
}

         <header>
         <nav >
            <LogoLogin/>
            <SwitchButtonToEmployee />
            <Logout />
          </nav>
        </header>


export function ManagerPageUpcomingPayment() {
  return (
    <div className="managerPage">
      <header>
        <LogoLogin />
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


  useEffect(() => {
    PaymentContactApiMethod()
      .then((data) => {
        setUpcomingPaymentData(data);
      })
      .catch((err) => {
        setError(err.message);
        console.log("Hata:", err.message);
      });
  }, []);

  function handlePayButtonClick(id) {
    const isConfirmed = window.confirm("Ödeme yapıldı mı?")
    if(isConfirmed){
      // Veritabanından öğeyi silmek için API isteği yap
    fetch(`http://localhost:8080/upcoming/deletebyid/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((resp) => {
        if (!resp.ok) {
          console.log("Silme işlemi başarısız oldu.");
        } else {
          // Başarıyla silinirse, veriyi güncelleyin
          setUpcomingPaymentData((prevData) => prevData.filter((obj) => obj.id !== id));
        }
      })
      .catch((err) => {
        console.error("Hata:", err);
      });

      window.alert("Ödeme başarıyla tamamlandı!");
    }else{
      window.alert("Ödeme iptal edildi.");
    }
    
  }

  if (error) {
    return <div className="hata">{error}</div>;
  }

  return (
    <div>
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
              <td className="td">{obj.paymentamount}</td>
              <td className="td">{obj.paymentdate}</td>
              <button className="tdbtn" onClick={() => handlePayButtonClick(obj.id)}>
                Ödendi Yap
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


