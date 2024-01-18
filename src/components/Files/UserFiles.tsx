import { useState } from 'react'
import axios from '../../api/axios';
import UserService from '../../services/UserServices';
import DocumentServices from '../../services/DocumentServices';

const UserFiles = ( params ) => {

    const [selectedFile, setSelectedFile] = useState('')
    const [selectedUserID, setSelectedUserID] = useState('')

    const handleFileUpload = (event) => {
        
        const file = event.target.files[0];        
        const formData = new FormData();
        
        formData.append("file", file); 

        axios
            .post("https://localhost:8000/uploader.php", formData, {
                
            })
            .then((response) => {
                // handle the response
                setSelectedFile(response.data)
                UserService.update(params.userID, { userPhoto: selectedFile })
                .then((response)=>{
                    console.log(response)
                })
            })
            .catch((error) => {
                // handle errors
                console.log(error);
            });
        
    };
    
  return (

    
    <div className="mb-4.5">           
        <input
            type="file"                    
            onChange={handleFileUpload}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        />
    </div>
  );
};
export default UserFiles;