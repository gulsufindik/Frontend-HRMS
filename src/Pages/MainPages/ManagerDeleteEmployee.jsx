import { useEffect, useState } from "react";
import { LogoLogin } from "../../components/LogoLogin";
import { ManagerControlButtonlari } from "../../components/ManagerControlButtonlari";
import { Logout } from "../../components/LogoutButton";
import { SwitchButtonToEmployee } from "../../components/SwitchManagerToEmployeeButton";

function ListWorkersMethod() {
    const url = `http://localhost:8080/user/listworkerswithoutmanager?companyName=${localStorage.getItem("companyName")}`;
    const urlCloud = `http://34.123.15.45/user/listworkerswithoutmanager?companyName=${localStorage.getItem("companyName")}`;
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




export function ManagerDeleteEmployee() {
    return (
        <div className="managerPage">
            <header>
                <nav >
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
                    <h3>Personel Sil</h3>
                    <div className="companentContainer">
                        <Table />
                    </div>
                </div>

            </main>
        </div>
    );
}

function Table() {
    const [personalData, setPersonalData] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        ListWorkersMethod()
            .then((data) => {
                setPersonalData(data);
            })
            .catch((err) => {
                setError(err.message);
                console.log("Hata:", err.message);
            });
    }, []);

    function handlePayButtonClick(authid) {
        const url = `http://localhost:8080/user/deletebyauthid/${authid}`
        const urlCloud = `http://34.123.15.45/user/deletebyauthid/${authid}`
        const isConfirmed = window.confirm("Emin misiniz?")
        if (isConfirmed) {
            // Veritabanından öğeyi silmek için API isteği yap
            fetch(url, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            })
                .then((resp) => {
                    if (!resp.ok) {
                        console.log("Silme işlemi başarısız oldu.");
                    } else {
                        // Başarıyla silinirse, veriyi güncelleyin
                        setPersonalData((prevData) => prevData.filter((obj) => obj.id !== authid));
                    }
                })
                .catch((err) => {
                    console.error("Hata:", err);
                });

            window.alert("Silme başarıyla tamamlandı!");
        } else {
            window.alert("Silme iptal edildi.");
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
                      
                        <th>İsim Soyisim</th>
                        <th>Kullanıcı Adı</th>
                        <th>Personel Maili</th>
                        <th>Şirket Maili</th>
                        <th>Çalısan Tipi</th>
                        <th>Şirket İsmi</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {personalData.map((obj) => (
                        <tr className="tableROW" key={obj.id}>
                           
                            <td className="td">{obj.name} {obj.surname}</td>
                            <td className="td">{obj.username}</td>
                            <td className="td">{obj.personalEmail}</td>
                            <td className="td">{obj.companyEmail}</td>
                            <td className="td">{obj.userType}</td>
                            <td className="td">{obj.companyName}</td>
                            <button className="tdbtn" onClick={() => handlePayButtonClick(obj.authid)}>
                                Personeli Sil
                            </button>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


