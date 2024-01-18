import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SwitcherHandicap from './SwitcherHandicap';
import SwitcherAccessCar from './SwitcherAccessCar';
// import axios from '../api/axios';
import { toast } from "react-hot-toast";
import RoomDataService from "../services/RoomServices";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { formatGMapLink } from "../common/Utils";
import parse from 'html-react-parser'
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';


// const REGISTER_URL = '/rooms';

const DataFicheRoom = () => {

    const navigate = useNavigate();
    const params = useParams();
    const roomId = params.id;

    const [roomLabel, setRoomLabel] = useState('');
    const [roomMinPlace, setRoomMinPlace] = useState('');
    const [roomMaxPlace, setRoomMaxPlace] = useState('');
    const [roomAddress, setRoomAddress] = useState('');
    const [roomDepartment, setRoomDepartment] = useState('');
    const [roomCoordinateLongitude, setRoomCoordinateLongitude] = useState('');
    const [roomCoordinateLattitude, setRoomCoordinateLattitude] = useState('');
    const [roomGmapLink, setRoomGmapLink] = useState('');    
    const [roomEquipments, setRoomEquipments] = useState('');
    const [roomEquipmentInternetAccess, setRoomEquipmentInternetAccess] = useState('');
    const [roomEquipmentVideoProjector, setRoomEquipmentVideoProjector] = useState('');
    const [roomEquipmentTouchScreen, setRoomEquipmentTouchScreen] = useState('');
    const [roomEquipmentPaperboard, setRoomEquipmentPaperboard] = useState('');
    const [roomPriceHT, setRoomPriceHT] = useState('');
    const [roomTvaRate, setRoomTvaRate] = useState('');
    const [roomHourPrice, setRoomHourPrice] = useState('');
    const [roomDailyPrice, setRoomDailyPrice] = useState('');
    const [roomHalfDayPrice, setRoomHalfDayPrice] = useState('');
    const [roomHours, setRoomHours] = useState('');
    const [roomHourlyPrice, setRoomHourlyPrice] = useState('');
    const [roomComment, setRoomComment] = useState('');
    const [roomHandicap, setRoomHandicap] = useState('');
    const [roomContactFullname, setRoomContactFullname] = useState('');
    const [roomContactOccupation, setRoomContactOccupation] = useState('');
    const [roomContactPhone, setRoomContactPhone] = useState('');
    const [roomContactDirectLine, setRoomContactDirectLine] = useState('');
    const [roomContactEmail, setRoomContactEmail] = useState('');
    const [roomContactComment, setRoomContactComment] = useState('');
    const [roomCommentAccess, setRoomCommentAccess] = useState('');
    const [roomCarAccess, setRoomCarAccess] = useState('');
    const [roomCarAccessComment, setRoomCarAccessComment] = useState('');
    const [roomCommonTransport, setRoomCommonTransport] = useState('');
    const [roomCommonTransportComment, setRoomCommonTransportComment] = useState('');
    const [roomTrainAccess, setRoomTrainAccess] = useState('');
    const [roomTrainAccessComment, setRoomTrainAccessComment] = useState('');
    const [roomDrinkDistributor, setRoomDrinkDistributor] = useState('');
    const [roomDrinkDistributorComment, setRoomDrinkDistributorComment] = useState('');
    const [roomRestoDistributor, setRoomRestoDistributor] = useState('');
    const [roomRestoDistributorComment, setRoomRestoDistributorComment] = useState('');

    const [openCar, setOpenCar] = useState(false)
    const [carComment, setCarComment] = useState('')

    const [openCommon, setOpenCommon] = useState(false)
    const [commonComment, setCommonComment] = useState('')

    const [openTrain, setOpenTrain] = useState(false)
    const [trainComment, setTrainComment] = useState('')

    const [openDrink, setOpenDrink] = useState(false)
    const [drinkComment, setDrinkComment] = useState('')

    const [openRestore, setOpenRestore] = useState(false)
    const [restoreComment, setRestoreComment] = useState('')

    const getRoomData = (id:string) => {
        
        RoomDataService.get(id)
            .then(  response => {
                setRoomLabel(response.data.roomLabel)  
                setRoomMinPlace(response.data.roomMinPlace)
                setRoomMaxPlace(response.data.roomMaxPlace)
                setRoomAddress(response.data.roomAddress)
                setRoomCoordinateLongitude(response.data.roomCoordinateLongitude)
                setRoomCoordinateLattitude(response.data.roomCoordinateLattitude)
                setRoomDepartment(response.data.roomDepartment)
                setRoomGmapLink(response.data.roomGmapLink)
                setRoomPriceHT(response.data.roomPriceHT)
                setRoomHourPrice(response.data.roomHourPrice)
                setRoomDailyPrice(response.data.roomDailyPrice)
                setRoomHalfDayPrice(response.data.roomHalfDayPrice)
                setRoomHourlyPrice(response.data.roomHourlyPrice)
                setRoomHandicap(response.data.roomHandicap)
                setRoomComment(response.data.roomComment)
                setRoomAddress(response.data.roomAddress)
                setRoomAddress(response.data.roomAddress)
                setRoomContactFullname(response.data.roomContactFullname)
                setRoomContactOccupation(response.data.roomContactOccupation)
                setRoomContactPhone(response.data.roomContactPhone)
                setRoomContactDirectLine(response.data.roomContactDirectLine)
                setRoomContactComment(response.data.roomContactComment)
                setRoomEquipmentInternetAccess(response.data.roomEquipmentInternetAccess)
                setRoomEquipmentVideoProjector(response.data.roomEquipmentVideoProjector)
                setRoomEquipmentTouchScreen(response.data.roomEquipmentTouchScreen)
                setRoomEquipmentPaperboard(response.data.roomEquipmentPaperboard)          
                setCarComment(response.data.carComment) 
                setTrainComment(response.data.trainComment) 
                setCommonComment(response.data.commonComment) 
                setDrinkComment(response.data.drinkComment) 
                setRestoreComment(response.data.restoreComment) 
                
            })

        

    }
    
    useEffect(() => {
        if (roomId) {
            getRoomData(roomId);
        }
        
      }, [roomId]);      

    const handleCreateRoomData = async (e) => {

        e.preventDefault();        

        try {


            const roomDataEdited = JSON.stringify({
                        roomLabel,
                        roomMinPlace,
                        roomMaxPlace,
                        roomAddress,
                        roomDepartment,
                        roomCoordinateLongitude,
                        roomCoordinateLattitude,
                        roomGmapLink,
                        roomEquipments,
                        roomPriceHT,
                        roomTvaRate,
                        roomHourPrice,
                        roomDailyPrice,
                        roomHalfDayPrice,
                        roomHours,
                        roomComment,
                        roomHandicap,
                        roomContactFullname,
                        roomContactOccupation,
                        roomContactPhone,
                        roomContactDirectLine,
                        roomContactEmail,
                        roomContactComment,
                        roomCommentAccess,
                        roomCarAccess,
                        roomCommonTransport,
                        roomCommonTransportComment,
                        roomTrainAccess,
                        roomTrainAccessComment,
                        roomDrinkDistributor,
                        roomDrinkDistributorComment,
                        roomRestoDistributor,
                        roomRestoDistributorComment,
                        roomEquipmentInternetAccess,
                        roomEquipmentVideoProjector,
                        roomEquipmentTouchScreen,
                        roomEquipmentPaperboard
                    })
            RoomDataService.update(roomId, roomDataEdited)
                .then( (response)=>{

                    toast.success("Mise à jour bien effectuée")
                    // navigate('/rooms')                    
                    
                })
                .then((error)=>{
                    console.log("Erreur lors de la maj " + error)
                })
           
        }
        catch(err){ 

            console.error(err);     // NOTE - use "error.response.data` (not "error")


        }

        

    }

    const handleGoogleMapLink = (e) => {

        const gLinkFirst = 'https://www.google.com/maps/place/'
        setRoomAddress(e.target.value);
        const addressValue  = e.target.value;
        const gLink = gLinkFirst+encodeURIComponent(addressValue);        

        console.log(gLink)
        
        //setUserGMapLink(gLink)
        setRoomGmapLink(gLink)

    }

    const handleLinkEdit = () => {
        const linkEdit = '/rooms/edit/' + roomId
        navigate(linkEdit)
    }

    const handleLinkList = () => {
        const linkList = '/rooms'
        navigate(linkList)
    }

    const handleLinkNew = () => {
        const linkNew = '/rooms/create/'
        navigate(linkNew)
    }

    
    return (

        <>
        <form action="#" onSubmit={handleCreateRoomData}>
        <div className="flex justify-between mb-3">
                <div className="flex p-2">
                   
                </div>
                <div className="flex">
                    {/**<button className="flex w-100 mr-2 mb-2 justify-center rounded bg-primary p-3 font-medium text-gray">Enregistrer</button>*/}
                    <ButtonGroup
                        disableElevation
                        variant="contained"
                        aria-label="Disabled elevation buttons"
                    >
                        <Button onClick={handleLinkEdit}>Editer</Button>
                        <Button onClick={handleLinkList}>Liste des salles de formation</Button>
                        <Button onClick={handleLinkNew}>Nouveau</Button>
                    </ButtonGroup>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 bg-white p-3">

                <div className="flex flex-col gap-9 ">

                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Informations générales
                            </h3>
                        </div>
                        
                        <div className="p-6.5">
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Nom de la salle de formation <span className="text-meta-1">*</span>
                                </label>
                                {roomLabel}
                            </div>
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">                                
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                    Place Mini
                                    </label>
                                    {roomMinPlace}
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                    Place Maxi
                                    </label>
                                    {roomMaxPlace}
                                </div>
                            </div>
                            
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Adresse complète
                                </label>
                                {roomAddress}
                            </div>
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Département
                                </label>
                                {roomDepartment}
                            </div> 
                            <div className="mb-4.5 hidden">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Coordonnées GPS
                                </label>
                            </div>
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row hidden">                                
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                    Longitude
                                    </label>
                                    {roomCoordinateLongitude}
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                    Latitude
                                    </label>
                                    {roomCoordinateLattitude}
                                </div>
                            </div>                            
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Lien Google Map <Link to={formatGMapLink(roomAddress)} target="_blank"><InsertLinkIcon /></Link>
                                </label>                               
                            </div>   

                            <div className="mb-4.5">
                                {/* <FormGroup>
                                    <FormControlLabel control={<Checkbox defaultChecked />} label="Accès Handicapé" />
                                </FormGroup> */}
                            </div> 


                            
                            <div className="mb-4.5">
                                <h3 className="mb-2.5 block text-black dark:text-white">
                                    Commentaire (salle)
                                </h3>
                                {roomComment}
                                
                            </div>
                                                                        
                                
                        </div>                        
                    </div>

                    {/* <!-- Informations Contacts --> */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Informations de contact
                            </h3>
                        </div>
                        
                        <div className="flex flex-col gap-5.5 p-6.5 border border-stroke rounded mt-5 mx-5">
                            
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                <label className="block  mb-1 md:mb-0 pr-4">
                                    Nom complet
                                </label>
                                </div>
                                <div className="md:w-2/3">
                                    {roomContactFullname}
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                <label className="block  mb-1 md:mb-0 pr-4">
                                    Fonction
                                </label>
                                </div>
                                <div className="md:w-2/3">
                                {roomContactOccupation}
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                <label className="block mb-1 md:mb-0 pr-4">
                                    Téléphone
                                </label>
                                </div>
                                <div className="md:w-2/3">                                    
                                    {roomContactPhone}
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                <label className="block mb-1 md:mb-0 pr-4">
                                    Télé Ligne Direct
                                </label>
                                </div>
                                <div className="md:w-2/3">
                                    {roomContactDirectLine}
                                </div>
                            </div>                                                                                                              
                        </div>     
                        <div className="mb-4.5 px-5 mt-5">
                            <h3 className="mb-2.5 block text-black dark:text-white">
                                Commentaire (contact)
                            </h3>
                            {roomContactComment}
                            
                        </div>   
                                        
                    </div>   

                </div>

                

                <div className="flex flex-col gap-9">

                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Equipements mis à disposition dans la salle
                            </h3>
                        </div>      

                        <div>       

                            <div className="mb-4.5">
                                <div className="flex flex-col gap-5.5 p-6.5">
                                Accès Internet : {(roomEquipmentInternetAccess=="1")?"Oui":"Non"}<br />
                                Video projecteur : {(roomEquipmentVideoProjector=="1")?"Oui":"Non"}<br />
                                Ecran tactile : {(roomEquipmentTouchScreen=="1")?"Oui":"Non"}<br />
                                Paperboard : {(roomEquipmentPaperboard=="1")?"Oui":"Non"} <br />
                                Accès voiture : {carComment}<br />
                                Transport en commun : <br />
                                Accès Train : <br />
                                Distributeur boisson : <br />
                                Distributeur restauration : {}
                                {/* <FormGroup>
                                    <FormControlLabel control={<Checkbox defaultChecked />} label="Accès Internet" />
                                    <FormControlLabel control={<Checkbox />} label="Video projecteur" />
                                    <FormControlLabel control={<Checkbox />} label="Ecran tactile" />
                                    <FormControlLabel control={<Checkbox />} label="Paperboard" />
                                </FormGroup>                                                                             */}
                                </div>
                            </div>

                        </div>
                        
                    </div>  

                    {/* <!-- Textarea Fields --> */}
                    <div className="rounded-sm border border-stroke py-4 pb-6 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke pb-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Tarification de la salle
                            </h3>
                        </div>
                        
                        <div className="flex flex-col gap-5.5 p-6.5 border border-stroke rounded mt-5 mx-5">
                            
                            
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                <label className="block  mb-1 md:mb-0 pr-4">
                                    Prix HT
                                </label>
                                </div>
                                <div className="md:w-2/3">
                                {roomDailyPrice}
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                <label className="block mb-1 md:mb-0 pr-4">
                                    Prix Demi-journée
                                </label>
                                </div>
                                <div className="md:w-2/3">
                                 {roomHalfDayPrice}
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                <label className="block mb-1 md:mb-0 pr-4">
                                    Tarif par heure
                                </label>
                                </div>
                                <div className="md:w-2/3">
                                    {roomHourPrice}
                                </div>
                            </div>                                                                                                              
                        </div>                       
                    </div>                      

                    {/* <!-- Textarea Fields --> */}
                    <div className="rounded-sm border hidden border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Accessibilité
                            </h3>
                        </div>

                        <div className="mb-4.5">
                            <div className="flex flex-col gap-5.5 p-4.5">
                                <label className="block mb-1 md:mb-0 pr-4">
                                    Accès handicapé
                                </label>
                                <SwitcherHandicap />  
                                                                                                       
                            </div>
                        </div>

                        <div className="mb-4.5">
                            <div className="flex flex-col gap-5.5 p-6.5">
                                <label className="block mb-1 md:mb-0 pr-4">
                                    Accès voiture
                                </label>
                                <SwitcherAccessCar />                                                                          
                            </div>
                        </div>

                        <div className="mb-4.5">
                            <div className="flex flex-col gap-5.5 p-6.5">
                                <label className="block mb-1 md:mb-0 pr-4">
                                    Accès Transport en commun
                                </label>
                                <SwitcherHandicap /> 
                                <textarea
                                    onChange={(e) => setRoomTrainAccessComment(e.target.value)}
                                    value={roomTrainAccessComment}
                                    rows={1}
                                    placeholder="Commentaire transport en commun"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    ></textarea>                                                                              
                            </div>
                        </div>

                        <div className="mb-4.5">
                            <div className="flex flex-col gap-5.5 p-6.5">
                                <label className="block mb-1 md:mb-0 pr-4">
                                    Accès Train
                                </label>
                                <SwitcherHandicap /> 
                                <textarea
                                    onChange={(e) => setRoomTrainAccessComment(e.target.value)}
                                    value={roomTrainAccessComment}
                                    rows={1}
                                    placeholder="Commentaire accès train"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    ></textarea>                                                                              
                            </div>
                        </div>

                        <div className="mb-4.5">
                            <div className="flex flex-col gap-5.5 p-6.5">
                                <label className="block mb-1 md:mb-0 pr-4">
                                    Distributeur de boisson
                                </label>
                                <SwitcherHandicap /> 
                                <textarea
                                    onChange={(e) => setRoomDrinkDistributorComment(e.target.value)}
                                    value={roomDrinkDistributorComment}
                                    rows={1}
                                    placeholder="Commentaire boissons"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    ></textarea>                                                                              
                            </div>
                        </div>

                        <div className="mb-4.5">
                            <div className="flex flex-col gap-5.5 p-6.5">
                                <label className="block mb-1 md:mb-0 pr-4">
                                    Distributeur de restauration
                                </label>
                                <SwitcherHandicap /> 
                                <textarea
                                    onChange={(e) => setRoomRestoDistributorComment(e.target.value)}
                                    value={roomRestoDistributorComment}
                                    rows={1}
                                    placeholder="Commentaire restauration"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    ></textarea>                                                                              
                            </div>
                        </div>

                        <div className="flex flex-col gap-5.5 p-6.5">                                               

                            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                                Enregistrer
                            </button>

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

export default DataFicheRoom;