import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import UserDataService from '../services/UserServices';
import TableDataList from './Lists/TableDataList';
import LinkAction from './Buttons/LinkActions'
import Swal from 'sweetalert2';
import UserService from '../services/UserServices';
import LearnerDataService from '../services/LearnerServices';
import DocumentStatus from './Documents/DocumentStatus'

type Users = {
  userName: "",  
  userFirstName: "",
  userAddress: ""

}


const DataListLearners = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    retrieveUsers();
  }, []);

  const retrieveUsers = () => {
    LearnerDataService.getAll()
      .then(response => {
        setUsers(response.data['hydra:member']);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteUser = (id: string) => {

    Swal.fire({
      title: 'Vous êtes sur ?',
      text: "Cette action sera irreversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer'
    }).then((result) => {
      if (result.isConfirmed) {

        UserDataService.remove(id)

        Swal.fire(
          'Supprimé !',
          'Cet objet a été bien supprimé.',
          'success'
        )
        navigate('/users')
      }
    });
    
  }

  const roomCreateUrl = "/learners/create/"
  const roomCreateText = 'Nouveau participant'

  const columns = useMemo<MRT_ColumnDef<Users>[]>(
    () => [
      {
        accessorKey: 'subscriberName',
        header: 'Nom',
      },
      {
        accessorKey: 'subscriberFirstName',
        header: 'Prénom'
      },
      {
        accessorKey: 'subscriberAddress',
        header: 'Adresse',
        size: 2
      },
      {
        accessorKey: 'subscriberPhone',
        header: 'Téléphone',
        size: 2
      },
      {
        accessorKey: 'subscriberMobile',
        header: 'Mobile',
        size: 2
      },
      {
        accessorKey: 'subscriberAddress',
        header: 'Adresse',
        size: 2
      },                
      {
        accessorKey: 'subscriberType',
        header: 'Type',
        size: 2
      }, 
      {
        accessorKey: 'subscriberSkills',
        header: 'Compétences',
        size: 2
      },
      /*{ 
        accessorKey: 'userType',
        accessorFn: (row) => {
          return (
            <>
            <DocumentStatus />
            </>
          )
        },
        header: 'Documents',
        size: 2
      },*/
      {
        id: "actionColumnRoom",
        header: "Actions",
        size: 2,
        accessorFn: (row) => {

          const userEditUrl = "/users/edit/"+row?.id
          const userFicheUrl = "/users/fiche/"+row?.id
          const userDeleteUrl = "/users/delete/"+row?.id
          
          return (
            
            <LinkAction 
              editLink={userEditUrl} 
              ficheLink={userFicheUrl} 
              deleteLink={userDeleteUrl} 
              objectId={row.id} 
              objectName="users" 
              objectData={UserService} 
            />
          )
        }
      }
    ],
    [],
  );

  return (    
    <TableDataList data={users} columns={columns} createLink={roomCreateUrl} createText={roomCreateText} />
  );
};

export default DataListLearners;
