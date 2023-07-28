import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { MdHomeFilled, MdOutlineExplore, MdOutlineFavoriteBorder, MdOutlineAddBox } from 'react-icons/md';
import { AiOutlineSearch, AiOutlineMenu } from 'react-icons/ai';
import { RiMessengerLine, RiVideoLine } from 'react-icons/ri';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

const LeftSide = () => {
    return (
        <Stack sx={{ display: 'flex', flexDirection: 'column', borderRight: '1px solid #d4d2d2', p: '20px', gap: '5px', justifyContent: 'center', alignItems: 'flex-start', }} >
            <Box sx={{ fontSize: '27px', fontFamily: "'Pacifico', cursive", m: '20px' }}>
                Instagram
            </Box>
            <Box sx={{ width: '100%', height: '50px', display: 'flex', alignItems: "center", borderRadius: '10px', transition: '0.9s', '&:hover': { backgroundColor: '#e8e3e3' } }} >
                <Typography sx={{ marginLeft: '5px', alignItems: "center", display: 'flex', gap: '15px', fontWeight: '600', fontSize: '17px', }}>
                    <MdHomeFilled size={29} /> Home
                </Typography>
            </Box>
            <Box sx={{ width: '100%', height: '50px', display: 'flex', alignItems: "center", borderRadius: '10px', transition: '0.9s', '&:hover': { backgroundColor: '#e8e3e3' } }} >
                <Typography sx={{ marginLeft: '5px', alignItems: "center", display: 'flex', gap: '15px', fontWeight: '600', fontSize: '17px', }}>
                    <AiOutlineSearch size={28} /> search
                </Typography>
            </Box>
            <Box sx={{ width: '100%', height: '50px', display: 'flex', alignItems: "center", borderRadius: '10px', transition: '0.9s', '&:hover': { backgroundColor: '#e8e3e3' } }} >
                <Typography sx={{ marginLeft: '5px', alignItems: "center", display: 'flex', gap: '15px', fontWeight: '600', fontSize: '17px', }}>
                    <MdOutlineExplore size={29} />  explore
                </Typography>
            </Box>
            <Box sx={{ width: '100%', height: '50px', display: 'flex', alignItems: "center", borderRadius: '10px', transition: '0.9s', '&:hover': { backgroundColor: '#e8e3e3' } }} >
                <Typography sx={{ marginLeft: '5px', alignItems: "center", display: 'flex', gap: '15px', fontWeight: '600', fontSize: '17px', }}>
                    <RiVideoLine size={28} />  reels
                </Typography>
            </Box>
            <Box sx={{ width: '100%', height: '50px', display: 'flex', alignItems: "center", borderRadius: '10px', transition: '0.9s', '&:hover': { backgroundColor: '#e8e3e3' } }} >
                <Typography sx={{ marginLeft: '5px', alignItems: "center", display: 'flex', gap: '15px', fontWeight: '600', fontSize: '17px', }}>
                    <RiMessengerLine size={28} />  messages
                </Typography>
            </Box>
            <Box sx={{ width: '100%', height: '50px', display: 'flex', alignItems: "center", borderRadius: '10px', transition: '0.9s', '&:hover': { backgroundColor: '#e8e3e3' } }} >
                <Typography sx={{ marginLeft: '5px', alignItems: "center", display: 'flex', gap: '15px', fontWeight: '600', fontSize: '17px', }}>
                    <MdOutlineFavoriteBorder size={28} />notifications
                </Typography>
            </Box>
            <Box sx={{ width: '100%', height: '50px', display: 'flex', alignItems: "center", borderRadius: '10px', transition: '0.9s', '&:hover': { backgroundColor: '#e8e3e3' } }} >
                <Typography sx={{ marginLeft: '5px', alignItems: "center", display: 'flex', gap: '15px', fontWeight: '600', fontSize: '17px', }}>
                    <MdOutlineAddBox size={28} />  create
                </Typography>
            </Box>
            <Box sx={{ width: '100%', height: '50px', display: 'flex', alignItems: "center", borderRadius: '10px', transition: '0.9s', '&:hover': { backgroundColor: '#e8e3e3' } }} >
                <Typography sx={{ marginLeft: '5px', fontWeight: '600', fontSize: '17px', }}>
                    <Link to='/profile' style={{ alignItems: "center", display: 'flex', textDecoration: 'none', gap: '15px' }}>
                        <AccountCircleIcon sx={{ color: '#ddd', fontSize: '33px' }} />
                        Profile
                    </Link>
                </Typography>
            </Box>
            <Box sx={{ width: '100%', height: '50px', display: 'flex', alignItems: "center", borderRadius: '10px', transition: '0.9s', '&:hover': { backgroundColor: '#e8e3e3' } }} >
                <Typography sx={{ marginLeft: '5px', alignItems: "center", display: 'flex', gap: '15px', fontWeight: '600', fontSize: '17px', }}>
                    <AiOutlineMenu size={27} />  more
                </Typography>
            </Box>

        </Stack>
    )
}

export default LeftSide