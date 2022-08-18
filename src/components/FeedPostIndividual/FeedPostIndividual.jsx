import { FiImage, FiVideo, FiUsers, FiList, FiMenu} from 'react-icons/fi'
import './feedPostIndividual.css';
import {  useState } from 'react';
import { ItemFeed } from '../ItemFeed/ItemFeed';
import { useFetch } from '../../hooks/useFetch';

    function FeedPostIndividual({id}) {
    const Local = localStorage.getItem("forpride");
    const userData = JSON.parse(Local);

    const [post, setPost] = useState("");

    const {data} = useFetch(post === "" ? `/posts/filter/accounts/${userData.id}` : `/posts/filter/${userData.id}/${post}`);
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
        setPost("post-text")
    }

    function postPhoto(){
        setPost("post-photo")
    }

    function postVideo(){
        setPost("post-video")
    }

    function postGroup(){
        setPost("post-group")
    }

    function postForum(){
        setPost("post-forum")
    }



    return (
        <div className="feedPostIndividual">
            <div className="posts-feed">
            {/* <div className="buttons">
            <button className={post === "" ? 'selected' : ""} onClick={postAll}> <FiMenu /> Todos </button>
            <button className={post === "post-text" ? 'selected' : ""} onClick={postText}> <FiMenu /> Texto </button>
            <button className={post === "post-photo" ? 'selected' : ""} onClick={postPhoto}> <FiImage /> Foto </button>
            <button className={post === "post-video" ? 'selected' : ""} onClick={postVideo}> <FiVideo /> Vídeo </button>
            <button className={post === "post-group" ? 'selected' : ""} onClick={postGroup}> <FiUsers /> Grupo </button>
            <button className={post === "post-forum" ? 'selected' : ""} onClick={postForum}> <FiList /> Fórum </button>
            </div>
                             */}
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

export {FeedPostIndividual}