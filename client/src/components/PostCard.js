import { Avatar, Box, Input, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';

const PostCard = () => {
    const [like, setLike] = useState(false)

    return (
        <Stack
            sx={{
                maxWidth: '470px',
                width: '100%',
                height: 'auto',
                // backgroundColor: '#000',
                marginLeft: '500px',
                // marginTop: '50px',
                borderBottom: '1px solid #d4d2d2'

            }}
        >
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '20px',
            }} >
                <Box sx={{
                    display: 'flex',
                    gap: '15px', justifyContent: 'center', alignItems: 'center'
                }} >
                    <Avatar src='https://marketplace.canva.com/EAFauoQSZtY/1/0/400w/canva-brown-mascot-lion-free-logo-jkQ4FTu0MlM.jpg' sx={{ width: '35px', height: '35px' }} />
                    <Typography sx={{ display: 'flex', flexDirection: 'column' }} >
                        wealth
                        <small>Original audio</small>
                    </Typography>
                </Box >
                <Box sx={{ float: 'right' }}>...
                </Box>
            </Box>
            <Box sx={{
                maxWidth: '470px',
                width: '100%',
                height: 'auto',
                p: 0, m: 0,
                border: '1px solid #edebeb'
            }} >
                <img src='https://scontent.cdninstagram.com/v/t39.30808-6/363808503_668251058676190_6036553357250867613_n.jpg?stp=dst-jpg_e15_fr_p1080x1080&_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=9Ec5QTPD6QEAX9MEgoT&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzE1NjEwMzY2ODc0Mzg4Nzg3Ng%3D%3D.2-ccb7-5&oh=00_AfCdkwbxn740eiuTqRguakhBgNipgHnu11f-hSgx4TQJNw&oe=64C7D7B8&_nc_sid=10d13b' style={{ width: '100%', height: '100%', p: 0, m: 0 }} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '10px 0' }} >
                <Box sx={{ display: 'flex', gap: '10px' }} >
                    {
                        like
                            ? (<FavoriteIcon onClick={() => setLike(!like)} sx={{color:'red', '&:hover': { color: '#737373' } }} />)
                            : (<FavoriteBorderIcon onClick={() => setLike(!like)} sx={{ '&:hover': { color: '#737373' } }} />)
                    }
                    <MapsUgcOutlinedIcon sx={{ '&:hover': { color: '#737373' } }} />
                    <SendOutlinedIcon sx={{ '&:hover': { color: '#737373' } }} />
                </Box>
                <Box sx={{ float: 'right' }}><BookmarkBorderOutlinedIcon sx={{ '&:hover': { color: '#737373' } }} /></Box>
            </Box>
            <Box >
                <Typography sx={{ pt: '5px', fontSize: '15px' }}>1,234 likes</Typography>
                <Typography sx={{ pt: '5px ', fontSize: '15px' }}>Being able to communicate your vision can be just as important as having one 💡
                </Typography>
                <Typography sx={{ pt: '5px', fontSize: '15px' }}>foundr @helloseed.us very well said!</Typography>
                <input type='text' placeholder='Add a comment...' style={{ margin: '15px 0',width: '100%',border:'0',outline:'none' }} />
            </Box>
        </Stack>
    )
}

export default PostCard