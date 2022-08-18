import './feedPost.css';
import { useState, memo, useEffect} from 'react';
import { ItemFeed } from '../ItemFeed/ItemFeed';
import { useFetch, useFetchPost } from '../../hooks/useFetch';
import gifLoader from '../../assets/images/gif/loader.gif';
import {IoOptionsOutline} from 'react-icons/io5'
import api from '../../services/api';
import { FeedPost2 } from '../FeedPost2/FeedPost2';

function FeedPostComponent() {
    const Local = localStorage.getItem("forpride");
    const user = JSON.parse(Local);
    const [followers, setFollowers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

      const perPage = 5;

      const data2 = {
        man: user.preferenceOption
    }

    // const {data} = useFetch(`/posts/all?page=${currentPage}&limit=${perPage}`);
    // const {data} = useFetchPost(`/posts/difference/?page=${currentPage}&limit=${perPage}`, data2);
     const {data} = useFetch(`/posts/all?page=${currentPage}&limit=${perPage}`, data2);

     if(data){
        console.log("data")
        console.log(data)
     }
     useEffect(() => {
          if(data) {
              setFollowers(oldFollowers => [...oldFollowers, ...data])
          }
    }, [data]);

  
    useEffect(() => {
      const intersectionObserver = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          console.log('Sentinela appears!', currentPage + 1)
          setCurrentPage((currentValue) => currentValue + 1);
        }
      })
      intersectionObserver.observe(document.querySelector('#sentinela'));
      return () => intersectionObserver.disconnect();
    }, []);


    // useEffect(() => {
    //     async function loadPosts() {
    //      const data = {
    //          man: userPreferences.men,
    //          woman: userPreferences.woman,
    //          couple: userPreferences.couple,
    //          trisal: userPreferences.trisal,
    //          transvestites: userPreferences.transvestites,
    //          transsexuals: userPreferences.transsexuals,
    //          groups: userPreferences.groups
    //      }
    //      console.log("Preferencias no use Effect");
    //      console.log(data);
    //      console.log(user.uf);
    //     const res = await api.post(`/posts/qtd/${user.uf}/?page=${currentPage}&limit=${perPage}`, data)

    //     console.log("res.data")
    //     console.log(res.data)
    //  }

    //  loadPosts()
    // }, []);


  if(!followers) {
        return (
            <div className="load">
                <h3>Carregando...</h3>
            </div>
        )
    }

    return (

        <div className="feedPost">
            {/* {data?.length === 0 ? "" :
            <div className="settingsFeed">
                <button><IoOptionsOutline/></button>
                <div className="options">
                    
                </div>
            </div>
            } */}
            <div className="posts-feed">
                                {followers?.map((postsData => {
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
                                           username={postsData.username}
                                           group={postsData.nameGroup}
                                           forum={postsData.nameForum}
                                           idGroup={postsData.idGroup}
                                           idForum={postsData.idForum}
                                           typeAccount={postsData.typeAccount}
                                           />
                                           : "" }
   
                                           </div> 
                                )
                            }))}
                            <div id="sentinela">
                                {/* <div className="image">
                                    <img src={gifLoader} alt="Gif LOader more posts" />
                                    </div> */}
                                    </div>              
                           </div>
                           {/* {data?.length === 0 ?
                           <FeedPost2 /> 
                           : ""
                           } */}
        </div>                                
    )
}

export const FeedPost = memo(FeedPostComponent)