import './feedPostUnic.css';
import { memo} from 'react';
import { ItemFeed } from '../ItemFeed/ItemFeed';
import { useFetch } from '../../hooks/useFetch';


function FeedPostUnicComponent({id}) {
      

      const {data} = useFetch(`/posts/one/${id}`);


  if(!data) {
        return (
            <div className="load">
                <h3>Carregando...</h3>
            </div>
        )
    }

    return (

        <div className="FeedPostUnic">
            <div className="posts-feed">
                                {data?.map((postsData => {
                                    return (   
                                        <div className="preItem" key={postsData.id}>
                             {postsData.type === "post-text" ||
                             postsData.type === "post-text-group" ||
                             postsData.type === "post-photo" ||
                             postsData.type === "post-video" ||                  
                             postsData.type === "post-photo-group" ||                   
                             postsData.type === "post-video-group" ?   
                                 <ItemFeed idAccount={postsData.idAccount} link={postsData.link}
                                           date={postsData.created_at} text={postsData.text}
                                           type={postsData.type} id={postsData.id}
                                           username={postsData.username} group={postsData.nameGroup}
                                           forum={postsData.nameForum}/>
                                           : "" }
   
                                           </div> 
                                )
                            }))}            
                           </div>
                        
                        <div className="button">
                        <a href="/feed">Voltar ao feed</a>
                        </div>
        </div>                                
    )
}

export const FeedPostUnic = memo(FeedPostUnicComponent)