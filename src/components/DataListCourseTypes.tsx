import { useRef, useState, useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate  } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import CourseDataService from '../services/CourseServices';
import TableDataList from './Lists/TableDataList';
import LinkAction from './Buttons/LinkActions'
import axios from '../api/axios';

const URL_API_COURSE = '/courses/';

type CourseType = {
  courseTypeLabel: "",  
  courseTypeActive: ""
}

const DataListCourseTypes = () => {

  const [ courseTypes, setCourseTypes ] = useState<any[]>([]);

  useEffect(() => {
    retrieveCourseTypes();
  }, []);

  const retrieveCourseTypes = () => {
    CourseDataService.getTypes()
      .then(response => {
        setCourseTypes(response.data['hydra:member']);
        // console.log(response.data['hydra:member']);
      })
      .catch(e => {
        console.log(e);
      });
  };  


  const courseCreateUrl = "/courses/types/create/"
  const courseCreateText = 'Nouveau type de programme'
  

  const columns = useMemo<MRT_ColumnDef<CourseType>[]>(
    () => [
      {
        accessorKey: 'typeLabel',
        header: 'Libellé',
      },           
      {
        id: "actionColumnCourse",
        header: "Actions",
        size: 2,
        accessorFn: (row) => {
          const courseTypeEditUrl = "/courses/types/edit/"+row?.id
          const courseTypeFicheUrl = "/courses/types/fiche/"+row?.id
          
          return (
            
            <LinkAction editLink={courseTypeEditUrl} ficheLink={courseTypeFicheUrl}  />
          )
        }
      }
    ],
    [],
  );

  return (

    <TableDataList data={courseTypes} columns={columns} createLink={courseCreateUrl} createText={courseCreateText} />

  )
};

export default DataListCourseTypes;
