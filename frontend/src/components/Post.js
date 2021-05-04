import './Post.css'
import React, {useState} from 'react';
import {AiOutlineHeart, AiFillHeart, AiOutlineRetweet, AiOutlineArrowRight} from 'react-icons/ai';
import Tag from "./Tag";
import axios from "axios";
import {MdPlaylistAdd, MdPlaylistAddCheck} from "react-icons/md";
import {NavLink} from "react-router-dom";
import {ImBubble, ImBubble2} from "react-icons/im";
import UseFormInput from "./UseFormInput";
import {FaPaperPlane} from "react-icons/fa";

function Post (props) {
    let user = props.user;
    let setUser = props.setUser;
    let post = props.post;
    let tags = props.post.tags;
    let index = tags.indexOf('');
    if (index !== -1) tags.splice(index, 1);
    let isLiked = false;
    let isReposted = false;
    const [isGalleried, setIsGalleried] = useState(() => {
        return !!(user && user.gallery.includes(post.postID));
    });
    if (user) {
        if (post.liked.includes(user._id)) isLiked = true;
        if (post.reposted.includes(user._id)) isReposted = true;
    }
    const [commentsOpen, setCommentsOpen] = useState(props.comments);
    const [comments, setComments] = useState(post.comments.reverse());
    const commentField = UseFormInput('');
    const [submittingComment, setSubmittingComment] = useState(false);

    const addToGallery = () => {
        axios.post(`/post/addtogallery`, {postID: post.postID}).then(res => {
            let newGallery = user.gallery;
            newGallery.push(post.postID);
            let newUser = user;
            newUser.gallery = newGallery;
            setUser(newUser);
            setIsGalleried(true);
            alert('Added to gallery successfully!');
        }).catch(e => {
            console.log(e);
        })
    }

    const removeFromGallery = () => {
        axios.post(`/post/addtogallery`, {postID: post.postID}).then(res => {
            let newGallery = user.gallery;
            let index2 = user.gallery.indexOf(post.postID);
            if (index2 !== -1) newGallery.splice(index, 1);
            let newUser = user;
            newUser.gallery = newGallery;
            setUser(newUser);
            setIsGalleried(false);
            alert('Removed from gallery successfully!');
        }).catch(e => {
            console.log(e);
        })
    }

    const openComments = () => {
        setCommentsOpen(2);
    }

    let iterateCommentCount;
    const iterateCommentCountRef = (handleUpdate) => {
        iterateCommentCount = handleUpdate;
    }

    const invokeIterateCommentCount = () => {
        if (iterateCommentCount) iterateCommentCount();
    }

    const submitComment = () => {
        setSubmittingComment(true);
        axios.post(`/post/addcomment`, {postID: post.postID, comment: commentField.value}).then(res => {
            axios.get(`/post/getcomments?postID=${post.postID}`).then(res => {
                console.log(res);
                setComments(res.data);
                invokeIterateCommentCount();
                setSubmittingComment(false);
            }).catch(e => {
                console.log(e);
                setSubmittingComment(false);
            })
        }).catch(e => {
            console.log(e);
            setSubmittingComment(false);
        })
    }

    return (
        <div className='content-wrapper'>
            <div className='content'>
                {(post.hasOwnProperty('image') && post.image !== null) && <section className='image-container'>
                    <img className='image'
                         src={`/post/show/${post.image.filename}`}
                         alt='post image'/>
                </section>}
                <section className='details'>
                    <div className='description'>
                        <div className={'post-desc-container'}>
                            <p className={'desc-body'}>{post.description}</p>
                        </div>
                    </div>
                    <div className={'profile-link-container'}>
                        <NavLink className='user' to={`/profile/${post.createdBy.username}`}>
                            <span className={'profile-username'}>{post.createdBy.username}</span>
                            <img className={'profile-image'} src={`/post/show/${post.createdBy.profilePic}`}
                                 alt={post.createdBy.profilePic}/>
                        </NavLink>
                    </div>
                </section>
            </div>
            <div className='tags'>
                <ul className='tag-list'>
                    {tags.map((tag, index) => {
                        return <Tag highlighted={false} setQuery={props.setQuery} deletable={null} hasLink={true}
                                    tagName={tag} key={'post-' + props.index + '-' + index}/>
                    })}
                </ul>
                <section className='interaction-list'>
                    <div className='like-button'>
                        <LikeButton user={user} postID={post.postID} likeCount={post.liked.length}
                                    defaultState={isLiked}/>
                    </div>
                    <div className='repost-button'>
                        <RepostButton user={user} postID={post.postID} repostCount={post.reposted.length}
                                      defaultState={isReposted}/>
                    </div>
                    <div className='comment-button'>
                        <CommentButton iterateCommentCountRef={iterateCommentCountRef}
                                       commentCount={post.comments.length} openComments={openComments}
                                       defaultState={commentsOpen > 0}/>
                    </div>
                    <div className={'gallery-button'}>
                        <div className={'interaction-container social-flex'}>
                            {isGalleried ?
                                <div className={'social-container'}>
                                    <MdPlaylistAddCheck className={'galleried'} size={'100%'} onClick={removeFromGallery}/>
                                </div>
                                : <div className={'social-container'}>
                                    <MdPlaylistAdd size={'100%'} onClick={addToGallery}/>
                                </div>
                            }
                        </div>
                    </div>
                </section>
            </div>
            {commentsOpen > 0 && <div className={'comments'}>
                <div className={'comments-container'}>
                    <h2 className={'comments-header'}>comments</h2>
                    <div className={'comment-submission'}>
                        <div className={'comment-add-module'}>
                            <input id={'comment-text-field'} type="text" onChange={commentField.update} placeholder="enter comment"/>
                            {commentField.value !== '' &&
                            <button onClick={submitComment} disabled={submittingComment} className={"add-comment"}>
                                <FaPaperPlane size={'80%'}/>
                            </button>}
                        </div>
                    </div>
                    {comments.map((comment, index) => {
                        return (<div className={'comments-body'} key={'comment-' + index}>
                            <div className={'comment-wrapper'}>
                                <NavLink className={'comment-user'} to={'/'}>
                                    <img className={'profile-image'} src={`/post/show/${comment.user.profilePic}`}
                                         alt={comment.user.profilePic}/>
                                    <span className={'profile-username'}>{comment.user.username}</span>
                                </NavLink>
                                <p className={'comment-body'}>{comment.comment}</p>
                            </div>
                        </div>)
                    })}
                    <div className={'more-comments-button'}>

                    </div>
                </div>
            </div>
            }
        </div>
    )
}

