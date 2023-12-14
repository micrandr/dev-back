import { useRef, useState, useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate  } from 'react-router-dom';
import LevelDataService from '../services/LevelServices';
import TableDataList from './Lists/TableDataList';
import LinkAction from './Buttons/LinkActions'
import Company1 from '../images/company/company-01.jpg';

type Level = {
  levelName: "",  
  levelSlug: "",
  levelDescription: ""  
}

const DataLevelList = () => {

  const [ levels, setLevels ] = useState<any[]>([]);

  useEffect(() => {
    retrieveCourses();
  }, []);

  const retrieveCourses = () => {
    LevelDataService.getAll()
      .then(response => {
        setLevels(response.data['hydra:member']);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const levelCreateUrl = "/level/create/"
  const levelCreateText = 'Nouveau'
  

  const columns = useMemo<MRT_ColumnDef<Level>[]>(
    () => [
      {
        accessorKey: 'levelName',
        header: 'Libellé du niveau',
      },
      {
        accessorKey: 'levelSlug',
        header: 'Slug'
      },
      {
        accessorKey: 'levelDescription',
        header: 'Description'
      },
      {
        id: "actionColumnCourse",
        header: "Actions",
        size: 2,
        accessorFn: (row) => {
          const levelEditUrl = "/levels/edit/"+row?.id
          const levelFicheUrl = "/levels/fiche/"+row?.id
          const levelDeleteUrl = "/levels/delete/"+row?.id
          
          return (
            
            <LinkAction editLink={levelEditUrl} ficheLink={levelFicheUrl} deleteLink={levelDeleteUrl} objectId={row.id} objectName="levels" objectData={LevelDataService} />
          )
        }
      }
    ],
    [],
  );

  return (

    <TableDataList data={levels} columns={columns} createLink={levelCreateUrl} createText={levelCreateText} />

  )
};

export default DataLevelList;
