import "./buttonFeed.css";
import { IoNewspaperOutline } from "react-icons/io5";
import { useCallback, useEffect, useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import api from "../../../services/api";

function ButtonFeed() {
    const Local = localStorage.getItem("forpride");
    const user = JSON.parse(Local);

    const [dateReadFeed, setDateReadFeed] = useState([]);



    const loadDateReadFeed = useCallback(async () => {
              const idAccount = user.id
              await api.get(`/datereadfeed/${idAccount}`)
              .then( async (res) => {
                  if(res.data.length !== 0) {
                      setDateReadFeed(res.data[0]);
                      return;
                  } else {
                      const data = {
                          idAccount: user.id,
                          DateReadFeed: new Date() 
                      }
                      await api.post(`/datereadfeed`, data).then(() => {
                          console.log("Data inicial definida com sucesso!")
                          return;
                      }).catch(error => {
                  console.log("Erro ao buscar dados" + error)
              })
                  }
              }).catch(error => {
                  console.log("Erro ao buscar dados" + error)
              })
          
          }, [user.id]) 
 
     useEffect(() => {
         loadDateReadFeed()
     }, [loadDateReadFeed ]);

     const {data} = useFetch(`/posts/all`);

     let postsFilter = [];
     if(data) {
         postsFilter = data?.filter((posts) => (new Date(posts.created_at) > new Date(dateReadFeed.DateReadFeed) ))
     }
 
 
     async function handleUpdateReadFeed() {

        if(user.status === "suspense" ) {
            window.open("/feed","_self");
            return
        }
         const id = dateReadFeed.id
         const data = {
             DateReadFeed: new Date()
         }
 
     await api.patch(`/datereadfeed/${id}`, data).then((res) => {
         console.log("Data inicial alterada com sucesso!");
         window.open("/feed", "_self")
         }).catch(error => {
         console.log("Erro ao buscar dados" + error)
     })
 
       }
     


    return (
        <button className="toolIcon" onClick={handleUpdateReadFeed}>
               <IoNewspaperOutline size={20}/>Feed
            {postsFilter.length === 0 ? "" :
                <div className="counter"> {postsFilter.length}</div>
            }
           </button>
    )
}

export {ButtonFeed}