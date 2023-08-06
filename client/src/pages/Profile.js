import { Box, Container, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ProfilePicModal from '../modal/ProfilePicModal'
import { StoreContext } from '../context/reducer';
import PostPic from '../components/PostPic';

const Profile = () => {
  const { state: { user, posts } } = useContext(StoreContext)
  const [selfPosts, setSelfPosts] = useState([])

  const userData = user[0]

  useEffect(() => {
    document.title = 'All Profile'
  }, [user])

  useEffect(() => {
    if (posts) {
      const matchingPosts = posts.filter((post) => {
        return (
          post.postedBy && userData._id.includes(post.postedBy._id)
        )
      })
      setSelfPosts(matchingPosts)
    }
  }, [user, posts])



  return (
    <Container sx={{
      width: '100%', height: '100vh', alignItems: 'center', p: '10px'
    }}>
      <Box
        sx={{
          display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', m: '20px'
        }} >
        <Box sx={{
          flex: '3', width: '100%', ml: '90px'
        }} >
          {
            userData.profilePicture
              ? (<img alt={userData.fullname} src={userData.profilePicture} style={{ width: '150px', height: '150px', borderRadius: "50%" }} />)
              : (<AccountCircleIcon sx={{
                color: '#ddd', fontSize: '180px'
              }} />)
          }
        </Box>
        <Box sx={{ display: 'flex', flex: '6', width: '100%', flexDirection: "column", gap: '20px' }} >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }} >
            <Typography sx={{ fontSize: '25px' }} >{userData.fullname}</Typography>
            <button style={{
              color: '#000', backgroundColor: '#ddd', padding: '8px 10px', border: 'none', borderRadius: '10px'
            }} >Edit profile</button>
            <ProfilePicModal >Edit profile </ProfilePicModal>
            <button style={{
              color: '#000', backgroundColor: '#ddd', padding: '8px 10px', border: 'none', borderRadius: '10px'
            }} >View Archive</button>
          </Box>
          <Box sx={{ display: 'flex', gap: "15px" }}  >
            <Typography>{userData.posts || 0} posts</Typography>
            <Typography>
              {userData.followers || 0} followers
            </Typography>
            <Typography>
              {userData.following || 0}  following
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }} >
            <small>{userData.username}</small>
          </Box>
        </Box>
      </Box>
      <hr style={{ width: '90%', margn: '10px', border: '1px solid #ddd' }} />
      <Box sx={{
        width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'
      }} >
        {selfPosts && selfPosts.map((post, i) => (
          <PostPic postPic={post.pic} key={i} />
        ))}
      </Box>
    </Container>
  )
}

export default Profile