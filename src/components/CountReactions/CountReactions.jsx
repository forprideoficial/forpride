import { useEffect, useState } from "react";
import api from "../../services/api";
import "./countReactions.css"

function CountReactions(idPost) {
    const [like, setLike] = useState([]);

    useEffect(() => {
        async function loadReactions() {
           const res =  await api.get(`/reactions/${idPost.idPost}`)
                setLike(res.data);
        }

        loadReactions()
    },[idPost.idPost]);
    return (
        <h6>{like.length} Votos</h6>
    )
}

export {CountReactions}