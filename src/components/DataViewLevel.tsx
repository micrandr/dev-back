import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LevelService from '../services/LevelServices';
import Select from "react-select";
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

const levelStatusList =  [ 
    { value: "none", label: "Selectionner" }, 
    { value: "1", label: "Activé" }, 
    { value: "0", label: "Desactivé" }
]


const DataViewLevel = () => {
    
    const navigate = useNavigate();
    const params = useParams();
    const levelId = params.id;

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


    const getLevelData = levelId => {
        
        LevelService.get(levelId)
        .then(  response => {            
            setLevelData(response.data);       
            setCurrentLevel(response.data);            
            setLevelName(response.data.levelName)
            setLevelSlug(response.data.levelSlug)
            setLevelDescription(response.data.levelDescription)
            setLevelStatus(response.data.levelStatus)            
        })

        

    }

    useEffect(() => {
        

        getLevelData(levelId)
        // if (courseId) {
        //     getCourseData(courseId);            
        // }
        
      }, [levelId]);

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
        }
        catch(err){ 

            console.log(err)
        }

        

    }

    const handleLinkEdit = (e) => {
        const urlEdit = '/levels/edit/' + levelId
        navigate(urlEdit)
    }

    return (

        <>
        <form action="#" onSubmit={handleCreateLevelData}>
            <div className="flex justify-between mb-3">
                <div className="flex"></div>
                <div className="flex">
                <ButtonGroup
                        disableElevation
                        variant="contained"
                        aria-label="Disabled elevation buttons"
                    >
                        <Button onClick={handleLinkEdit}>Editer</Button>
                        <Button type="submit">Enregistrer</Button>
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
                                {levelName}
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Slug
                                </label>
                                {levelSlug}
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Status
                                </label>
                                {levelStatus}
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
                        {levelDescription}
                        </div>
                    </div>
                    
                </div>

            </div>
        </form>
        </>

    )

}

export default DataViewLevel