import React, { useRef, useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from 'react-hot-toast';
import Select from 'react-select'
import countryList from 'react-select-country-list'
import SwitcherQuailopi from './SwitcherQuailopi';
import SwitcherTVA from './SwitcherTVA';
//import axios from '../api/axios';
import UserService from '../services/UserServices';
import TypeService from "../services/TypeServices";
import DocumentManager from "./Documents/DocumentManager";
import DocumentList from "./Documents/DocumentList";
import DocumentServices from "../services/DocumentServices";
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import FileUpload from "./FileUpload";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { formatDepartment } from "../common/Utils";


//import ListUserType from "./Lists/ListUserType";

const USER_GET_URL = '/users/';

const DataEditUser = () => {

    const navigate = useNavigate();
    const params = useParams();
    const userId = params.id;

    

    const initialUserDataState = {
        id: null,
        userName: "",
        userFirstname: "",
        userPhone: "",
        userAddress: "",
        comment: "",
      };

    const [userData, setUserData] = useState(initialUserDataState);
    const [currentUser, setCurrentUser] = useState(initialUserDataState);
    const [userFirstName, setUserFirstName] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userMobile, setUserMobile] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userPostalCode, setUserPostalCode] = useState('');
    const [userDepartment, setUserDepartment] = useState('');
    const [userCountry, setUserCountry] = useState('');
    const [userGmapLink, setUserGMapLink] = useState('');
    const [userSkills, setUserSkills] = useState('');
    const [certifiedQuailopi, setCertifiedQuailopi] = useState('');
    const [checkCertifiedQuailopi, setCheckCertifiedQuailopi] = useState(false)
    const [userComment, setUserComment] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyType, setCompanyType] = useState('');
    const [companyTva, setCompanyTva] = useState('');
    const [rayonAction, setRayonAction] = useState('');
    const [pricePresentielDaily, setPricePresentielDaily] = useState('');
    const [pricePresentielHalfDay, setPricePresentielHalfDay] = useState('');
    const [pricePresentielRayonAction, setPricePresentielRayonAction] = useState('');
    const [priceDistancielDaily, setPriceDistancielDaily] = useState('');
    const [priceDistancielHalfDay, setPriceDistancielHalfDay] = useState('');
    const [priceTransport, setPriceTransport] = useState('');
    const [comment, setComment] = useState('');
    const [docData, setDocData] = useState('');
    const [selectedSkillsValues, setSelectedSkillsValues] = useState([])
    //const { id } = useParams();    

    const countriesDataList = useMemo( () => countryList().getData(userCountry), [])
    const dataUserType =  [ 
        { value: "auto", label: "Auto-Entrepreneur" }, 
        { value: "portage", label: "Portage" },
        { value: "ei", label: "Entreprise individuelle" },
        { value: "sarl", label: "SARL" },
        { value: "eurl", label: "EURL" },
        { value: "sas", label: "SAS" },
        { value: "sasu", label: "SASU" }
    ]
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

    const [typesData, setTypesData] = useState<any[]>([]);

    //todo
    const getUserTypeDefaultValue = () => {
    

    }

    const getUserData = userId => {
        
        UserService.get(userId)
        .then(  response => {
            setUserData(response.data);       
            setCurrentUser(response.data);
            setUserName(response.data.userName)
            setUserFirstName(response.data.userFirstName)
            setUserPhone(response.data.userPhone)
            setUserMobile(response.data.userMobile)
            setUserEmail(response.data.userEmail)
            setUserAddress(response.data.userAddress)
            setUserPostalCode(response.data.userPostalCode)
            setUserDepartment(response.data.userDepartment)
            setCertifiedQuailopi(response.data.certifiedQuailopi)
            setUserSkills(response.data.userSkills)
            setCompanyName(response.data.companyName)
            setUserCountry(response.data.userCountry)
            setCompanyType(response.data.companyType)
            setCompanyTva(response.data.companyTva)
            setRayonAction(response.data.rayonAction)
            setPricePresentielDaily(response.data.pricePresentielDaily)
            setPricePresentielHalfDay(response.data.pricePresentielHalfDay)
            setPriceDistancielDaily(response.data.priceDistancielDaily)
            setPriceDistancielHalfDay(response.data.priceDistancielHalfDay)
            setPricePresentielRayonAction(response.data.pricePresentielRayonAction)            
            setPriceTransport(response.data.priceTransport)
            setComment(response.data.comment)
            
        })

        

    }

    const getAllCompanyTypes = () => {
        TypeService.getAll()
            .then( response=>{
                // console.log(response.data['hydra:member'])
                setTypesData(response.data['hydra:member'])
            })
    }
    
    useEffect(() => {

        if (userId) {
            getUserData(userId);
        }  

        getAllCompanyTypes()  
        

    }, [userId]);

    const listTypeFromDB = typesData.map(item => {
        const container = {
            value: null,
            label: null
        };
    
        container.value = item.id;
        container.label = item.typeName;
    
        return container;
    })



    const handleEditUserData = (e) => {

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
                companyName,
                companyType,
                companyTva,                
                rayonAction,
                certifiedQuailopi,
                pricePresentielDaily,
                pricePresentielHalfDay,
                pricePresentielRayonAction,
                priceDistancielDaily,
                priceDistancielHalfDay,
                priceTransport,
                comment
            });

            UserService.update(userId, userData)
            .then( response => {
                if(response.status == 200) {
                    toast.success("Mise à jour bien effectué");
                    // toast.error("Problème lors de la mise à jour. Contactez l'administrateur.");
                    navigate('/users');
                }
            });        
               
        }
        catch(error){      
            console.log(error);
        }

        

    }

    const handleChangeCompanyCountry = (e) => {        
        setUserCountry( e.value )        
    }

    const handleCompanyType = (e) => {
        setCompanyType( e.value )
    }

    const handleUserSkills = (e) => {    

        setSelectedSkillsValues( Array.isArray(e) ? e.map( x => x.value ) : [])
        setUserSkills(JSON.stringify(selectedSkillsValues))

        // let values = []
        // e.forEach( (option)=>{
        //     //console.log(option.value)
        //     values.push(option?.value)
        // }) 
        // let data = values.join(',')
        // setUserSkills(data)


    }

    const handleCertifiedQualiopi = (e) =>{
        if(e.target.checked){
            setCertifiedQuailopi("1")
        }else{
            setCertifiedQuailopi("0")
        }
    }

    const handleRayonAction = (e) => {
        setRayonAction(e)
    }

    const handleCheckQualifiedQuailopi = (e) => {
        if(certifiedQuailopi=="0"){
            // checkCertifiedQuailopi = 
        }
        
    }

    const handleLinkPreview = (e) => {
        const urlFiche = '/users/fiche/' + userId
        navigate(urlFiche)
    }

    const formatUserDepartment = (input) => {

        const dept = formatDepartment(input) 
        setUserDepartment(dept)

    }

    return (

        <>
        <form action="#" onSubmit={handleEditUserData}>
            <div className="flex justify-between mb-3">
                <div className="flex"></div>
                <div className="flex">
                    {/**<button className="flex w-100 mr-2 mb-2 justify-center rounded bg-primary p-3 font-medium text-gray">Enregistrer</button>*/}
                    <ButtonGroup
                        disableElevation
                        variant="contained"
                        aria-label="Disabled elevation buttons"
                    >
                        <Button onClick={handleLinkPreview}>Visualiser</Button>
                        <Button type="submit">Enregistrer</Button>
                    </ButtonGroup>
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
                            <FileUpload />
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                    Prénom <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                    type="text"
                                    id="userFirstName"
                                    onChange={ (e) => setUserFirstName(e.target.value)}
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
                                        id="userName"  
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
                                    id="userPhone"
                                    onChange={(e) => setUserPhone(e.target.value)}
                                    value={userPhone}
                                    placeholder="Téléphone"
                                    className="required w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    
                                    
                                />
                            </div>
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Portable <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="userMobile"
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
                                    id="userEmail"
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
                                    id="userAddress"
                                    onChange={(e) => { setUserAddress(e.target.value); formatUserDepartment(e.target.value) }}
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
                                    id="userAddress"
                                    onChange={(e) => setUserPostalCode(e.target.value)}
                                    value={userPostalCode}
                                    placeholder="CP"
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
                            <div className="mb-4.5 hidden">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Pays
                                </label>
                                <Select 
                                    options={countriesDataList}
                                    value = {
                                        countriesDataList.filter(option => 
                                           option.value === userCountry )
                                     }
                                    onChange={handleChangeCompanyCountry}
                                />
                            </div>       
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Lien Google map <Link to={userGmapLink} target="_blank"><InsertLinkIcon /></Link>
                                </label>
                                <input
                                    type="text"
                                    id="user-gmap-link"
                                    onChange={(e) => setUserGMapLink(e.target.value)}
                                    value={userGmapLink}
                                    placeholder="Lien vers la fiche sur Google map"
                                    className="w-full hidden rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>    
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                Compétences
                                </label>

                                {/** value={
                                    userSkillsList.filter(option => 
                                        option.value === userSkills )
                                    */}
                                
                                <Select 
                                    options={userSkillsList}                                     
                                    onChange={handleUserSkills}
                                    value={
                                        userSkillsList.filter(obj=>userSkills.includes(obj.value))
                                     }
                                    isMulti={true}
                                />                                
                            </div>

                            <div>
                                <div className="flex flex-col mt-5">                                    
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox checked={(certifiedQuailopi=="1")?true:false} onClick={handleCertifiedQualiopi} />} label="Certifié Quailopi" />
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
                                    <ReactQuill theme="snow" value={comment} onChange={setComment} />
                                </div>
                            </div>
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
                                    Type de structure <span className="text-meta-1">*</span>
                                </label>
                                <div className="relative z-20 bg-transparent dark:bg-form-input">
                                    <Select 
                                            options={listTypeFromDB}
                                            value = {
                                                dataUserType.filter(option => 
                                                   option.value === companyType )
                                             }
                                            onChange={handleCompanyType}
                                        />
                                    {/* <Select                                        
                                        options={dataUserType}
                                        value = {
                                            dataUserType.filter(option => 
                                               option.value === companyType )
                                         }
                                        onChange={handleCompanyType}
                                    />                                    */}
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
                                <div className="flex flex-col mt-5">                                    
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Soumis à la TVA" />
                                    </FormGroup> 
                                </div>
                            </div> 

                            <DocumentManager />

                            <DocumentList />
                                
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
                                    <ReactQuill theme="snow" value={rayonAction} onChange={handleRayonAction} />
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

                </div>

            </div>
        </form>
        </>

    )

}

export default DataEditUser