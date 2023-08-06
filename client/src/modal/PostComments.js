import React, { useContext, useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, Input, TextareaAutosize, Typography, Avatar } from '@mui/material';
import 'react-image-crop/dist/ReactCrop.css'
import { toast } from 'react-toastify'
import { errorHandler } from '../service/errorHandler'
import { httpClient } from '../utils/httpClient'
import { reloadPage } from '../service/reload';

const PostComments = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [uploadedImage, setUploadedImage] = useState();
    const [url, setUrl] = useState('')
    const [content, setContent] = useState('')

    useEffect(() => {

        const token = JSON.parse(localStorage.getItem('token'))

        if (token && url && content) {
            httpClient.POST('/post/createpost', {
                content,
                pic: url
            }, true)
                .then(data => {
                    toast.success('Post Created Successfully ')
                    reloadPage()
                })
                .catch(err => {
                    toast.error('Post Failed')
                    return errorHandler(err)
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

    const Submit = (e) => {
        e.preventDefault();
        // here is only image upload
        const data = new FormData();
        data.append('file', uploadedImage)
        data.append('upload_preset', 'instagram-clone')
        data.append('cloud_name', 's-group')
        fetch('https://api.cloudinary.com/v1_1/s-group/image/upload', {
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
                return errorHandler(err)
            })
        handleClose();
    }

    return (
        <div>
            <Button variant="contained" onClick={handleOpen}>
                {children}
            </Button>
            <Dialog open={open} onClose={handleClose}
                sx={{ p: 0, m: 0 }}
            >
                <DialogTitle>Create Post</DialogTitle>
                <form onSubmit={Submit} noValidate >
                    <DialogContent>
                        <Box sx={{ display: 'flex', width: '530px', height: '50vh' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: "280px", width: '100%', height: '50vh', p: 0, m: 0, borderRight: "1px solid #ddd" }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    name='profilePicture'
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                    id="image-upload-input"
                                />    {uploadedImage && (
                                    <img
                                        src={uploadedImage}
                                        alt="Uploaded"
                                        style={{ width: '100%', height: '100%', marginTop: '10px', margin: 0, padding: 0 }}
                                    />
                                )}

                            </Box>
                            <Box sx={{ p: '10px' }} >
                                <Box sx={{ display: 'flex', gap: '10px', alignItems: "center" }}>
                                    <Avatar sx={{ width: '30px', height: "30px" }} />
                                    <Typography  >
                                        Khesehang samsohagn
                                    </Typography>
                                </Box>
                                <textarea
                                    rows={9}
                                    cols={5}
                                    placeholder='Write a 
                                    caption...'
                                    name='content'
                                    onChange={(e) => setContent(e.target.value)}
                                    style={{
                                        width: '250px',
                                        height: "50vh",
                                        resize: 'none',
                                        padding: '8px',
                                        fontSize: '16px',
                                        border: "none",
                                        outline: "none"
                                    }}
                                />
                            </Box>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <label htmlFor="image-upload-input">
                            <Button variant="contained" component="span">
                                Choose File
                            </Button>
                        </label>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type='submit'>submit</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div >
    );
};

export default PostComments;