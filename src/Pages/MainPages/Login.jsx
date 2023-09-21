import { LogoLogin } from "../../components/LogoLogin";
import { KayitOlButton } from "../../components/KayitOlButton";

import { NavLink } from "react-router-dom";

export function Login() {
  return (
    <>
      <header>
        <nav>
        <LogoLogin />
        <KayitOlButton />
        </nav>
      </header>
      <main>
        <div>
        <form>
          <h2>Giris Yap</h2>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
          />

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Sifre"
          />
          <section>
          <NavLink to="manager"><p>Yonetici girisi </p></NavLink>
          <NavLink to="resetPw"><p>Sifremi unuttum</p></NavLink>
          </section>
          <button type="submit">Giris yap</button>
        </form>
        </div>
      </main>
      <footer>
        <img src="../../../public/images/Footer_upscaled.png" alt="" />
      </footer>
    </>
  );
}
