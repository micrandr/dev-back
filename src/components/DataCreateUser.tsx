import { useRef, useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from 'react-hot-toast';
// import SwitcherQuailopi from './SwitcherQuailopi';
// import SwitcherTVA from './SwitcherTVA';
import Select, {InputActionMeta} from 'react-select'
import countryList from 'react-select-country-list'
import UserService from "../services/UserServices";
import TypeService from "../services/TypeServices";
import DocumentManager from "./Documents/DocumentManager";
import DocumentList from "./Documents/DocumentList";
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import FileUpload from "./FileUpload";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { formatDepartment } from "../common/Utils";
import CompanyService from "../services/CompanyServices";
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import CreateCompanyLinkAction from "./Buttons/CreateCompanyLinkAction";
import UserFiles from "./Files/UserFiles";
import ListUserType from "./Lists/ListUserType";
import Editor from "./Fields/Editor";

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
    { value: "auto", label: "Auto-Entrepreneur" }, 
    { value: "portage", label: "Portage" },
    { value: "ei", label: "Entreprise individuelle" },
    { value: "sarl", label: "SARL" },
    { value: "eurl", label: "EURL" },
    { value: "sas", label: "SAS" },
    { value: "sasu", label: "SASU" }
]


const initialUserSkills = [{label:'',value:''}]

