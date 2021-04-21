import './Post.css'
import React, {Component, useState} from 'react';
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai'
let tags = ['tag1', 'tag2', 'tag3'];
let likedCount = 0;
let repostCount = 0;
let commentCount = 0;

function Post () {
    return (
        <div className='content-wrapper'>
            <div className='content'>
                <section className='image'>
                    <img src='../images/img.png' alt='user profile'/>
                </section>
                <section className='details'>
                    <p className='description'>desc</p>
                    <p className='user'>user name</p>
                </section>
            </div>
            <div className='tags'>
                <ul className='tag-list'>
                    {tags.map(tag => {return <Tag tagName={tag}/>})}
                </ul>
                <section className='interaction-list'>
                    <div className='like-button'>
                        <LikeButton state={true}/>
                    </div>
                </section>
            </div>
        </div>
    )
}

function resizeImage () {
    // TODO - Keep image at proper size when resizing the window
}

function Tag (props) {
    return (
        <li>
            <span className='tag-text'>{props.tagName}</span>
        </li>
    )
}

class LikeButton extends Component {
    state = {
        liked: false
    }

    like = (state) => {
        this.setState({
            liked: !this.state.liked
        })
    }

    render () {
        const heart = this.state.liked ? <AiFillHeart onclick={this.like()}/> : <AiOutlineHeart onclick={this.like()}/>;
        console.log(heart);
        return(
            <div>
                {heart}
            </div>
        )
    }
}

export default Post
