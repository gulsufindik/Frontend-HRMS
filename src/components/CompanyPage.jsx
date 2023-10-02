import { useParams } from 'react-router-dom';

export function CompanyPage(){
    const { companyId } = useParams();
    return(
        <>
        <h1>Şirket sayfası</h1>
        <p>Şirket ID: {companyId}</p>
        </>
    )

}