import { useState, useEffect } from "react"
// import { useParams, useNavigate } from "react-router-dom";
import Select from 'react-select'
import CompanyService from "../../services/CompanyServices";


const ListUserCompagnies = (params) => {

    const [compagniesData, setCompagniesData] = useState<any[]>([]);
    const [currentCompany, setCurrentCompany] = useState<any[]>([]);

    useEffect(() => { 
        getAllCompangnies()      
        // setCompanyType(params.currentType)        
    }, []);


    const getAllCompangnies = () => {
        CompanyService.getAll()
            .then( response=>{
                // console.log(response.data['hydra:member'])
                setCompagniesData(response.data['hydra:member'])
            })
    }

    const listCompagniesFromDB = compagniesData.map(item => {
        const container = {
            value: null,
            label: null
        };
    
        container.value = item.companyType;
        container.label = item.companyName;
    
        return container;
    })

    const handleCompanyType = (e) => {
        setCurrentCompagny( e.label )
    }

    return (
        <>                
            <Select 
                options={listCompagniesFromDB}                             
                onChange={params.onChange}                  
                value={listCompagniesFromDB.filter( option => option.label == params.currentCompany )}             
            /> 
        </>
    )
}

export default ListUserCompagnies