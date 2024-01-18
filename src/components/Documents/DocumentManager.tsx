import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Select from 'react-select'
import toast from 'react-hot-toast';
import UploadFileService from '../../services/UploadFileService';
import IFile from "../../types/File";
import UserFiles from '../Files/UserFiles';

export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
  }

  const docTypeOptions = [
    { value: 'kbis', label: 'KBis' },    
    { value: 'ursssaf', label: 'URSSAF' },    
    { value: 'cv', label: 'CV' },
    { value: 'assurance-decennale', label: 'Assurance Décennale' },
    { value: 'attestation-fiscale-tva', label: 'Attestation fiscale TVA' },
    { value: 'attestation-honneur', label: 'Attestation sur l\'honneur' },    
    { value: 'autre', label: 'Autres' }
  ]

const DocumentManager = () => {

    const [open, setOpen] = useState(false);    
    const [selectedValue, setSelectedValue] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleClickAdd = () => {
       return (
        <>
        <h1>Label</h1>
        <input type="text" value="Test" />
        </>
       )
    }
    return ( 
        <>
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
            {/* handleClickOpen */}
                <Fab color="primary" aria-label="add" onClick={handleClickAdd}>
                    <AddIcon />
                </Fab>
            </Box>

            <div id="file-container"></div>
           

            {/* <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
                /> */}
        </>
    )
}
export default DocumentManager

function AddFile() {    

    return (
        <>
            <input type="file" value="" />
        </>
    )

}

function SimpleDialog(props: SimpleDialogProps) {

    const { onClose, selectedValue, open } = props;
    const [docName, setDocName] = useState('')
    const [docFile, setDocFile] = useState('')    
    const [docDate, setDocDate] = useState<Date | null>(null)   
    const [docType, setDocType] = useState('')    
    const [currentFile, setCurrentFile] = useState<File>();
    const [progress, setProgress] = useState<number>(0);
    const [message, setMessage] = useState<string>("");
    const [fileInfos, setFileInfos] = useState<Array<IFile>>([]); 

    useEffect(() => {
        // UploadFileService.getFiles().then((response) => {
        //   setFileInfos(response.data);
        //   console.log( response.data['hydra:member'] )
        // });
      }, []);

  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (value: string) => {
      onClose(value);
    };

    const handleFileOnChange = ( e ) => {        

        // setDocFile(file.name)
       console.log( e.target.files )
       setDocFile( e.target.files[0] )
       console.log(docFile)

    }

    const handleSendData = ( e ) => {
        e.preventDefault()

        setProgress(0);
        // if (!currentFile) return;

    
        // UploadFileService.upload(currentFile, (event: any) => {
        //   setProgress(Math.round((100 * event.loaded) / event.total));
        // })
        //   .then((response) => {
        //     setMessage(response.data.message);
        //     return UploadFileService.getFiles();
        //   })
        //   .then((files) => {
        //     setFileInfos(files.data);
        //   })
        //   .catch((err) => {
        //     setProgress(0);
    
        //     if (err.response && err.response.data && err.response.data.message) {
        //       setMessage(err.response.data.message);
        //     } else {
        //       setMessage("Could not upload the File!");
        //     }
    
        //     setCurrentFile(undefined);
        //   });

        //   toast.error("Problème de transfert de fichier.");

    }

    const handleDocType = (e) => {
        
        setDocType( e.value )

    }

    const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        const selectedFiles = files as FileList;
        setCurrentFile(selectedFiles?.[0]);
        setProgress(0);
      };

    const handleUserFile = () => {
        console.log("test it!")
    }

  
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Envoi de document(s)</DialogTitle>
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            className="p-5"
            >
            <Select options={docTypeOptions} 
                value = {
                    docTypeOptions.filter(option => 
                    option.value === docType )
                }
                onChange={handleDocType}
            />
            <div className="mb-4.5">                
                <UserFiles onChange={handleUserFile} />
            </div>
            <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">Date d'expiration</label>
                <input 
                    type="date" 
                    name="doc-date-expired" 
                    onChange={(e) => setDocDate(e.target.value)}
                    value={docDate}
                    placeholder="Date d'expiration" 
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" 
                />
            </div>

            

            <div className="flex">
                <button                     
                    type="button"                    
                    onClick={handleSendData}
                    className="flex w-100 mr-2 mb-2 justify-center rounded bg-primary p-3 font-medium text-gray">Soumettre</button>
            </div>
            
            
        </Box>
      </Dialog>
    );
  }