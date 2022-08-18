import './FeedComments.css';
import { useContext, useState, memo } from 'react';
import { AuthContext } from '../../contexts/Auth';
import { UserComment } from '../UserComment/UserComment';
import { FeedReply } from '../FeedReply/FeedReply';
import { NewReply } from '../NewReply/NewReply';
import { EditComment } from '../EditComment/EditComment';
import { FiTrash2, FiEdit, FiCornerDownLeft } from 'react-icons/fi'
import { useFetch } from '../../hooks/useFetch';

function FeedCommentsComponent({idPost}) {
    const Local = localStorage.getItem("forpride");
    const userData = JSON.parse(Local);

    const {deleteComment} = useContext(AuthContext);
    const [dataComments, setDataComments] = useState([]);
    const [reply, setReply] = useState(false);
    const [edit, setEdit] = useState(false);

       const {data} = useFetch(`/comments/${idPost}`);



        
    function handleHabiliteReply () {
        if(reply === false) {
            setReply(true)
        } else {
            setReply(false) 
        }
    }

    function handleDeleteComment(idComment) {
        const deletar = window.confirm("Deseja deletar a postagem?");

        if(deletar === true) {
           deleteComment(idComment);
           let newCommentDelete = dataComments.filter(comment => comment.id !== idComment);
           setDataComments(newCommentDelete)
            } 
        }


        function handleHabiliteEdit () {
            if(edit === false) {
                setEdit(true)
            } else {
                setEdit(false) 
            }
        }



    return (
        <div className="feedComments">
            {/* <h5>{data?.length} {data?.length === 1 ? "comentário" : "comentários"}</h5> */}
                   
                             {data?.map((comments) => {
                                 return (
                                    <div className="feed-comment" key={comments.id}>
                                        <div className="block1Comment">
                                    <UserComment idAccount={comments.idAccount} username={comments.username}
                                    date={comments.created_at} role={userData.role}/>

                                     {userData.id === comments.idAccount ?
                                        <div className="buttonsComment">
                                            <button onClick={handleHabiliteReply} ><FiCornerDownLeft /></button>
                                            <button onClick={handleHabiliteEdit}><FiEdit /></button>
                                            <button onClick={() => {handleDeleteComment(comments.id)}}><FiTrash2 /></button>
                                        </div>
                                        : 
                                        <div className="buttonsComment">
                                        <button onClick={handleHabiliteReply}><FiCornerDownLeft /></button>
                                            </div>
                                            }
                             </div>
                                            <div className="comment-data" >
                                                <p>{comments.text}</p>
                                            </div>

                                            {edit ===  true ?
                                            <EditComment data={comments.text} id={comments.id}/>
                                            : ""
                                            }

                                            {reply === true ?
                                            <NewReply idComment={comments.id} username={comments.username}/>
                                                    :
                                                    ""}

                                    <FeedReply idComment={comments.id} />
                                    </div>
                                 )
                                })}
                          
  
        </div>
         
         
                        
    )
}

export const FeedComments = memo(FeedCommentsComponent)