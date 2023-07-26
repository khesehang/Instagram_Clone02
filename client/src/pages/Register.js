import { Box, Button, Container, Input, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import { Link, useNavigate } from 'react-router-dom';
import { httpClient } from '../utils/httpClient';
import { errorHandler } from '../service/errorHandler';
import { toast } from 'react-toastify';

const defaultForm = {
    email: '',
    username: '',
    fullname: '',
    password: '',
}
const Register = () => {
    const [formFields, setFormFields] = useState({ ...defaultForm })
    const [errorFields, setErrorFields] = useState({ ...defaultForm })
    const [currentFormField, setCurrentFormField] = useState(null)
    const [isValidForm, setIsValidForm] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        validateForm(currentFormField)
    }, [formFields])

    const validateForm = fieldName => {
        const fieldValue = formFields[fieldName]
        let errMsg;
        switch (fieldName) {
            case 'email':
                errMsg = fieldValue !== ''
                    ? fieldValue.includes('@') && fieldValue.includes('.com')
                        ? ''
                        : 'invalid email'
                    : 'Required field*'
                break;

            case 'fullname':
                errMsg = fieldValue ? '' : 'Required field*'
                break;
            case 'username':
                errMsg = fieldValue !== ''
                    ? fieldValue.length >= 6
                        ? ''
                        : 'username must be more than 7 characters'
                    : 'Required field*'
                break;
            case 'password':
                errMsg = fieldValue !== ''
                    ? fieldValue.length >= 6
                        ? ''
                        : 'username must be more than 6 characters'
                    : 'Required field*'
                break;
            default:
                break;
        }

        // state update
        setErrorFields((prevErrorFields) => ({
            ...prevErrorFields,
            [fieldName]: errMsg
        }))

        // check for errors
        let hasErrors = Object.values(errorFields).some(err => err)

        setIsValidForm(!hasErrors)

    }

    const handleChange = (e) => {
        const { name, value } = e.target
        if (isValidForm) {
            setIsDisabled(false)
        }
        setCurrentFormField(name)
        setFormFields({
            ...formFields,
            [name]: value
        })
    }
    const submit = (e) => {
        if (!isValidForm) {
            toast.info('Please fill the form correctly')
            setIsDisabled(true)
            return
        }
        httpClient.POST('/auth/register', formFields)
            .then((response) => {
                toast.success('Registration Successfull please login')
                navigate('/')
            })
            .catch(err => {
                toast.error('Registration Failure')
                setIsDisabled(true)
                return errorHandler(err)
            })
    }

    return (

        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', p: '10px' }}>
            <Box sx={{ maxWidth: '345px', width: '100%', height: '100vh', border: '1px solid #dfdfdf', display: 'flex', justifyContent: 'center', mt: '15px' }} >
                <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '270px', width: '100%', height: '100%', }}>
                    <Typography sx={{ margin: '45px 0 20px 0', display: 'flex', justifyContent: 'center', fontSize: '33px', fontFamily: "'Pacifico', cursive" }}>
                        Instagram
                    </Typography>
                    <Typography sx={{ width: '100%', margin: '0 0 10px 0', display: 'flex', justifyContent: 'center', fontSize: '17px', fontWeight: '500', textAlign: 'center', color: '#737373', wordSpacing: '0.5px' }}>
                        Sign up to see photos and videos from your friends.
                    </Typography>
                    <Box sx={{ backgroundColor: '#0095f6', height: '33px', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', '&:hover': { backgroundColor: "#1876f2" } }}>
                        <Link to='/' style={{ display: 'flex', justifyContent: 'center', alignItems: 'end', margin: '8px', color: '#fff', textDecoration: 'none', fontSize: '15px' }}>
                            <FacebookIcon />&nbsp;Log in with Facebook</Link>
                    </Box>
                    <Box sx={{ m: '20px 0', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', fontSize: '13px', fontWeight: '700', color: '#828282' }}>
                        <Box sx={{ width: '110px', height: '1px', backgroundColor: '#dfdfdf', }} />
                        OR
                        <Box sx={{ maxWidth: '110px', width: '100%', height: '1px', backgroundColor: '#dfdfdf' }} />
                    </Box>
                    <Input type='email' name='email' placeholder='Email' sx={{ fontSize: '14px', mb: '10px' }} onChange={handleChange} />
                    <small className='error'>{errorFields.email}</small>

                    <Input type='text' name='fullname' placeholder='Full Name' sx={{ fontSize: '14px', mb: '10px' }} onChange={handleChange} />
                    <small className='error'>{errorFields.fullname}</small>

                    <Input type='text' name='username' placeholder='Username' sx={{ fontSize: '14px', mb: '10px' }} onChange={handleChange} />
                    <small className='error'>{errorFields.username}</small>

                    <Input type='password' name='password' placeholder='password' sx={{ fontSize: '14px', mb: '10px' }} onChange={handleChange} />
                    <small className='error'>{errorFields.password}</small>

                    <Typography sx={{ width: '100%', fontSize: '12px', m: '10px 0', textAlign: 'center', color: '#909090' }}>People who use our service may have uploaded your contact information to Instagram.
                        <Link to='https://www.facebook.com/help/instagram/261704639352628' style={{ textDecoration: 'none', color: '#00376b' }} target='_blank' >Learn More</Link>
                    </Typography>

                    <Typography sx={{ width: '100%', fontSize: '12px', m: '10px 0', textAlign: 'center', color: '#909090' }}>By signing up, you agree to our
                        <Link to='https://help.instagram.com/581066165581870/?locale=en_US' style={{ textDecoration: 'none', color: "#0095f6", color: '#00376b' }} target='_blank' > Terms , Privacy Policy and Cookies Policy . </Link>
                    </Typography>

                    <Button sx={{ mt: '10px', backgroundColor: "#4bb4f8", color: '#fff', boxShadow: 'none', borderRadius: '10px', '&:hover': { outline: 'none', boxShadow: 'none', backgroundColor: "#1876f2" } }} onClick={submit} disabled={isDisabled} >
                        <span style={{ color: 'white' }}>Sign up</span>
                    </Button>

                </Box>
            </Box>
            <Box sx={{ maxWidth: '345px', width: '100%', height: '10vh', border: '1px solid #dfdfdf', display: 'flex', justifyContent: 'center', mt: '10px', alignItems: 'center' }}>
                <Typography sx={{ fontSize: '15px' }}>Don't have an account?
                    <Link to='/' style={{ textDecoration: 'none', color: "#0095f6" }}>Log in</Link>
                </Typography>
            </Box>
        </Container>
    )
}

export default Register