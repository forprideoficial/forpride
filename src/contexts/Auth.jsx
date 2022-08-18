import {createContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import api from '../services/api';
import apiGoogleReverse from '../services/apiGoogleReverse';
import { socket } from '../services/websocket';
import {v4 as uuidv4} from 'uuid';
import moment from 'moment';


const AuthContext = createContext({});

function AuthProvider({children}) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [comentsPosts, setComentsPosts] = useState([])

    const [lat, setlat] = useState("");
    const [long, setLong] = useState("");
    const [cityActual, setCityActual] = useState("");
    const [ufActual, setUfActual] = useState("");

    
    async function createAccount({ id, país, username, role, status, viweSex, sex, sexualOption, viewSexualOption, preference, preferenceOption,
        birthDate, sign, email, phone, password, online, patron, nickname, avatar, cover, relationship, city, uf, cep,
        latitude, longitude, recommendation}) {
        const data = {
            id, país, username, role, status, viweSex, sex, sexualOption, viewSexualOption, preference, preferenceOption,
                birthDate, sign, email, phone, password, online, patron, nickname, avatar, cover, relationship, city, uf, cep,
                latitude, longitude, recommendation}
            
        console.log(data)

        await api.post('/accounts', data).then(() => {
            toast.info(`Cadastro criado com sucesso!`);
            createSuccess(email);
            redirectToPageSucess()

        }).catch(error => {
            console.log("Cadastro não foi realizado: "+ error);
            toast.error(`Username ou E-mail ja utilizados. Tente outro por favor!`);
        });
    }


    async function loginSession({login, password}) {     
       
        let email;
        let username;
           
       
        if(login.includes('@')) {
            email = login
            await api.post("/session", {email, password}).then((result) => {
                if(result.data.status === "banned") {
                    toast.error(`Olá, ${result.data.username}. Sua conta foi banida, entre em contato!`);
                    return
                }

                if(result.data.status === "blocked") {
                    toast.error(`Olá, ${result.data.username}. Sua conta está bloqueada, entre em contato!`);
                    return
                }



                localStorage.setItem("forpride", JSON.stringify(result.data));               
                verificateAccountLogin()
                
            }).catch(error => {
                console.log("Login não foi realizado" + error)
                toast.error(`Falha no login. E-mail, usuário ou senha incorretos!`);
                toast.error(`Verifique letras maiúsculas e minúsculas`);
            })
            
        } else {
            username = login
            await api.post("/session", {username, password})
            .then((result) => {
                if(result.data.status === "banned") {
                    toast.error(`Olá, ${result.data.username}. Sua conta foi banida, entre em contato!`);
                   return
                }

                if(result.data.status === "blocked") {
                    toast.error(`Olá, ${result.data.username}. Sua conta está bloqueada, entre em contato!`);
                    return
                }
 
                localStorage.setItem("forpride", JSON.stringify(result.data));
                verificateAccountLogin()
                
            }).catch(error => {
                console.log("Login não foi realizado" + error)
                toast.error(`Falha no login. E-mail, usuário ou senha incorretos!`);
                toast.error(`Verifique letras maiúsculas e minúsculas`);
            })
        }
        
    }

    

    // async function findInformationsAccount(id) {
    //     await api.get(`/informations/${id}`)
    //     .then((res) => {
    //         console.log(res.data.length)
    //            if(res.data.length === 0) {
              
    //             window.open("/completeregistration","_self");
    //             return
    //         }
    //         localStorage.setItem("informations-forpride", JSON.stringify(res.data[0]));
          
    //         findCharacteriticsAccount(id)


           
    //     }).catch(error => {
    //         console.log("Erro ao buscar dados" + error)
    //     })
        
    // }

    // async function findCharacteriticsAccount(id) {
    //     const Local = localStorage.getItem("forpride");
    //     const user = JSON.parse(Local);
    //     await api.get(`/characteristics/${id}`)
    //     .then((res) => {
    //         if(res.data.length === 0) {
              
    //             window.open(`/characteristcs/${user.id}/${user.email}/${user.type}/${user.username}`,"_self")
    //             return
    //         }
    //         localStorage.setItem("characteritics-forpride", JSON.stringify(res.data));
           
    //         findPreferencesAccount(id)
    //     }).catch(error => {
    //         console.log("Erro ao buscar dados" + error)
    //     })
        
    // }

    async function verificateAccountLogin() {
        const Local = localStorage.getItem("forpride");
        const user = JSON.parse(Local);

            if(user.status === "pending") {
                toast.info(`Olá, ${user.username}. Sua conta está em análise. E em até 24h será liberada!`);
                return
            } else if(user.status === "suspense") {
                window.open("/activeplain","_self");
                return
            }else  if(user.status  === "active") {
                window.open("/feed","_self");
                return
            }else
            if(user.status === "essencial") {
                vefiryCompleteAccount()
                return
            }else if(user.status === "premium") {
                vefiryCompleteAccount()
                return
            }else if(user.status === "Aproved") {
                verifyPaymentAccount()
            }

        }


    async function findCharacteriticsAccount(id) {
        const Local = localStorage.getItem("forpride");
        const user = JSON.parse(Local);
        await api.get(`/characteristics/${id}`)
        .then((res) => {
            if(res.data.length === 0) {
              
                window.open(`/characteristcs/${user.id}/${user.email}/${user.type}/${user.username}`,"_self")
                return
            }
        
    })
    }
    
    async function verifyPaymentAccount() {
        const Local = localStorage.getItem("forpride");
        const user = JSON.parse(Local);       const payment = await api.get(`/payments/${user.id}`);

        console.log(payment.data)
        console.log(payment.data.lenght)
        console.log(payment.data.length)

        if(payment.data.length === 0) {
            testPeriodVerify(user.id, user.username);
            return;
        }

        var d1 = new Date(payment.data[0].created_at);
        var d2 = new Date();
        var diff = moment(d2,"DD/MM/YYYY HH:mm:ss").diff(moment(d1,"DD/MM/YYYY HH:mm:ss"));
        var valor = moment.duration(diff).asDays();
        var dias = Math.round(valor, 1);
        console.log(dias);
        console.log(parseInt(payment.data[0].period));

        if(dias > parseInt(payment.data[0].period)) {
            const data = {status: "suspense"}
            await api.patch(`accounts/updatestatus/${user.id}`, data).then((res) => {
                console.log(`status atualizado`);
              logout(user.id);
            }).catch((error) => {
                console.log(error)
            })
        } else {
            const data = {status: payment.data[0].referencePlain === "Premium" ? "premium" : "essencial"}
            await api.patch(`accounts/updatestatus/${user.id}`, data).then((res) => {
                console.log(`status atualizado`);
                logout(user.id);
            }).catch((error) => {
                console.log(error)
            })
        }


       // new Date(payment.data[0].created_at) > new Date(payment.data[0].created_at) + 30 ? "Vencido" : "Pode acessar";
    }

    async function testPeriodVerify(idAccount, username) {
        const periodtest = await api.get(`periodtest/${idAccount}`);
        console.log(periodtest.data)
        console.log(periodtest.data.lenght)
        console.log(periodtest.data.length)
        console.log(`Verificando teste`)

        if(periodtest.data.length === 0) {
            const data = {
                stringDate: `${new Date().getDate()}/${new Date().getMonth() +1}/${new Date().getFullYear()} - ${new Date().getHours().lenght === 1 ? <> {"0" + new Date().getHours()}</> : new Date().getHours()}:${new Date().getMinutes().lenght === 1 ? <> {"0" + new Date().getMinutes()}</> : new Date().getMinutes()  }`,
                idAccount,
                username
            }
            await api.post(`periodtest/`, data).then((res) => {
                console.log(`liberando teste`);
              window.open("/periodtest","_self");
            }).catch((error) => {
                console.log(`Periodo de teste já liberado`)
            })
            return;
        }

       const periodInitial = `${new Date(periodtest.data[0].created_at).getDate()}/${new Date(periodtest.data[0].created_at).getMonth() +1}/${new Date(periodtest.data[0].created_at).getFullYear()} - ${new Date(periodtest.data[0].created_at).getHours()}:${new Date(periodtest.data[0].created_at).getMinutes() +15}`
        const actualDate = `${new Date().getDate()}/${new Date().getMonth() +1}/${new Date().getFullYear()} - ${new Date().getHours()}:${new Date().getMinutes()}`
        if(actualDate > periodInitial) {
            toast.success(`Periodo de teste finalizado`);
            const data = {status: "suspense"}
            await api.patch(`accounts/updatestatus/${idAccount}`, data).then((res) => {
                console.log(`status atualizado`);
                window.open("/activeplain","_self");
            }).catch((error) => {
                console.log(error)
            })
  
        } else {
            toast.success(`Você ainda tem tempo. Aproveite`)
           window.open("/feed","_self");
        }
    }

     function verityTimesPeiodTest(idAccount) {
        setInterval(async function () { 
            const periodtest = await api.get(`periodtest/${idAccount}`);
            console.log(periodtest)
            
            const periodInitial = `${new Date(periodtest.data[0].created_at).getDate()}/${new Date(periodtest.data[0].created_at).getMonth() +1}/${new Date(periodtest.data[0].created_at).getFullYear()} - ${new Date(periodtest.data[0].created_at).getHours()}:${new Date(periodtest.data[0].created_at).getMinutes() +15}`
            const actualDate = `${new Date().getDate()}/${new Date().getMonth() +1}/${new Date().getFullYear()} - ${new Date().getHours()}:${new Date().getMinutes()}`

            if(actualDate > periodInitial) {
                toast.success(`Periodo de teste finalizado`);
                console.log(periodInitial)
                console.log(actualDate)
                const data = {status: "suspense"}
                await api.patch(`accounts/updatestatus/${idAccount}`, data).then((res) => {
                    console.log(`status atualizado`);
                  logout(idAccount);
                }).catch((error) => {
                    console.log(error)
                    toast.success(`Periodo de teste finalizado`);
                    console.log(periodInitial)
                    console.log(actualDate)
                })
            } else {
                console.log("Teste")
            }
         }, 60000);
        }
        
    async function findPreferencesAccount(id) {
        const Local = localStorage.getItem("forpride");
        const user = JSON.parse(Local);
        await api.get(`/preferences/${id}`)
        .then((res) => {
            if(res.data.length === 0) {      
                window.open(`/preferences/${user.id}/${user.email}/${user.username}`,"_self");
                return
            }
            localStorage.setItem("preferences-forpride", JSON.stringify(res.data[0]));

            if(user.status === "pending") {
                toast.info(`Olá, ${user.username}. Sua conta está em análise. E em até 24h será liberada!`);
                return
            } else if(user.status === "suspense") {
                window.open("/suspenseaccount","_self");
                return
            }else  if(user.status  === "lifetime" || user.país === "Portugal") {
                window.open("/feed","_self");
                return
            }else
            if(user.status === "essencial") {
                vefiryCompleteAccount()
                return
            }else if(user.status === "premium") {
                vefiryCompleteAccount()
                return
            }else if(user.status === "Aproved" || user.status  === "active") {
                verifyPaymentAccount()
                return
            }
           
           
        }).catch(error => {
            console.log("Erro ao buscar dados" + error)
        })
        
    }
    async function verifyPaymentAccount() {
        const Local = localStorage.getItem("forpride");
        const user = JSON.parse(Local);

        const payment = await api.get(`/payments/${user.id}`);

        console.log(payment.data)
        console.log(payment.data.lenght)
        console.log(payment.data.length)

        if(payment.data.length === 0) {
            testPeriodVerify(user.id, user.username);
            return;
        }

        var d1 = new Date(payment.data[0].created_at);
        var d2 = new Date();
        var diff = moment(d2,"DD/MM/YYYY HH:mm:ss").diff(moment(d1,"DD/MM/YYYY HH:mm:ss"));
        var valor = moment.duration(diff).asDays();
        var dias = Math.round(valor, 1);
        console.log(dias);
        console.log(parseInt(payment.data[0].period));

        if(dias > parseInt(payment.data[0].period)) {
            const data = {status: "suspense"}
            await api.patch(`accounts/updatestatus/${user.id}`, data).then((res) => {
                console.log(`status atualizado`);
              logout(user.id);
            }).catch((error) => {
                console.log(error)
            })
        } else {
            const data = {status: payment.data[0].referencePlain === "Premium" ? "premium" : "essencial"}
            await api.patch(`accounts/updatestatus/${user.id}`, data).then((res) => {
                console.log(`status atualizado`);
                logout(user.id);
            }).catch((error) => {
                console.log(error)
            })
        }


       // new Date(payment.data[0].created_at) > new Date(payment.data[0].created_at) + 30 ? "Vencido" : "Pode acessar";
    }

    async function testPeriodVerify(idAccount, username) {
        const periodtest = await api.get(`periodtest/${idAccount}`);
        console.log(periodtest.data)
        console.log(periodtest.data.lenght)
        console.log(periodtest.data.length)
        console.log(`Verificando teste`)

        if(periodtest.data.length === 0) {
            const data = {
                stringDate: `${new Date().getDate()}/${new Date().getMonth() +1}/${new Date().getFullYear()} - ${new Date().getHours().lenght === 1 ? <> {"0" + new Date().getHours()}</> : new Date().getHours()}:${new Date().getMinutes().lenght === 1 ? <> {"0" + new Date().getMinutes()}</> : new Date().getMinutes()  }`,
                idAccount,
                username
            }
            await api.post(`periodtest/`, data).then((res) => {
                console.log(`liberando teste`);
              window.open("/periodtest","_self");
            }).catch((error) => {
                console.log(`Periodo de teste já liberado`)
            })
            return;
        }

       const periodInitial = `${new Date(periodtest.data[0].created_at).getDate()}/${new Date(periodtest.data[0].created_at).getMonth() +1}/${new Date(periodtest.data[0].created_at).getFullYear()} - ${new Date(periodtest.data[0].created_at).getHours()}:${new Date(periodtest.data[0].created_at).getMinutes() +15}`
        const actualDate = `${new Date().getDate()}/${new Date().getMonth() +1}/${new Date().getFullYear()} - ${new Date().getHours()}:${new Date().getMinutes()}`
        if(actualDate > periodInitial) {
            toast.success(`Periodo de teste finalizado`);
            const data = {status: "suspense"}
            await api.patch(`accounts/updatestatus/${idAccount}`, data).then((res) => {
                console.log(`status atualizado`);
                window.open("/activeplain","_self");
            }).catch((error) => {
                console.log(error)
            })
  
        } else {
            toast.success(`Você ainda tem tempo. Aproveite`)
           window.open("/feed","_self");
        }
    }

     function verityTimesPeiodTest(idAccount) {
        setInterval(async function () { 
            const periodtest = await api.get(`periodtest/${idAccount}`);
            console.log(periodtest)
            
            const periodInitial = `${new Date(periodtest.data[0].created_at).getDate()}/${new Date(periodtest.data[0].created_at).getMonth() +1}/${new Date(periodtest.data[0].created_at).getFullYear()} - ${new Date(periodtest.data[0].created_at).getHours()}:${new Date(periodtest.data[0].created_at).getMinutes() +15}`
            const actualDate = `${new Date().getDate()}/${new Date().getMonth() +1}/${new Date().getFullYear()} - ${new Date().getHours()}:${new Date().getMinutes()}`

            if(actualDate > periodInitial) {
                toast.success(`Periodo de teste finalizado`);
                console.log(periodInitial)
                console.log(actualDate)
                const data = {status: "suspense"}
                await api.patch(`accounts/updatestatus/${idAccount}`, data).then((res) => {
                    console.log(`status atualizado`);
                  logout(idAccount);
                }).catch((error) => {
                    console.log(error)
                    toast.success(`Periodo de teste finalizado`);
                    console.log(periodInitial)
                    console.log(actualDate)
                })
            } else {
                console.log("Teste")
            }
         }, 60000);
        
        
    }


    function vefiryCompleteAccount() {
        const Local = localStorage.getItem("forpride");
        const user = JSON.parse(Local);
        const Local2 = localStorage.getItem("informations-forpride");
        const userInformations = JSON.parse(Local2);
        if(user.latitude === undefined ||
            user.longitude === undefined ||
            user.latitude === null ||
            user.longitude === null ||
            user.latitude === false ||
            user.longitude === false ||
            user.país === undefined ||
            user.país === null ||
            user.país === false ||
            userInformations.uf.length > 2
            ) {
            window.open("/update", "_self");
         }
         else {
             window.open("/feed", "_self");
         }
    }

    function vefiryCompleteAccount() {
        const Local = localStorage.getItem("forpride");
        const user = JSON.parse(Local);
        if(user.latitude === undefined ||
            user.longitude === undefined ||
            user.latitude === null ||
            user.longitude === null ||
            user.latitude === false ||
            user.longitude === false ||
            user.país === undefined ||
            user.país === null ||
            user.país === false ||
            user.uf.length > 2
            ) {
            window.open("/update", "_self");
         }
         else {
             window.open("/feed", "_self");
         }
    }

    async function updateAccount({id, avatar, cover, city, uf, relationship, nickname, cep, latitude, longitude, país, username, role, status, type, email, phone, online, patron}){
        const Local = localStorage.getItem("forpride");
        const user = JSON.parse(Local)
        const data = {avatar, cover, city, uf, relationship, nickname, cep, latitude, longitude, país, username, role, status, type, email, phone, online, patron};
        const data2 = {avatar, cover, city, uf, relationship, nickname, cep, latitude, longitude, país, username, role, status, type, email, phone, online, patron, date:user.date , token:user.token  , expiresIn:user.expiresIn };
        console.log(id)
        console.log(data)
        await api.patch(`/accounts/${id}`, data).then(res => {
            localStorage.setItem("forpride", JSON.stringify(data2));
            NewUpdateInformationsAccount({id: user.id, idAccount:user.id, avatar, cover, relationship, nickname, city, uf, created_at: new Date(), idPatrono:user.patron , país, username})
            window.open("/feed", "_self")
        }).catch(error => {
            console.log(error)
        });
    }




    
    async function updateAccount2({id, avatar, cover, city, uf, relationship, nickname, cep, latitude, longitude, país,  username, role, status, type, email, phone, online, patron}){
        const Local = localStorage.getItem("forpride");
        const user = JSON.parse(Local)
        const data = {avatar, cover, city, uf, relationship, nickname, cep, latitude, longitude, país, username, role, status, type, email, phone, online, patron};
        const data2 = {avatar, cover, city, uf, relationship, nickname, cep, latitude, longitude, país, username, role, status, type, email, phone, online, patron, date:user.date , token:user.token  , expiresIn:user.expiresIn };
        console.log(id)
        console.log(data)
        await api.patch(`/accounts/${id}`, data).then(res => {
            localStorage.setItem("forpride", JSON.stringify(data2));
            window.open("/characteristcs","_self");
        }).catch(error => {
            console.log(error)
        });
    }



    
//Deletando conta


async function deleteAccount(id) {
    toast.success("Deletando sua conta")
    const Local = localStorage.getItem("forpride");
    const user = JSON.parse(Local);
     toast.success("Deletando conta de usuário")
    console.log("Deletando conta de usuário")

    const res = await api.delete(`/accounts/${id}`);

    if(res.status===201) {
        toast.info("Deletando informações") 
        deleteInformations1(id);

        const idPatrono = user.patron;
        const text = `${user.username}, Deletou sua conta em nosso site`;
        const type = "notification";
        const idPost = "";
        const idFriend = "";
        const idAccount = user.id;
        notifications(idPatrono, text, idAccount, idFriend, type, idPost)
       
     } else {
        toast.error('Falha ao deletar, tente novamente!');
     }
}


async function deleteInformations1(idAccount) {
    toast.success("Deletando informações")
    console.log("Deletando informações")

    await api.delete(`/informations/${idAccount}`).then((res) => {
        deleteCharacteristcs(idAccount)
    }).catch((error) => {
        console.log(error)
        toast.error('Falha ao deletar, tente novamente!');
        console.log('Falha ao deletar, tente novamente!');
    })
}
async function deleteCharacteristcs(idAccount) {
    console.log(idAccount)
    toast.success("Deletando Caracteristicas")
    console.log("Deletando Caracteristicas")
    const res = await api.get(`/characteristics/${idAccount}`)
    console.log(res.data)
    res.data.forEach(async (user) => {
        console.log(user.idAccount)
     await api.delete(`/characteristics/${user.idAccount}`).then((res) => {
         console.log("Deletado")

     }).catch((error) => {
        console.log(error)
     })
     deletePreferences(user.idAccount)
    })
}
async function deletePreferences(idAccount) {
    toast.success("Deletando Preferencias")
    console.log("Deletando Preferencias")
    const res = await api.delete(`/preferences/${idAccount}`);
    if(res.status===201) {
        deletePostsUser(idAccount) 
     } else {
        toast.error('Falha ao deletar, tente novamente!');
     }
}

async function deletePostsUser(idAccount) {
    toast.success("Deletando Caracteristicas")
    const res = await api.get(`/posts/filter/accounts/${idAccount}`)
    res.data.forEach(async (user) => {
     await api.delete(`/posts/${user.id}`); 
     toast.info('Deletando Posts!');
    const res = await api.get(`/comments/${user.id}`); 

    res.data.forEach(async (user) => {
        await api.delete(`/comments/${user.id}`); 
        toast.info('Deletando Comant[arios!');
       const res = await api.get(`/reply/${user.id}`); 

       res.data.forEach(async (user) => {
        await api.delete(`/reply/${user.id}`); 
        toast.info('Deletando Respostas!');
    })
    toast.info('Conta totalmente deletada!');
    })


       })

       deleteConversations(idAccount)


}

async function deleteConversations(user) {
    const idAccount = user.id
    const rmyRooms1 = await api.get(`conversations/account/filter/${idAccount}`)

     const idFriend = user.id
     const rmyRooms2 = await api.get(`conversations/friend/filter/${idFriend}`)

     const newRooms = rmyRooms1.data.concat(rmyRooms2.data);
     // console.log(newRooms);

     newRooms.forEach(async (room) => {
         const id = room.id
         toast.success("Deletado conversas!");
              await api.delete(`/conversations/${id}`);
     })
     toast.success("Deletado com sucesso!");
}


async function deleteConversation(room) {
    await api.delete(`/conversations/room/${room}`).then((res) => {
        toast.success("Deletado com sucesso!");
        window.open("/messages", "_self")

    })
}
//Fim deletando conta



    async function createInformationsAccount({idAccount, avatar, cover, relationship, nickname, city, uf, país, email, type, username}) {
        const id = uuidv4()
        await api.post("/informations", {id, idAccount, avatar, cover, relationship, nickname, city, uf, país}).then(() => {
            window.open(`/characteristcs/${idAccount}/${email}/${type}/${username}`,"_self");

        }).catch(error => {
            console.log("Informações não enviadas" + error)
        })
    }




    async function NewUpdateInformationsAccount({id, país, idAccount, avatar, cover, relationship, nickname, city, uf, created_at, idPatrono, username}) {
        await api.patch(`/informations/${id}`, {avatar, cover, relationship, nickname, city, uf, país}).then( async () => {
            localStorage.setItem("informations-forpride", JSON.stringify({
                id, _id: id, idAccount, avatar, cover, relationship, nickname, city, uf, país, created_at
            }))

            const text = `${username}, alterou informações em seu perfil` 
            const idFriend = ""; 
            const type = "";
            const idPost = "";
            
    
            notifications(idPatrono, text, idAccount, idFriend, type, idPost)
            window.open("/profile","_self");
        }).catch(error => {
            console.log("Informações não enviadas" + error)
        })
    }


    async function createCharacteristcs({id1, idAccount, data, sex, sign, sexualOption, email, username}) {
        const data1 = {id1, idAccount, data, sex, sign, sexualOption}
        let dados = [];
            setLoading(true)
            await api.post("/characteristics", {
                id: id1, idAccount, birthDate: data, sex, sign, sexualOption
            }).then(async () => {
                dados.push(data1)
                window.open(`/preferences/${idAccount}/${email}/${username}`,"_self");
                setLoading(false)
            }).catch(error => {
                console.log("Informações não enviadas" + error)
    })
}



    async function createCharacteristcs2({id1, id2, idAccount, data, sex, sign, sexualOption, data2, sex2, sign2, sexualOption2, email, username}) {
        const data10 = {id1, idAccount, data, sex, sign, sexualOption}
        const data20 = {id2, idAccount,  data2, sex2, sign2, sexualOption2}
        let dados = [];
            setLoading(true)
            await api.post("/characteristics", {
                id: id1, idAccount, birthDate: data, sex, sign, sexualOption
            }).then(async () => {
                dados.push(data10)
                await api.post("/characteristics",  {
                   id: id2, idAccount, birthDate: data2, sex:sex2, sign:sign2, sexualOption: sexualOption2
                }).then(async () => {
                    dados.push(data20)
                    window.open(`/preferences/${idAccount}/${email}/${username}`,"_self");
                }).catch(error => {
                    console.log("Informações não enviadas" + error)
                })
                
            }).catch(error => {
                console.log("Informações não enviadas" + error)
            })
            
            setLoading(false)
   
}



    async function createCharacteristcs3({id1, id2, id3, idAccount, data, sex, sign, sexualOption, data2, sex2, sign2, sexualOption2, data3, sex3, sign3, sexualOption3,email, username }) {
        const data100 = {id1, idAccount, data, sex, sign, sexualOption}
        const data200 = {id2, idAccount,  data2, sex2, sign2, sexualOption2}
        const data300 = {id3, idAccount,  data3, sex3, sign3, sexualOption3}
        let dados = [];
            setLoading(true)
            await api.post("/characteristics", {
               id: id1, idAccount: idAccount, birthDate: data, sex, sign, sexualOption
            }).then(async () => {
                dados.push(data100)
                await api.post("/characteristics",  {
                   id: id2, idAccount: idAccount, birthDate: data2, sex:sex2, sign:sign2, sexualOption: sexualOption2
                }).then(async () => {
                    dados.push(data200)
                    await api.post("/characteristics", {
                       id: id3, idAccount: idAccount, birthDate: data3, sex:sex3, sign:sign3, sexualOption: sexualOption3
                    }).then(async () => {
                        dados.push(data300)
                    window.open(`/preferences/${idAccount}/${email}/${username}`,"_self");
                        setLoading(false)
                    }).catch(error => {
                        console.log("Informações não enviadas" + error)
            })
  
                }).catch(error => {
                    console.log("Informações não enviadas" + error)
        })
               
            }).catch(error => {
                console.log("Informações não enviadas" + error)
    })

}


async function newUpdateCharacteristcs({id, birthDate, sex, sign, sexualOption, idPatrono, username, idAccount}) {
        setLoading(true)
        await api.patch(`/characteristics/${id}`,
        {birthDate: birthDate, sex, sign, sexualOption})
        .then( async () => {
            const text = `${username}, alterou as características de um de seus membros do perfil`
           
            notifications({idPatrono, text, idAccount, idFriend: "", type: "notification", idPost: ""})

            setLoading(false);
            window.open("/profile","_self");
        }).catch(error => {
                console.log("Informações não enviadas" + error)
     })
}

async function newUpdateCharacteristcs2({id, birthDate, sex, sign, sexualOption, id2, birthDate2, sex2, sign2, sexualOption2, idPatrono, username, idAccount}) {
        setLoading(true)
        await api.patch(`/characteristics/${id}`, {
            birthDate: birthDate, sex, sign, sexualOption
        }).then(async () => {
            await api.patch(`/characteristics/${id2}`,  {
                birthDate: birthDate2, sex:sex2, sign:sign2, sexualOption: sexualOption2
            }).then(async () => {               
            const text = `${username}, alterou as características de um de seus membros do perfil`
          
            notifications({idPatrono, text, idAccount, idFriend: "", type: "notification", idPost: ""})


            setLoading(false);
            window.open("/profile","_self");
  
            }).catch(error => {
                console.log("Informações não enviadas" + error)
            })
            
        }).catch(error => {
            console.log("Informações não enviadas" + error)
        })
        
        setLoading(false)

}

async function newUpdateCharacteristcs3({id, birthDate,
    sex, sign, sexualOption, id2, birthDate2, sex2, sign2, sexualOption2, id3, birthDate3, sex3, sign3, sexualOption3, idPatrono, idAccount, username}) {
        setLoading(true)
        await api.patch(`/characteristics/${id}`, {
            birthDate: birthDate, sex, sign, sexualOption
        }).then(async () => {
            await api.patch(`/characteristics/${id2}`,  {
                birthDate: birthDate2, sex:sex2, sign:sign2, sexualOption: sexualOption2
            }).then(async () => {
        
                await api.patch(`/characteristics/${id3}`, {
                    birthDate: birthDate3, sex:sex3, sign:sign3, sexualOption: sexualOption3
                }).then(async () => {
            const text = `${username}, alterou as características de um de seus membros do perfil`
            if(idAccount === idPatrono) {
                return;
            }
        
            notifications({idPatrono, text, idAccount, idFriend: "", type: "notification", idPost: ""})

            setLoading(false);
            window.open("/profile","_self");
                    setLoading(false)
                }).catch(error => {
                    console.log("Informações não enviadas" + error)
        })

            }).catch(error => {
                console.log("Informações não enviadas" + error)
    })
           
        }).catch(error => {
            console.log("Informações não enviadas" + error)
})

}

async function preferencesAccount({id, idAccount, men, woman, couple, trisal, transvestites, transsexuals, groups, proposal, email, patron, username}) {
    const data = {id, idAccount, men, woman, couple, trisal, transvestites, transsexuals, groups, proposal}
    console.log(email)
    await api.post('/preferences', {id, idAccount, men, woman, couple, trisal, transvestites, transsexuals, groups, proposal})
    .then(async () => {
        function friend(idAccount) {
            const idFriend = patron;
            const type = "friend"
            const status = "aproved"
            newFriend(idAccount, idFriend, type, status);
        }

        friend()
        const idPatrono = patron;
        const text = `${username}, ingressou na ForPride, dê as boas vindas.`;
        const type = "notification";
        const idPost = "";
        const idFriend = "";
        notifications(idPatrono, text, idAccount, idFriend, type, idPost)

        createSuccess(email);
        redirectToPageSucess()

    }).catch(error => {
        console.log("Erro ao salvar dados" + error)
    })
}



async function redirectToPageSucess() {
    window.open("/registrationend","_self");
}
async function updatePreferencesAccount({id, men, woman, couple, trisal, transvestites, transsexuals, groups, proposal, idPatrono, username, idAccount}) {
    await api.patch(`/preferences/${id}`, { men, woman, couple, trisal, transvestites, transsexuals, groups, proposal})
    .then( async () => {
        const text = ` ${username}, alterou as características de um de seus membros do perfil`
        const data = {idPatrono, idAccount, text, }
        window.open("/profile","_self");
      
    }).catch(error => {
        console.log("Erro ao salvar dados" + error)
    })
}



// Recuperações

async function recuperationUserForEmail(email) {
    console.log(email)
   const account =  await api.get(`/accounts/find/${email}`);
   console.log(account)

   if(account.data.length === 0) {
       toast.error("Não existe conta com este e-mail em nossa base de dados!")
       return
   } 

   const username = account.data[0].username
   searchUsername(email, username)
}



async function gerateCodeRecuperation(email, code) {
    console.log(email)
    const account =  await api.get(`/accounts/find/${email}`);
    console.log(account)
    
    if(account.data.length === 0) {
        toast.error("Não existe conta com este e-mail em nossa base de dados!")
        return
    } 
    
    await api.post("/recuperation", {email, code}).then((res) => {
        console.log(res.data);
        codeRecuperation(email, code);
    }).catch((error) => {
        console.log(error)
    })
}


async function validadeCodeRecuperation(code, email) {
    console.log(code, email)
   const codeRecuperationData =  await api.get(`/recuperation/find/${email}/${code}`);
   console.log(codeRecuperationData)

   if(codeRecuperationData.data.length === 0) {
       toast.error("Código inválido ou expirado!")
       return
   } 

   window.open(`/recoverpassword/${email}`,"_self")
}


async function recoverPasswordNew(email, password) {
    console.log(email, password)
    await api.patch(`accounts/recover/${email}`, {password}).then(() => {
        toast.info("Senha atualizada com sucesso");
        window.open("/","_self")
    }).catch((error) => {
        toast.error("Erro ao atualiza senha");
        console.log(error)
    })
}

// Fim recuperações


async function newPost({idAccount, type, link, text, idForum, idGroup, idEvent, avatar, nickname, username, nameForum, nameGroup, nameEvent, idPatrono, typeAccount, ufAccount, cityAccount, content}) {
    setLoading(true)
    await api.post("/posts", {idAccount, type, link, text, idForum, idGroup, idEvent, avatar, nickname, username, nameForum, nameGroup, nameEvent, typeAccount, ufAccount, cityAccount, content}).then( async () => {      
    toast.info("Post publicado com sucesso!")
    window.location.reload(false)
        setLoading(false)
    }).catch(error => {
        console.log("Post não foi realizado" + error)
    })
}
async function newPostEvent({idAccount, type, link, text, idForum, idGroup, idEvent, avatar, nickname, username, nameForum, nameGroup, nameEvent, idPatrono}) {
    setLoading(true)
    await api.post("/posts", {idAccount, type, link, text, idForum, idGroup, idEvent, avatar, nickname, username, nameForum, nameGroup, nameEvent }).then( async () => {      
    toast.info("Post publicado com sucesso!")
        setLoading(false)
    }).catch(error => {
        console.log("Post não foi realizado" + error)
    })
}

async function deletePost(id) {
    const res = await api.delete(`/posts/${id}`);
    if(res.status===201) {
        toast.success('Post deletado com sucesso!');
        window.location.reload(false)
     } else {
        toast.error('Falha ao deletar, tente novamente!');
     }
}

async function editPost(id, text) {
        const res = await api.patch(`/posts/${id}`, {text});
        if(res.status===201) {
            toast.success('post editado com sucesso!');
           
         } else {
            toast.error('Falha ao deletar, tente novamente!');
         }
 }
async function editComment(id, text) {
        const res = await api.patch(`/comments/${id}`, {text});
        if(res.status===201) {
           
         } else {
            toast.error('Falha ao deletar, tente novamente!');
         }
 }

async function deleteComment(id) {
    const res = await api.delete(`/comments/${id}`);
    if(res.status===201) {
        toast.success('Comentário deletado com sucesso!');
       
     } else {
        toast.error('Falha ao deletar, tente novamente!');
     }
}
async function editReply(id, text) {
        const res = await api.patch(`/reply/${id}`, {text});
        if(res.status===201) {
           
         } else {
            toast.error('Falha ao deletar, tente novamente!');
         }
 }

async function deleteReply(id) {
    const res = await api.delete(`/reply/${id}`);
    if(res.status===201) {
        toast.success('Resposta deletada com sucesso!');
       
     } else {
        toast.error('Falha ao deletar, tente novamente!');
     }
}
async function deleteInvite(id) {
    const res = await api.delete(`/invites/${id}`);
    if(res.status===201) {
        toast.success('Convite deletado com sucesso!');
       
     } else {
        toast.error('Falha ao deletar, tente novamente!');
     }
}

async function likePost({idAccount, username, idPost, idPatrono, nickname}) {
await api.post("/reactions", {idAccount, username, idPost}).then( async () => {
    const text = `${nickname}, curtiu sua postagem.`
    const idFriend = ""; 
    const type = "notification-post";

    if(idAccount === idPatrono) {
        return;
    }

    notifications(idPatrono, text, idAccount, idFriend, type, idPost)
   
}).catch(error => {
    console.log(error)

    })
}

async function notifications(idPatrono, text,idAccount, idFriend, type,idPost) {
    const data = {idPatrono, text,idAccount, idFriend, type,idPost }
    await api.post("/notifications", data).then(() => {
        console.log("Comentário/Notificação feito com sucesso");
    }).catch(error => {
        console.log("Notificação não cadastrada" + error)
    })
}

async function newComment({idAccount, idPost, text, avatar, username, nickname, idPatrono}) {
    await api.post("/comments", {idAccount, idPost, text,avatar, username, nickname}).then( async () => {

        const text = `${nickname}, comentou em sua postagem.`    
        const idFriend = ""; 
        const type = "notification-post";

        if(idAccount === idPatrono) {
            return;
        }

        notifications(idPatrono, text, idAccount, idFriend, type, idPost)
       
    }).catch(error => {
        console.log("Comentário não foi realizado" + error)
    })
}
async function newReply({idAccount, idComment, text, avatar, username, nickname}) {
    await api.post("/reply", {idAccount, idComment, text,avatar, username, nickname}).then(() => {
       
    }).catch(error => {
        console.log("Resposta não foi realizado" + error)
    })
}

async function CreateInviteNewUsew({code, name, email, phone,idAccount, username, patron, type, patronNickname}) {
    const text = `Parabens ${name}! %0AVocê foi convidado por ${patronNickname} a fazer parte de uma rede de relacionamento, exclusivo para casais, solteiros e solteiras. ForPride foi criado com o objetivo de aproximar pessoas com o mesmo pensamento de relacionamento de forma livre, segura e respeitosa. %0A%0AEsse convite é valido por 10 dias e intransferível. %0A%0APara criar seu perfil agora, acesse: %0A https://forpride.com.br/signup/${email}/${code}/${patron}/${type} %0A%0AEm caso de dúvida, fale conosco. %0AContato@forpride.com.br %0A%FORPRIDE https://www.forpride.com.br`
    
    const findAccountEmail = await api.get(`/accounts/find/${email}`);

    if(findAccountEmail.data.lenght > 1) {
        toast.error("Já existe uma conta com este e-mail!")
        return
    } 

    await api.post("/invites", {code, name, email, phone, idAccount, username, type, patron}).then(() =>{
        window.open("https://wa.me/55"+ phone + "?text=" + text,
        '_blank')
    }).catch(error => {
        console.log("Convite não cadastrado" + error)
        toast.error("Já existe um covite com este e-mail!")
    })  
}

async function CreateInviteMail({code, name, email, phone,idAccount, username, patron, patronNickname, type}) {
  
    const findAccountEmail = await api.get(`/accounts/find/${email}`);

    if(findAccountEmail.data.length > 0) {
        toast.error("Já existe uma conta com este e-mail!")
        return
    } 

    await api.post("/invites", {code, name, email, phone, idAccount, username, type, patron}).then(async () =>{
        const data = {mail: email, name, code, patron, type, patronNickname}
        const res = await api.post("/mail/invite", data);
        if(res.status === 200) {
            toast.success("Convite enviado com sucesso!")
        }
    }).catch(error => {
        console.log("Convite não cadastrado" + error)
        toast.error("Já existe um covite com este e-mail!")
    })  
}



    // async function completeAccount(email) {
    //     const res = await api.post("/mail/confirmation", {mail: email});
    //     if(res.status === 200) {
    //     }
    // }
    async function createSuccess(email) {
        const res = await api.post("/mail/complete", {mail: email});
        if(res.status === 200) {
        }
    }
    async function searchUsername(email, username) {
        console.log(email, username)
        const res = await api.post("/mail/username", {mail: email, username: username});
        if(res.status === 200) {
            toast.info("Nome de usuário encontrado. Verifique seu e-mail!")
            window.open(`/recuperationuserresult/${username}`,"_self")
        }
    }


    async function codeRecuperation(email, code) {
        console.log(email, code)
        const res = await api.post("/mail/passwordcode", {mail: email, code: code});
        if(res.status === 200) {
            toast.info("Nome de usuário encontrado. Verifique seu e-mail!");
            window.open(`/recuperationcode/${email}`,"_self")
        }
    }






async function newFriend(idAccount, idFriend, type, status) {
    const data = {idAccount, idFriend, type, status}
    await api.post("/friends", data).then(() => {
       window.location.reload(false);
    }).catch(error => {
        console.log(error)
    })

}

async function friendAproved(id) {
   await api.put(`/friends/${id}`, {status: "aproved"}).then(() => {
        window.location.reload(false)
   })
}

async function deleteFriend(id){
    await api.delete(`/friends/${id}`).then(() => {
      window.location.reload(false)
    })
}

async function deleteFollower(id){
    await api.delete(`/followers/${id}`).then(() => {
       window.location.reload(false)
    })
}

async function deleteLike(id){
    await api.delete(`/reactions/${id}`).then(() => {
    })
}
async function deleteActualMessage(id){
    await api.delete(`/messages/${id}`).then(() => {
    })
}



async function newFollower(idAccount, idFriend, type, status) {
    const data = {idAccount, idFriend, type, status}
    await api.post("/followers", data).then(() => {
       window.location.reload(false)
    }).catch(error => {
        console.log(error)
    })

}

async function deleteFriendAndFollower(id, idAccount, idFriend, type, status) {
    const data = {idAccount, idFriend, type, status}
    await api.delete(`/friends/${id}`).then( async () => {
        await api.post("/followers", data).then(() => {
            window.location.reload(false)
        }).catch(error => {
            console.log(error)
        })
     
    }).catch(error => {
        console.log(error)
    })

}


// Sessão grupos
async function creategroup( name, description, theme, privacity, cover, avatar, idAccount, username, avatarUser, nickname){
    const data = { name, description, theme, privacity, cover, avatar, idAccount, username, avatarUser};
    await api.post("/groups", data).then(async (result) => {
        toast.success("Grupo Criado com socesso!");
        window.location.reload(false)
        const data2 = {idAccount, idGroup: result.data.id, username, avatar, nickname, role: "Administrator", status: "Aproved"};
        await api.post("/groups/members", data2).then(() => {
        }).catch(error => {
            console.log(error)
        })


    }).catch(error => {
        console.log(error)
    })
}
// Sessão grupos
async function createForum( name, description, theme, avatar, cover, idAccount, username, nickname, avatarUser ){
    const data = { name, description, theme, avatar, cover, idAccount, username, nickname, avatarUser };

    await api.post("/foruns", data).then(async () => {
        toast.success("Forum Criado com socesso!");
        window.location.reload(false)
    }).catch(error => {
        console.log(error)
    })
}

async function createMemberGroup( idAccount, idGroup, username, avatar, nickname, role, status){
    const data = { idAccount, idGroup, username, avatar, nickname, role, status};

    await api.post("/groups/members", data).then(() => {
        window.location.reload(false)
    }).catch(error => {
        console.log(error)
    })
}
async function createEvents( avatar, name, description, date, street, district, city, uf, complement, reference, number, theme, cover, status, idAccount, username, avatarUser, nickname){
    const data = { avatar, name, description, date, street, district, city, uf, complement, reference, number, theme, cover, status, idAccount, username, avatarUser, nickname};
    console.log(avatar, name, description, date, street, district, city, uf, complement, reference, number, theme, cover, status, idAccount, username, avatarUser, nickname);
    const res = await api.post("/events", data)

    console.log(data)

    if(res.status === 201) {
        toast.success("Evento criado com sucesso! Aguarde a aprovação dos moderadores!")
        console.log("Evento criado com sucesso! Aguarde a aprovação dos moderadores!")
        window.open("/events","_self")
    }

}
async function createMembersEvents( idAccount, idEvent, role, status, username ){
    const data = { idAccount, idEvent, role, status, username };
    await api.post("/membersevents", data).then(() => {
        toast.success("Presença confirmada")
    }).catch(error => {
        console.log(error)
    })
}


async function deleteGroup(id){
    await api.delete(`/groups/${id}`).then(() => {
    })
}
async function deleteEvent(id){
    await api.delete(`/events/${id}`).then(() => {
    })
}
async function deleteMemberEvent(id){
    await api.delete(`/membersevents/${id}`).then(() => {
    })
}

async function newVisit(idAccount, username, idFriend) {
    const data = {idAccount, username, idFriend}
    await api.post("/visits", data).then(() => {
    })
}



async function newReplyRecado({idNews, idAccount, text, link, username, nickname}) {
    const data = {idNews, idAccount, text, link, username, nickname}
    console.log(data)
    await api.post("/newsreply", data).then((res) => {

        toast.info("Respsta enviada com sucesso!")
        window.location.reload(false)
    }).catch(error => {
        console.log(error)
    })
}

async function updateUserOnline( id, idAccount, username, type ,nickname, avatar, relationship, lat, long, city, uf, actualCity, actualUf, equalCity, plane, emoji, song, invisible) {
    const data = {idAccount, username, type ,nickname, avatar, relationship, lat, long, city, uf, actualCity, actualUf, equalCity, plane, emoji, song, invisible};
    console.log(data)
    console.log(id)
    await api.patch(`/online/${id}`, data).then(() => {
        window.location.reload(false)
    }).catch((error) => {
        console.log(error)
    })
}

// Fim da Sessão grupos
    async function logout(idAccount) {
        localStorage.removeItem("forpride");
        localStorage.removeItem("informations-forpride");
        localStorage.removeItem("preferences-forpride");
        localStorage.removeItem("characteritics-forpride");
        await api.delete(`/online/${idAccount}`)
        window.open("/", "_self");

        window.location.reload(false)
    }


    //payments
    async function createPayment({linkComprovant, idPlain, namePlain, referencePlain, idAccount,username, email, value, period, aceptTerms, status}) {
        const data = {linkComprovant, idPlain, namePlain, referencePlain, idAccount,username, email, value, period, aceptTerms, status}
        console.log(data)
        await api.post("/payments", data).then(async () => {

            const data2 = {status: referencePlain === "Premium" ? "premium" : "essencial"}
            await api.patch(`accounts/updatestatus/${idAccount}`, data2).then((res) => {
                toast.info("Pagamento realizado com sucesso!");
                window.open("/paymentConfirmed","_self")
            }).catch((error) => {
                console.log(error)
            })




        }).catch((error) => {
            console.log(error)
        })
    }

    // Location
    async function socketDataLocation() {
        const Local1 = localStorage.getItem("forpride");
        const user1 = JSON.parse(Local1);

        const res = await api.get("/online");
        
        const selectUserOnline = res.data.filter(online => online.idAccount === user1.id);
        console.log("selectUserOnline")
        console.log(selectUserOnline)
        console.log(selectUserOnline.length)

        if(selectUserOnline.length > 0) {
         console.log("Usuário ja está online")
         return
       }
        console.log("Cadastrando em usuários online!")
        let cityActualOnine = ""
        function success(position) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
    
        setlat(latitude)
        setLong(longitude)
        console.log(latitude)
        console.log(longitude)
   
       reverseGeolocalization(latitude, longitude)
      }
    
      function error() {
        console.log('Unable to retrieve your location');
      }
   
      function getLocation() {
       return window.navigator.geolocation.getCurrentPosition(success, error);
        }
   
        async function reverseGeolocalization(lat, long) {
            const Local = localStorage.getItem("forpride");
            const user = JSON.parse(Local);
            const res = await api.get("/online");
        
            const selectUserOnline = res.data.filter(online => online.idAccount === user.id);
            console.log("selectUserOnline")
            console.log(selectUserOnline)
            console.log(selectUserOnline.length)
    
            if(selectUserOnline.length > 0) {
             console.log("Usuário ja está online")
             return
           }

        const address = await apiGoogleReverse.get(`json?latlng=${lat},${long}&key=AIzaSyCZllXD0czNd_oeF0u_o9LUVJ2bCd1K4p8`);
        console.log(address.data.results[0].address_components[3].long_name)
        cityActualOnine = address.data.results[0].address_components[3].long_name;
        setCityActual(address.data.results[0].address_components[3].long_name)
        setUfActual(address.data.results[0].address_components[4].short_name) 
     }

    async function getInformations(cityActualOnine) {

        const Local = localStorage.getItem("forpride");
        const user = JSON.parse(Local);



        const data = {
            idAccount: user.id,
            username: user.username,
            type: user.type,
            nickname: user.nickname,
            avatar: user.avatar,
            relationship: user.relationship,
            lat: lat.toString(),
            long: long.toString(),
            city: cityActual,
            uf: user.uf,
            actualCity: "",
            actualUf: "",
            equalCity: "",
            plane: "",
            emoji: "",
            song: "",
            invisible: false
        }

        if(data.idAccount && data.username && data.nickname && data.avatar && data.lat && data.long && data.city && data.uf !== "") {
            socket.on("connection", () => {
                console.log("Conexão estabelecida")
            })
            
            const Local = localStorage.getItem("forpride");
            const user = JSON.parse(Local);
            const res = await api.get("/online");
        
            const selectUserOnline = res.data.filter(online => online.idAccount === user.id);
            console.log("selectUserOnline")
            console.log(selectUserOnline)
            console.log(selectUserOnline.length)
    
            if(selectUserOnline.length > 0) {
             console.log("Usuário ja está online")
             return
           }


                    await api.post("/online", data).then(() => {
                    })
 

            } else {
                console.log("Imformações não coletadas com sucesso!")
            }
    }

    getLocation()
    getInformations()
}


  // Deslogandop após tempo de inatividade
   function inactivityTime() {
       let time;
       // reset timer
       window.onload = resetTimer;
       document.onmousemove = resetTimer;
       document.onkeydown = resetTimer;
       document.onclick = resetTimer;
       document.onchange = resetTimer;
       function doSomething() {
        const DataUser = localStorage.getItem("forpride");
        const user = JSON.parse(DataUser);

            if(user !== null || user !== undefined || user !== "") {
              //  toast.error("Finalizando a sessão")
                logout(user.id)
            }
        }
        function resetTimer() {
        clearTimeout(time);
      time = setTimeout(doSomething, 900000)
      //time = setTimeout(doSomething, 1000)
    }

}


    return(
        <AuthContext.Provider value={{
            updateAccount,
            updateUserOnline,
            socketDataLocation,
            loginSession,
            createAccount,
            loading,
            logout,
            createInformationsAccount,
            NewUpdateInformationsAccount,
            createCharacteristcs,
            createCharacteristcs2,
            createCharacteristcs3,
            newUpdateCharacteristcs,
            newUpdateCharacteristcs2,
            newUpdateCharacteristcs3,
            preferencesAccount,
            updatePreferencesAccount,
            newPost,
            CreateInviteNewUsew,
            newComment,
            newReply,
            deletePost,
            deleteComment,
            deleteReply,
            likePost,
            newFriend,
            newFollower,
            friendAproved,
            deleteFriend,
            deleteFollower,
            deleteFriendAndFollower,
            deleteLike,
            socket,
            creategroup,
            createMemberGroup,
            CreateInviteMail,
            deleteActualMessage,
            createForum,
            createEvents,
            deleteGroup,
            editPost,
            editComment,
            editReply,
            newVisit,
            comentsPosts,
            setComentsPosts,
            deleteInvite,
            deleteAccount,
            recuperationUserForEmail,
            gerateCodeRecuperation,
            validadeCodeRecuperation,
            recoverPasswordNew,
            inactivityTime,
            newPostEvent,
            createMembersEvents,
            deleteEvent,
            deleteMemberEvent,
            createPayment,
            newReplyRecado,
            verityTimesPeiodTest,
            verifyPaymentAccount,
            deleteConversation
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}