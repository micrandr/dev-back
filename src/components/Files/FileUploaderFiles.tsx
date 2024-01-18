import React, {useState, useRef, useEffect} from "react"; 
import axios from "axios";
import Uploady, {
  useUploady,
  useBatchAddListener,
  useFileInput,
  useRequestPreSend
}
from "@rpldy/uploady";
import UserDataService from '../../services/UserServices';

import UploadButton, { asUploadButton } from "@rpldy/upload-button";
import { API_URI_AXIOS } from "../../api/axios";

//const API_URI = 'https://localhost:8000/'
// const API_URI = 'https://dev-api.formationbtp.fr/index.php/api/'

// import { asUploadButton } from "@rpldy/upload-button";

const CustomUploadContextButton = (data) => {

    useRequestPreSend( (items, options) => {
        return {
            options: {
                params: {
                    fname: data.fname
                }
            }
        }
    })
 
  // data.UserService
  const userID = data.data
  const [userPhoto, setUserPhoto] = useState('')

  const { processPending } = useUploady();
  const [items, setItems] = useState([]);
  const [fileKbis, setFileKbis] = useState('');
  const [fileCv, setFileCv] = useState('');
  const [fileUrssaf, setFileUrssaf] = useState('');
  const [fileAssuranceDecennale, setFileAssuranceDecennale] = useState('');  
  const [fileAttestationFiscale, setFileAttestationFiscale] = useState('');
  const [fileAttestationHonneur, setFileAttestationHonneur] = useState('');
  const [fileMisc, setFileMisc] = useState('');

  useBatchAddListener((batch) => {
    setItems((items) => items.concat(batch.items));    
    setUserPhoto(batch.items[0].file.name)  

    let fileData = JSON.stringify({
        userPhoto
      })

    if(data.fname=="Urssaf"){
        setFileUrssaf(batch.items[0].file.name)
        fileData = JSON.stringify({
            fileUrssaf
          })
    }

    if(data.fname=="KBis"){
        setFileKbis(batch.items[0].file.name)
        fileData = JSON.stringify({
            fileKbis
          })
    }

    if(data.fname=="CV"){
        setFileCv(batch.items[0].file.name)
        fileData = JSON.stringify({
            fileCv
          })
    }
    
    if(data.fname=="ASSURANCE_DECENNALE"){
        setFileAssuranceDecennale(batch.items[0].file.name)
        fileData = JSON.stringify({
            fileAssuranceDecennale
          })
    }

    if(data.fname=="ATTESTATION_FISCALE"){
        setFileAttestationFiscale(batch.items[0].file.name)
        fileData = JSON.stringify({
            fileAttestationFiscale
          })
    }

    if(data.fname=="ATTESTATION_HONNEUR"){
        setFileAttestationHonneur(batch.items[0].file.name)
        fileData = JSON.stringify({
            fileAttestationHonneur
          })
    }
   
    UserDataService.update(userID, fileData)
    .then( response => {
      console.log(response)
    })

  });

  useEffect(() => {
    }, []);


  return <UploadButton>[Telechager]</UploadButton>

}

const FileUploaderFiles = (props) => {



  
    return (
      <Uploady          
        destination={{ url: API_URI_AXIOS + "uploader-files.php" }}
      >
          
          <CustomUploadContextButton data={props.dataUser} fname={props.fname} />
      </Uploady>
    );
  
};

export default FileUploaderFiles;