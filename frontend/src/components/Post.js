import './Post.css'
import React, {Component, useState} from 'react';
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai'
import {IconContext} from 'react-icons';
import customModalStyles from "./CustomModalStyles";
import Tag from "./Tag";
let tags = ['tag1', 'tag2', 'tag3'];

function Post (props) {
    const [liked, setLiked] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const post = props.post;
    console.log(post);
    tags = props.post.tags;
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
                    {tags.map((tag, index) => {return <Tag highlighted={false} deletable={null} hasLink={true} tagName={tag} key={'post-' + props.index + '-' + index}/>})}
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