const DataCreateUser = () => {

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

    // set company types data to list
    const [typesData, setTypesData] = useState<any[]>([]);
    const [skillsData, setSkillsData] = useState<any[]>([]);
    const [compagniesData, setCompagniesData] = useState<any[]>([]);


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
        setUserAddress(e.target.value)
        const addressValue  = e.target.value
        const gLink = gLinkFirst+encodeURIComponent(addressValue)   

        setUserDepartment(formatDepartment(addressValue))
        
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
        setCompanyType( e.label )
    }

    const getAllCompanyTypes = () => {
        TypeService.getAll()
            .then( response=>{
                // console.log(response.data['hydra:member'])
                setCompagniesData(response.data['hydra:member'])
            })
    }

    const getAllCompangnies = () => {
        CompanyService.getAll()
            .then( response=>{
                // console.log(response.data['hydra:member'])
                setCompagniesData(response.data['hydra:member'])
            })
    }

    //todo
    const getAllSkills = () => {

    }

    useEffect(() => {
        getAllCompanyTypes()      
        getAllCompangnies()  
    }, []);

    const listTypeFromDB = typesData.map(item => {
        const container = {
            value: null,
            label: null
        };
    
        container.value = item.id;
        container.label = item.typeName;
    
        return container;
    })

    const listCompagniesFromDB = compagniesData.map(item => {
        const container = {
            value: null,
            label: null
        };
    
        // container.value = item.companyType;
        container.value = item.id;
        container.label = item.companyName;
    
        return container;
    })
    
    const handleLinkList = () => {
        navigate("/users")
    }

    const handleCompanyNameAutocomplete = (e) => {
        setCompanyName(e.label)
    }

    return (

        <>
        <form action="#" onSubmit={handleCreateUserData}>
            <div className="flex justify-between mb-3">
                <div className="flex"></div>
                <div className="flex">
                    <ButtonGroup
                            disableElevation
                            variant="contained"
                            aria-label="Disabled elevation buttons"
                        >   
                            <Button onClick={handleLinkList}>Liste formateurs</Button>
                            <Button type="submit">Enregistrer</Button>
                        </ButtonGroup>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 bg-white p-3">

                <div className="flex flex-col gap-9">

                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Informations générales
                            </h3>
                        </div>
                        
                        <div className="p-6.5">

                            {/* <FileUpload /> */}

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
                                    placeholder="Mobile"
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
                            {/* <!-- Toggle switch input --> */}
                            <div>
                                <div className="flex flex-col mt-5">                                    
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox defaultChecked onChange={handleCertifiedQualiopi} />} label="Certifié Quailopi" />
                                    </FormGroup> 
                                </div>
                            </div> 

                            <div>
                                <div className="border-b mt-5 py-5 border-stroke dark:border-strokedark">
                                    <h3 className="font-medium text-black dark:text-white">
                                        Commentaire
                                    </h3>
                                </div>
                                <div className="flex flex-col">
                                    <Editor  dataValue={comment} callBack={setComment} />
                                    {/* <ReactQuill theme="snow" value={comment} onChange={setComment} /> */}
                                </div>
                            </div>

                        </div>                        
                    </div>
                </div>

                <div className="flex flex-col gap-9">

                    <div className="hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Informations sur l'entreprise
                            </h3>
                        </div>      

                        <div className="p-6.5">       

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Type de structure <span className="text-meta-1">*</span>
                                </label>
                                <div className="relative z-20 bg-transparent dark:bg-form-input">
                                    <ListUserType params={11} currentType={1}  actionType="create" onChange={handleCompanyType} />
                                    {/* <Select 
                                            options={listTypeFromDB}
                                        /> */}
                                    {/* <Select                                        
                                        options={dataUserType}
                                        value = {
                                            dataUserType.filter(option => 
                                               option.value === companyType )
                                         }
                                        onChange={handleCompanyType}
                                    />  */}
                                </div>
                            </div>     

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Nom de l'entreprise
                                </label>

                                {/* <Autocomplete                                    
                                    id="company-list"
                                    options={listCompagniesFromDB}                                   
                                    getOptionLabel={(option) => option.label}
                                    sx={{ width: "100%" }}                                    
                                    renderInput={ (params) => <TextField {...params} label="Entreprise" />}
                                    /> */}
                                <Select                                    
                                    id="company-list"
                                    options={listCompagniesFromDB}  
                                    onChange={handleCompanyNameAutocomplete}                                                                                                         
                                    />
                                    
                                    <CreateCompanyLinkAction />                               
                            </div>

                            <div>
                                <div className="flex flex-col mt-5">                                    
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Soumis à la TVA" />
                                    </FormGroup> 
                                </div>
                            </div> 

                           

                        </div>
                        
                    </div>  

                    {/* <!-- Textarea Fields --> */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Tarification d'animation
                            </h3>
                        </div>
                        
                        <div className="flex flex-col gap-5.5 p-6.5 border border-stroke rounded mt-5 mx-5">

                            <h4 className="font-semibold">En présentiel</h4>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                <label className="block  mb-1 md:mb-0 pr-4">
                                    Journalier 
                                </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input 
                                        onChange={(e) => setPricePresentielDaily(e.target.value)}
                                        value={pricePresentielDaily}
                                        placeholder="Tarif journalier" className="bg-gray-200 appearance-none border-[1.5px] border-stroke bg-transparent w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" />
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                <label className="block mb-1 md:mb-0 pr-4">
                                    Demi-journalier
                                </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input 
                                        onChange={(e) => setPricePresentielHalfDay(e.target.value)}
                                        value={pricePresentielHalfDay}
                                        placeholder="Tarif demi-journée" 
                                        className="bg-gray-200 appearance-none border-[1.5px] border-stroke bg-transparent w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" 
                                    />
                                </div>
                            </div> 
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                <label className="block mb-1 md:mb-0 pr-4">
                                    Rayon d'action
                                </label>
                                </div>
                                <div className="md:w-2/3">                                    
                                    <Editor  dataValue={rayonAction} callBack={handleRayonAction} />
                                    {/* <ReactQuill theme="snow" value={rayonAction} onChange={handleRayonAction} /> */}
                                </div>
                            </div>                                                                                   
                        </div>
                        <div className="flex flex-col  gap-5.5 p-6.5 border border-stroke rounded  mt-5 mb-5 mx-5">

                            <h4 className="font-semibold">En distantiel</h4>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                <label className="block  mb-1 md:mb-0 pr-4">
                                    Journalier
                                </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input 
                                        onChange={(e) => setPriceDistancielDaily(e.target.value)}
                                        value={priceDistancielDaily}
                                        placeholder="Tarif journalier" 
                                        className="bg-gray-200 appearance-none border-[1.5px] border-stroke bg-transparent w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" 
                                    />
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                <label className="block mb-1 md:mb-0 pr-4">
                                    Demi-journalier
                                </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input 
                                        onChange={(e) => setPriceDistancielHalfDay(e.target.value)}
                                        value={priceDistancielHalfDay}
                                        placeholder="Tarif demi-journée" 
                                        className="bg-gray-200 appearance-none border-[1.5px] border-stroke bg-transparent w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" />
                                </div>
                            </div>                                                                                                             
                        </div>                   
                    </div>      
                    
                    <div className="hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark py-5 px-0">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Gestion de documents
                            </h3>
                        </div>
                        
                        <div className="flex flex-col gap-5.5 p-6.5 border border-stroke rounded mt-5 mx-5">
                            {/* <DocumentManager /> */}
                            {/* <DocumentList />          */}
                        </div>
                    </div>

                </div>

            </div>
        </form>
        </>

    )

}

export default DataCreateUser