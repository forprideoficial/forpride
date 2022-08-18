import './feedReply.css';
import { UserReply } from '../UserReply/UserReply';
import { useFetch } from '../../hooks/useFetch';

function FeedReply({idComment}) {
    const Local = localStorage.getItem("forpride");
    const userData = JSON.parse(Local);

    const {data} = useFetch(`/reply/${idComment}`);




    return (
        data?.length === 0 ? "" :    
        <div className="feedReply">
           
                             {data?.map((replys) => {
                                 return (
                                    <div className="feed-reply" key={replys.id}>
                                    <UserReply idAccount={replys.idAccount} username={replys.username} date={replys.created_at} text={replys.text} id={replys.id} role={userData.role}/>
                                    </div>
                                 )
                             })}
        </div>                       
    )
}

export {FeedReply}