import { useRef, useState, useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate  } from 'react-router-dom';
import TypeDataService from '../services/TypeServices';
import TableDataList from './Lists/TableDataList';
import LinkAction from './Buttons/LinkActions'
import SkillService from '../services/SkillServices';
import parse from 'html-react-parser'

type Skills = {
  skillName: "",  
  skillSlug: "",
  skillDescription: ""  
}

const DataListUserSkills = () => {

  const [ skills, setSkills ] = useState<any[]>([]);

  useEffect(() => {
    retrieveSkills();
  }, []);

  const retrieveSkills = () => {
    SkillService.getAll()
      .then(response => {
        setSkills(response.data['hydra:member']);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const levelCreateUrl = "/userskills/create/"
  const levelCreateText = 'Nouveau'
  

  const columns = useMemo<MRT_ColumnDef<Skills>[]>(
    () => [
      {
        accessorKey: 'skillName',
        header: 'Libellé',
      },
      {
        accessorKey: 'skillSlug',
        header: 'Slug'
      },
      {
        accessorKey: 'skillDescription',
        header: 'Description',
        accessorFn: (row)=>{
          return (parse(row.skillDescription))
        }
      },
      {
        id: "actionColumnCourse",
        header: "Actions",
        size: 2,
        accessorFn: (row) => {
          const levelEditUrl = "/userskills/edit/"+row?.id
          const levelFicheUrl = "/userskills/fiche/"+row?.id
          const levelDeleteUrl = "/userskills/delete/"+row?.id
          
          return (
            
            <LinkAction editLink={levelEditUrl} ficheLink={levelFicheUrl} deleteLink={levelDeleteUrl} objectId={row.id} objectName="skills" objectData={SkillService} />
          )
        }
      }
    ],
    [],
  );

  return (

    <TableDataList data={skills} columns={columns} createLink={levelCreateUrl} createText={levelCreateText} />

  )
};

export default DataListUserSkills;
