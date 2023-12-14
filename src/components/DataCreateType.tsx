import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import TypeService from '../services/TypeServices';
import Select from "react-select";
import slugify from "slugify";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const typeStatusList =  [ 
    { value: "none", label: "Selectionner" }, 
    { value: "1", label: "Activé" }, 
    { value: "0", label: "Desactivé" }
]


const DataCreateType = () => {

    const navigate = useNavigate();
    const params = useParams();
    const typeId = params.id;

    const initialTypeDataState = {
        id: null,
        typeName: "",
        TypeCategory: "",
        typeSlug: "",
        typeStatus: "",
      };

    const [typeName, setTypeName] = useState('');
    const [typeSlug, setTypeSlug] = useState('');
    const [typeDescription, setTypeDescription] = useState('');    
    const [typeStatus, setTypeStatus] = useState('');


    const getTypeData = typeId => {
        
        TypeService.get(typeId)
        .then(  response => {            
              
            setTypeName(response.data.courseName)
            setTypeSlug(response.data.courseName)
            setTypeDescription(response.data.courseName)
            setTypeStatus(response.data.courseName)
            
        })

        

    }

    useEffect(() => {
        
        // if (courseId) {
        //     getCourseData(courseId);            
        // }
        
      }, [typeId]);

    const handleTypeStatus = (e) => {        
        setTypeStatus( e.value )
    } 

    const handleCreateTypeData = async (e) => {

        e.preventDefault();        

        try {            

            const typeCreateData = JSON.stringify({
                typeName,
                typeSlug,
                typeDescription,
                typeStatus
            })

            TypeService.create(typeCreateData)
                .then( (response) => {
                    if(response.status == 200 || response.status==201){
                        toast.success("Enregistrement bien appliqué")
                        navigate('/types')
                    }
                    
                })
                .then( (error) => {
                    // toast.error(error)
                })
            
        }
        catch(err){ 

            console.log(err)
        }

        

    }

    return (

        <>
        <form action="#" onSubmit={handleCreateTypeData}>
            <div className="flex justify-between">
                <div className="flex"></div>
                <div className="flex">
                    <button className="flex w-100 mr-2 mb-2 justify-center rounded bg-primary p-3 font-medium text-gray">Enregistrer</button>
                </div>
            </div>
            
            <div className="grid grid-cols-2 bg-white p-5">

                <div className="flex flex-col gap-9 mr-4 h-full">

                    <div className="rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Informations sur le type d'entreprise
                            </h3>
                        </div>
                        
                        <div className="p-6.5">
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Libellé
                                </label>
                                <input
                                    type="text"
                                    id="course-name"
                                    onChange={(e) => { setTypeName(e.target.value); setTypeSlug( slugify(e.target.value.toLowerCase()) ) } }
                                    value={typeName}
                                    placeholder="Nom / Libellé du niveau"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Slug
                                </label>
                                <input
                                    type="text"
                                    id="course-slug"
                                    onChange={(e) => setTypeSlug(e.target.value) }
                                    value={typeSlug}
                                    placeholder="Slug"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Status
                                </label>
                                <Select                                    
                                    options={typeStatusList} 
                                    onChange={handleTypeStatus}
                                    value = {
                                        typeStatusList.filter(option => 
                                           option.value === typeStatus )
                                     }                                    
                                />
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
                            <ReactQuill theme="snow" value={typeDescription} onChange={setTypeDescription} />                            
                        </div>
                    </div>
                    
                </div>

            </div>
        </form>
        </>

    )

}

export default DataCreateType