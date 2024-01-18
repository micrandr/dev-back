import React, { useRef, useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import GradingIcon from '@mui/icons-material/Grading';
import DraftsIcon from '@mui/icons-material/Drafts';
import FileUploader from "../Files/FileUploader";

const API_URI = 'https://localhost:8000/'
const UPLOAD_URSSAF = 'upload-files.php'

const DocumentList = () => {


    const handleClick = (e, data) => {

        console.log(e)
        console.log(data)

    }

    const handleUserFile = (e) => {
        console.log("yes!!!")
    }
    return (

        <List>
            <ListItem disablePadding>
                <ListItemButton>
                <ListItemIcon>
                    <PictureAsPdfIcon />
                </ListItemIcon>
                    <ListItemText primary="URSSAF" className="mr-10" /> 
                    <FileUploader />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                <ListItemIcon>
                    <RequestPageIcon />
                </ListItemIcon>
                <ListItemText primary="Attestation" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                <ListItemIcon>
                    <GradingIcon />
                </ListItemIcon>
                <ListItemText primary="Status" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                <ListItemIcon>
                    <GradingIcon />
                </ListItemIcon>
                <ListItemText primary="Autres" />
                </ListItemButton>
            </ListItem>            
        </List>

    )

}

export default DocumentList