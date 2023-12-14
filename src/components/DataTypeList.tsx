import { useRef, useState, useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate  } from 'react-router-dom';
import TypeDataService from '../services/TypeServices';
import TableDataList from './Lists/TableDataList';
import LinkAction from './Buttons/LinkActions'

type Types = {
  levelName: "",  
  levelSlug: "",
  levelDescription: ""  
}

const DataTypeList = () => {

  const [ levels, setLevels ] = useState<any[]>([]);

  useEffect(() => {
    retrieveTypes();
  }, []);

  const retrieveTypes = () => {
    TypeDataService.getAll()
      .then(response => {
        setLevels(response.data['hydra:member']);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const levelCreateUrl = "/types/create/"
  const levelCreateText = 'Nouveau'
  

  const columns = useMemo<MRT_ColumnDef<Types>[]>(
    () => [
      {
        accessorKey: 'typeName',
        header: 'Libellé',
      },
      {
        accessorKey: 'typeSlug',
        header: 'Slug'
      },
      {
        accessorKey: 'typeDescription',
        header: 'Description'
      },
      {
        id: "actionColumnCourse",
        header: "Actions",
        size: 2,
        accessorFn: (row) => {
          const levelEditUrl = "/types/edit/"+row?.id
          const levelFicheUrl = "/types/fiche/"+row?.id
          const levelDeleteUrl = "/types/delete/"+row?.id
          
          return (
            
            <LinkAction editLink={levelEditUrl} ficheLink={levelFicheUrl} deleteLink={levelDeleteUrl} objectId={row.id} objectName="types" objectData={TypeDataService} />
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

export default DataTypeList;
