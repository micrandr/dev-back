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
import { API_URI_AXIOS, API_URI_ROOT } from "../../api/axios";

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
        destination={{ url: API_URI_ROOT + "/uploader.php" }}
      >
          
          <CustomUploadContextButton data={props.dataUser} />
      </Uploady>
    );
  
};

export default FileUploader;