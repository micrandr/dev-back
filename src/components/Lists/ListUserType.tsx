import { useState, useEffect } from "react"
// import { useParams, useNavigate } from "react-router-dom";
import Select from 'react-select'
import TypeService from "../../services/TypeServices";


const ListUserType = (params) => {

    const [typesData, setTypesData] = useState<any[]>([]);
    const [companyType, setCompanyType] = useState('');

    useEffect(() => { 
        getAllCompanyTypes()      
        console.log(listTypeFromDB)        
        // setCompanyType(params.currentType)
    }, []);


    const getAllCompanyTypes = () => {
        TypeService.getAll()
            .then( response=>{                            
                setTypesData(response.data['hydra:member'])
            })
    }

    const listTypeFromDB = typesData.map(item => {
        const container = {
            value: null,
            label: null
        };
    
        container.value = item.id;
        container.label = item.typeName;
    
        return container;
    })

 
    const handleChangeCompanyType = (e) => {
       setCompanyType(e.value)
    }

    return (
        <> 
            <Select 
                options={listTypeFromDB}                             
                onChange={params.onChange}                  
                value={
                        listTypeFromDB.filter( option =>                   
                        option.label == params.currentType                     
                )}             
            /> 
        </>
    )
}

export default ListUserType