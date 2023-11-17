import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from 'react-hot-toast';
import CourseService from '../services/CourseServices';
import Select from "react-select";
import slugify from "slugify";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const levelCourseList =  [ 
    { value: "none", label: "Selectionner" }, 
    { value: "beginner", label: "Débutant" }, 
    { value: "intermediate", label: "Intérmediaire" },
    { value: "confirmed", label: "Confirmé" }
]

const typeCourseList =  [ 
    { value: "none", label: "Selectionner" }, 
    { value: "presentiel", label: "Formation en présentiel - FP" }, 
    { value: "distanciel", label: "Formation à distance - Visio - FOAD" },
    { value: "e-learning", label: "e-Learning" },
    { value: "blended-learning", label: "Blended Learning" }
]

const publicTargetList = [ 
    { value: "none", label: "Selectionner" }, 
    { value: "particulier", label: "Particulier" }, 
    { value: "entreprise", label: "Entreprise" },
    { value: "particulier-entreprise", label: "Particulier / Entreprise" }
]

const categoryCourseList = [ 
    { value: "none", label: "Selectionner" }, 
    { value: "marches-publics", label: "Marches Publics" }, 
    { value: "dao", label: "DAO" },
    { value: "bureautique", label: "Bureautique" },
    { value: "comptabilite", label: "Comptabilité" }
]

