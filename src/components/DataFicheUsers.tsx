import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate, Link  } from "react-router-dom";
import SwitcherQuailopi from './SwitcherQuailopi';
import SwitcherTVA from './SwitcherTVA';
import axios from '../api/axios';
import UserService from '../services/UserServices';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import parse from 'html-react-parser'
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { formatGMapLink } from "../common/Utils";

const USER_GET_URL = '/users/';

const DataFicheUser = () => {

    const navigate = useNavigate()
    const params = useParams();
    const userId = params.id;

    const initialUserDataState = {
        id: null,
        userName: "",
        userFirstname: "",
        userTelephone: false
      };

    const [userData, setUserData] = useState(initialUserDataState);
    const [currentUser, setCurrentUser] = useState(initialUserDataState);
    const [userFirstName, setUserFirstName] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userMobile, setUserMobile] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userDepartment, setUserDepartment] = useState('');    
    const [certifiedQualiopi, setCertifiedQualiopi] = useState('');
    const [userGmapLink, setUserGMapLink] = useState('');
    const [userSkills, setUserSkills] = useState('');
    const [companyType, setCompanyType] = useState('');
    const [companyTva, setCompanyTva] = useState('');
    const [pricePresentielDaily, setPricePresentielDaily] = useState('');
    const [pricePresentielHalfDay, setPricePresentielHalfDay] = useState('');
    const [pricePresentielRayonAction, setPricePresentielRayonAction] = useState('');
    const [priceDistancielDaily, setPriceDistancielDaily] = useState('');
    const [priceDistancielHalfDay, setPriceDistancielHalfDay] = useState('');
    const [priceTransport, setPriceTransport] = useState('');
    const [comment, setComment] = useState('');
    //const { id } = useParams();

    

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
            setUserDepartment(response.data.userDepartment)
            setCompanyType(response.data.companyType)
            setCompanyTva(response.data.companyTva)
            setPricePresentielDaily(response.data.pricePresentielDaily)
            setPricePresentielHalfDay(response.data.pricePresentielHalfDay)
            setPriceDistancielDaily(response.data.priceDistancielDaily)
            setPriceDistancielHalfDay(response.data.priceDistancielHalfDay)
            setPricePresentielRayonAction(response.data.pricePresentielRayonAction)            
            setPriceTransport(response.data.priceTransport)
            setComment(response.data.comment)

            console.log(userData)
            console.log(currentUser)
            
        })

        

    }
    
    useEffect(() => {
        if (userId)
        getUserData(userId);            
      }, [userId]);
   

    const handleEditUserData = async (e) => {       

        e.preventDefault();        

        try {

            const response = await axios.post(
                USER_GET_URL,
                JSON.stringify({
                        userName,
                        userFirstName,
                        userPhone,
                        userMobile,
                        userEmail,
                        userAddress,
                        userDepartment,
                        userSkills,
                        companyType,
                        companyTva,
                        pricePresentielDaily,
                        pricePresentielHalfDay,
                        pricePresentielRayonAction,
                        priceDistancielDaily,
                        priceDistancielHalfDay,
                        priceTransport,
                        comment
                    }),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: false
                    }
                );

            console.log(response?.data);
        }
        catch(err){ 

            console.error(err);     // NOTE - use "error.response.data` (not "error")


        }

        

    }

    const handleLinkEdit = () => {
        const editLink = '/users/edit/' + userId
        navigate( editLink )
    }

    const handleLinkNew = () => {
        const newLink = '/users/create/'
        navigate( newLink )
    }

    const handleLinkList = () => {
        const listLink = '/users'
        navigate( listLink )
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
                        <Button onClick={handleLinkEdit}>Modifier</Button>
                        <Button onClick={handleLinkList}>Liste des Formateurs</Button>
                        <Button onClick={handleLinkNew}>Nouveau</Button>
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
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                    Prénom <span className="text-meta-1">*</span>
                                    </label>

                                    {userFirstName}
                                    <input
                                    type="text"
                                    id="user-firstname"
                                    onChange={(e) => setUserFirstName(e.target.value)}
                                    value={userFirstName}
                                    placeholder="Entrez le prénom"
                                    className="hidden w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    required
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                    Nom <span className="text-meta-1">*</span>
                                    </label>
                                    {userName}
                                    <input
                                    type="text"
                                    id="user-name"
                                    onChange={(e) => setUserName(e.target.value)}
                                    value={userName}
                                    placeholder="Entrer le nom"
                                    className="hidden w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    required
                                    />
                                </div>
                            </div>
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Tél. <span className="text-meta-1">*</span>
                                </label>
                                {userPhone}
                                <input
                                    type="text"
                                    id="user-phone"
                                    onChange={(e) => setUserPhone(e.target.value)}
                                    value={userPhone}
                                    placeholder="Téléphone"
                                    className="hidden w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    required
                                />
                            </div>
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Portable
                                </label>
                                {userMobile}
                                <input
                                    type="text"
                                    id="user-mobile"
                                    onChange={(e) => setUserMobile(e.target.value)}
                                    value={userMobile}
                                    placeholder="Téléphone"
                                    className="hidden w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div> 
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Email <span className="text-meta-1">*</span>
                                </label>
                                {userEmail}
                                <input
                                    type="email"
                                    id="user-email"
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    value={userEmail}
                                    placeholder="Enter your email address"
                                    className="w-full hidden rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    required
                                />
                            </div>                                                               
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Adresse complète <span className="text-meta-1">*</span>
                                </label>
                                {userAddress}
                                <input
                                    type="text"
                                    id="user-address"
                                    onChange={(e) => setUserAddress(e.target.value)}
                                    value={userAddress}
                                    placeholder="Adresse / CP / Ville"
                                    className="w-full hidden rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    required
                                />
                            </div>  
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Département
                                </label>
                                {userDepartment}
                                <input
                                    type="text"
                                    id="user-department"
                                    onChange={(e) => setUserDepartment(e.target.value)}
                                    value={userDepartment}
                                    placeholder="Département"
                                    className="w-full hidden rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>       
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Lien Google map <Link to={formatGMapLink(userAddress)} target="_blank"><InsertLinkIcon /></Link>
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
                            {/* <!-- Toggle switch input --> */}
                            <div>
                                <div className="border-b border-stroke py-4  dark:border-strokedark">
                                    <h3 className="font-medium text-black dark:text-white">
                                        Certifié Qualiopi :  {certifiedQualiopi ? "Oui": "Non"}
                                    </h3>
                                </div>
                                <div className="flex flex-col gap-5.5 p-6.5">                                    
                                   
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
                                {companyType}
                            </div>     

                            <div className="mb-4.5">
                                <div className="flex flex-col gap-5.5 p-6.5">
                                                                                                         
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
                                    {pricePresentielDaily}
                                    <input 
                                        onChange={(e) => setPricePresentielDaily(e.target.value)}
                                        value={pricePresentielDaily}
                                        placeholder="Tarif journalier"
                                        className="bg-gray-200 hidden appearance-none border-[1.5px] border-stroke bg-transparent w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" />
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                <label className="block mb-1 md:mb-0 pr-4">
                                    Demi-journalier
                                </label>
                                </div>
                                <div className="md:w-2/3">
                                    {pricePresentielHalfDay}
                                    <input 
                                        onChange={(e) => setPricePresentielHalfDay(e.target.value)}
                                        value={pricePresentielHalfDay}
                                        placeholder="Tarif demi-journée" 
                                        className="bg-gray-200 hidden appearance-none border-[1.5px] border-stroke bg-transparent w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" 
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
                                    {pricePresentielRayonAction}
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
                                    {priceDistancielDaily}
                                    <input 
                                        onChange={(e) => setPriceDistancielDaily(e.target.value)}
                                        value={priceDistancielDaily}
                                        placeholder="Tarif journalier" 
                                        className="bg-gray-200 hidden appearance-none border-[1.5px] border-stroke bg-transparent w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" 
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
                                    {priceDistancielHalfDay}
                                    <input 
                                        onChange={(e) => setPriceDistancielHalfDay(e.target.value)}
                                        value={priceDistancielHalfDay}
                                        placeholder="Tarif demi-journée" 
                                        className="bg-gray-200 hidden appearance-none border-[1.5px] border-stroke bg-transparent w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" />
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
                            {parse(comment)}
                        </div>

                        <div>
                            
                        </div>
                    </div>
                </div>

            </div>
        </form>
        </>

    )

}

export default DataFicheUser