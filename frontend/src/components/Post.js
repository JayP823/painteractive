import './Post.css'
import React, {Component, useState} from 'react';
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai'
import {IconContext} from 'react-icons'
import image from '../images/img.png';
let tags = ['tag1', 'tag2', 'tag3'];
let likedCount = 0;
let repostCount = 0;
let commentCount = 0;

function Post () {
    return (
        <div className='content-wrapper'>
            <div className='content'>
                <section className='image-container'>
                    <img className='image' src={image} alt='post image'/>
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
                    <div className='repost-button'>
                        <LikeButton state={true}/>
                    </div>
                </section>
            </div>
        </div>
    )
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
    };

    like = () => {
        this.setState({
            liked: !this.state.liked
        });
    };

    render () {
        //const heart = this.state.liked ? <AiFillHeart onClick={this.like()}/> : <AiOutlineHeart onClick={this.like()}/>;

        return(
            <div onClick={this.like}>
                {this.state.liked === true ? (
                    <IconContext.Provider value={{className:"like-icon"}}><AiFillHeart/></IconContext.Provider>
                ) : <AiOutlineHeart/>}
            </div>
        )
    }
}

export default Post