const DataEditCourse = () => {

    const navigate = useNavigate();
    const params = useParams();
    const courseId = params.id;

    const initialCourseDataState = {
        id: null,
        courseName: "",
        courseCategory: "",
        courseDuration: "",
        courseAddress: "",
        courseComment: "",
      };

    const [courseData, setCourseData] = useState(initialCourseDataState);
    const [currentCourse, setCurrentCourse] = useState(initialCourseDataState);    

    const [courseName, setCourseName] = useState('');
    const [courseSlug, setCourseSlug] = useState('');
    const [courseType, setCourseType] = useState('');    
    const [courseLevel, setCourseLevel] = useState('');
    const [coursePrice, setCoursePrice] = useState('');   
    const [courseCategory, setCourseCategory] = useState('');       
    const [courseComment, setCourseComment] = useState('');   
    const [courseDuration, setCourseDuration] = useState('');    
    const [courseTarget, setCourseTarget] = useState('');  
    const [courseLocation, setCourseLocation] = useState('');
    const [courseProgram, setCourseProgram] = useState('');
    const [courseSupport, setCourseSupport] = useState('');
    const [courseRequirement, setCourseRequirement] = useState('');    
    const [courseSkills, setCourseSkills] = useState('');


    const getCourseData = courseId => {
        
        CourseService.get(courseId)
        .then(  response => {            
            setCourseData(response.data);       
            setCurrentCourse(response.data);            
            setCourseName(response.data.courseName)
            setCourseSlug(response.data.courseSlug)
            setCourseType(response.data.courseType)
            setCourseLevel(response.data.courseLevel)
            setCourseTarget(response.data.courseTarget)
            setCoursePrice(response.data.coursePrice)
            setCourseDuration(response.data.courseDuration)
            setCourseLocation(response.data.courseLocation)
            setCourseCategory(response.data.courseCategory)            
            setCourseRequirement(response.data.courseRequirement)            
            setCourseComment(response.data.courseComment)            
            setCourseSkills(response.data.courseSkills)
            setCourseProgram(response.data.courseProgram)            
            setCourseSupport(response.data.courseSupport)
            
        })

        

    }

    useEffect(() => {
        
        if (courseId) {
            getCourseData(courseId);            
        }
        
      }, [courseId]);

    const handleCourseType = (e) => {
        setCourseType( e.value )
    }

    const handleCourseTarget = (e) => {
        setCourseTarget( e.value )
    } 
    
    const handleCourseLevel = (e) => {
        console.log( "courseLevel=" )
        console.log( courseLevel )
        setCourseLevel( e.value )
    } 

    const handleCourseCategories = (e) => {
        setCourseCategory( e.value )
    }

    const handleChangeCourseProgram = (e) => {
        e.preventDefault()
        
        let file = e.target.files[0].name
        if (file!=''){
            setCourseProgram( file )
        }
    }


    const handleChangeCourseSupport = (e) => {
        e.preventDefault()
        
        let file = e.target.files[0].name
        if (file!=''){
            setCourseSupport( file )
        }
    }
   

    const handleCreateCourseData = async (e) => {

        e.preventDefault();        

        try {            

            const courseUpdateData = JSON.stringify({
                courseName,
                courseType,
                courseLevel,                
                courseCategory,                        
                coursePrice,
                courseDuration, 
                courseLocation,                
                courseSlug,
                courseRequirement,
                courseProgram,
                courseSupport,
                courseTarget
            })

            CourseService.update(courseId, courseUpdateData)
                .then( (response) => {
                    if(response.status == 200 || response.status==201){
                        toast.success("Enregistrement bien appliqué")
                        // navigate('/courses')
                    }
                    
                })
                .then( (error) => {
                    // toast.error(error)
                })
            
        }
        catch(err){ 

            console.log(err)
        }

        

    }

    return (

        <>
        <form action="#" onSubmit={handleCreateCourseData}>
            <div className="flex justify-between">
                <div className="flex"></div>
                <div className="flex">
                    <button className="flex w-100 mr-2 mb-2 justify-center rounded bg-primary p-3 font-medium text-gray">Enregistrer</button>
                </div>
            </div>
            {/* <div className="flex grid-cols-1 gap-9 sm:grid-cols-2">*/}
            <div className="grid grid-cols-2 bg-white p-5">

                <div className="flex flex-col gap-9 mr-4 h-full">

                    <div className="rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Informations générales
                            </h3>
                        </div>
                        
                        <div className="p-6.5">
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Nom du programme de formation
                                </label>
                                <input
                                    type="text"
                                    id="course-name"
                                    onChange={(e) => { setCourseName(e.target.value); setCourseSlug( slugify(e.target.value.toLowerCase()) ) } }
                                    value={courseName}
                                    placeholder="Nom du programme de formation"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Slug
                                </label>
                                <input
                                    type="text"
                                    id="course-slug"
                                    onChange={(e) => setCourseSlug(e.target.value) }
                                    value={courseSlug}
                                    placeholder="Slug"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>
                        

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Type de formation
                                </label>
                                <Select 
                                    options={typeCourseList} 
                                    value = {
                                        typeCourseList.filter(option => 
                                           option.value === courseType )
                                     }
                                    onChange={handleCourseType}
                                    
                                />
                            </div>  

                            
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Catégories de formation
                                </label>
                                <Select 
                                    options={categoryCourseList} 
                                    value = {
                                        categoryCourseList.filter(option => 
                                           option.value === courseCategory )
                                     }
                                    onChange={handleCourseCategories}
                                    
                                />
                            </div>  
                            

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Niveau
                                </label>
                                <Select 
                                    options={levelCourseList}
                                    onChange={handleCourseLevel}
                                    value = {
                                        levelCourseList.filter(option => 
                                        option.value === courseLevel )
                                    }
                                />
                                
                            </div>       
                        </div>
                    </div>  

                    <div className="mt-2 rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Conditions & cibles
                            </h3>
                        </div>
                        
                        <div className="p-6.5">
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Prérequis
                                </label>
                                <textarea                                    
                                    id="course-prerequis"
                                    onChange={(e) => setCourseRequirement(e.target.value)}
                                    value={currentCourse?.courseRequirement}
                                    placeholder="Prérequis"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                ></textarea>
                            </div>
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Publics visés
                                </label>
                                <Select 
                                    options={publicTargetList}
                                    value = {
                                        publicTargetList.filter(option => 
                                           option.value === courseTarget )
                                     }
                                    onChange={handleCourseTarget}
                                />
                            </div>
                        </div>
                       
                    </div>
                    
                </div>

                <div className="flex flex-col h-full">
                    <div className="rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Détails du programme de formation
                            </h3>
                        </div>
                        <div className="p-6.5">
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Tarif
                                </label>
                                <input
                                    type="text"
                                    id="course-price"
                                    onChange={(e) => setCoursePrice(e.target.value)}
                                    value={coursePrice}
                                    placeholder="Tarif"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Lieu
                                </label>
                                <input
                                    type="text"
                                    id="course-location"
                                    name="course-location"
                                    onChange={(e) => setCourseLocation(e.target.value)}
                                    value={courseLocation}
                                    placeholder="Lieu de formation"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Durée
                                </label>
                                <input
                                    type="number"
                                    id="course-duration"
                                    onChange={(e) => setCourseDuration(e.target.value)}
                                    value={courseDuration}
                                    placeholder="Durée de la formation"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div> 
                    
                            
                        </div>
                    </div>


                    <div className="mt-5 rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Fichiers du programme
                            </h3>
                        </div>
                        <div className="p-6.5">
                             {courseProgram ? (

                                <>
                                Fichier programme de formation :
                                <Link to="#"><PictureAsPdfIcon className="m-2" /></Link>
                                </>
                             ):(<div></div>)} 
                             
                             {courseSupport ? (

                                <div>
                                    Support de formation : <Link to="#"><PictureAsPdfIcon className="m-2" /></Link>
                                </div>

                             ):(
                                <div></div>
                             )}

                            
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Programme
                                </label>
                                <input
                                    type="file"                                    
                                    id="course-programme"
                                    onChange={handleChangeCourseProgram}                                    
                                    placeholder="Programme"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Support
                                </label>
                                <input
                                    type="file"
                                    id="course-support"
                                    accept="image/png, image/jpg, application/pdf, application/docx"
                                    onChange={handleChangeCourseSupport}                                    
                                    placeholder="Support"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>
                            
                        </div>
                    </div>

                    
                </div>


                

            </div>
        </form>
        </>

    )

}

export default DataEditCourse