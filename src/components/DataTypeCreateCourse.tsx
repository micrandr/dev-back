import { useRef, useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast"
import CourseService from "../services/CourseServices"
import slugify from "slugify";
import Select from 'react-select'

const typeActiveList =  [ 
    { value: "none", label: "Selectionner" }, 
    { value: 1, label: "Activé" }, 
    { value: 0, label: "Desactivé" }
]


const DataTypeCreateCourse = () => {

    const navigate = useNavigate();

    const [courseTypeLabel, setCourseTypeLabel] = useState('');
    const [courseTypeStatus, setCourseTypeStatus] = useState(''); 
    const [courseTypeDescription, setCourseTypeDescription] = useState(''); 
    const [courseTypeSlug, setCourseTypeSlug] = useState(''); 

    const handleCreateCourseTypeData = async (e) => {

        e.preventDefault();        

        try {

            const courseTypeData = JSON.stringify(
                { 
                    courseTypeLabel,
                    courseTypeDescription,
                    courseTypeSlug,
                    courseTypeStatus
                }
            )
            
            CourseService.createType(courseTypeData)
                .then( (response) => {
                    
                    if ( response.status == 200 || response.status == 201 ) {
                        toast.success("Type de programme bien créé")
                        navigate( '/courses/types/' )
                    }
                    
                })
                .then( (error) => {
                    console.log( error )
                })
            
           
        }
        catch(err){ 

            console.error(err);     // NOTE - use "error.response.data` (not "error")

        }

        

    }

    const handleChangeCourseTypeStatus = (e) => {        
        setCourseTypeStatus( e.value )
    }

    return (

        <>
        <form action="#" onSubmit={handleCreateCourseTypeData}>
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
                                Informations type de formation
                            </h3>
                        </div>
                        
                        <div className="p-6.5">
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Libellé <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="course-type-label"
                                    onChange={(e) => { setCourseTypeLabel(e.target.value); setCourseTypeSlug(slugify(e.target.value.toLowerCase()))}}
                                    value={courseTypeLabel}
                                    placeholder="Libellé du type du programme"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    required
                                />
                            </div>

                            <div className="mb-4.5">         
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Slug <span className="text-meta-1">*</span>
                                </label>                       
                                <input
                                    type="text"
                                    id="course-type-slug"     
                                    name="course-type-slug"
                                    onChange={ (e) => setCourseTypeSlug(e.target.value)}                               
                                    value={courseTypeSlug}
                                    placeholder="Slug"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"                                                                        
                                />
                            </div>
                        

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Status
                                </label>
                                <div className="relative z-20 bg-transparent dark:bg-form-input">
                                    <Select 
                                        options={typeActiveList}                                         
                                        onChange={handleChangeCourseTypeStatus}
                                    />
                                </div>
                            </div>   

                            <div className="mb-4.5">         
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Description
                                </label>                       
                                <input
                                    type="text"
                                    id="course-type-description"     
                                    name="course-type-description"
                                    onChange={ (e) => setCourseTypeDescription(e.target.value)}                               
                                    value={courseTypeDescription}
                                    placeholder="Description"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"                                                                        
                                />
                            </div>
                             
                        </div>      
                        
                                          
                    </div>                    
                </div>

                <div className="flex flex-col gap-9">

                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Plus d'infos
                            </h3>
                        </div>      

                        <div className="p-6.5">       

                            <div className="mb-4.5">
                                <p>Cap Numérique propose plusieurs types de programme de formation dont des présentiels, à distance, mixte.</p>
                            </div>  

                        </div>
                        
                    </div>  
                </div>

            </div>
        </form>
        </>

    )

}

export default DataTypeCreateCourse