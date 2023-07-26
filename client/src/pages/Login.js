import { Box, Button, Container, Input, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import { Link, useNavigate } from 'react-router-dom';
import { httpClient } from '../utils/httpClient';
import { toast } from 'react-toastify';
import { errorHandler } from '../service/errorHandler';

const defaultForm = {
    username: "",
    password: "",
}

const Login = () => {
    const [formFields, setFormFields] = useState({ ...defaultForm })
    const [isDisabled, setIsDisabled] = useState(true)

    const navigate = useNavigate()
    const refresh = localStorage.getItem('token')

    const handleChange = e => {
        const { name, value } = e.target
        setIsDisabled(false)
        setFormFields({
            ...formFields,
            [name]: value
        })
    }



    const submit = e => {
        httpClient.POST('/auth/login', formFields, true)
            .then((response) => {
                localStorage.setItem('user', JSON.stringify(response.data.user))
                localStorage.setItem('token', JSON.stringify(response.data.token))
                toast.success(`Welcome ${response.data.user.fullname}`)
                navigate('/')
                window.location.reload()
            })
            .catch(err => {
                toast.error('Login Falied!')
                return errorHandler(err)
            })
    }

    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Box sx={{ maxWidth: '345px', width: '100%', height: '65vh', border: '1px solid #dfdfdf', display: 'flex', justifyContent: 'center', mt: '50px' }} >
                <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '270px', width: '100%', height: '100%', }}>
                    <Typography sx={{ margin: '45px 0', display: 'flex', justifyContent: 'center', fontSize: '33px', fontFamily: "'Pacifico', cursive" }}>
                        Instagram
                    </Typography>

                    <Input type='email' name='username' placeholder='username, or email' onChange={handleChange} sx={{ fontSize: '14px', mb: '10px' }} />

                    <Input type='password' name='password' placeholder='password' onChange={handleChange} sx={{ fontSize: '14px', mb: '10px' }} />

                    <Button onClick={submit} sx={{ mt: '20px', backgroundColor: "#4bb4f8", color: '#fff', boxShadow: 'none', borderRadius: '10px', '&:hover': { outline: 'none', boxShadow: 'none', backgroundColor: "#1876f2" } }} disabled={isDisabled}>
                        <span style={{ color: 'white' }}>Log in</span>
                    </Button>

                    <Box sx={{ mt: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', fontSize: '13px', fontWeight: '700', color: '#828282' }}>
                        <Box sx={{ width: '110px', height: '1px', backgroundColor: '#dfdfdf', }} />
                        OR
                        <Box sx={{ maxWidth: '110px', width: '100%', height: '1px', backgroundColor: '#dfdfdf' }} />
                    </Box>

                    <Link to='/' style={{ display: 'flex', justifyContent: 'center', margin: '8px', color: '#385185', textDecoration: 'none', fontSize: '15px' }}><FacebookIcon />&nbsp;Log in with Facebook</Link>

                    <Link to='/' style={{ display: 'flex', justifyContent: 'center', margin: '8px', color: '#1f507d', textDecoration: 'none', fontSize: '14px' }} >Forgot password?</Link>
                </Box>
            </Box>
            <Box sx={{ maxWidth: '345px', width: '100%', height: '10vh', border: '1px solid #dfdfdf', display: 'flex', justifyContent: 'center', mt: '10px', alignItems: 'center' }}>
                <Typography sx={{ fontSize: '15px' }}>Don't have an account?
                    <Link to='/signup' style={{ textDecoration: 'none', color: "#0095f6" }}>Sign up</Link>
                </Typography>
            </Box>
        </Container>
    )
}

export default Login