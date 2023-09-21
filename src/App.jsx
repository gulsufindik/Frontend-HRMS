import "./assets/styles/reset.css";
import "./App.css";

import { RegisterVisitor } from "./Pages/MainPages/RegisterVisitor";
import { RegisterManager } from "./Pages/MainPages/RegisterManager";
import { Login} from "./Pages/MainPages/Login"
import { Route,Routes } from "react-router";

function App() {

  return (
   <>
   <Routes>
    <Route path="/" element={<Login />}></Route>
    <Route path="/registerVisitor" element={<RegisterVisitor />}></Route>
    <Route path="/registerManager" element={<RegisterManager />}></Route>
   </Routes>
    
   </>
   
  )
}

export default App
