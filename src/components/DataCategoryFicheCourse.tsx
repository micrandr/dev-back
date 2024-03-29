import { useRef, useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import CourseService from "../services/CourseServices";
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Select from 'react-select'


const dataCategoryStatus =  [ 
    { value: "none", label: "Selectionner" }, 
    { value: "1", label: "Activé" },
    { value: "0", label: "Desactivé" },
]

const DataCategoryFicheCourse = () => {

    const navigate = useNavigate();
    const params = useParams();
    const categoryId = params.id;

    const [categoryName, setCategoryName] = useState('');
    const [categoryStatus, setCategoryStatus] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');

    const handleChangeCategoryStatus = (e) => {
        console.log(e.value)
        setCategoryStatus( e.value )
    }

    const getCategoryData = categoryId => {
        
        CourseService.getCategory(categoryId)
        .then(  response => {            
            setCategoryName(response.data.categoryName);
            setCategoryDescription(response.data.categoryDescription);            
            setCategoryStatus(response.data.categoryStatus);
        })
    }

    useEffect(() => {

        if (categoryId) {
            getCategoryData(categoryId);
        }
        
      }, [categoryId]);
   

    const handleCreateRoomData = async (e) => {

        e.preventDefault();        

        try {

            const dataCategory = JSON.stringify({
                categoryName,
                categoryDescription,
                categoryStatus,
            });

            CourseService.updateCategory( categoryId, dataCategory )
            .then( (response)=>{
                toast.success("Mise à jour bien effectuée")
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

    const handleLinkEdit = (e) => {
        const urlEdit = '/courses/categories/edit/' + categoryId
        navigate(urlEdit)

    }

    const handleLinkNew = (e) => {
        const urlCreate = '/courses/categories/create/'
        navigate(urlCreate)

    }

    const handleLinkList = (e) => {
        const urlList = '/courses/categories/'
        navigate(urlList)
    }    

    return (

        <>
        <form action="#" onSubmit={handleCreateRoomData}>
        <div className="flex justify-between mb-3">
                <div className="flex p-2">
                   
                </div>
                <div className="flex">                    
                    <ButtonGroup
                        disableElevation
                        variant="contained"
                        aria-label="Disabled elevation buttons"
                    >
                        <Button onClick={handleLinkEdit}>Editer</Button>
                        <Button onClick={handleLinkList}>Liste des catégories</Button>
                        <Button onClick={handleLinkNew}>Nouveau</Button>
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
                                {categoryName}
                            </div>

                            
                            <div className="mb-4.5">
                                <h3 className="mb-2.5 block text-black dark:text-white">
                                    Description
                                </h3>
                                {categoryDescription}
                            </div>

                            <div className="mb-4.5">
                                <h3 className="mb-2.5 block text-black dark:text-white">
                                    Status
                                </h3>
                                {categoryStatus=="1" ? 
                                <h3>Active</h3>
                                : <h3>Desactivé</h3>
                                }
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

export default DataCategoryFicheCourse;