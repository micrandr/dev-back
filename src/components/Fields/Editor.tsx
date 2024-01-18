import React, { useRef, useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import { Editor } from '@tinymce/tinymce-react';

const Editor = (dataValue) => {

    const [comment, setComment] = useState('')

    // useEffect(() => {

    //     if( dataValue.dataValue.length > 0 ){
    //         setComment(dataValue.dataValue)
    //     }         
        
    //   }, []);  
    

    const  toolbarOptions  = {
        toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3] }],
            ["bold", "italic", "underline","strike"],
            [{ color: [] }, { background: [] }],
            [{ script:  "sub" }, { script:  "super" }],
            ["blockquote", "code-block"],
            [{ list:  "ordered" }, { list:  "bullet" }],
            [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
            ["link", "image", "video"],
            ["clean"],
        ],
    };
    
    return (
        <>           
            <ReactQuill modules={toolbarOptions} value={dataValue.dataValue} onChange={dataValue.callBack} theme="snow" />            
        </>
    )
}

export default Editor