import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import LevelService from '../services/LevelServices';
import Select from "react-select";
import slugify from "slugify";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const levelStatusList =  [ 
    { value: "none", label: "Selectionner" }, 
    { value: "1", label: "Activé" }, 
    { value: "0", label: "Desactivé" }
]


const DataCreateLevel = () => {

    const navigate = useNavigate();
    const params = useParams();
    const courseId = params.id;

    const initialCourseDataState = {
        id: null,
        courseName: "",
        courseCategory: "",
        courseDuration: "",
        courseAddress: "",
        courseComment: "",
      };

    const [levelData, setLevelData] = useState(initialCourseDataState);
    const [currentLevel, setCurrentLevel] = useState(initialCourseDataState);    

    const [levelName, setLevelName] = useState('');
    const [levelSlug, setLevelSlug] = useState('');
    const [levelDescription, setLevelDescription] = useState('');    
    const [levelStatus, setLevelStatus] = useState('');


    const getLevelData = courseId => {
        
        LevelService.get(courseId)
        .then(  response => {            
            setLevelData(response.data);       
            setCurrentLevel(response.data);            
            setLevelName(response.data.courseName)
            setLevelSlug(response.data.courseName)
            setLevelDescription(response.data.courseName)
            setLevelStatus(response.data.courseName)
            
        })

        

    }

    useEffect(() => {
        
        // if (courseId) {
        //     getCourseData(courseId);            
        // }
        
      }, [courseId]);

    const handleLevelStatus = (e) => {        
        setLevelStatus( e.value )
    } 

    const handleCreateLevelData = async (e) => {

        e.preventDefault();        

        try {            

            const levelCreateData = JSON.stringify({
                levelName,
                levelSlug,
                levelDescription
            })

            LevelService.create(levelCreateData)
                .then( (response) => {
                    if(response.status == 200 || response.status==201){
                        toast.success("Enregistrement bien appliqué")
                        navigate('/levels')
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
        <form action="#" onSubmit={handleCreateLevelData}>
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
                                Informations sur le niveau
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
                                    onChange={(e) => { setLevelName(e.target.value); setCourseSlug( slugify(e.target.value.toLowerCase()) ) } }
                                    value={levelName}
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
                                    onChange={(e) => setLevelSlug(e.target.value) }
                                    value={levelSlug}
                                    placeholder="Slug"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Status
                                </label>
                                <Select                                    
                                    options={levelStatusList} 
                                    onChange={handleLevelStatus}
                                    value = {
                                        levelStatusList.filter(option => 
                                           option.value === levelStatus )
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
                            <ReactQuill theme="snow" value={levelDescription} onChange={setLevelDescription} />                            
                        </div>
                    </div>
                    
                </div>

            </div>
        </form>
        </>

    )

}

export default DataCreateLevel