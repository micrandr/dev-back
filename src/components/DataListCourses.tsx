import { useRef, useState, useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate  } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import CourseDataService from '../services/CourseServices';
import TableDataList from './Lists/TableDataList';
import LinkAction from './Buttons/LinkActions'
import axios from '../api/axios';
import Company1 from '../images/company/company-01.jpg';

const URL_API_COURSE = '/courses/';

type Course = {
  courseName: "",  
  courseDepartment: "",
  coursePlaceMaxi: ""
}

const DataListCourses = () => {

  const [ courses, setCourses ] = useState<any[]>([]);
  
  const courseApiUrl = URL_API_COURSE + '';

  const getCourseData = () => {
    axios.get( courseApiUrl,  )
  }

  useEffect(() => {
    retrieveCourses();
  }, []);

  const retrieveCourses = () => {
    CourseDataService.getAll()
      .then(response => {
        setCourses(response.data['hydra:member']);
        // console.log(response.data['hydra:member']);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const courseCreateUrl = "/courses/create/"
  const courseCreateText = 'Nouveau programme'
  

  const columns = useMemo<MRT_ColumnDef<Course>[]>(
    () => [
      {
        accessorKey: 'courseName',
        header: 'Nom de formation',
      },
      {
        accessorKey: 'courseType',
        header: 'Type'
      },
      {
        accessorKey: 'courseLocation',
        header: 'Lieu'
      },
      {
        accessorKey: 'courseCategory',
        header: 'Catégorie',
        size: 2
      },
      {
        accessorKey: 'courseDuration',
        header: 'Durée',
        size: 2
      },
      {
        accessorKey: 'coursePrice',
        header: 'Tarif journalier',
        size: 2
      },
      {
        accessorKey: 'courseLevel',
        header: 'Niveau',
        size: 2
      },
      {
        id: "actionColumnCourse",
        header: "Actions",
        size: 2,
        accessorFn: (row) => {
          const roomEditUrl = "/courses/edit/"+row?.id
          const roomFicheUrl = "/courses/fiche/"+row?.id
          const roomDeleteUrl = "/courses/delete/"+row?.id
          
          return (
            
            <LinkAction editLink={roomEditUrl} ficheLink={roomFicheUrl} deleteLink={roomDeleteUrl} objectId={row.id} objectName="course" objectData={CourseDataService} />
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

export default DataListCourses;
