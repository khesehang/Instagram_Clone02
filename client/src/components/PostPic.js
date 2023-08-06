import { Box } from '@mui/material'
import { AiTwotoneMessage } from 'react-icons/ai';
import React from 'react'
import { MdOutlineFavorite } from 'react-icons/md';

const PostPic = ({ postPic }) => {
  return (
    <Box sx={{ position: 'relative', maxWidth: "310px", width: '100%', height: "300px", display: 'flex', m: '2px' }}>
      <img src={postPic} style={{ width: '100%', height: '100%' }} alt='your post' />
      <Box sx={{ position: 'absolute', width: '100%', height: "100%", display: 'flex', justifyContent: 'center', alignItems: "center", gap: "10px", "&:hover": { backgroundColor: "#000", opacity: "0.3", transition: "0.5s ease" } }} className='post-opa-div' >
        <MdOutlineFavorite size={28} color='white' display={'none'} className='self-post-icon' />
        <AiTwotoneMessage size={28} color='white' display={'none'} sx={{ "&:hover": { display: 'block' } }} className='self-post-icon' />
      </Box>
    </Box>
  )
}

export default PostPic