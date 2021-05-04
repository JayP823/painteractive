import './Home.css'
import {useEffect, useState} from "react";
import axios from "axios";
import Feed from "./Feed";

function Home (props) {
    let user = props.user;
    let setUser = props.setUser;
    const [pageNumber, setPageNumber] = useState(0);
    const [loading, setLoading] = useState(true);

    const loadNewPage = () => {
        setLoading(true);
        setPageNumber(pageNumber + 1);
    }

    let feedData;
    const feedDataRef = (handleUpdate) => {
        feedData = handleUpdate;
    }

    const feedDataInvoke = (newData) => {
        if (feedData) feedData(newData);
    }

    useEffect(() => {
        let feedParams = {
            page: pageNumber
        }

        axios.get(`/post/feed`, {params: feedParams}).then(response => {
            feedDataInvoke(response.data);
            return response.data;
        }).catch(error => {
            console.log(error);
        });

        setLoading(false);
    }, [pageNumber]);

    return (
        <section className={'home-container'}>
            <Feed user={user} setUser={setUser} feedDataRef={feedDataRef}/>
            <div className={'search-footer'}>
                <button className={'submit-button'} onClick={loadNewPage} disabled={loading}>
                    <span className={'load-text'}>Load More Posts</span>
                </button>
            </div>
        </section>
    )
}

export default Home
