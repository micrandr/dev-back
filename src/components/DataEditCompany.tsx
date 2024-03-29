import { useRef, useState, useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from 'react-hot-toast';
import Select from 'react-select'
// import ReactCountryFlagsSelect from "react-country-flags-select";
import countryList from 'react-select-country-list'
// import SwitcherQuailopi from './SwitcherQuailopi';
import SwitcherTVA from './SwitcherTVA';
import CompanyDataService from "../services/CompanyServices";
import TypeService from "../services/TypeServices";
import DocumentManager from "./Documents/DocumentManager";
import DocumentList from "./Documents/DocumentList";
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import Editor from "./Fields/Editor";
// import ReactQuill from "react-quill";
// import 'react-quill/dist/quill.snow.css';
// import ButtonActions from "./Buttons/ButtonActions";
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import {formatGMapLink, formatDepartment} from '../common/Utils'
import FileUploaderFiles from "./Files/FileUploaderFiles";

const DataEditCompany = () => {

    const navigate = useNavigate();
    const params = useParams();
    const companyId = params.id;
    const userId = companyId

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

    const countriesDataList = useMemo( () => countryList().getData(), [])

    const initialCompanyDataState = {
        id: null,
        companyName: "",
        companyType: "",
        companySlogan: "",
        companySize: "",
        companyAddress: "",
        companyDepartment: "",
        companyPostalCode: "",
        companyCountry: "",
        companyRcs: "",
        companySiret: "",
        companySiren: "",
        companyComment: ""
      };

    const [companyData, setCompanyData] = useState(initialCompanyDataState);
    const [currentCompany, setCurrentCompany] = useState(initialCompanyDataState);

    const [typesData, setTypesData] = useState<any[]>([]);

    const [selected, setSelected] = useState(null);

    const [companyName, setCompanyName] = useState('');
    const [companySlogan, setCompanySlogan] = useState('');
    const [companyType, setCompanyType] = useState('');
    const [companySize, setCompanySize] = useState<any[]>([]);
    const [companyAddress, setCompanyAddress] = useState('');
    const [companyPostalCode, setCompanyPostalCode] = useState('');
    const [companyCountry, setCompanyCountry] = useState('');
    const [companyDepartment, setCompanyDepartment] = useState('');    
    const [companyContactEmail, setCompanyContactEmail] = useState('');
    const [userGmapLink, setUserGmapLink] = useState('');    
    const [companyTva, setCompanyTva] = useState('');
    const [companyRcs, setCompanyRcs] = useState('');
    const [companySiren, setCompanySiren] = useState('');
    const [companySiret, setCompanySiret] = useState('');
    const [companyComment, setCompanyComment] = useState('');


    const getCompanyData = (id:string) => {
        
        CompanyDataService.get(id)
        .then(  response => {
            setCompanyData(response.data);       
            setCurrentCompany(response.data);
            setCompanyName(response.data.companyName)
            setCompanySlogan(response.data.companySlogan)
            setCompanySize(response.data.companySize)
            setCompanyAddress(response.data.companyAddress)
            setCompanyType(response.data.companyType)
            setCompanyDepartment(response.data.companyDepartment)
            setCompanyPostalCode(response.data.companyPostalCode)
            setCompanyCountry(response.data.companyCountry)
            setCompanyRcs(response.data.companyRcs)
            setCompanySiret(response.data.companySiret)
            setCompanySiren(response.data.companySiren)            
            setCompanyComment(response.data.companyComment)
            handleGoogleMapLink()
            getAllCompanyTypes()
            
        })

        

    }

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
    
        container.value = item.typeSlug;
        container.label = item.typeName;
    
        return container;
    })
    
    useEffect(() => {
        if (companyId) {
            getCompanyData(companyId);
        }
          
        
      }, [companyId]);   

      const handleChangeCompanySize = (e) => {        
        setCompanySize(e.value)
      }

      const handleChangeCompanyCountry = (e) => {        
        setCompanyCountry( e.value )
      }

      const handleEditCompanyData = (e) => {

        e.preventDefault();

        try {

            const companyDataEdited = JSON.stringify({
                companyName,
                companySlogan,
                companyType,
                companyAddress,
                companyDepartment,
                companyCountry,
                companyPostalCode,
                companySize,
                companyRcs,
                companySiret,
                companySiren,
                companyTva,
                companyComment
            });

            //console.log(companyDataEdited);

            CompanyDataService.update(companyId, companyDataEdited)
            .then( response => {
                //toast.error("Problème lors de la mise à jour. Contactez l'administrateur.");
                if(response.status == 200) {
                    toast.success("Mise à jour bien effectué");
                    navigate('/compagnies');
                }
            });
       
               
        }
        catch(error){      
            console.log(error);
        }


    }

    const handleGoogleMapLink = () => {
        
        let addressGMap = formatGMapLink(companyAddress)               
        setUserGmapLink(addressGMap)  

    }

    const handleDataCompanyType = (e) => {

        setCompanyType(e.value)

    }

    const handleLinkPreview = (e) => {
        const urlFiche = '/compagnies/fiche/' + companyId
        navigate(urlFiche)
    }

    const handleLinkList = (e) => {
        const urlList = '/compagnies'
        navigate(urlList)
    }

    return (

        <>
        <form action="#" onSubmit={handleEditCompanyData}>
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
                                    id="company-slogan"
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
                                <Select 
                                    options={listTypeFromDB}
                                    onChange={handleDataCompanyType}
                                    value = {
                                        listTypeFromDB.filter(option => 
                                           option.value === companyType )
                                    }
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

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Taille de l'entreprise
                                </label>                                
                                <Select 
                                    options={companyDataSizeList}                                             
                                    onChange={handleChangeCompanySize}
                                    value = {
                                            companyDataSizeList.filter(option => 
                                               option.value === companySize )
                                        }
                                />
                            </div>                            
                                                                                      
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Adresse  <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="user-address"
                                    onChange={(e) => setCompanyAddress(e.target.value)}
                                    value={companyAddress}
                                    placeholder="Adresse / CP / Ville"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    required
                                />
                            </div>  
                            <div className="mb-4.5">
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
                                    value = {
                                        countriesDataList.filter(option => 
                                           option.value === companyCountry )
                                    }
                                 />
                            </div>
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Lien Google map <Link to={formatGMapLink(companyAddress)} target="_blank"><InsertLinkIcon /></Link>
                                </label>
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
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Commentaire
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">      
                            <Editor dataValue={companyComment} callBack={setCompanyComment} />
                            {/* <ReactQuill theme="snow" value={companyComment} onChange={setCompanyComment} /> */}
                        </div>
                    </div>    

                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Gestion de documents
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5 border border-stroke rounded mt-5 mx-5">

                           
                            <div className="border border-stroke p-2">
                            KBis <FileUploaderFiles dataUser={userId} fname="KBis" />
                            </div>
                            <div className="border border-stroke p-2">
                            URSSAF <FileUploaderFiles dataUser={userId} fname="Urssaf" />
                            </div>
                            <div className="border border-stroke p-2">
                            CV <FileUploaderFiles dataUser={userId} fname="CV" />
                            </div>
                            <div className="border border-stroke p-2">
                            Assurance décennale <FileUploaderFiles dataUser={userId} fname="ASSURANCE_DECENNALE" />
                            </div>
                            <div className="border border-stroke p-2">
                            Attestation fiscale  <FileUploaderFiles dataUser={userId} fname="ATTESTATION_FISCALE" />
                            </div>
                            <div className="border border-stroke p-2">
                            Attestion sur l'honneur <FileUploaderFiles dataUser={userId} fname="ATTESTATION_HONNEUR" />
                            </div>
                            <div className="border border-stroke p-2">
                            Autre <FileUploaderFiles dataUser={userId} fname="AUTRE" />
                            </div>
                            </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            {/* <DocumentManager />
                            <DocumentList /> */}
                        </div>
                       
                    </div>             

                </div>

            </div>
        </form>
        </>

    )

}

export default DataEditCompany