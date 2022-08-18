import "./plainSelected.css"
import { useParams } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import { TopBar } from "../../../components/TopBar/TopBar";
import { ChatSlim } from "../../../components/ChatSlim/ChatSlim";
import { ToolbarLeftSlim } from "../../../components/ToolBarLeftSlim/ToolbarLeftSlim";
import { BarBottomMenu } from "../../../components/BarBottomMenu/BarBottomMenu";
import { DateFormat } from "../../../components/DateFormat/DateFormat";
import { parseISO, format} from 'date-fns';

function PlainSelected() {
    const {name} = useParams();

    const {data} = useFetch(`/plains/unic/${name}`)
    if(data) {
        console.log(data)
    }
    const date =  new Date();
    console.log(date);

    const Newdate = parseISO(date);
    const datePost = format(
        new Date(), 
    "dd'/'MM'/'yyyy'"
    );
    

    if(data) {
        data?.sort(function(a,b) {
            if(parseInt(a.period) < parseInt(b.period) ) {
                return -1
            } else {
                return true
            }
        })
    }


    return  (
        <div className="PlainSelected">
            <TopBar />
            <div className="plains-informations">
            <h2>Plano selecionado</h2>

            <div className="plain">
            <div className="text">
            <h3> <b>Plano:</b>  {name}</h3>
            <h3> <b>Ativação:</b> {datePost} </h3>
                </div>

            <div className="link">
            <a href="/pricing">Alterar plano</a>
            </div>
            </div>
            {
                name === "Essencial" ?
                <div className="optionsPayment">
                    {data?.map((plain) => {
                        return (
                            plain === "Premium" ? "" :
                            <div className="optionUnic" key={plain.id}>
                               <div className="title">
                                <h3>{plain.name}</h3>
                                <h5>{
                                plain.name === "Trimestral" ? "/ Economize: 10%":
                                plain.name === "Semestral" ? "/ Economize: 15%":
                                plain.name === "Anual" ? "/ Economize: 20%":
                                ""
                                }</h5>
                                </div>
                        <h4> <b>Período:</b>  {plain.period} Dias</h4>
                        <h4> <b>Valor:</b>  R$ {plain.value}</h4>
                        <h4> <b>Pagamento:</b>  PIX</h4>
                        <a href={`/payment/${plain.id}`}>Prossegir para Pagamento</a>
                        </div>
                        )
                    })}

            </div>
            : 
            <div className="optionsPayment">
                     {data?.map((plain) => {
                         return (
                            plain === "Essencial" ? "" :
                            <div className="optionUnic" key={plain.id}>
                            <div className="title">
                                <h3>{plain.name}</h3>
                                <h5>{
                                plain.name === "Trimestral" ? "/ Economize: 10%":
                                plain.name === "Semestral" ? "/ Economize: 15%":
                                plain.name === "Anual" ? "/ Economize: 20%":
                                ""
                                }</h5>
                                </div>
                        <h4> <b>Período:</b>  {plain.period} Dias</h4>
                        <h4> <b>Valor:</b>  R$ {plain.value}</h4>
                        <h4> <b>Pagamento:</b>  PIX</h4>
                        <a href={`/payment/${plain.id}`}>Prossegir para Pagamento</a>
                        </div>
                        )
                    })}
        </div>
            }


           
            </div>

        </div>
    )
}

export { PlainSelected }


