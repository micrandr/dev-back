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
import Editor from "./Fields/Editor";
import { formatGMapLink } from "../common/Utils";
//import ReactQuill from 'react-quill';
//import 'react-quill/dist/quill.snow.css';


// const REGISTER_URL = '/rooms';

const DataEditRoom = () => {

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
                setRoomHourPrice(response.data.roomHourPrice)
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
                setCommonComment(response.data.commonComment)        
                setTrainComment(response.data.trainComment)
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
                        roomEquipmentPaperboard,
                        carComment,
                        commonComment,
                        trainComment,
                        drinkComment,
                        restoreComment
                    })
            RoomDataService.update(roomId, roomDataEdited)
                .then( (response)=>{

                    toast.success("Mise à jour bien effectuée")
                    navigate('/rooms')
                    
                    
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

    const handleLinkPreview = () => {
        const linkPreview = '/rooms/fiche/' + roomId
        navigate(linkPreview)
    }

    const handleLinkList = () => {
        const linkList = '/rooms'
        navigate(linkList)
    }

    const handleCarAccess = ( e ) => {
        if(e.target.checked){
            setOpenCar(true)
        }else{
            setOpenCar(false)
        }
    }

    const handleCommonAccess = ( e ) => {
        if(e.target.checked){
            setOpenCommon(true)
        }else{
            setOpenCommon(false)
        }
    }  

    const handleTrainAccess = ( e ) => {
        if(e.target.checked){
            setOpenTrain(true)
        }else{
            setOpenTrain(false)
        }
    }    

    const handleDrinkAccess = ( e ) => {
        if(e.target.checked){
            setOpenDrink(true)
        }else{
            setOpenDrink(false)
        }
    }   
    
    const handleRestoreAccess = ( e ) => {
        if(e.target.checked){
            setOpenRestore(true)
        }else{
            setOpenRestore(false)
        }
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
                        <Button onClick={handleLinkPreview}>Visualiser</Button>
                        <Button onClick={handleLinkList}>Liste des salles</Button>
                        <Button type="submit">Enregistrer</Button>
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
                                <input
                                    type="text"
                                    id="room-name"
                                    onChange={(e) => setRoomLabel(e.target.value)}
                                    value={roomLabel}
                                    placeholder="Nom de la salle"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    required
                                />
                            </div>
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">                                
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                    Place Mini
                                    </label>
                                    <input
                                    type="text"                                    
                                    onChange={(e) => setRoomMinPlace(e.target.value)}
                                    value={roomMinPlace}
                                    placeholder="Place minimum"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                    Place Maxi
                                    </label>
                                    <input
                                    type="text"
                                    id="user-name"
                                    onChange={(e) => setRoomMaxPlace(e.target.value)}
                                    value={roomMaxPlace}
                                    placeholder="Place Maximum"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>
                            </div>
                            
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Adresse complète
                                </label>
                                <input
                                    type="text"
                                    id="user-phone"
                                    onChange={ (e) => { setRoomAddress(e.target.value); handleGoogleMapLink(e) }}
                                    value={roomAddress}
                                    placeholder="Téléphone"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Département
                                </label>
                                <input
                                    type="text"
                                    id="user-mobile"
                                    onChange={(e) => setRoomDepartment(e.target.value)}
                                    value={roomDepartment}
                                    placeholder="Département"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
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
                                    <input
                                    type="text"
                                    id="user-firstname"
                                    onChange={(e) => setRoomCoordinateLongitude(e.target.value)}
                                    value={roomCoordinateLongitude}
                                    placeholder="Entrez la longitude"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                    Latitude
                                    </label>
                                    <input
                                    type="text"
                                    id="user-name"
                                    onChange={(e) => setRoomCoordinateLattitude(e.target.value)}
                                    value={roomCoordinateLattitude}
                                    placeholder="Entrer la lattitude"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>
                            </div>                            
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Lien Google Map <Link to={formatGMapLink(roomAddress)} target="_blank"><InsertLinkIcon /></Link>
                                </label>                               
                            </div>   

                            <div className="mb-4.5">
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox defaultChecked />} label="Accès Handicapé" />
                                </FormGroup>  
                            </div> 


                            
                            <div className="mb-4.5">
                                <h3 className="mb-2.5 block text-black dark:text-white">
                                    Commentaire (salle)
                                </h3>
                                {/* <ReactQuill theme="snow" value={roomComment} onChange={setRoomComment} /> */}
                                <Editor data={roomComment} onChange={setRoomComment} />
                                
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
                                    <input 
                                        onChange={(e) => setRoomContactFullname(e.target.value)}
                                        value={roomContactFullname}
                                        placeholder="Entrez nom complet" className="bg-gray-200 appearance-none border-[1.5px] border-stroke bg-transparent w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" />
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                <label className="block  mb-1 md:mb-0 pr-4">
                                    Fonction
                                </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input 
                                        onChange={(e) => setRoomContactOccupation(e.target.value)}
                                        value={roomContactOccupation}
                                        placeholder="Intitulé du contact" className="bg-gray-200 appearance-none border-[1.5px] border-stroke bg-transparent w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" />
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                <label className="block mb-1 md:mb-0 pr-4">
                                    Téléphone
                                </label>
                                </div>
                                <div className="md:w-2/3">                                    
                                    <input 
                                        onChange={(e) => setRoomContactPhone(e.target.value)}
                                        value={roomContactPhone}
                                        placeholder="Standard" 
                                        className="bg-gray-200 appearance-none border-[1.5px] border-stroke bg-transparent w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" 
                                    />
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                <label className="block mb-1 md:mb-0 pr-4">
                                    Télé Ligne Direct
                                </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input 
                                        onChange={(e) => setRoomContactDirectLine(e.target.value)}
                                        value={roomContactDirectLine}
                                        placeholder="Ligne direct" 
                                        className="bg-gray-200 appearance-none border-[1.5px] border-stroke bg-transparent w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" 
                                    />
                                </div>
                            </div>                                                                                                              
                        </div>     
                        <div className="mb-4.5 px-5 mt-5">
                            <h3 className="mb-2.5 block text-black dark:text-white">
                                Commentaire (contact)
                            </h3>
                            {/* <ReactQuill theme="snow" value={roomContactComment} onChange={setRoomContactComment} /> */}
                            <Editor data={roomContactComment} onChange={setRoomContactComment} />
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
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox defaultChecked />} label="Accès Internet" />
                                    <FormControlLabel control={<Checkbox />} label="Video projecteur" />
                                    <FormControlLabel control={<Checkbox />} label="Ecran tactile" />
                                    <FormControlLabel control={<Checkbox />} label="Paperboard" />

                                    <FormControlLabel control={<Checkbox checked={(openCar)?true:false} onChange={handleCarAccess} />} label="Accès voiture"  />
                                    {/* <ReactQuill theme="snow" value={carComment} className={`${openCar? "block": "hidden"} text-[20px]`} /> */}
                                    <FormControlLabel control={<Checkbox checked={(openCommon)?true:false} onChange={handleCommonAccess} />} label="Accès transport en commun"  />
                                    {/* <ReactQuill theme="snow" value={commonComment} className={`${openCommon? "block": "hidden"} text-[20px]`} /> */}
                                    <FormControlLabel control={<Checkbox checked={(openTrain)?true:false} onChange={handleTrainAccess} />} label="Accès train"  />
                                    {/* <ReactQuill theme="snow" value={trainComment} className={`${openTrain? "block": "hidden"} text-[20px]`} /> */}
                                    <FormControlLabel control={<Checkbox checked={(openDrink)?true:false} onChange={handleDrinkAccess}  />} label="Distributeur de boisson"  />
                                    {/* <ReactQuill theme="snow" value={drinkComment} className={`${openDrink? "block": "hidden"} text-[20px]`} /> */}
                                    <FormControlLabel control={<Checkbox checked={(openRestore)?true:false} onChange={handleRestoreAccess} />} label="Distributeur de restauration"  />
                                    {/* <ReactQuill theme="snow" value={restoreComment} className={`${openRestore? "block": "hidden"} text-[20px]`} /> */}
                                </FormGroup>                                                                            
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
                                    <input 
                                        onChange={(e) => setRoomDailyPrice(e.target.value)}
                                        value={roomDailyPrice}
                                        placeholder="Tarif journalier" className="bg-gray-200 appearance-none border-[1.5px] border-stroke bg-transparent w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" />
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                <label className="block mb-1 md:mb-0 pr-4">
                                    Prix Demi-journée
                                </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input 
                                        onChange={(e) => setRoomHalfDayPrice(e.target.value)}
                                        value={roomHalfDayPrice}
                                        placeholder="Tarif demi-journée" 
                                        className="bg-gray-200 appearance-none border-[1.5px] border-stroke bg-transparent w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" 
                                    />
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                <label className="block mb-1 md:mb-0 pr-4">
                                    Tarif par heure
                                </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input 
                                        onChange={(e) => setRoomHourPrice(e.target.value)}
                                        value={roomHourPrice}
                                        placeholder="Tarif par heure de la salle si applicable" 
                                        className="bg-gray-200 appearance-none border-[1.5px] border-stroke bg-transparent w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" 
                                    />
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
                                {/* <textarea
                                    onChange={(e) => setRoomRestoDistributorComment(e.target.value)}
                                    value={roomRestoDistributorComment}
                                    rows={1}
                                    placeholder="Commentaire restauration"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    ></textarea>                                                                               */}
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

export default DataEditRoom;