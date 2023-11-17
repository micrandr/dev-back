import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from 'react-select'
import TimezoneSelect from 'react-timezone-select'
import { toast } from "react-hot-toast";
import SwitcherTypeSession from "./SwitcherSessionType";
import SessionService from "../services/SessionServices";
import UserService from "../services/UserServices";
import CourseModule from "../services/CourseModules";
import SessionModule from "./SessionModule";
import SessionParts from "./SessionParts";
import Switch from '@mui/material/Switch';

const sessionStatuses = [
    { value: 1, label: 'Nouveau' },
    { value: 2, label: 'En cours' },
    { value: 3, label: 'En attente' },  
    { value: 4, label: 'Terminée' },
    { value: 5, label: 'Annulée' }
]

const DataCreateSession = () => {   
    const navigate = useNavigate()

    const [users, setUsers] = useState<any[]>([]);

    // const [checkedIntra, setCheckedIntra] = useState(true);
    const [sessionModuleCount, setSessionModuleCount] = useState<Number>(0)

    const [sessionName, setSessionName] = useState('')
    const [sessionLocation, setSessionLocation] = useState('')
    const [sessionManager, setSessionManager] = useState('')
    const [sessionManager2, setSessionManager2] = useState('')
    const [sessionIntra, setSessionIntra] = useState('')
    const [sessionType, setSessionType] = useState('')
    const [sessionStatus, setSessionStatus] = useState('')
    const [sessionTimezone, setSessionTimezone] = useState('')    
    const [sessionModuleName, setSessionModuleName] = useState('');
    const [sessionModulePrice, setSessionModulePrice] = useState('');
    const [sessionModulePriceClient, setSessionModulePriceClient] = useState('');
    const [sessionModuleStartDate, setSessionModuleStartDate] = useState('');
    const [sessionModuleEndDate, setSessionModuleEndDate] = useState('');
    const [sessionModuleHour, setSessionModuleHour] = useState('');
    const [sessionModuleName2, setSessionModuleName2] = useState('');
    const [sessionModulePrice2, setSessionModulePrice2] = useState('');
    const [sessionModulePriceClient2, setSessionModulePriceClient2] = useState('');
    const [sessionModuleStartDate2, setSessionModuleStartDate2] = useState('');
    const [sessionModuleEndDate2, setSessionModuleEndDate2] = useState('');
    const [sessionModuleHour2, setSessionModuleHour2] = useState('');
    const [sessionModuleName3, setSessionModuleName3] = useState('');
    const [sessionModulePrice3, setSessionModulePrice3] = useState('');
    const [sessionModulePriceClient3, setSessionModulePriceClient3] = useState('');
    const [sessionModuleStartDate3, setSessionModuleStartDate3] = useState('');
    const [sessionModuleEndDate3, setSessionModuleEndDate3] = useState('');
    const [sessionModuleHour3, setSessionModuleHour3] = useState('');
    const [sessionModuleName4, setSessionModuleName4] = useState('');
    const [sessionModulePrice4, setSessionModulePrice4] = useState('');
    const [sessionModulePriceClient4, setSessionModulePriceClient4] = useState('');
    const [sessionModuleStartDate4, setSessionModuleStartDate4] = useState('');
    const [sessionModuleEndDate4, setSessionModuleEndDate4] = useState('');
    const [sessionModuleHour4, setSessionModuleHour4] = useState('');   

    // Modules
    const [moduleTitle, setModuleTitle] = useState('');
    const [courseModulePrice, setCourseModulePrice] = useState('');
    const [courseModuleType, setCourseModuleType] = useState('');


    const initialDataUserOptions = [
        {value: 0, label: null}
      ];

    const sessionStatuses = [
        { value: "1", label: 'Nouveau' },
        { value: "2", label: 'En cours' },
        { value: "3", label: 'En attente' },  
        { value: "4", label: 'Terminée' },
        { value: "5", label: 'Annulée' }
    ]
    
    
    const [userOptions, setUserOptions] = useState(initialDataUserOptions);

    const retrieveUsers = () => {
        UserService.getAll()
          .then(response => {
            setUsers(response.data['hydra:member']);            
          })
          .catch(e => {
            console.log(e);
          });
      };

    const usersByValues = users.map(item => {
        const container = {
            value: null,
            label: null
        };
    
        container.value = item.id;
        container.label = item.userFirstName;
    
        return container;
    })

    useEffect(() => {
       
        // retrieveUsers();
        
        // users.map( (value, index) => {
        //     setUserOptions( current => [ ...current, {value: value.id, label: value.userName}])
        // })
        
      });

    

    const handleCreateSessionData = async (e) => {

        e.preventDefault()

        const sessionData = JSON.stringify({
            sessionName,
            sessionLocation,
            sessionManager,
            sessionManager2,
            sessionTimezone,
            sessionType,
            sessionIntra,
            sessionModuleName,
            sessionModulePrice,
            sessionModulePriceClient,
            sessionModuleStartDate,
            sessionModuleEndDate,
            sessionModuleHour,
            sessionModuleName2,
            sessionModulePrice2,
            sessionModulePriceClient2,
            sessionModuleStartDate2,
            sessionModuleEndDate2,
            sessionModuleHour2,
            sessionModuleName3,
            sessionModulePrice3,
            sessionModulePriceClient3,
            sessionModuleStartDate3,
            sessionModuleEndDate3,
            sessionModuleHour3,
            sessionModuleName4,
            sessionModulePrice4,
            sessionModulePriceClient4,
            sessionModuleStartDate4,
            sessionModuleEndDate4,
            sessionModuleHour4,
            sessionStatus

        })


        let moduleCount = document.querySelectorAll('.bloc-module');        
        setSessionModuleCount( moduleCount.length )

        
        SessionService.create(sessionData)
        .then( response => {
            // toast.error("Problème lors de la création. Contactez l'administrateur.");
            if (response.status == 201) {
                let sessionCreatedId = response.data.id
                for(let i = 1; i<=moduleCount.length; i++) {
                    
                    addCourseModuleToSession( sessionCreatedId, i )
                }
                
                toast.success("Session bien créée")
                // navigate( '/sessions')
            }
        })
        .then( (error) => {
            console.log(error)
            //toast.error( "Une erreur a été rencontré lors de l'enregistrement" )
        })
    }

    const userDataList = ( item ) => {        
        return [{"value": item.id, "label": item.userFirstName}]
    }

    const [selectedTimezone, setSelectedTimezone] =useState(
        Intl.DateTimeFormat().resolvedOptions().timeZone
    )

    const handleChangeSessionStatus = (e) => {
        setSessionStatus(e.value)
    }

    const handleChangeIntra = (e) => {
        let valueIntra = ""
        if(!e.target.checked) {
            valueIntra = "1"
        }else{
            valueIntra = "0"
        }
        setSessionIntra(valueIntra)     
    }

    const addCourseModuleToSession = ( sessionId, index ) => {

        let valueModuleTitle = document.getElementById("session-module-name" + index)
        let valueCourseModulePrice = document.getElementById("session-module-price" + index)
        let valueCourseModuleType = document.getElementById("session-type"+index)        
        
        setModuleTitle(valueModuleTitle.value)
        setCourseModulePrice(valueCourseModulePrice.value)
        setCourseModuleType(valueCourseModuleType.value)

        const sessionModuleData = JSON.stringify({
            moduleTitle,
            courseModulePrice,
            courseModuleType,
            sessionId
        })

        CourseModule.create( sessionModuleData )
        .then( (response)=>{
            // console.log("module bien inséree " + moduleTitle + sessionId)
        })

    }

    return (

        <>
        <form action="#" onSubmit={handleCreateSessionData}>
            <div className="flex justify-between">                
                <div className="flex p-2">
                    <input
                    type="text"
                    name="session-name"
                    onChange={ (e) => setSessionName(e.target.value)}
                    value={sessionName}
                    placeholder="Nom de session de formation"
                    className="w-100 rounded border-[1.5px] border-stroke bg-transparent py-2 px-2 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                </div>
                <Select 
                    options={sessionStatuses} 
                    placeholder="Status" 
                    className="p-2" 
                    value = {
                        sessionStatuses.filter(option => 
                           option.value === sessionStatus )
                     }
                    onChange={handleChangeSessionStatus}
                /> 
                <div className="flex">
                    <button className="flex w-100 mr-2 mb-2 justify-center rounded bg-primary p-3 font-medium text-gray">Enregistrer</button>
                </div>
            </div>
            
            <div className="flex">
                <div className="flex flex-col grow">

                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Informations de session
                            </h3>
                        </div>
                        <div className="flex">
                            <div className="flex w-1/2 hidden">
                                <div className="p-6.5">
                                    <label className="mb-2.5 block text-black dark:text-white">Gestionnaire 1</label>
                                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                                    <Select 
                                            options={usersByValues}             
                                        />                                       
                                    </div>
                                </div>
                                <div className="p-6.5">
                                    <label className="mb-2.5 block text-black dark:text-white">Gestionnaire 2</label>
                                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                                    <Select 
                                            options={usersByValues}             
                                        />                                        
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-1/2 p-6.5">
                                <div className="mb-4.5">      
                                    <label className="mb-2.5 block text-black dark:text-white">INTRA OU INTER-Entreprise</label>                              
                                    <Switch
                                        checked={sessionIntra}
                                        onChange={handleChangeIntra}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
   
            </div>

            <div className="flex"> 
                <div className="flex flex-col grow">

                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Liste des modules
                            </h3>
                        </div>

                        <SessionModule />

                    </div>
                  
                </div>

            </div>

            <div className="flex">
                <div className="flex flex-col flex-grow">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Participants
                            </h3>
                        </div>
                        <SessionParts />
                    </div>
                </div>
            </div>

            <div className="flex">
                <div className="flex flex-col flex-grow">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Status de la session
                            </h3>
                        </div>
                        <div className="p-6.5 w-1/4">
                            <Select options={sessionStatuses} />
                        </div>
                    </div>
                </div>
            </div>            
        </form>
        </>

    )

}

export default DataCreateSession