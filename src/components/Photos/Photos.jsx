import { useEffect, useState } from "react";
import api from "../../services/api";
import './photos.css'




function Photos({idAccount, type}) {
    const [data, setData] = useState([])

    useEffect(() => {
        async function findPosts(){
          const res = await api.get(`/posts/filter/${idAccount}/${type}`);
          console.log("Minhas Fotos")
          console.log(res.data)
          setData(res.data)
      }

      findPosts()

  }, [idAccount, type])


    return(
        <div className="photos">
                    {data.map((photo) => {
                        return (
                            <div className="photo" key={photo.id}>
                            <img src={photo.link} alt={photo.text} />
                            </div>
                        )
                    })}
        </div>
    )
}

export { Photos }