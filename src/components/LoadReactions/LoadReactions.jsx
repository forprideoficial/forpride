import { useEffect, useState} from 'react';
import  api from '../../services/api'
function LoadReactions({idPost}) {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function reactionsLoad() {
            const res = await api.get(`/reactions/${idPost}`);
            setData(res.data);
            console.log("Curtidas")
            console.log(res.data)
        }
        reactionsLoad()
    }, [idPost])
    return (
        data
    )
}

export { LoadReactions }