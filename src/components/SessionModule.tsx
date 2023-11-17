import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Select from 'react-select'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CourseModule from "../services/CourseModules";
import CourseService from "../services/CourseServices";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SubjectIcon from '@mui/icons-material/Subject';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CopyAll from '@mui/icons-material/CopyAll';


const moduleTypeList =  [ 
    { value: "presentiel", label: "Présentiel" }, 
    { value: "distanciel", label: "A distance / Visio / FOAD" },
    { value: "e-learning", label: "E-learning" },
    { value: "blended-learning", label: "Blended Learning" }
];

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { label: 'Room 001', year: 1994 },
    { label: 'Room Aquarium', year: 1972 },
    { label: 'Bureau Gilles', year: 1974 },
]

const moduleListData = [
    { label: 'Formation en BTP dpa', year: 1994 },
    { label: 'Formation Office 365 taratata	', year: 1972 },
    { label: 'La Dématérialisation des Marchés Publics MAPA', year: 1974 },
    { label: 'Atelier - mémoire technique spécial BTP', year: 1974 },
    { label: 'Variations de prix dans les marchés publics', year: 1974 },
    { label: 'Compte PRORATA', year: 1974 },
    { label: 'Formation en comptabilité analytique', year: 1974 },
   
]



export const BlocModule = ({ module, index, removeModule, countModule }) => {

    index = index + 1
    
    const [moduleTitle, setModuleTitle] = useState('')
    const [modulePrice, setModulePrice] = useState('')
    const [moduleName, setModuleName] = useState('')
    const [sessionModulePrice1, setSessionModulePrice1] = useState('')
    const [sessionModuleStartDate1, setSessionModuleStartDate1] = useState('')

    const [sessionModuleTypeText1, setSessionModuleTypeText1] = useState('')
    const [sessionModuleTypeText2, setSessionModuleTypeText2] = useState('')
    const [sessionModuleTypeText3, setSessionModuleTypeText3] = useState('')
    const [sessionModuleTypeText4, setSessionModuleTypeText4] = useState('')
    const [sessionModuleTypeLabel1, setSessionModuleTypeLabel1] = useState('')
    const [sessionModuleTypeLabel2, setSessionModuleTypeLabel2] = useState('')
    const [sessionModuleTypeLabel3, setSessionModuleTypeLabel3] = useState('')
    const [sessionModuleTypeLabel4, setSessionModuleTypeLabel4] = useState('')
    const [sessionModuleTypeColor1, setSessionModuleTypeColor1] = useState('')
    const [sessionModuleTypeColor2, setSessionModuleTypeColor2] = useState('')
    const [sessionModuleTypeColor3, setSessionModuleTypeColor3] = useState('')
    const [sessionModuleTypeColor4, setSessionModuleTypeColor4] = useState('')

    // console.log("sessionModulePrice1=")
    // console.log(sessionModulePrice1)

    let fieldModuleTitleName = 'session-module-name'
    let fieldModulePrice = 'session-module-price'
    let fieldModulePriceClient = 'session-module-price-client'
    let fieldModuleStartDate = 'session-module-start-date'
    let fieldModuleEndDate = 'session-module-end-date'
    let fieldModuleHour = 'session-module-hour'
    let fieldModuleType = 'session-type'
    fieldModuleTitleName += index
    fieldModulePrice += index
    fieldModulePriceClient += index
    fieldModuleStartDate+=index
    fieldModuleEndDate+=index
    fieldModuleHour+=index
    fieldModuleType+=index

    const handleChangeModuleName = (e) => {

        setModuleName(e.value)

    }

    const handleChangeSessionType  = (event, value) => {
        let bgColor = ''
        setSessionModuleTypeText1(value.value)
        setSessionModuleTypeLabel1(value.label)
        if ( sessionModuleTypeText1 == 'presentiel' ) {
            bgColor = 'bg-black'
        }else if( sessionModuleTypeText1 == 'distanciel' ){
            bgColor = 'bg-secondary'
        }else if( sessionModuleTypeText1 == 'blended-learning' ){
            bgColor = 'bg-success'
        }else if( sessionModuleTypeText1 == 'e-learning' ){
            bgColor = 'bg-danger'
        }
        setSessionModuleTypeColor1(bgColor)
        console.log("bgColor=" + sessionModuleTypeText1)
        console.log(bgColor)
    }

    const retrieveCourseModule = () => {
        CourseService.getAll()
        .then( (response ) => {
            console.log( response.data['hydra:member'] )
        })
    }

    const handleChangeModulePrice = (e) => {
        countModule(e.target.value); 
        setModulePrice(e.value)
    }    

    const handleChangeModuleListPicker = (event, data) => {        
        console.log(data.label)
    }

    return (
        
        <div className="p-6.5 bloc-module">
        <div className="relative bg-slate">

            {/* <input type="text" 
                id={fieldModuleTitleName}
                name={fieldModuleTitleName}
                onChange={handleChangeModuleName}
                value={moduleName}
                className="w-150 m-2 p-2"
                placeholder="Nom du module"
                required
             /> */}
            
            <Autocomplete
                disablePortal
                id={fieldModuleTitleName}
                name={fieldModuleTitleName}
                options={moduleListData}
                onChange={handleChangeModuleListPicker}
                sx={{ width: 480 }}
                className="mb-2"
                renderInput={(params) => <TextField {...params} label="Nom du module" /> }
            />

                <Box className="float-right -mt-15 mr-10">
                    {/* <Fab size="small" color="primary" aria-label="add">
                        <AddIcon />
                    </Fab> */}
                    <Fab size="small" color="primary" aria-label="add">
                        <CopyAll />
                    </Fab>
                </Box> 
                
            <button className="flex float-right relative -mt-15" onClick={(e) => { removeModule(index) } }>x</button>
        </div>
        <div className="flex w-full border-dotted border-2 p-2">
            <div className={`flex-none w-8 rotate-180 translate-y bg-black ${sessionModuleTypeColor1} px-1 text-white text-center`} 
                style={{ writingMode: 'vertical-rl' }}>
                    presentiel
            </div>
             
            <div className="flex-initial w-full p-3">      
                                            
                <div className="mb-4.5 flex flex-col gap-3 xl:flex-row">
                    <div className="w-full xl:w-1/6">
                        <label className="mb-2.5 block text-black dark:text-white">Prix</label>
                        <input 
                            type="text" 
                            id={fieldModulePrice}
                            name={fieldModulePrice}
                            onChange={handleChangeModulePrice}  
                            value={modulePrice}                          
                            placeholder="Prix"                             
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" 
                        />
                    </div>
                   
                    <div className="w-full xl:w-1/6">
                        <label className="mb-2.5 block text-black dark:text-white">Date début</label>
                        <input 
                            type="date" 
                            name={fieldModuleStartDate}                                                        
                            placeholder="Date debut" 
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" 
                        />
                    </div>
                    <div className="w-full xl:w-1/6">
                        <label className="mb-2.5 block text-black dark:text-white">Date fin</label>
                        <input 
                            type="date" 
                            name={fieldModuleStartDate} 
                            placeholder="Date fin"                             
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" 
                        />
                    </div>    
                    <div className="w-full xl:w-1/6">
                        <label className="mb-2.5 block text-black dark:text-white">Nb heure</label>
                        <input 
                            type="text"
                            id={fieldModuleHour}
                            name={fieldModuleHour}
                            onChange={(e) => countModule(e.target.value)}
                            placeholder="Heures" 
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" 
                        />
                    </div>            
                    <div className="w-full xl:w-2/6">
                        <label className="mb-2.5 block text-black dark:text-white">Horaire Matin</label>
                        <div className="relative z-20 bg-transparent dark:bg-form-input">
                            <input 
                                type="text" 
                                name={fieldModuleStartDate}                                                        
                                placeholder="08:00 à 12:00" 
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" 
                            />
                        </div>                                            
                    </div> 
                    <div className="w-full xl:w-2/6">
                        <label className="mb-2.5 block text-black dark:text-white">Horaire Après-midi</label>
                        <div className="relative z-20 bg-transparent dark:bg-form-input">
                            <input 
                                type="text" 
                                name={fieldModuleStartDate}                                                        
                                placeholder="12:00 à 18:00" 
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" 
                            />
                        </div>                                            
                    </div>                        
                </div>
                <div className="mb-4.5 flex flex-col gap-3 xl:flex-row">
                    <div className="w-full xl:w-1/4">
                        {/* <label className="mb-2.5 block text-black dark:text-white">Type du module</label>
                        <Select options={moduleTypeList} /> */}
                        <Autocomplete
                            disablePortal
                            id={fieldModuleType}
                            options={moduleTypeList}          
                            onChange={ handleChangeSessionType }                                           
                            renderInput={(params) => 
                                <TextField {...params} label="Type" />
                            }
                        />
                    </div>
                    <div className="w-full xl:w-1/4 hidden">
                        
                        {/* <label className="mb-2.5 block text-black dark:text-white">Lieu</label> 
                            <input 
                            type="text" 
                            id={fieldModulePrice}
                            name={fieldModulePrice}
                            onChange={(e) => countModule(e.target.value)}
                            placeholder="Lieu de formation"                             
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" 
                        /> */}
                        <TextField id="lieu-formation" label="Lieu de formation" variant="outlined" />
                    </div>
                    <div className="w-full xl:w-1/4">
                        {/* <label className="mb-2.5 block text-black dark:text-white">Salle de formation</label> */}
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={top100Films}                            
                            renderInput={(params) => 
                                <TextField {...params} label="Salle" />
                            }
                        />
                    </div>
                    <div className="w-full xl:w-1/4">
                        <TextField label="Place Min." />
                    </div>
                    <div className="w-full xl:w-1/4">
                        <TextField label="Place Max." />
                    </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-3 xl:flex-row">
                    <div className="w-full">
                        <TextField id="session-module-requirements" label="Prerequis" variant="outlined" />                        
                    </div>
                    <Link to="#"><PictureAsPdfIcon className="m-2" sx={{ display: 'inline' }} /></Link>
                </div>
            </div> 
                       
        </div>
    </div> 
    )
}

