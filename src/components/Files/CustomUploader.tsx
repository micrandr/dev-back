import {useState,useEffect} from "react"
import axios, { API_URI_ROOT } from "../../api/axios"
import UserService from "../../services/UserServices"

const CustomUploader = (params) => {
  
    const [userPhoto,setUserPhoto] = useState('')
    const [userId, setUserId] = useState('')

    useEffect(() => {

        setUserId(params.userId)        

    }, []);

    const handleFileUpload = (e) => {

        const file_name = e.target.files[0]

        const formData = new FormData()
        formData.append('file', file_name)
        setUserPhoto(file_name.name)        

        axios.post(API_URI_ROOT, formData,
            {                       
                headers: {
                    "Content-Type": "multipart/form-data"
                }            
            })
        .then( (response)=>{            
            const photoData = JSON.stringify({
                userPhoto
            })
            UserService.update( userId, photoData)
            .then( (response2)=>console.log(response2) )
        })
    }

    return (
        <>
        Photo Uploader
        <input type="file" name="file" className="" onChange={handleFileUpload} />
        </>
    )

}

export default CustomUploader