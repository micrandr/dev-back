import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TypeService from '../services/TypeServices';
import Select from "react-select";
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

const levelStatusList =  [ 
    { value: "none", label: "Selectionner" }, 
    { value: "1", label: "Activé" }, 
    { value: "0", label: "Desactivé" }
]


const DataViewType = () => {
    
    const navigate = useNavigate();
    const params = useParams();
    const typeId = params.id;

    const [typeName, setTypeName] = useState('');
    const [typeSlug, setTypeSlug] = useState('');
    const [typeDescription, setTypeDescription] = useState('');    
    const [typeStatus, setTypeStatus] = useState('');


    const getTypeData = typeId => {
        
        TypeService.get(typeId)
        .then(  response => {                  
            setTypeName(response.data.typeName)
            setTypeSlug(response.data.typeSlug)
            setTypeDescription(response.data.typeDescription)
            setTypeStatus(response.data.typeStatus)            
        })

        

    }

    useEffect(() => {        

        getTypeData(typeId)
        
      }, [typeId]);


    const handleViewTypeData = async (e) => {

        e.preventDefault();        

    }

    const handleLinkEdit = (e) => {
        const urlEdit = '/types/edit/' + typeId
        navigate(urlEdit)
    }

    const handleLinkCreate = (e) => {
        const urlCreate = '/types/create/'
        navigate(urlCreate)
    }    

    return (

        <>
        <form action="#" onSubmit={handleViewTypeData}>
            <div className="flex justify-between mb-3">
                <div className="flex"></div>
                <div className="flex">
                <ButtonGroup
                        disableElevation
                        variant="contained"
                        aria-label="Disabled elevation buttons"
                    >
                        <Button onClick={handleLinkEdit}>Editer</Button>
                        <Button onClick={handleLinkCreate}>Nouveau</Button>
                    </ButtonGroup>
                </div>
            </div>
            
            <div className="grid grid-cols-2 bg-white p-5">

                <div className="flex flex-col gap-9 mr-4 h-full">

                    <div className="rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Informations sur le niveau
                            </h3>
                        </div>
                        
                        <div className="p-6.5">
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Libellé
                                </label>
                                {typeName}
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Slug
                                </label>
                                {typeSlug}
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Status
                                </label>
                                {typeStatus=="1"?"Oui":"Non"}
                            </div>
                               
                        </div>
                    </div>  
                    
                </div>

                <div className="flex flex-col h-full">
                    <div className="rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Description du niveau programme de formation
                            </h3>
                        </div>
                        <div className="p-6.5">                           
                        {typeDescription}
                        </div>
                    </div>
                    
                </div>

            </div>
        </form>
        </>

    )

}

export default DataViewType