import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, IconButton } from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,  
} from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Swal from 'sweetalert2';
import UserDataService from '../../services/UserServices';
import RoomDataService from '../../services/RoomServices';
import CourseDataService from '../../services/CourseServices';
import CompanyDataService from '../../services/CompanyServices';

const LinkActions = ( link ) => {
    

    const navigate = useNavigate()
    let redirectLink = ''

    const handleDeleteObject = (objectId, objectName, objectData) => {

        Swal.fire({
            title: 'Vous êtes sur ?',
            text: "Cette action sera irreversible " + objectId + " name=" + objectName,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer'
          }).then((result) => {

            if(result.isConfirmed) {

                switch(objectName){
                    case "users":
                        UserDataService.remove(objectId)
                        redirectLink = '/users'
                        break;
                    case "rooms":
                        RoomDataService.remove(objectId)
                        redirectLink = '/rooms'
                        break;
                    case "course":
                        CourseDataService.remove(objectId)
                        redirectLink = '/courses'
                        break;

                    case "compagnies":
                        CompanyDataService.remove(objectId)
                        redirectLink = '/courses'
                        break;
                }     
                
                Swal.fire(
                    'Supprimé !',
                    'Cet objet a été bien supprimé.',
                    'success'
                ) 

            }

            location.reload()

            // if (result.isConfirmed) {
      
            //   UserDataService.remove(id)
      
            //   Swal.fire(
            //     'Supprimé !',
            //     'Cet objet a été bien supprimé.',
            //     'success'
            //   )
            //   navigate('/users')
            // }
          });

    }

    return (
        <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
            <IconButton
            color="primary"
                onClick={() =>
                    location = link.ficheLink
            }
            >
                <VisibilityIcon />
            </IconButton>
            <IconButton
                color="primary"
                onClick={() =>
                    location = link.editLink
            }
            >
            <EditIcon />
            </IconButton>
            <IconButton
                color="primary"
                onClick={(e) => {
                   handleDeleteObject(link.objectId, link.objectName)
                    //location = link.deleteLink
                }
            }
            >
                <DeleteIcon />
            </IconButton>
        </Box>
    )

}

export default LinkActions