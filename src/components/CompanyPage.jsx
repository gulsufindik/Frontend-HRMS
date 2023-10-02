

export function CompanyPage(){
   
    return(
        <>
        <h1>Şirket sayfası</h1>
        <p>Şirket ID: {localStorage.getItem("gotoCompanyId")}</p>
        </>
    )

}