import { useRef, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import CourseService from "../services/CourseServices";
import Select from 'react-select'
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';


const dataCategoryStatus =  [ 
    { value: "none", label: "Selectionner" }, 
    { value: "1", label: "Activé" },
    { value: "0", label: "Desactivé" },
]

const DataCategoryCreateCourse = () => {

    const navigate = useNavigate();

    const [categoryName, setCategoryName] = useState('');
    const [categoryStatus, setCategoryStatus] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');

    const handleChangeCategoryStatus = (e) => {
        console.log(e.value)
        setCategoryStatus( e.value )
    }
   

    const handleCreateRoomData = async (e) => {

        e.preventDefault();        

        try {

            const dataCategory = JSON.stringify({
                categoryName,
                categoryDescription,
                categoryStatus,
            });

            CourseService.createCategory( dataCategory )
            .then( (response)=>{
                toast.success("Catégorie bien créée")
                navigate('/courses/categories')
            })
            .then( (error)=>{
                // toast.error(error)
            })
        }
        catch(err){ 

            console.error(err);     // NOTE - use "error.response.data` (not "error")


        }

        

    }

    const handleCategoriesList = (e) => {
        navigate('/courses/categories')
    }

    return (

        <>
        <form action="#" onSubmit={handleCreateRoomData}>
        <div className="flex justify-between mb-3">
                <div className="flex p-2">
                   
                </div>
                <div className="flex">
                    {/* <button className="flex w-100 mr-2 mb-2 justify-center rounded bg-primary p-3 font-medium text-gray">Enregistrer</button> */}
                    <ButtonGroup
                        disableElevation
                        variant="contained"
                        aria-label="Disabled elevation buttons"
                    >
                        <Button onClick={handleCategoriesList}>Liste des catégories</Button>
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
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Nom de la catégorie de formation <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="category-name"
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    value={categoryName}
                                    placeholder="Nom de la catégorie"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    required
                                />
                            </div>

                            
                            <div className="mb-4.5">
                                <h3 className="mb-2.5 block text-black dark:text-white">
                                    Description
                                </h3>
                                <textarea
                                onChange={(e) => setCategoryDescription(e.target.value)}
                                value={categoryDescription}
                                rows={3}
                                placeholder="Descriptif sur la catégorie de formation"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                ></textarea>
                            </div>

                            <div className="mb-4.5">
                                <h3 className="mb-2.5 block text-black dark:text-white">
                                    Status
                                </h3>
                                <Select 
                                    options={dataCategoryStatus}
                                    value = {
                                        dataCategoryStatus.filter(option => 
                                           option.value === categoryStatus )
                                     }
                                    onChange={handleChangeCategoryStatus}
                                />
                            </div>
                                                                        
                                
                        </div>                        
                    </div>

                </div>

                

                <div className="flex flex-col gap-9">

                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Détails sur les catégories
                            </h3>
                        </div>      

                        <div className="p-4">       

                            <p>Elles servent à regrouper les formations par rubrique</p>

                        </div>
                        
                    </div>         

                </div>

            </div>
        </form>
        </>

    )

}

export default DataCategoryCreateCourse;