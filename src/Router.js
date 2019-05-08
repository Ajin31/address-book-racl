import React from 'react';
import { Scene, Router, Actions, Stack } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import ContactList from './components/ContactList';
import NewContact from './components/NewContact';
import ContactEdit from './components/ContactEdit';
import SideMenu from './components/SideMenu';
import LoginCheck from './components/LoginCheck';
import ContactSearch from './components/ContactSearch';
import ContactSettings from './components/ContactSettings';
import ContactViewFull from './components/ContactViewFull';
const RouterComponent = () => {

    
    return (
        <Router>
            <Stack key="root" hideNavBar>
            {/* <Scene key="auth" hideNavBar initial >
                <Scene key="loginCheck" component={LoginCheck} title="Please Login" hideNavBar initial />
                <Scene key="login" component={LoginForm} hideNavBar />
            </Scene> */}
            <Scene key="main" initial>    
                <Scene 
                //  rightTitle="Add"
                //  onRight={() => Actions.newContact()}
                 key="contactList"
                 animation='fade'
                 component={SideMenu} 
                 title="Contacts" initial 
                 hideNavBar
                />

                 <Scene 
                 key="newContact" component={NewContact}
                 animation='fade'
                 title="Create New Contact" 
                     
                 />

                 <Scene key="contactEdit" component={ContactEdit} 
                 animation='fade'
                 title="Edit Contact" />

                <Scene key="contactSearch" component={ContactSearch} 
                animation='fade'
                hideNavBar />
                <Scene key="contactViewFull" component={ContactViewFull}
                animation='slide'
                hideNavBar />
                <Scene key="contactSetting" component={ContactSettings} 
                animation='fade'
                title="Settings" />
            </Scene>    
            </Stack>
        </Router>
    );
};

export default RouterComponent;
