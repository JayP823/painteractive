import './Search.css'
import {useEffect, useState} from "react";
import axios from "axios";
import Feed from "./Feed";

function Search (props) {
    let user = props.user;
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
            <Feed user={user} feedDataRef={feedDataRef}/>
            <button onClick={loadNewPage} disabled={loading}>Load More Posts</button>
        </section>
    )
}

export default Search
