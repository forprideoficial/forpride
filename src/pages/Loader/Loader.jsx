// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import loader from '../../assets/images/gif/loader2.gif';
// import "./loader.css"


// function Loader() {
//     const LocalInformations = localStorage.getItem("informations-forpride");
//     console.log(LocalInformations)
//     const LocalCharacteristics = localStorage.getItem("characteritics-forpride");
//     const LocalPreferences = localStorage.getItem("preferences-forpride");

//     const navigate = useNavigate();



//     useEffect(() => {
//         function redirectToPage() {
//             if(LocalInformations === "undefined") {
//                 navigate("/completeregistration")
//             } else if(LocalCharacteristics === "" || LocalCharacteristics === []) {
//                 navigate("/characteristcs")
//             } else if(LocalPreferences === "undefined") {
//                 navigate("/preferences")
//             } else {
//                 navigate("/feed")
//             }

//             window.location.reload(false)
//         }


//         redirectToPage()
//     }, [navigate, LocalInformations, LocalCharacteristics, LocalPreferences])


//     return(
//         <div className="loader">
//             <img src={loader} alt="Carregando" />
//             <h4>Olá</h4>
//             <h4>Estamos preparando tudo para você!</h4>
//         </div>
//     )
// }

// export { Loader }