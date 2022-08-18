import { useState, useEffect } from "react";
import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu";
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim";
import { TopBar } from "../../components/TopBar/TopBar";
import { Link } from "react-router-dom"
import api from "../../services/api"
import "./search.css"
import { IoOptionsOutline, IoCloseCircleOutline } from "react-icons/io5";
import { useFetch } from "../../hooks/useFetch";

function Search() {
    const Local = localStorage.getItem("forpride");
    const userData = JSON.parse(Local);

    const [online, setOnline] = useState([])
    const [filtro, setFiltro] = useState("false")
    const [search, setSearch] = useState('');
    const [type, setType] = useState('');
    const [país, setPaís] = useState('');
    const [index, setIndex] = useState(0);
    const [qtd, setQtd] = useState(20);
    const [typeSearch, setTypeSearch] = useState('Nickname');
    const [text, setText] = useState('Carregando usuários');

    const searchLower = search.toLowerCase()

    useEffect(() => {
        async function loadUsersONline() {
            const res = await api.get("/accounts");

            res.data.forEach((user) => {
                async function loadInformations() {
                    await api.get(`/informations/${user.id}`).then((res) => {
                        if(res.data[0] === undefined) {
                            console.log(user.id)
                            console.log(user)
                            console.log(res.data)
                        }
                        if(res.data[0] === undefined) {
                            return
                        }
                          const dados = {
                              idAccount: user.id,
                              status: user.status,
                              username: user.username,
                              type: user.type,
                              país: user.país === null || user.país === undefined ? "" : user.país,
                              avatar: res.data[0].avatar,
                              nickname: res.data[0].nickname === null || res.data[0].nickname === undefined ? "" : res.data[0].nickname,     
                              city: res.data[0].city === null || res.data[0].city === undefined ? "" : res.data[0].city,     
                              uf: res.data[0].uf === null || res.data[0].uf === undefined ? "" : res.data[0].uf,         
                          }
                          
                          setOnline(oldOnline => [...oldOnline, dados])
                          setText("Nenhum resultado para sua busca!")
      
                      }).catch((error) => {
                          console.log(error)
                      })  
                }

                loadInformations()
 
       })
        }
        loadUsersONline();   
     }, [])



    function handleSearch(e){
        e.preventDefault();
        setIndex(0)
        setQtd(20)
    }

    function handlePaísBrasil(e) {
        e.preventDefault();
        setPaís("Brasil");
        setIndex(0)
        setQtd(20)
    }
    function handlePaísPortugal(e) {
        e.preventDefault();
        setPaís("Portugal");
        setIndex(0)
        setQtd(20)
    }
    function handleTypeMen(e) {
        e.preventDefault();
        setType("Homem");
        setIndex(0)
        setQtd(20)
    }
 
    function handleTypeCouple(e) {
        e.preventDefault();
        setType("Casal")
        setIndex(0)
        setQtd(20)
    }
 
    function handleTypeWoman(e) {
        e.preventDefault();
        setType("Mulher")
        setIndex(0)
        setQtd(20)
    }
 
    function handleTypeTrisal(e) {
        e.preventDefault();
        setType("Trisal")
        setIndex(0)
        setQtd(20)
    }
 
    function handleTypeTransex(e) {
        e.preventDefault();
        setType("Transex")
        setIndex(0)
        setQtd(20)
    }
 
    function handleTypeTravestis(e) {
        e.preventDefault();
        setType("Travestis")
        setIndex(0)
        setQtd(20)
    }



function handleClearFilter(e) {
    e.preventDefault();
    setSearch("");
    setType("");
    setPaís("");
}

function HandleNext(e) {
    e.preventDefault();
    setIndex(index + 20)
    setQtd(qtd + 20)
}
function HandlePrev(e) {
    e.preventDefault();
    setIndex(index - 20)
    setQtd(qtd - 20)
}

function handleTypeSearchId(e) {
    e.preventDefault();
    setTypeSearch("Id")
}
function handleTypeSearchNickname(e) {
    e.preventDefault();
    setTypeSearch("Nickname")
}
function handleTypeSearchUsername(e) {
    e.preventDefault();
    setTypeSearch("Username")
}
function handleTypeSearchCity(e) {
    e.preventDefault();
    setTypeSearch("City")
}
function handleTypeSearchUf(e) {
    e.preventDefault();
    setTypeSearch("Uf")
}

function handleSetFilter(data) {
    console.log(data)
    setFiltro(data);
}


    
    const SearchUsers = typeSearch === "Nickname" ? online?.filter((informations) => informations.nickname.toLowerCase().includes(searchLower))
                    : typeSearch === "City" ? online?.filter((informations) => informations.city.toLowerCase().includes(searchLower))
                    : typeSearch === "Username" ? online?.filter((informations) => informations.username.toLowerCase().includes(searchLower))
                    : typeSearch === "Uf" ? online?.filter((informations) => informations.uf.toLowerCase().includes(searchLower))
                    : typeSearch === "Id" ? online?.filter((informations) => informations.idAccount.toLowerCase().includes(searchLower)) : ""

                    const userFilter = online?.filter((onlines) => onlines.type === type )
                    const paísFilter = online?.filter((onlines) => onlines.país === país )

    const SearchUsersFilterTpe = online?.filter((informations) => informations.nickname.toLowerCase().includes(searchLower)
                                                                ||  informations.username.toLowerCase().includes(searchLower)
                                                                ||  informations.city.toLowerCase().includes(searchLower)
                                                                ||  informations.uf.toLowerCase().includes(searchLower)
                                                                ||  informations.idAccount.toLowerCase().includes(searchLower)
                                                                && informations.type === type)

    const SearchUsersFilterPaís = online?.filter((informations) => informations.nickname.toLowerCase().includes(searchLower)
                                                                ||  informations.username.toLowerCase().includes(searchLower)
                                                                ||  informations.city.toLowerCase().includes(searchLower)
                                                                ||  informations.uf.toLowerCase().includes(searchLower)
                                                                ||  informations.idAccount.toLowerCase().includes(searchLower)
                                                                && informations.país === país)

    const FilterPaísType = online?.filter((informations) => informations.type === type && informations.país === país)

    const SearchUsersFilter = online?.filter((informations) => informations.nickname.toLowerCase().includes(searchLower)
                                                                ||  informations.username.toLowerCase().includes(searchLower)
                                                                ||  informations.city.toLowerCase().includes(searchLower)
                                                                ||  informations.uf.toLowerCase().includes(searchLower)
                                                                ||  informations.idAccount.toLowerCase().includes(searchLower)
                                                                && informations.type === type
                                                                && informations.país === país)

    const usersNewArray = type === "" && search !== "" && país === "" ? SearchUsers :
                          type !== "" && search === ""  && país === "" ? userFilter :
                          type === "" && search === "" && país !== "" ? paísFilter :
                          type !== "" && search !== "" && país === "" ? SearchUsersFilterTpe :
                          type === "" && search !== "" && país !== "" ? SearchUsersFilterPaís :
                          type !== "" && search === "" && país !== "" ? FilterPaísType :
                          type !== "" && search !== "" && país !== "" ? SearchUsersFilter :
                          online

                          const limitData = usersNewArray.slice(index,qtd);

if(!limitData) {
    return (
<>
<br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h4>Carregando usuários</h4></>
        )
}
 
    return (
        <div className="SearchPage">
                        <TopBar />
            <div className="main">            
            <div className="itensSearch">
              
        
            {limitData.map((information) => {
                return(
                    information.status === "pending" ? "" :
                    <div className="accounts" key={information.idAccount}>
                        <div className="image">
                            <a href={information.idAccount === userData.id ? "/profile" : `/profile-friend/${information.idAccount}` } target="_blank">
                        <img 
                        src={information.avatar}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // previne loop
                            currentTarget.src="https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240";
                        }}
                        />
                        </a>
                        </div>
                        <div className="infos2">
                        <a href={information.idAccount === userData.id ? "/profile" : `/profile-friend/${information.idAccount}` } target="_blank">
                            <h5>{information.nickname} {information.país === "Brasil" ? "🇧🇷" : information.país === "Portugal" ? "🇵🇹" : ""}</h5>
                            </a>
                            <h6>{information.username}</h6>
                            <div className="moreInfos2">
                            <h6>{information.type}</h6>
                            <h6>{information.city} - {information.país === "Brasil" ? `${information.uf}` : information.país === "Portugal" ? `${information.país}` : information.uf} </h6>
                            </div>
                        </div>
                        </div>
                
                )
            })}
                <div className="pages">
           {index === 0 ? "" : <button onClick={HandlePrev}>Voltar</button> } 
           {usersNewArray.length === 0 ? <><h3>{text}</h3></>
           :
           <>
           <h5>Resultados de {index + 1} a {qtd} - Todal de {usersNewArray.length}</h5>
            <button onClick={HandleNext}>Avançar</button>
           </>
           }
                </div>
            
            </div>


            <div className="filterActive">
                {filtro === "false" ?
            <button onClick={() => handleSetFilter("true")}> <IoOptionsOutline/></button>
                :
            <button onClick={() => handleSetFilter("false")}><IoCloseCircleOutline/></button>
                }
            </div>
            {filtro === "false" ? "" :
            <div className="searchButton">
            <h3>Filtro de busca</h3>
            <div className="buttons">
                      <button className={typeSearch === "Id" ? "select" : ""} onClick={handleTypeSearchId}>ID</button>
                      <button className={typeSearch === "Nickname" ? "select" : ""} onClick={handleTypeSearchNickname}>Nome</button>
                      <button className={typeSearch === "Username" ? "select" : ""} onClick={handleTypeSearchUsername}>Usuário</button>
                      <button className={typeSearch === "City" ? "select" : ""} onClick={handleTypeSearchCity}>Cidade</button>
                      <button className={typeSearch === "Uf" ? "select" : ""} onClick={handleTypeSearchUf}>Estado(UF)</button>
                  </div>

            <input type="text" placeholder={ typeSearch === "Nickname" ? 'Digite o nome' :  typeSearch === "City" ? 'Digite a cidade' :  typeSearch === "Uf" ? 'Digite o estado (UF)' : 'Ecolha a cima o tipo de busca'} value={search.toLowerCase()} onChange={(e) => setSearch(e.target.value)} onClick={handleSearch}/>

            <div className="filter">
                  <div className="itensFilter">
                  {/* <h5>Com distância de até:</h5>
                  <input type="range" minValue={10} maxValue={100}/> */}
                      <h5>Busca por:</h5>
                  <div className="buttons">
                      <button className={type === "Homem" ? "select" : ""} onClick={handleTypeMen}>Homem</button>
                      <button className={type === "Mulher" ? "select" : ""} onClick={handleTypeWoman}>Mulher</button>
                      <button className={type === "Casal" ? "select" : ""} onClick={handleTypeCouple}>Casal</button>
                      <button className={type === "Trisal" ? "select" : ""} onClick={handleTypeTrisal}>Trisal</button>
                      <button className={type === "Transex" ? "select" : ""} onClick={handleTypeTransex}>Transexuais</button>
                      <button className={type === "Travestis" ? "select" : ""} onClick={handleTypeTravestis}>Travestis</button>
                  </div>
                      <h5>Escolha o país:</h5>
                  <div className="buttons">
                      <button className={país === "Brasil" ? "select" : ""} onClick={handlePaísBrasil}>Brasil</button>
                      <button className={país === "Portugal" ? "select" : ""} onClick={handlePaísPortugal}>Portugal</button>
                  </div>
                  <button onClick={handleClearFilter}>Limpar Filtro</button>
                  </div>
                </div>
            </div>
            }
            </div>
        
                 <ToolbarLeftSlim />
                 <BarBottomMenu />
        </div>
    )
}

export { Search }