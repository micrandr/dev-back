import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

const ButtonActions = (buttons) => {

    const navigate = useNavigate()


    return (

        <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="Disabled elevation buttons"
        >
            <Button>Previsualiser</Button>
            <Button>Enregistrer</Button>
        </ButtonGroup>
    )
}

export default ButtonActions