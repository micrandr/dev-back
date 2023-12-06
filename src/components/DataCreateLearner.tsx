import { useRef, useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from 'react-hot-toast';
import SwitcherQuailopi from './SwitcherQuailopi';
import SwitcherTVA from './SwitcherTVA';
import Select, {InputActionMeta} from 'react-select'
import countryList from 'react-select-country-list'
import UserService from "../services/UserServices";
import DocumentManager from "./Documents/DocumentManager";
import DocumentList from "./Documents/DocumentList";
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FileUpload from "./FileUpload";


const userSkillsList = [ 
    { value: "adobe", label: "Adobe" },
    { value: "canvas", label: "Canvas" },
    { value: "cloud", label: "Cloud" },
    { value: "compta", label: "Comptabilité" },
    { value: "marches-privés", label: "Marchés privés" },
    { value: "marches-publics", label: "Marchés publics" },        
    { value: "ms-project", label: "Microsoft Project" },         
    { value: "ms-office", label: "Microsoft Office" },
    { value: "sketch", label: "Sketch" },
    { value: "zoho", label: "Zoho" },
]

const dataUserType =  [ 
    { value: "employee", label: "Employée" }, 
    { value: "manager", label: "Manager" },
    { value: "technicien", label: "Technicien" },
    { value: "autre", label: "Autre" }
]


const initialUserSkills = [{label:'',value:''}]

const DataCreateLearner = () => {

    const navigate = useNavigate();

    const [userFirstName, setUserFirstName] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userMobile, setUserMobile] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userDepartment, setUserDepartment] = useState('');    
    const [userPostalCode, setUserPostalCode] = useState('');    
    const [userCountry, setUserCountry] = useState('');    
    const [userGmapLink, setUserGMapLink] = useState('');
    const [userSkills, setUserSkills] = useState([]);
    const [certifiedQuailopi, setCertifiedQuailopi] = useState('')
    const [rayonAction, setRayonAction] = useState('')
    const [companyName, setCompanyName] = useState('');
    const [companyType, setCompanyType] = useState('');
    const [companyTva, setCompanyTva] = useState('');
    const [pricePresentielDaily, setPricePresentielDaily] = useState('');
    const [pricePresentielHalfDay, setPricePresentielHalfDay] = useState('');
    const [pricePresentielRayonAction, setPricePresentielRayonAction] = useState('');
    const [priceDistancielDaily, setPriceDistancielDaily] = useState('');
    const [priceDistancielHalfDay, setPriceDistancielHalfDay] = useState('');
    const [priceTransport, setPriceTransport] = useState('');
    const [userComment, setUserComment] = useState('');
    const [comment, setComment] = useState('');
    const [selectedSkillsValues, setSelectedSkillsValues] = useState([])


    const handleUserSkills = ( 
        e
    ) => {    
                

        setSelectedSkillsValues( Array.isArray(e) ? e.map( x => x.value ) : [])
        setUserSkills(JSON.stringify(selectedSkillsValues))

        // console.log( selectedSkillsValues)

        // return inputValue
        
    }

   

    const handleCreateUserData = async (e) => {

        e.preventDefault(); 

        try {

            const userData = JSON.stringify({
                            userName,
                            userFirstName,
                            userPhone,
                            userMobile,
                            userEmail,
                            userAddress,
                            userPostalCode,                            
                            userDepartment,
                            userCountry,
                            userSkills,
                            certifiedQuailopi,
                            rayonAction,
                            companyName,
                            companyType,
                            companyTva,
                            pricePresentielDaily,
                            pricePresentielHalfDay,
                            pricePresentielRayonAction,
                            priceDistancielDaily,
                            priceDistancielHalfDay,
                            priceTransport,
                            userComment,
                            comment
                        })

            

            UserService.create(userData)
                .then(response => {
                    
                    if (response.status) {
                        toast.success('Utilisateur bien créé');                        
                        
                        navigate('/users');
                    }
                })
                .then(error => {
                    //toast.error("Problème lors de la création. Contactez l'administrateur.");
                   console.log(error);
                })            
        }
        catch(err){ 

            console.error(err);     // NOTE - use "error.response.data` (not "error")


        }

        

    }

    const countriesDataList = useMemo( () => countryList().getData(), [])

    const handleChangeCompanyCountry = (e) => {        

        setUserCountry( e.value )        
    }

    const handleGoogleMapLink = (e) => {

        const gLinkFirst = 'https://www.google.com/maps/place/'
        setUserAddress(e.target.value);
        const addressValue  = e.target.value;
        const gLink = gLinkFirst+encodeURIComponent(addressValue);        
        
        //setUserGMapLink(gLink)
        setUserGMapLink(gLink)

    }

    const setUserCommentValue = (e) => {
        setUserComment(e.value)
    }

    const handleRayonAction = (e) => {
        setRayonAction(e)
    }

    const handleCertifiedQualiopi = (e) => {
        if(e.target.checked){
            setCertifiedQuailopi("1")
        }else{
            setCertifiedQuailopi("0")
        }        
    }

    const handleCompanyType = (e) => {
        setCompanyType( e.value )
    }

    

    return (

        <>
        <form action="#" onSubmit={handleCreateUserData}>
            <div className="flex justify-between">
                <div className="flex"></div>
                <div className="flex">
                    <button className="flex w-100 mr-2 mb-2 justify-center rounded bg-primary p-3 font-medium text-gray">Enregistrer</button>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">

                <div className="flex flex-col gap-9">

                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Informations générales
                            </h3>
                        </div>
                        
                        <div className="p-6.5">                           
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                    Prénom <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                    type="text"
                                    id="user-firstname"
                                    onChange={(e) => setUserFirstName(e.target.value)}
                                    value={userFirstName}
                                    placeholder="Entrez le prénom"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    required
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                    Nom <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                    type="text"
                                    id="user-name"
                                    onChange={(e) => setUserName(e.target.value)}
                                    value={userName}
                                    placeholder="Entrer le nom"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    required
                                    />
                                </div>
                            </div>
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Tél. 
                                </label>
                                <input
                                    type="text"
                                    id="user-phone"
                                    onChange={(e) => setUserPhone(e.target.value)}
                                    value={userPhone}
                                    placeholder="Téléphone"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    
                                />
                            </div>
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Portable <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="user-mobile"
                                    onChange={(e) => setUserMobile(e.target.value)}
                                    value={userMobile}
                                    placeholder="Téléphone"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    required
                                />
                            </div> 
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Email <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="user-email"
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    value={userEmail}
                                    placeholder="Enter your email address"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    required
                                />
                            </div>                                                               
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Adresse complète <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="user-address"
                                    onChange={handleGoogleMapLink}
                                    value={userAddress}
                                    placeholder="Adresse / CP / Ville"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    required
                                />
                            </div>  
                            <div className="mb-4.5 hidden">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Code postal
                                </label>
                                <input
                                    type="text"
                                    id="user-postal-code"
                                    onChange={(e) => setUserPostalCode(e.target.value)}
                                    value={userPostalCode}
                                    placeholder="Code postal"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>                               
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Département
                                </label>
                                <input
                                    type="text"
                                    id="user-department"
                                    onChange={(e) => setUserDepartment(e.target.value)}
                                    value={userDepartment}
                                    placeholder="Département"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>   
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Pays
                                </label>
                                <Select 
                                    options={countriesDataList} 
                                    onChange={handleChangeCompanyCountry}         
                                    defaultValue={{ label: "France", value: "FR" }}      
                                                         
                                 />
                            </div>   

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Lien Google map <Link to={userGmapLink} target="_blank"><InsertLinkIcon /></Link>
                                </label>
                                <input
                                    type="text"
                                    id="user-gmap-link"                                    
                                    value={userGmapLink}
                                    placeholder="Lien vers la fiche sur Google map"
                                    className="hidden w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>    
                          
                            {/* <!-- Toggle switch input --> */}                          

                            
                        </div>                        
                    </div>
                </div>

                <div className="flex flex-col gap-9">

                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Informations sur l'entreprise
                            </h3>
                        </div>      

                        <div className="p-6.5">       

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Type de participant <span className="text-meta-1">*</span>
                                </label>
                                <div className="relative z-20 bg-transparent dark:bg-form-input">
                                    <Select                                        
                                        options={dataUserType}
                                        value = {
                                            dataUserType.filter(option => 
                                               option.value === companyType )
                                         }
                                        onChange={handleCompanyType}
                                    /> 
                                </div>
                            </div>     

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Nom de l'entreprise
                                </label>
                                <input
                                    type="text"
                                    id="company-name"
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    value={companyName}
                                    placeholder="Nom entreprise"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>

                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                Compétences
                                </label>
                                
                                <Select 
                                    options={userSkillsList}   
                                    placeholder="Selectionner"                                  
                                    onChange={handleUserSkills}
                                    value={userSkillsList.filter(obj=>selectedSkillsValues.includes(obj.value))}
                                    isSearchable={true}
                                    isMulti
                                />                                
                            </div>

                            <div>
                                <div className="border-b mt-5 py-5 border-stroke dark:border-strokedark">
                                    <h3 className="font-medium text-black dark:text-white">
                                        Commentaire
                                    </h3>
                                </div>
                                <div className="flex flex-col">
                                    <ReactQuill theme="snow" value={comment} onChange={setComment} />
                                </div>
                            </div>

                        </div>
                        
                    </div>  

                </div>

            </div>
        </form>
        </>

    )

}

export default DataCreateLearner