function CreateModule({ addModule }) {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [modulePrice0, setModulePrice0] = useState()
    const [moduleHour0, setModuleHour0] = useState()
    const [modulePrice1, setModulePrice1] = useState()
    const [moduleHour1, setModuleHour1] = useState()
    const [modulePrice2, setModulePrice2] = useState()
    const [moduleHour2, setModuleHour2] = useState()
    const [modulePrice3, setModulePrice3] = useState()
    const [moduleHour3, setModuleHour3] = useState()

    const handleAddModule = (e) => {
        e.preventDefault();
        addModule(title,price);
       
        // if (!value) return;
        // addModule(value);
        // setValue("");

    }

    


    return (
        
        <div className="inline-block flex ml-5 p-1" onClick={handleAddModule}>
            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"></path>
            </svg>            
        </div>        
            
    );
}

const SessionModule = (session) => {

    const [tasksRemaining, setTasksRemaining] = useState(0);
    const [modules, setModules] = useState([]);
    const [title, setTitle] = useState('')
    const [totalNbHours,setTotalNbHours] = useState('')
    const [totalPrices,setTotalPrices] = useState('')

    // console.log('setSessionModulePrice1***=')
    // console.log(session.sessionId)

    useEffect(() => {
        
        //countModuleBlocs()

      }, []);

    const addModule = (title, price) => {        
        const newModules = [...modules, { title, price }];        
        setModules(newModules);

        // countModuleBlocs()

    };

    const removeModule = (index, e) => {
        e.preventDefault()

        const newModules = [...modules];
        newModules.splice(index, 1);
        setModules(newModules);
        return false
    };


    const countModuleBlocs = () => {
        let i = 0

        let fieldModuleTitleName = 'session-module-name'
        let fieldModulePrice = 'session-module-price'
        let fieldModulePriceClient = 'session-module-price-client'
        let fieldModuleStartDate = 'session-module-start-date'
        let fieldModuleEndDate = 'session-module-end-date'
        let fieldModuleHour = 'session-module-hour'

        let priceElt = 0
        let hourElt = 0

        const bloc_module = document.querySelectorAll('.bloc-module')
        bloc_module.forEach( (obj, index) => {            
            priceElt += parseFloat(document.getElementById(fieldModulePrice + index)?.value)
            hourElt += parseFloat(document.getElementById(fieldModuleHour + index)?.value)
        })

        setTotalNbHours(hourElt)
        setTotalPrices(priceElt)
        
    }




    return (

        <div className="module-container p-4">

            <div className="todo-container">                
                <div className="modules">
                    {modules.map((mod, index) => (                                 
                        <BlocModule 
                            module={mod?.title}
                            index={index}                        
                            key={index}
                            removeModule={removeModule}      
                            countModule={countModuleBlocs}                      
                        />
                    ))}
                </div>
                <div className="create-task" >
                    <CreateModule addModule={addModule} />
                </div>
            </div>


            <div className="p-6.5">
                <p>Total d'heures des modules : {totalNbHours} heure(s) de formation</p>
                <p>Tarif de formation : {totalPrices} € </p>
            </div>

        </div>

    )

}

export default SessionModule