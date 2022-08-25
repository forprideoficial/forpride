import {Route, Routes, Navigate} from 'react-router-dom';
import { Characteristcs } from '../pages/Characteristcs/Characteristcs';
import { Chat } from '../pages/Chat/Chat';
import { CommingSoom } from '../pages/CommingSoom/CommingSoom';
import { CompleteRegistration } from '../pages/CompleteRegistration/CompleteRegistration';
import { Entrar } from '../pages/Entrar/Entrar';
import { EventIndividual } from '../pages/EventIndividual/EventIndividual';
import { Events } from '../pages/Events/Events';
import { Feed } from '../pages/Feed/Feed';
import { Forgotit } from '../pages/Forgotit/Forgotit';
import { ForumIndividual } from '../pages/ForumIndividual/ForumIndividual';
import { Foruns } from '../pages/Foruns/Foruns';
import { GroupIndividual } from '../pages/GroupIndividual/GroupIndividual';
import { Groups } from '../pages/Groups/Groups';
import { Informations } from '../pages/Informations/Informations';
import { Invitation } from '../pages/Invitation/Invitation';
import { Invite } from '../pages/Invite/Invite';
import { InvitesList } from '../pages/InvitesList/InvitesList';
import { Lgpd } from '../pages/Lgpd/Lgpd';
import { Menu } from '../pages/Menu/Menu';
import { Messages } from '../pages/Messages/Messages';
import { Notifications } from '../pages/Notifications/Notifications';
import { PaymentConfirmed } from '../pages/Payments/PaymentConfirmed/PaymentConfirmed';
import { PaymentNotice } from '../pages/Payments/PaymentNotice/PaymentNotice';
import { Pix } from '../pages/Payments/Pix/Pix';
import { PlainSelected } from '../pages/Payments/PlainSelected/PlainSelected';
import { Voucher } from '../pages/Payments/Voucher/Voucher';
import { Plains } from '../pages/Plains/Plains';
import { PostIndividual } from '../pages/PostIndividual/PostIndividual';
import { Preferences } from '../pages/Preferences/Preferences';
import { Pricing } from '../pages/Pricing/Pricing';
import { PrivacityPolice } from '../pages/PrivacityPolice/PrivacityPolice';
import { Profile } from '../pages/Profile/Profile';
import { ProfileFriend } from '../pages/ProfileFriend/ProfileFriend';
import { Radar } from '../pages/Radar/Radar';
import { Ranking } from '../pages/Ranking/Ranking';
import { Recados } from '../pages/Recados/Recados';
import { RecoverPassword } from '../pages/RecoverPassword/RecoverPassword';
import { Recuperation } from '../pages/Recuperation/Recuperation';
import { RecuperationCode } from '../pages/RecuperationCode/RecuperationCode';
import { RecuperationUser } from '../pages/RecuperationUser/RecuperationUser';
import { RecuperationUserResult } from '../pages/RecuperationUserResult/RecuperationUserResult';
import { RegistrationEnd } from '../pages/RegistrationEnd/RegistrationEnd';
import { Search } from '../pages/Search/Search';
import { Settings } from '../pages/Settings/Settings';
import { SignIn } from '../pages/SignIn/SignIn';
import { EntrarConvite } from '../pages/EntrarConvite/EntrarConvite';
import { Solicitations } from '../pages/Solicitations/Solicitations';
import { UpdateAccounts } from '../pages/UpdateAccounts/UpdateAccounts';
import { UsageTips } from '../pages/UsageTips/UsageTips';
import { UseOfTerms } from '../pages/UseOfTerms/UseOfTerms';
import { RecadoUnic } from '../pages/RecadoUnic/RecadoUnic';
import { UserNotFound } from '../pages/UserNotFound/UserNotFound';
import { Welcome } from '../pages/Welcome/Welcome';
import { ActivePlain } from '../pages/ActivePlain/ActivePlain';
import { UpdatePlain } from '../pages/UpdatePlain/UpdatePlain';
import { PeriodTeste } from '../pages/PeriodTeste/PeriodTeste';
import { OnlineUser } from '../pages/OnlineUser/OnlineUser';

import { SignUp } from '../pages/SignUp/SignUp';

import { SuspenseAccount } from '../pages/SuspenseAccount/SuspenseAccount';
import { SignUpConvidate } from '../pages/SignUpConvidate/SignUpConvidate';



