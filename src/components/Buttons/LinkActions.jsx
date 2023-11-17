import { Box, Button, IconButton } from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,  
} from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Swal from 'sweetalert2';

const LinkActions = ( link ) => {

    

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