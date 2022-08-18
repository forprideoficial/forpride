import { FiImage, FiVideo, FiMenu } from 'react-icons/fi'
import './feedPostGroup.css';
import { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { ItemFeed } from '../ItemFeed/ItemFeed';

    function FeedPostGroup({idGroup}) {
    const [post, setPost] = useState("");

    const type = post;
    const {data} = useFetch(post === "" ? `/posts/groups/${idGroup}` : `/posts/groups/${idGroup}/${type}`);
    console.log(data)

    if(!data) {
        return (
            <div className="load">
                <h3>Carregando...</h3>
            </div>
        )
    }


    function postAll() {
        setPost("")
    }

    function postText() {
        setPost("post-text-group")
    }

    function postPhoto(){
        setPost("post-photo-group")
    }

    function postVideo(){
        setPost("post-video-group")
    }

    return (
        <div className="feedPostIndividual">
            <div className="posts-feed">
            <div className="buttons">
            <button className={post === "" ? 'selected' : ""} onClick={postAll}> <FiMenu /> Todos </button>
            <button className={post === "post-text-group" ? 'selected' : ""} onClick={postText}> <FiMenu /> Texto </button>
            <button className={post === "post-photo-group" ? 'selected' : ""} onClick={postPhoto}> <FiImage /> Foto </button>
            <button className={post === "post-video-group" ? 'selected' : ""} onClick={postVideo}> <FiVideo /> Vídeo </button>
            </div>
                            
                                {data?.map((postsData => {
                                    return (   
                                        <div className="preItem" key={postsData.id}>
                                        <ItemFeed idAccount={postsData.idAccount} link={postsData.link}
                                               date={postsData.created_at} text={postsData.text}
                                               type={postsData.type} id={postsData.id}
                                               username={postsData.username} group={postsData.nameGroup}
                                               typeAccount={postsData.typeAccount}
                                               forum={postsData.nameForum}/>
                                    </div>
                                )
                            }))}
                           </div>

        </div>
         
         
                        
    )
}

export {FeedPostGroup}