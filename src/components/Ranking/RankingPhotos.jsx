import { useFetch } from '../../hooks/useFetch';
import { useState, useEffect } from 'react';
import api from '../../services/api';

function RankingPhotos() {

    const [photo, setPhoto] = useState([])
    const [video, setVideo] = useState([])
    const [type, setType] = useState("Photo");

    const [dados, setDatos] = useState([]);
    const list = [];

    const {data} = useFetch(`/posts/filter/post-photo`);

//     useEffect(() => {
//         if(data) {
//             setFollowers(oldFollowers => [...oldFollowers, ...data])
//         }
//   }, [data]);



    data?.forEach((photos) => {
         async function loadReactions() {
           await api.get(`/reactions/${photos.id}`).then((res) => {
          //  console.log(res.data.length)
            const dados = {
                id: photos.id,
                likes: res.data.length,
                idAccount: photos.idAccount,
                link: photos.link,
                username: photos.username
            }
           // console.log(dados)
           list.push(dados)
           })
        }
        console.log(list)
        loadReactions()
    })            

    
    
    useEffect(() => {
        if(list) {
            setPhoto(oldFollowers => [...oldFollowers, ...list])
        }
    }, [list]);
    console.log(photo);
    

    return (
        <div className="RankingPhotos">
                {/* {photo.map((photos) => {
                    return (
                        <div className="unic">
                            <h5>{photos.likes} Votos</h5>
                        </div>
                    )
                })} */}
        </div>
    )
}

export { RankingPhotos }