import { Avatar, Box, Stack, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { httpClient } from '../utils/httpClient';
import { errorHandler } from '../service/errorHandler';
import { toast } from 'react-toastify';
import { reloadPage } from '../service/reload';
import { StoreContext } from '../context/reducer';

const PostCard = () => {
    const { state: { user, posts }, dispatch } = useContext(StoreContext);
    console.log('post sis', posts)
    // to just get user Id as it is inside [] array so we can't do item._id 
    const userId = user[0]._id;


    const postDelete = (postId) => {
        httpClient.DELETE(`/post/${postId}`, true)
            .then(result => {
                toast.success('Post deleted successfully');
                window.alert("Do you really want to delete this post?");
                const newData = posts.filter(item => item._id !== result._id);
                dispatch({ type: 'SET_POSTS', data: newData })
                reloadPage()
            })
            .catch(err => {
                console.log(err);
                return errorHandler(err);
            });
    };

    const likePost = (postId) => {
        console.log('post id to like is', postId);
        httpClient.PUT('/post/like', {
            postId
        }, true)
            .then(result => {
                const resultData = result.data
                console.log('reslutis', resultData)
                const newData = posts.map(item => {
                    if (item._id === resultData._id) {
                        return resultData;
                    } else {
                        return item;
                    }
                })
                dispatch({ type: 'SET_POSTS', data: newData })
            })
            .catch(err => {
                return errorHandler(err)
            })
    }
    const unlikePost = (postId) => {
        console.log('post id to like is', postId);
        httpClient.PUT('/post/unlike', {
            postId
        }, true)
            .then(result => {
                const resultData = result.data
                const newData = posts.map(item => {
                    if (item._id === resultData._id) {
                        return resultData;
                    } else {
                        return item;
                    }
                })
                dispatch({ type: 'SET_POSTS', data: newData })
            })
            .catch(err => {
                return errorHandler(err)
            })
    }


    const Comment = async (text, postId) => {
        try {
            const response = await httpClient.PUT('/post/comment', {
                text,
                postId,
            }, true);

            const comment = response.data;
            const newData = posts.map(item => {
                if (item._id === comment._id) {
                    return comment;
                } else {
                    return item;
                }
            });
            dispatch({ type: 'SET_POSTS', data: newData })
            reloadPage()
        } catch (err) {
            console.log(err);
            return errorHandler(err);
        }
    };

    const handleSubmit = (e, postId) => {
        e.preventDefault();
        const commentText = e.target[0].value;
        if (commentText.trim() !== '') {
            Comment(commentText, postId);
            e.target[0].value = '';
        }
        reloadPage();
    };

    return (
        <>
            {posts && !(posts === null) && !(posts === undefined) &&
                posts.map(item => {
                    const sortedComments = item.comments.sort((a, b) =>
                        b._id.localeCompare(a._id)
                    );
                    return (
                        <Stack
                            key={item._id}
                            sx={{
                                maxWidth: '470px',
                                width: '100%',
                                height: 'auto',
                                marginLeft: '500px',
                                borderBottom: '1px solid #d4d2d2',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '20px',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: '15px',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    {item.postedBy &&
                                        <Avatar
                                            src={item.postedBy.profilePicture}
                                            sx={{ width: '35px', height: '35px' }}
                                        />
                                    }
                                    {item.postedBy &&
                                        <Typography
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}
                                        >
                                            {item.postedBy.fullname}
                                            <small>Original audio</small>
                                        </Typography>
                                    }
                                </Box>
                                {item.postedBy &&
                                    <Box sx={{ float: 'right' }}>
                                        {item.postedBy._id === userId ? (
                                            <DeleteOutlineIcon
                                                sx={{ color: 'red' }}
                                                onClick={() => postDelete(item._id)}
                                            />
                                        ) : (
                                            <></>
                                        )}
                                    </Box>
                                }
                            </Box>
                            <Typography>{item.content}</Typography>
                            <Box
                                sx={{
                                    maxWidth: '470px',
                                    width: '100%',
                                    height: 'auto',
                                    p: 0,
                                    m: 0,
                                    border: '1px solid #edebeb',
                                }}
                            >
                                <img
                                    src={item.pic}
                                    style={{ width: '100%', height: '100%', p: 0, m: 0 }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '10px 0' }}>
                                <Box sx={{ display: 'flex', gap: '10px' }}>
                                    {item.likes.includes(userId) ? (
                                        <FavoriteIcon
                                            onClick={() => unlikePost(item._id)}
                                            sx={{ color: 'red', '&:hover': { color: '#737373' } }}
                                        />
                                    ) : (
                                        <FavoriteBorderIcon
                                            onClick={() => likePost(item._id)}
                                            sx={{ '&:hover': { color: '#737373' } }}
                                        />
                                    )}
                                    <MapsUgcOutlinedIcon sx={{ '&:hover': { color: '#737373' } }} />
                                    <SendOutlinedIcon sx={{ '&:hover': { color: '#737373' } }} />
                                </Box>
                                <Box sx={{ float: 'right' }}>
                                    <BookmarkBorderOutlinedIcon sx={{ '&:hover': { color: '#737373' } }} />
                                </Box>
                            </Box>
                            <Box>
                                <Typography sx={{ pt: '5px', fontSize: '15px' }}>
                                    {item.likes.length || 0} likes
                                </Typography>
                                <Typography sx={{ pt: '5px', fontSize: '15px' }}>{item.content}</Typography>
                                <Typography
                                    sx={{
                                        fontSize: '14px',
                                        color: '#737373',
                                        m: '10px 0',
                                        fontWeight: 400,
                                    }}
                                >
                                    View all {item.comments.length || 0} comments.
                                </Typography>
                                {sortedComments.slice(0, 2).map((comment, index) => (
                                    <Box
                                        key={index}
                                        sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}
                                    >
                                        {item.postedBy &&
                                            <Typography>{comment.postedBy.fullname}</Typography>
                                        }
                                        <Typography sx={{ pt: '5px', fontSize: '15px' }}>{comment.text}</Typography>
                                    </Box>
                                ))}
                                <form onSubmit={(e) => handleSubmit(e, item._id)}>
                                    <input
                                        type='text'
                                        placeholder='Add a comment...'
                                        style={{ margin: '15px 0', width: '100%', border: '0', outline: 'none' }}
                                    />
                                </form>
                            </Box>
                        </Stack >
                    );
                })}
        </>
    );
};

export default PostCard;