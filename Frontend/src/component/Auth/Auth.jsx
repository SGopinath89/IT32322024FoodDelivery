import { Box, Modal } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { style } from '../Cart/Cart';
import Register from './Register';
import Login from './Login';


const Auth = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const handleOnClose = () => {

        navigate("/"); 
    }


    return (
        <>
            <Modal onClose={handleOnClose}
                open={location.pathname === "/account/register" || location.pathname === "/account/login"}

            >
                <Box sx={style} >
                    {
                        location.pathname === "/account/register" ? (<Register />) : (<Login />)
                    }
                </Box>
            </Modal>
        </>
    )
}

export default Auth

