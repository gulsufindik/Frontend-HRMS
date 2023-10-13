import { LogoLogin } from "./LogoLogin";
import { GirisYap } from "./GirisYap";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function PackageCard({ title, price, duration, selectedPackage, setSelectedPackage }) {
    const isSelected = title === selectedPackage;
    
  
    const handleClick = () => {
       
      if (isSelected) {
        setSelectedPackage(null); // Seçili paketi iptal et
        sessionStorage.removeItem("selectedPack");
      } else {
        setSelectedPackage(title); // Paketi seç
        sessionStorage.setItem("selectedPack", title);
      }
    };

    const cardStyle = {
        backgroundColor: title === "SILVER" ? "silver" : title === "GOLD" ? "gold" : title === "PLATINUM" ? "aqua" : "white",
      };
  
    return (
      <div className={`package-card ${isSelected ? "selected" : ""}`} style={cardStyle}>
        <h2>{title}</h2>
        <p>Price: {price} TL</p>
        <p>Duration: {duration} months</p>
        <button onClick={handleClick}>
          {isSelected ? "Deselect" : "Select"}
        </button>
      </div>
    );
  }
  
  export function PackagePageGeneral() {
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [notification,setNotification]=useState(false)

    const handleSelectClick = () => {
        if (selectedPackage) {
          window.location.href = sessionStorage.getItem("selectedPack") !== null ? "/registerManager" : "/managerpackageselect";
        } else {
          setNotification(true);
        }
      };

    return (
      <>
        <header style={{ backgroundColor: "rgb(239, 230, 232)" }}>
          <nav>
            <LogoLogin />
            <GirisYap />
          </nav>
        </header>
        <main style={{ backgroundColor: "rgb(239, 230, 232)" }}>
            <h1 style={{textAlign:"center"}} >Lutfen Paket Secimi Yapiniz</h1>
            {notification && <h3 style={{textAlign:"center",color:"red"}}>Paket secimi yapmalisiniz!</h3> }
          <div className="cards"  >
            <PackageCard title="SILVER" price={10000} duration={3} selectedPackage={selectedPackage} setSelectedPackage={setSelectedPackage} />
            <PackageCard title="GOLD" price={15000} duration={8} selectedPackage={selectedPackage} setSelectedPackage={setSelectedPackage} />
            <PackageCard title="PLATINUM" price={18000} duration={12} selectedPackage={selectedPackage} setSelectedPackage={setSelectedPackage} />
            <NavLink to={ sessionStorage.getItem("selectedPack") !== null ? "/registerManager" : "/managerpackageselect"}><p onClick={handleSelectClick} className="SelectButton">Onayla</p></NavLink>
          </div>
        </main>
        <footer style={{ backgroundColor: "rgb(239, 230, 232)" }}>
          <img src="../../../public/images/Footer_upscaled.png" alt="" />
        </footer>
      </>
    );
  }