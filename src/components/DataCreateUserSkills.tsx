import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import TypeService from '../services/TypeServices';
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


const DataCreateSkill = () => {

    const navigate = useNavigate();
    const params = useParams();
    const typeId = params.id;

    const initialSkillDataState = {
        id: null,
        typeName: "",
        TypeCategory: "",
        typeSlug: "",
        typeStatus: "",
      };

    const [skillName, setSkillName] = useState('');
    const [skillSlug, setSkillSlug] = useState('');
    const [skillDescription, setSkillDescription] = useState('');    
    const [skillStatus, setSkillStatus] = useState(true);


    const getTypeData = typeId => {
        
        SkillService.get(typeId)
        .then(  response => {            
              
            setSkillName(response.data.courseName)
            setSkillSlug(response.data.courseName)
            setSkillDescription(response.data.courseName)
            setSkillStatus(response.data.courseName)
            
        })

        

    }

    useEffect(() => {
        
        // if (courseId) {
        //     getCourseData(courseId);            
        // }
        
      }, [typeId]);

    const handleSkillStatus = (e) => {        
        setSkillStatus( e.value )
    } 

    const handleCreateSkillData = async (e) => {

        e.preventDefault();        

        try {            

            const typeCreateData = JSON.stringify({
                skillName,                
                skillDescription                
            })

            SkillService.create(typeCreateData)
                .then( (response) => {
                    if(response.status == 200 || response.status==201){
                        toast.success("Enregistrement bien appliqué")
                        navigate('/userskills')
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
                                <input
                                    type="text"
                                    id="course-name"
                                    onChange={(e) => { setSkillName(e.target.value); setSkillSlug( slugify(e.target.value.toLowerCase()) ) } }
                                    value={skillName}
                                    placeholder="Nom / Libellé"
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
                                    onChange={(e) => setSkillSlug(e.target.value) }
                                    value={skillSlug}
                                    placeholder="Slug"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Status
                                </label>
                                <Select                                    
                                    options={skillStatusList} 
                                    onChange={handleSkillStatus}
                                    value = {
                                        skillStatusList.filter(option => 
                                           option.value === skillStatus )
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
                            <ReactQuill theme="snow" value={skillDescription} onChange={setSkillDescription} />                            
                        </div>
                    </div>
                    
                </div>

            </div>
        </form>
        </>

    )

}

export default DataCreateSkill