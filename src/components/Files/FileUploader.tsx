import React, {useState, useRef, useEffect} from "react"; 
import axios from "axios";
import Uploady, {
  useUploady,
  useBatchAddListener,
  useFileInput 
}
from "@rpldy/uploady";
import UserDataService from '../../services/UserServices';

import UploadButton, { asUploadButton } from "@rpldy/upload-button";
import { API_URI_AXIOS } from "../../api/axios";

// import { asUploadButton } from "@rpldy/upload-button";

//const API_URI = 'https://localhost:8000/'
// const API_URI = 'https://dev-api.formationbtp.fr/index.php/api/'

const CustomUploadContextButton = (data) => {
 
  // data.UserService
  const userID = data.data
  const [userPhoto, setUserPhoto] = useState('')

  const { processPending } = useUploady();
  const [items, setItems] = useState([]);
  useBatchAddListener((batch) => {
    setItems((items) => items.concat(batch.items));
    console.log("items=")    
    setUserPhoto(batch.items[0].file.name)  

    const photoData = JSON.stringify({
      userPhoto
    })

   
    UserDataService.update(userID, photoData)
    .then( response => {
      console.log(response)
    })

  });

  useEffect(() => {

   
   
    
}, []);


  return <UploadButton>Telechager Photo</UploadButton>

}

const FileUploader = (props) => {

  const [text, setText] = useState("Select file");
    return (
      <Uploady          
        destination={{ url: API_URI_AXIOS + "/uploader.php" }}
      >
          
          <CustomUploadContextButton data={props.dataUser} />
      </Uploady>
    );
  
};

export default FileUploader;