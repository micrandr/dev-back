import React, {useState} from 'react'
import axios from '../api/axios';
import UserService from '../services/UserServices';
import { select } from '@material-tailwind/react';

const API_URI = 'https://localhost:8000/'

const FileUpload = (params) => {

    const [selectedFile, setSelectedFile] = useState('')
    const [selectedUserID, setSelectedUserID] = useState('')

    const handleFileUpload = (event) => {
        
        const file = event.target.files[0];        
        const formData = new FormData();
        
        formData.append("file", file); 

        console.log(event)

        axios
            .post( API_URI + "uploader.php", formData, {
                
            })
            .then((response) => {
                // handle the response
                
                setSelectedFile(response.data)
                console.log("selectedFile=" + selectedFile)
                UserService.update(params.userID, JSON.stringify({ userPhoto: selectedFile }))
                .then((responseUpdate)=>{
                    
                })
            })
            .catch((error) => {
                // handle errors
                console.log(error);
            });
        
    };

    // const handleSetFile = (e) => {
    //     setSelectedFile(e.value)
    // }

    
  return (

    
    <div className="mb-4.5">   
        <h3 className="pb-2">Photo</h3>             
        <input
            type="file"  
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            onChange={handleFileUpload}
        />
    </div>
  );
};
export default FileUpload;