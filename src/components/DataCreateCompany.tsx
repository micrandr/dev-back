import { useRef, useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from 'react-hot-toast';
import Select, {InputActionMeta} from 'react-select'
import countryList from 'react-select-country-list'
import SwitcherQuailopi from './SwitcherQuailopi';
import SwitcherTVA from './SwitcherTVA';
import axios from '../api/axios';
import CompanyDataService from "../services/CompanyServices";
import TypeService from "../services/TypeServices";
import DocumentManager from "./Documents/DocumentManager";
import DocumentList from "./Documents/DocumentList";
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { formatDepartment } from "../common/Utils";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const REGISTER_URL = '/compagnies';

const DataCreateCompany = () => {

    const navigate = useNavigate();

    const [companyName, setCompanyName] = useState('');
    const [companySlogan, setCompanySlogan] = useState('');
    const [companyType, setCompanyType] = useState('');
    const [companySize, setCompanySize] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [companyPostalCode, setCompanyPostalCode] = useState('');
    const [companyCountry, setCompanyCountry] = useState('');
    const [companyDepartment, setCompanyDepartment] = useState('');    
    const [companyContactEmail, setCompanyContactEmail] = useState('');
    const [userGmapLink, setUserGMapLink] = useState('');    
    const [companyTva, setCompanyTva] = useState('');
    const [companyRcs, setCompanyRcs] = useState('');
    const [companySiren, setCompanySiren] = useState('');
    const [companySiret, setCompanySiret] = useState('');
    const [pricePresentielDaily, setPricePresentielDaily] = useState('');
    const [pricePresentielHalfDay, setPricePresentielHalfDay] = useState('');
    const [pricePresentielRayonAction, setPricePresentielRayonAction] = useState('');
    const [priceDistancielDaily, setPriceDistancielDaily] = useState('');
    const [priceDistancielHalfDay, setPriceDistancielHalfDay] = useState('');    
    const [companyComment, setCompanyComment] = useState('');

    const companyDataSizeList = [ 
        { value: "1", label: "1 employé" }, 
        { value:"2-9", label:"2 à 9 employés" },                                 
        { value:"10-49", label:"10 à 49 employés" },                                 
        { value: "50-99", label:"50 à 99 employés" }, 
        { value: "100-499", label:"100 à 500 employés" },
        { value: "500-plus", label:"Plus de 500 employés" }
    ]

    const dataCompanyType =  [ 
        { value: "auto", label: "Auto-Entrepreneur" }, 
        { value: "portage", label: "Portage" },
        { value: "ei", label: "Entreprise individuelle" },
        { value: "sarl", label: "SARL" },
        { value: "eurl", label: "EURL" },
        { value: "sas", label: "SAS" },
        { value: "sasu", label: "SASU" }
    ]

    const handleChangeCompanySize = (e) => {        
        setCompanySize(e.value)
    }

    const [typesData, setTypesData] = useState<any[]>([]);

    const getAllCompanyTypes = () => {
        TypeService.getAll()
            .then( response=>{                
                setTypesData(response.data['hydra:member'])
            })
    }

    const listTypeFromDB = typesData.map(item => {
        const container = {
            value: null,
            label: null
        };
    
        container.value = item.id;
        container.label = item.typeName;
    
        return container;
    })

    useEffect(() => {
        getAllCompanyTypes()        
    }, []);
   

    const handleCreateCompanyData = async (e) => {

        e.preventDefault(); 

        try {

            const companyData = JSON.stringify({
                            companyName,
                            companySlogan,
                            companyType,
                            companySize,
                            companyAddress,
                            companyPostalCode,
                            companyCountry,
                            companyDepartment,
                            companyTva,
                            companyRcs,
                            companySiren,
                            companySiret,
                            companyComment
                        })
            CompanyDataService.create(companyData)
                .then(response => {
                    if (response.status) {
                        toast.success('Entreprise bien créé');                        
                        navigate('/compagnies');
                    }
                })
                .then(error => {
                   console.log(error);
                })
            
            
            //toast.success('Utilisateur bien créé');
            //navigate('/users');
        }
        catch(err){ 

            console.error(err);     // NOTE - use "error.response.data` (not "error")


        }

        

    }

    const handleDataCompanyType = (e) => {

        setCompanyType(e.value)

    }

    const handleGoogleMapLink = (e) => {

        const gLinkFirst = 'https://www.google.com/maps/place/'
        setCompanyAddress(e.target.value);
        const addressValue  = e.target.value;
        const gLink = gLinkFirst+encodeURIComponent(addressValue);        

        setCompanyDepartment(formatDepartment(addressValue))
        
        //setUserGMapLink(gLink)
        setUserGMapLink(gLink)

    }

    const formatUserDepartment = (input) => {

        const dept = formatDepartment(input) 
        setCompanyDepartment(dept)

    }

    const countriesDataList = useMemo( () => countryList().getData(), [])

    const handleChangeCompanyCountry = (e) => {        

        setCompanyCountry( e.value )        
    }

    const handleLinkList = (e) => {
        const urlFiche = '/compagnies'
        navigate(urlFiche)
    }


    return (

        <>
        <form action="#" onSubmit={handleCreateCompanyData}>
            <div className="flex justify-between mb-3">
                <div className="flex"></div>
                <div className="flex">
                    <ButtonGroup
                        disableElevation
                        variant="contained"
                        aria-label="Disabled elevation buttons"
                    >
                        <Button onClick={handleLinkList}>Liste</Button>
                        <Button type="submit">Enregistrer</Button>
                    </ButtonGroup>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 bg-white p-3">

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
                                    Nom de l'entreprise <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="company-name"
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    value={companyName}
                                    placeholder="Nom de l'entreprise"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    required
                                />
                            </div>

                            <div className="mb-4.5 hidden">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Slogan
                                </label>
                                <input
                                    type="text"
                                    id="user-mobile"
                                    onChange={(e) => setCompanySlogan(e.target.value)}
                                    value={companySlogan}
                                    placeholder="Slogan"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div> 

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Type de structure <span className="text-meta-1">*</span>
                                </label>
                                <div className="relative z-20 bg-transparent dark:bg-form-input">
                                    <Select 
                                            options={listTypeFromDB}
                                        />
                                    {/* <Select 
                                        options={dataCompanyType}
                                        onChange={handleDataCompanyType}
                                        value = {
                                            dataCompanyType.filter(option => 
                                            option.value === companyType )
                                        }
                                    /> */}
                                </div>
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Taille de l'entreprise
                                </label>
                                <div className="z-20 bg-transparent dark:bg-form-input">
                                    <Select 
                                        options={companyDataSizeList}                                             
                                        onChange={handleChangeCompanySize}
                                        value = {
                                                companyDataSizeList.filter(option => 
                                                option.value === companySize )
                                            }
                                    />
                                </div>
                            </div>                            
                                                                                      
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Adresse  <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="user-address"
                                    onChange={(e) => { setCompanyAddress(e.target.value); formatUserDepartment(e.target.value); handleGoogleMapLink() }}
                                    value={companyAddress}                                    
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
                                    id="company-postal-code"
                                    onChange={(e) => setCompanyPostalCode(e.target.value)}
                                    value={companyPostalCode}
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
                                    onChange={(e) => setCompanyDepartment(e.target.value)}
                                    value={companyDepartment}
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
                                {/* <input
                                    type="text"
                                    id="user-gmap-link"
                                    onChange={(e) => setUserGMapLink(e.target.value)}
                                    value={userGmapLink}
                                    placeholder="Lien vers la fiche sur Google map"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                /> */}
                            </div>   
                        </div>                        
                    </div>
                </div>

                <div className="flex flex-col gap-9">

                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Informations sur les taxes
                            </h3>
                        </div>      
                        <div className="p-6.5">
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    RCS
                                </label>
                                <input
                                    type="text"
                                    id="company-rcs"
                                    onChange={(e) => setCompanyRcs(e.target.value)}
                                    value={companyRcs}
                                    placeholder="RCS"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div> 

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Siren
                                </label>
                                <input
                                    type="text"
                                    id="company-siren"
                                    onChange={(e) => setCompanySiren(e.target.value)}
                                    value={companySiren}
                                    placeholder="Siren"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div> 

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Siret
                                </label>
                                <input
                                    type="text"
                                    id="company-siret"
                                    onChange={(e) => setCompanySiret(e.target.value)}
                                    value={companySiret}
                                    placeholder="Siret"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div> 

                            <div className="p-6.5">       

                                <div className="mb-4.5 hidden">
                                    <div className="flex flex-col gap-5.5 p-6.5">
                                        <SwitcherTVA />                                                                            
                                    </div>
                                </div>
                            </div>

                        </div>
                        
                    </div>  

                    {/* <!-- Textarea Fields --> */}
                    <div className="hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
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
                                    <textarea className="bg-gray-200 appearance-none border-[1.5px] border-stroke bg-transparent w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                                    </textarea>
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

                    {/* <!-- Textarea Fields --> */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Commentaire
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">                                                
                            
                            <ReactQuill theme="snow" value={companyComment} onChange={setCompanyComment} />


                        </div>

                        <div>
                            
                        </div>
                    </div>  
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    Gestion de documents
                                </h3>
                            </div>
                            <div className="flex flex-col gap-5.5 p-6.5">  
                                <DocumentManager />
                                <DocumentList />            
                            </div>
                    </div>

                </div>

            </div>
        </form>
        </>

    )

}

export default DataCreateCompany