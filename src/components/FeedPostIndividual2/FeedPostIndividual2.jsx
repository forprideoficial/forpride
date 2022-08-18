import { FiImage, FiVideo, FiUsers, FiList, FiMenu} from 'react-icons/fi'
import './feedPostIndividual2.css';
import {  useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { ItemFeed } from '../ItemFeed/ItemFeed';

    function FeedPostIndividual2({idAccount}) {
    const [myPosts, setMyPosts] = useState("");

      const type = myPosts;
    const {data} = useFetch(type === "" ? `/posts/filter/accounts/${idAccount}` : `/posts/filter/${idAccount}/${type}`);

    function postAll() {
        setMyPosts("")
    }

    function postText() {
        setMyPosts("post-text")
    }

    function postPhoto(){
        setMyPosts("post-photo")
    }

    function postVideo(){
        setMyPosts("post-video")
    }

    function postGroup(){
        setMyPosts("post-group")
    }

    function postForum(){
        setMyPosts("post-forum")
    }

    return (
        <div className="feedPostIndividual2">
            <div className="posts-feed">
            {/* <div className="buttons">
            <button className={myPosts === "" ? 'selected' : ""} onClick={postAll}> <FiMenu /> Todos </button>
            <button className={myPosts === "post-text" ? 'selected' : ""} onClick={postText}> <FiMenu /> Texto </button>
            <button className={myPosts === "post-photo" ? 'selected' : ""} onClick={postPhoto}> <FiImage /> Foto </button>
            <button className={myPosts === "post-video" ? 'selected' : ""} onClick={postVideo}> <FiVideo /> Vídeo </button>
            <button className={myPosts === "post-group" ? 'selected' : ""} onClick={postGroup}> <FiUsers /> Grupo </button>
            <button className={myPosts === "post-forum" ? 'selected' : ""} onClick={postForum}> <FiList /> Fórum </button>
            </div> */}
                            
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

export {FeedPostIndividual2}