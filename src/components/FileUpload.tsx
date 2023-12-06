import React from 'react'
import axios from '../api/axios';


const FileUpload = () => {

    const handleFileUpload = (event) => {

        
        const file = event.target.files[0];
        
        const formData = new FormData();
        formData.append("file", file);
        
        axios
            .post("https://file-upload8.p.rapidapi.com/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "x-rapidapi-host": "file-upload8.p.rapidapi.com",
                "x-rapidapi-key": '0ce5d06c8cmsh7180ce018cdf50bp1e9e5bjsn1939f2c1c798',
            },
            })
            .then((response) => {
                // handle the response
                console.log(response);
            })
            .catch((error) => {
                // handle errors
                console.log(error);
            });
        };
    
  return (

    
    <div className="mb-4.5">   
        <h3 className="pb-2">Photo</h3>             
        <input
            type="file"            
            onChange={handleFileUpload}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        />
    </div>
  );
};
export default FileUpload;