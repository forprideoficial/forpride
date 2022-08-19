import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu";
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim";
import { TopBar } from "../../components/TopBar/TopBar";
import { useFetch } from "../../hooks/useFetch";
import "./recados.css"

function Recados() {
    const Local = localStorage.getItem("forpride");
    const user = JSON.parse(Local);

   const {data} = useFetch(`/news`);

    function hadleOpenRecado(id) {
        window.open(`/recados/${id}`, "_self");
    }
    return (
        <div className="Recados">
            <TopBar />
            <h3>Caixa de recados</h3>

            <div className="listRecados">
            {data?.length === 0 ? <h5>Você não possúi recados</h5> : "" }

                 {data?.map((news) => {
            return(
                news.destination === "All" || news.destination === user.id ?
                <div className={news.priority === "Normal" ? "new": news.priority === "Alta" ? "new2" : "new"} key={news.id} onClick={() =>hadleOpenRecado(news.id)}>
                    <div className="name">
                        <h4>{news.title}</h4>
                        <h5>{news.text.substring(0,50)}{news.text.length < 50 ? "" : "..."}</h5>
                    </div>
                </div>
                : ""
            )
            })}         
            </div>
                 <ToolbarLeftSlim />
                 <BarBottomMenu />
        </div>
    )
}

export { Recados }