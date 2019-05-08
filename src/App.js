import React, { Component } from 'react';
import ReduxThunk from 'redux-thunk';
import firebase from '@firebase/app';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './components/reducer';
import LoginCheck from './components/LoginCheck';
console.disableYellowBox = true;

class App extends Component {

  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyAiSCz7V9VMJTtFmQyxWzop51ILoZ0nrXQ',
      authDomain: 'addressbookonline-d7306.firebaseapp.com',
      databaseURL: 'https://addressbookonline-d7306.firebaseio.com',
      projectId: 'addressbookonline-d7306',
      storageBucket: 'addressbookonline-d7306.appspot.com',
      messagingSenderId: '243952236789'
    };
    if (!firebase.apps.length) { firebase.initializeApp(config); }
  }
  
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
           {/* {this.renderContent()} */}
           <LoginCheck />
     </Provider>
    );
  }
}

export default App;
