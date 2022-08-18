import './feedPostEvent.css';
import { ItemFeed } from '../ItemFeed/ItemFeed';
import { useFetch } from '../../hooks/useFetch';


    function FeedPostEvent({idEvent}) {


        const {data} = useFetch(`/posts/events/${idEvent}`);
        console.log(data)
    
        if(!data) {
            return (
                <div className="load">
                    <h3>Carregando...</h3>
                </div>
            )
        }

    return (
        <div className="feedPostIndividual">
            <div className="posts-feed">
                            
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

export {FeedPostEvent}