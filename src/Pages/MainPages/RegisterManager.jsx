import { LogoLogin } from "../../components/LogoLogin";
import { GirisYap } from "../../components/GirisYap";

import { NavLink } from "react-router-dom";

export function RegisterManager() {
  return (
    <>
      <header>
        <nav>
          <LogoLogin />
          <GirisYap />
        </nav>
      </header>
      <main>
        <div>
          <form>
            <h2>Yetkili Kayit</h2>

            <input
              type="text"
              name="username"
              id="username"
              placeholder="Kullanici Adi"
            />

            <input type="email" name="email" id="email" placeholder="Email" />

            <input
              type="password"
              name="password"
              id="password"
              placeholder="Sifre"
            />

            <input
              type="text"
              name="taxNo"
              id="taxNo"
              placeholder="Vergi No"
            />

            <input
              type="text"
              name="companyName"
              id="companyName"
              placeholder="Firma Adi"
            />
            <section>
              <NavLink to="/registerVisitor">
                <p>Ziyaretci kayit</p>
              </NavLink>
            </section>
            <button type="submit">Kayit Ol</button>
          </form>
        </div>
      </main>
      <footer>
        <img src="../../../public/images/Footer_upscaled.png" alt="" />
      </footer>
    </>
  );
}
