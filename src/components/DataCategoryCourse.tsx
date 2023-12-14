import { useRef, useState, useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate  } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import CourseDataService from '../services/CourseServices';
import TableDataList from './Lists/TableDataList';
import LinkAction from './Buttons/LinkActions'

const URL_API_COURSE = '/courses/';

type Course = {
  courseName: "",  
  courseDepartment: "",
  coursePlaceMaxi: ""
}

const DataCategoryCourses = () => {

  const [ courses, setCourses ] = useState<any[]>([]);
  
  const courseApiUrl = URL_API_COURSE + '';

  const getCourseData = () => {
    axios.get( courseApiUrl,  )
  }

  useEffect(() => {
    retrieveCourses();
  }, []);

  const retrieveCourses = () => {
    CourseDataService.getAllCategories()
      .then(response => {
        setCourses(response.data['hydra:member']);        
      })
      .catch(e => {
        console.log(e);
      });
  };

  const courseCreateUrl = "/courses/categories/create/"
  const courseCreateText = 'Nouvelle catégorie de formation'
  

  const columns = useMemo<MRT_ColumnDef<Course>[]>(
    () => [
      {
        accessorKey: 'categoryName',
        header: 'Nom de la catégorie',
      },
      {
        accessorKey: 'categorySlug',
        header: 'Slug'
      },
      {
        accessorKey: 'categoryStatus',
        accessorFn: (row) => {
            if (row.categoryStatus == "1") {
                return ( "Activé" )
            }else{
                return ( "Desactivé" )
            }
          },        
        header: 'Status',
        size: 2
      },
      {
        id: "actionColumnCategory",
        header: "Actions",
        size: 2,
        accessorFn: (row) => {
          const roomEditUrl = "/courses/categories/edit/"+row?.id
          const roomFicheUrl = "/courses/categories/fiche/"+row?.id          
          
          return (
            
            <LinkAction editLink={roomEditUrl} ficheLink={roomFicheUrl} objectId={row.id} objectName="categories" objectData={CourseDataService} />
          )
        }
      }
    ],
    [],
  );

  return (

    <TableDataList data={courses} columns={columns} createLink={courseCreateUrl} createText={courseCreateText} />

  )
};

export default DataCategoryCourses;