function Router () {
const Local = localStorage.getItem("forpride");
const userLocal = JSON.parse(Local)

function PrivateRoute({children} ) {
    return userLocal !== null ? children : <Navigate to="/"/>
}

    return (

            <Routes>
            <Route path="/" element={<SignIn />}/>
            <Route path="/signup/convite/:email/:patron" element={ <SignUpConvidate />} />
            <Route path="/characteristcs/:idAccount/:email/:type/:username" element={ <Characteristcs />} />
            <Route path="/preferences/:idAccount/:email/:username" element={ <Preferences />} />

            <Route path="/signup/" element={ <SignUp />} />

            <Route path="/signup/" element={ <Entrar />} />


            <Route path="/forgotit" element={ <Forgotit />} />
            <Route path="/recuperation" element={ <Recuperation />} />       
            <Route path="/recuperationuser" element={ <RecuperationUser />} />       
            <Route path="/recoverpassword/:email" element={ <RecoverPassword />} />       
            <Route path="/recuperationcode/:email" element={ <RecuperationCode />} />       
            <Route path="/recuperationuserresult/:username" element={ <RecuperationUserResult />} />           
            <Route path="/terms" element={ <UseOfTerms />} />       
            <Route path="/police" element={ <PrivacityPolice />} />       
            <Route path="/lgpd" element={ <Lgpd />} />       
            <Route path="/entrar" element={ <Entrar />} />
            <Route path="/registrationend" element={ <RegistrationEnd />} />

            
            <Route path="/activeplain"
                    element={ <PrivateRoute> <ActivePlain /> </PrivateRoute>} />
            <Route path="/updateplain"
                    element={ <PrivateRoute> <UpdatePlain /> </PrivateRoute>} />
            <Route path="/feed"
                    element={ <PrivateRoute> <Feed /> </PrivateRoute>} />
            <Route path="/menu"
                    element={ <PrivateRoute> <Menu /> </PrivateRoute>} />
            <Route path="/usagetips"
                    element={ <PrivateRoute> <UsageTips /> </PrivateRoute>} />
            <Route path="/update"
                    element={ <PrivateRoute> <UpdateAccounts /> </PrivateRoute>} />
            <Route path="/post/:id"
                    element={ <PrivateRoute> <PostIndividual /> </PrivateRoute>} />
            <Route path="/profile"
                    element={ <PrivateRoute> <Profile/> </PrivateRoute>} />
            <Route path="/profile-friend/:id"
                    element={ <PrivateRoute> <ProfileFriend/> </PrivateRoute>} />
            <Route path="/groups" 
                element={ <PrivateRoute> <Groups/> </PrivateRoute>} />
            <Route path="/group/:id" 
                element={ <PrivateRoute> <GroupIndividual/> </PrivateRoute>} />
            <Route path="/foruns" 
                element={ <PrivateRoute> <Foruns/> </PrivateRoute>} />
            <Route path="/forum/:id" 
                element={ <PrivateRoute> <ForumIndividual/> </PrivateRoute>} />
            <Route path="/events" 
                element={ <PrivateRoute> <Events/> </PrivateRoute>} />
            <Route path="/event/:id" 
                element={ <PrivateRoute> <EventIndividual/> </PrivateRoute>} />
            <Route path="/ranking" 
                element={ <PrivateRoute> <Ranking/> </PrivateRoute>} />
            <Route path="/radar" 
                element={ <PrivateRoute> <Radar/> </PrivateRoute>} />
            <Route path="/completeregistration" 
                element={ <PrivateRoute> <CompleteRegistration/> </PrivateRoute>} />
            <Route path="/characteristcs/:idAccount/:email" 
                element={ <PrivateRoute> <Characteristcs/> </PrivateRoute>} />
            <Route path="/preferences/:idAccount/:email" 
                element={ <PrivateRoute> <Preferences /> </PrivateRoute>} />
            <Route path="/comming-soom" 
                element={ <PrivateRoute> <CommingSoom /> </PrivateRoute>} />
            <Route path="/Invitation" 
                element={ <PrivateRoute> <Invitation /> </PrivateRoute>} />
            <Route path="/chat/:room/:idFriend" 
                element={ <PrivateRoute> <Chat /> </PrivateRoute>} />
            <Route path="/invitelist" 
                element={ <PrivateRoute> <InvitesList /> </PrivateRoute>} />
            <Route path="/invite" 
                element={ <PrivateRoute> <Invite /> </PrivateRoute>} />
            <Route path="/infos" 
                element={ <PrivateRoute> <Informations /> </PrivateRoute>} />
            <Route path="/settings" 
                element={ <PrivateRoute> <Settings /> </PrivateRoute>} />
            <Route path="/plain" 
                element={ <PrivateRoute> <Plains /> </PrivateRoute>} />
            <Route path="/pricing" 
                element={ <PrivateRoute> <Pricing /> </PrivateRoute>} />
            <Route path="/payment/:id" 
                element={ <PrivateRoute> <Pix /> </PrivateRoute>} />
            <Route path="/voucher/:id" 
                element={ <PrivateRoute> <Voucher /> </PrivateRoute>} />
            <Route path="/selectplain/:name" 
                element={ <PrivateRoute> <PlainSelected /> </PrivateRoute>} />
            <Route path="/paymentConfirmed" 
                element={ <PrivateRoute> <PaymentConfirmed /> </PrivateRoute>} />
            <Route path="/paymentnotice" 
                element={ <PrivateRoute> <PaymentNotice /> </PrivateRoute>} />
            <Route path="/notifications" 
                element={ <PrivateRoute> <Notifications /> </PrivateRoute>} />
            <Route path="/recados" 
                element={ <PrivateRoute> <Recados /> </PrivateRoute>} />
            <Route path="/recados/:id" 
                element={ <PrivateRoute> <RecadoUnic /> </PrivateRoute>} />
            <Route path="/search" 
                element={ <PrivateRoute> <Search /> </PrivateRoute>} />
            <Route path="/solicitations" 
                element={ <PrivateRoute> <Solicitations /> </PrivateRoute>} />
            <Route path="/messages" 
                element={ <PrivateRoute> <Messages /> </PrivateRoute>} />
            <Route path="/usernotfound" 
                element={ <PrivateRoute> <UserNotFound /> </PrivateRoute>} />
            <Route path="/welcome" 
                element={ <PrivateRoute> <Welcome /> </PrivateRoute>} />
            <Route path="/periodtest" 
                element={ <PrivateRoute> <PeriodTeste /> </PrivateRoute>} />
            <Route path="/usersonline" 
                element={ <PrivateRoute> <OnlineUser /> </PrivateRoute>} />


            <Route path="/suspenseaccount" 
                element={ <PrivateRoute> <SuspenseAccount /> </PrivateRoute>} />

            </Routes>
           
    )
}

export {Router}

