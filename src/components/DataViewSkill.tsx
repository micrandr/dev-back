import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import Select from "react-select";
import slugify from "slugify";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import SkillService from "../services/SkillServices";

const skillStatusList =  [ 
    { value: "none", label: "Selectionner" }, 
    { value: 1, label: "Activé" }, 
    { value: 0, label: "Desactivé" }
]


const DataViewSkill = () => {

    const navigate = useNavigate();
    const params = useParams();
    const typeId = params.id;

    const [skillName, setSkillName] = useState('');
    const [skillSlug, setSkillSlug] = useState('');
    const [skillDescription, setSkillDescription] = useState('');    
    const [skillStatus, setSkillStatus] = useState(true);


    const getSkillData = typeId => {
        
        SkillService.get(typeId)
        .then(  response => {            
              
            setSkillName(response.data.courseName)
            setSkillSlug(response.data.courseName)
            setSkillDescription(response.data.courseName)
            setSkillStatus(response.data.courseName)
            
        })

        

    }

    useEffect(() => {
        
        getSkillData(typeId)
        
      }, [typeId]);

    const handleSkillStatus = (e) => {        
        setSkillStatus( e.value )
    } 

    const handleCreateSkillData = async (e) => {

    }

    return (

        <>
        <form action="#" onSubmit={handleCreateSkillData}>
            <div className="flex justify-between mb-3">
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
                                Informations sur cette compétence
                            </h3>
                        </div>
                        
                        <div className="p-6.5">
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Libellé de la compétence
                                </label>
                                {skillName}
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Slug
                                </label>
                                {skillSlug}
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Status
                                </label>
                                {skillStatus}
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
                        {skillDescription}
                        </div>
                    </div>
                    
                </div>

            </div>
        </form>
        </>

    )

}

export default DataViewSkill