import { EditPost } from '../EditPost/EditPost'
import { ListReactions } from '../ListReactions/ListReactions'
import { NewComment } from '../NewComment/NewComment'
import { UsersPosts } from '../UsersPosts/UsersPosts'
import { Link } from 'react-router-dom';
import { FiTrash2, FiEdit, FiMessageCircle } from 'react-icons/fi'
import { useState, useContext, memo } from 'react'
import './itemFeed.css'
import { AuthContext } from '../../contexts/Auth'
import { ListCommentsAndReactions } from '../ListCommentsAndReactions/ListCommentsAndReactions'
import { ListComments } from '../ListComments/ListComments'


function ItemFeedComponent({idAccount, link, date, text, type, id, username, group, forum, idGroup, idForum, typeAccount}) {
    const Local = localStorage.getItem("forpride");
    const userData = JSON.parse(Local);

    const dateActual = new Date();

    const [comment, setComment] = useState(false);
    const [edit, setEdit] = useState(false);
    const {deletePost} = useContext(AuthContext);

    function handleHabiliteComment () {
        if(comment === false) {
            setComment(true)
            setEdit(false) 
        } else {
            setComment(false) 
        }
    }

    function handleHabiliteEdit () {
        if(edit === false) {
            setEdit(true)
            setComment(false) 
        } else {
            setEdit(false) 
        }
    }

    function handleDeletePost(id) {
        const deletar = window.confirm("Deseja deletar a postagem?");
        if(deletar === true) {
        deletePost(id);
        } 
    }

    function handleBockVideo(e) {
        e.preventDefault();

        window.open("/updateplain","_self");
    }
    
   return (
         <div className="feed-post" key={id} >
    <UsersPosts idAccount={idAccount} username={username} date={date} keyId={id} role={userData.role} type={typeAccount}/>
    <div className="TextLink">
    <Link to={group !== "" ? `/group/${idGroup}` : forum !== "" ? `/forum/${idForum}` : ""} ><h5>{group !== "" ? `Grupo: ${group}` : forum  !== "" ? `Forum: ${forum}` : ""  } </h5></Link>
    </div>

             <div className="post-data" >
                 <p>{text}</p>
             </div>
             
             
             <div className={edit === true ? "edit" : "editHidden"}>
             {idAccount === userData.id ? 
                  <EditPost data={text} id={id} />
                  : ""
                 }
             </div>

             {type === "post-photo"  ?
                 <div className="post-data-media" >
                  <div className='image'>
                     <div className="marcadagua">
                     <h3 className='white'>{`${dateActual.getDate()}/${dateActual.getMonth()+1}/${dateActual.getFullYear()} -`}</h3>
                         <h3 className='white'>{userData.id}</h3>
                         <h3 className='white'>{`${dateActual.getDate()}/${dateActual.getMonth()+1}/${dateActual.getFullYear()} -`}</h3>
                         <h3 className='white'>{userData.id}</h3>
                         <h3 className='white'>{`${dateActual.getDate()}/${dateActual.getMonth()+1}/${dateActual.getFullYear()} -`}</h3>
                         <h3 className='white'>{userData.id}</h3>
                         <h3 className='white'>{`${dateActual.getDate()}/${dateActual.getMonth()+1}/${dateActual.getFullYear()} -`}</h3>
                         <h3 className='white'>{userData.id}</h3>
                         <h3 className='white'>{`${dateActual.getDate()}/${dateActual.getMonth()+1}/${dateActual.getFullYear()} -`}</h3>
                         <h3 className='white'>{userData.id}</h3>
                         <h3 className='white'>{`${dateActual.getDate()}/${dateActual.getMonth()+1}/${dateActual.getFullYear()} -`}</h3>
                         <h3 className='white'>{userData.id}</h3>
                         <h3 className='white'>{`${dateActual.getDate()}/${dateActual.getMonth()+1}/${dateActual.getFullYear()} -`}</h3>
                         <h3 className='white'>{userData.id}</h3>
                         <h3 className='white'>{`${dateActual.getDate()}/${dateActual.getMonth()+1}/${dateActual.getFullYear()} -`}</h3>
                         <h3 className='white'>{userData.id}</h3>
                     <h3 className='white'>{`${dateActual.getDate()}/${dateActual.getMonth()+1}/${dateActual.getFullYear()} -`}</h3>
                         <h3 className='white'>{userData.id}</h3>
                         <h3 className='white'>{`${dateActual.getDate()}/${dateActual.getMonth()+1}/${dateActual.getFullYear()} -`}</h3>
                         <h3 className='white'>{userData.id}</h3>
                         <h3 className='white'>{`${dateActual.getDate()}/${dateActual.getMonth()+1}/${dateActual.getFullYear()} -`}</h3>
                         <h3 className='white'>{userData.id}</h3>
                         <h3 className='white'>{`${dateActual.getDate()}/${dateActual.getMonth()+1}/${dateActual.getFullYear()} -`}</h3>
                         <h3 className='white'>{userData.id}</h3>
                         <h3 className='white'>{`${dateActual.getDate()}/${dateActual.getMonth()+1}/${dateActual.getFullYear()} -`}</h3>
                         <h3 className='white'>{userData.id}</h3>
                         <h3 className='white'>{`${dateActual.getDate()}/${dateActual.getMonth()+1}/${dateActual.getFullYear()} -`}</h3>
                         <h3 className='white'>{userData.id}</h3>
                         <h3 className='white'>{`${dateActual.getDate()}/${dateActual.getMonth()+1}/${dateActual.getFullYear()} -`}</h3>
                         <h3 className='white'>{userData.id}</h3>
                         <h3 className='white'>{`${dateActual.getDate()}/${dateActual.getMonth()+1}/${dateActual.getFullYear()} -`}</h3>
                         <h3 className='white'>{userData.id}</h3>

                     </div>
                      <img src={link} alt={link}/>
                  </div>
                 </div> :
             type === "post-video"  ?
             <div className="post-data-media"  >
                  <div className='image-video'>

                    {userData.status === "essencial" ?
                                         <div className="blockVideo" onClick={handleBockVideo}>
                                      </div>
                    :
                    <>
                  <div className="markTop">
                         <h3 className='white'>{`${dateActual.getDate()}/${dateActual.getMonth()+1}/${dateActual.getFullYear()} -`}</h3>
                         <h3 className='white'>{userData.id}</h3>
                         <h3 className='white'>{`${dateActual.getDate()}/${dateActual.getMonth()+1}/${dateActual.getFullYear()} -`}</h3>
                         <h3 className='white'>{userData.id}</h3>
                         <h3 className='white'>{`${dateActual.getDate()}/${dateActual.getMonth()+1}/${dateActual.getFullYear()} -`}</h3>
                         <h3 className='white'>{userData.id}</h3>
                         <h3 className='white'>{`${dateActual.getDate()}/${dateActual.getMonth()+1}/${dateActual.getFullYear()} -`}</h3>
                         <h3 className='white'>{userData.id}</h3>
                         <h3 className='white'>{`${dateActual.getDate()}/${dateActual.getMonth()+1}/${dateActual.getFullYear()} -`}</h3>
                         <h3 className='white'>{userData.id}</h3>
                         <h3 className='white'>{`${dateActual.getDate()}/${dateActual.getMonth()+1}/${dateActual.getFullYear()} -`}</h3>
                         <h3 className='white'>{userData.id}</h3>
                         <h3 className='white'>{`${dateActual.getDate()}/${dateActual.getMonth()+1}/${dateActual.getFullYear()} -`}</h3>
                         <h3 className='white'>{userData.id}</h3>
                         <h3 className='white'>{`${dateActual.getDate()}/${dateActual.getMonth()+1}/${dateActual.getFullYear()} -`}</h3>
                         <h3 className='white'>{userData.id}</h3>
                     </div>
                  <div className="markBottom">
                  <h3 className='white'>{`${dateActual.getDate()}/${dateActual.getMonth()+1}/${dateActual.getFullYear()}`}</h3> -
                         <h3 className='white'>{userData.id}</h3>
                         <h3 className='white'>{`${dateActual.getDate()}/${dateActual.getMonth()+1}/${dateActual.getFullYear()} -`}</h3>
                         <h3 className='white'>{userData.id}</h3>
                         <h3 className='white'>{`${dateActual.getDate()}/${dateActual.getMonth()+1}/${dateActual.getFullYear()} -`}</h3>
                         <h3 className='white'>{userData.id}</h3>
                         <h3 className='white'>{`${dateActual.getDate()}/${dateActual.getMonth()+1}/${dateActual.getFullYear()} -`}</h3>
                         <h3 className='white'>{userData.id}</h3>
                         <h3 className='white'>{`${dateActual.getDate()}/${dateActual.getMonth()+1}/${dateActual.getFullYear()} -`}</h3>
                         <h3 className='white'>{userData.id}</h3>
                         <h3 className='white'>{`${dateActual.getDate()}/${dateActual.getMonth()+1}/${dateActual.getFullYear()} -`}</h3>
                         <h3 className='white'>{userData.id}</h3>
                         <h3 className='white'>{`${dateActual.getDate()}/${dateActual.getMonth()+1}/${dateActual.getFullYear()} -`}</h3>
                         <h3 className='white'>{userData.id}</h3>
                         <h3 className='white'>{`${dateActual.getDate()}/${dateActual.getMonth()+1}/${dateActual.getFullYear()} -`}</h3>
                         <h3 className='white'>{userData.id}</h3>
                     </div>
                    </>
                    }


                  <video playsInline controls controlsList="nofullscreen nodownload">
                     <source playsInline src={link} type="video/mp4"/>
                     <source playsInline src={link} type="video/quicktime"/>
                     <source playsInline src={link} type="video/mov"/>
                     <source playsInline src={link}  type="video/ogg"/>
                     <source playsInline src={link}  type="video/webm"/>
                     <source playsInline src={link}  type="video/avi"/>
                     </video>
                 </div>
                 </div> :
             ""
               }

             <div className="reactions" >
              <ListReactions idPost={id} idAccount={idAccount}/>
                 {idAccount === userData.id ?
                 <>
                     <button onClick={handleHabiliteEdit}> <FiEdit /> </button>
                     <button onClick={() => {handleDeletePost(id)}}> <FiTrash2 /> </button>
                     </>
                 : ""}
             </div>
            {userData.status === "essencial" || userData.status === "suspense" ? "":
             <div className={"comment"}>
                  <NewComment postData={id} idAccount={idAccount}/>
             </div>
}
            <div className="infosReactions">
        <ListCommentsAndReactions idPost={id} />
        <ListComments idPost={id}/>
            </div>
         </div>
         )
}

export const ItemFeed = memo(ItemFeedComponent)