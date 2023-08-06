import React, { useContext, useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box } from '@mui/material';
import 'react-image-crop/dist/ReactCrop.css'
import { toast } from 'react-toastify'
import { errorHandler } from '../service/errorHandler'
import { httpClient } from '../utils/httpClient';
import { StoreContext } from '../context/reducer';

const ProfilePicModal = () => {
  const [open, setOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState();
  const [url, setUrl] = useState('')

  const { state: { user }, dispatch } = useContext(StoreContext)

  // console.log('user data in profilepic', user)

  const userId = user[0]._id


  useEffect(() => {

    if (url) {
      // Updadte 'user' object in localStorage with the new profilePicture
      const storedUser = JSON.parse(localStorage.getItem('user'))
      console.log('storedUser', storedUser[0].profilePicture)
      storedUser[0].profilePicture = url
      localStorage.setItem('user', JSON.stringify({ ...storedUser }))
      dispatch({ type: "SET_USER", user: storedUser })
      document.location.reload();
    }
    // console.log('user id is', userId)
    if (url) {
      httpClient.PUT(`/user/${userId}`, {
        profilePicture: url,
      }, true)
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            toast.error(data.error)
          } else {
            toast.success('Profile Picture update successful')
          }
        })
        .catch(err => {
          errorHandler(err)
        })
    }
  }, [url])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUploadedImage(null);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {

      // const imageUrl = URL.createObjectURL(file)
      // setUploadedImage(imageUrl)

      // To convert file into a base64-encoded URL 
      // Perform any additional image validation if required (e.g., file type, size)
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleImageUpload = () => {
    // Implement your logic for image upload here if needed
    const data = new FormData();
    data.append('file', uploadedImage)
    data.append('upload_preset', 'instagram-clone')
    data.append('cloud_name', 's-group')
    fetch("https://api.cloudinary.com/v1_1/s-group/image/upload", {
      method: 'post',
      body: data
    })
      .then(res => res.json())
      .then(data => {
        if (data.url) {
          setUrl(data.url)
        } else {
          toast.error('Failed to upload the image. Please try again')
        }
      })
      .catch(err => {
        toast.error('Failed to upload the image. Please try again')
        console.log(err)
      })

    handleClose();
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Upload Profile Picture
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload Profile Picture</DialogTitle>
        <DialogContent>
          <input
            type="file"
            accept="image/*"
            name='profilePicture'
            onChange={handleImageChange}
            style={{ display: 'none' }}
            id="image-upload-input"
          />

          {uploadedImage && (
            <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: "500px", width: '100%', height: '50vh', p: 0, m: 0, }}>
              <img
                src={uploadedImage}
                alt="Uploaded"
                style={{ width: '100%', height: '100%', marginTop: '10px', margin: 0, padding: 0 }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <label htmlFor="image-upload-input">
            <Button variant="contained" component="span">
              Choose File
            </Button>
          </label>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleImageUpload}>Upload</Button>
        </DialogActions>
      </Dialog>
    </div >
  );
};

export default ProfilePicModal;
