import { NavLink } from "react-router-dom"
export function SwitchButtonToManager(){

    return (
        <>
        <NavLink to="/manager/managerpersonel" className="navButtons"><button>Manager Sayfasi🔄</button></NavLink>
        </>
    )
}