function LikeButton (props) {
    const [liked, setLiked] = useState(props.defaultState);
    const [likeCount, setLikeCount] = useState(props.likeCount);
    let user = props.user;
    let postID = props.postID;

    const like = () => {
        axios.post(`/post/like`, {postID: postID}).then(res => {
            setLikeCount(likeCount + 1);
            setLiked(true);
        }).catch(e => {
            console.log(e);
        })
    }

    const unlike = () => {
        axios.post(`/post/like`, {postID: postID}).then(res => {
            setLikeCount(likeCount - 1);
            setLiked(false);
        }).catch(e => {
            console.log(e);
        })
    }

    return(
        <div className={'interaction-container'}>
            {user ? <div className={'interaction-container social-flex'}>
                {liked ?
                    <div className={'social-container'}>
                        <AiFillHeart className={'liked'} size={'100%'} onClick={unlike}/>
                        <span className={'liked social-counter'}>{likeCount}</span>
                    </div>
                    : <div className={'social-container'}>
                        <AiOutlineHeart size={'100%'} onClick={like}/>
                        <span className={'social-counter'}>{likeCount}</span>
                    </div>
                }
            </div>
                : <div className={'social-container'}>
                    <AiOutlineHeart size={'100%'}/>
                    <span className={'social-counter'}>{likeCount}</span>
                </div>
            }
        </div>
    )
}

function RepostButton (props) {
    const [reposted, setReposted] = useState(props.defaultState);
    const [repostCount, setRepostCount] = useState(props.repostCount);
    let user = props.user;
    let postID = props.postID;

    const repost = () => {
        axios.post(`/post/repost`, {postID: postID}).then(res => {
            setRepostCount(repostCount + 1);
            setReposted(true);
        }).catch(e => {
            console.log(e);
        })
    }

    const unrepost = () => {
        axios.post(`/post/repost`, {postID: postID}).then(res => {
            setRepostCount(repostCount - 1);
            setReposted(false);
        }).catch(e => {
            console.log(e);
        })
    }

    return(
        <div className={'interaction-container'}>
            {user ? <div className={'interaction-container social-flex'}>
                    {reposted ?
                        <div className={'social-container'}>
                            <AiOutlineRetweet className={'reposted'} size={'100%'} onClick={unrepost}/>
                            <span className={'reposted social-counter'}>{repostCount}</span>
                        </div>
                        : <div className={'social-container'}>
                            <AiOutlineRetweet size={'100%'} onClick={repost}/>
                            <span className={'social-counter'}>{repostCount}</span>
                        </div>
                    }
                </div>
                : <div className={'social-container'}>
                    <AiOutlineRetweet size={'100%'}/>
                    <span className={'social-counter'}>{repostCount}</span>
                </div>
            }
        </div>
    )
}

function CommentButton (props) {
    const [open, setOpen] = useState(props.defaultState);
    const [commentCount, setCommentCount] = useState(props.commentCount);

    const iterateComment = () => {
        setCommentCount(commentCount + 1);
    }

    const invokeOpenComments = () => {
        setOpen(true);
        if (props.openComments) props.openComments();
    }

    props.iterateCommentCountRef(iterateComment);

    return(
        <div className={'interaction-container social-flex'}>
            {open ?
                <div className={'social-container'}>
                    <ImBubble className={'comments-open'} size={'80%'}/>
                    <span className={'comments-open social-counter'}>{commentCount}</span>
                </div>
                : <div className={'social-container'}>
                    <ImBubble2 size={'80%'} onClick={invokeOpenComments}/>
                    <span className={'social-counter'}>{commentCount}</span>
                </div>
            }
        </div>
    )
}

export default Post
