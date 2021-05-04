import './Post.css'
import React, {useState} from 'react';
import {AiOutlineHeart, AiFillHeart, AiOutlineRetweet} from 'react-icons/ai';
import Tag from "./Tag";
import axios from "axios";

function Post (props) {
    let user = props.user;
    const post = props.post;
    let tags = props.post.tags;
    let index = tags.indexOf('');
    if (index !== -1) {
        tags.splice(index, 1);
    }
    let isLiked = false;
    let isReposted = false;
    const [isGalleried, setIsGalleried] = useState(false);
    if (user) {
        if (post.liked.includes(user._id)) isLiked = true;
        if (post.reposted.includes(user._id)) isReposted = true;
        if (user.gallery.includes(post.postID)) setIsGalleried(true);
    }

    //console.log(post);

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
                        <p className={'desc-body'}>{post.description}</p>
                    </div>
                    <div className='user'>{post.createdBy.username}</div>
                </section>
            </div>
            <div className='tags'>
                <ul className='tag-list'>
                    {tags.map((tag, index) => {return <Tag highlighted={false} setQuery={props.setQuery} deletable={null} hasLink={true} tagName={tag} key={'post-' + props.index + '-' + index}/>})}
                </ul>
                <section className='interaction-list'>
                    <div className='like-button'>
                        <LikeButton user={user} postID={post.postID} likeCount={post.liked.length} defaultState={isLiked}/>
                    </div>
                    <div className='repost-button'>
                        <RepostButton user={user} postID={post.postID} repostCount={post.reposted.length} defaultState={isReposted}/>
                    </div>
                    <div className={'gallery-button'}>

                    </div>
                </section>
            </div>
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
                        <span className={'social-counter'}>{likeCount}</span>
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
                            <span className={'social-counter'}>{repostCount}</span>
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

export default Post
