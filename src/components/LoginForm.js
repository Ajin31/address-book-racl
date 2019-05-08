import React, { Component } from 'react';
import { Text, LayoutAnimation, UIManager, View, BackHandler, ImageBackground, ToastAndroid, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from './actions';
import { Button, CardView, CardSection, Input, Spinner, Header } from './common';
import Logo from '../login/components/Logo';
import ButtonSubmit from './common/ButtonSubmit';
import Wallpaper from '../login/components/Wallpaper';
import UserInput from '../login/components/UserInput';
import usernameImg from '../login/images/username.png';
import passwordImg from '../login/images/password.png';
let { width, height } = Dimensions.get('window');

class LoginForm extends Component { 

  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental && 
    UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.easeInEaseOut();
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentwillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }


  onEmailChange(text) {
      this.props.emailChanged(text);
  }
 onPasswordChange(text) {
    this.props.passwordChanged(text);
 }
 onButtonPress() {
   const { email, password } = this.props;

   this.props.loginUser({ email, password });
 }

 renderError() {
   if (this.props.error) {
       return <Text style={styles.errorTextStyle}>Invalid UserName or Password</Text>;
     
   }
 }
renderButton() {
  if (this.props.loading) {
    return <Spinner size='large' />;
  }
  return (
  <ButtonSubmit 
    btnid='Login or Create'
    onPress
    // style={{ borderWidth: 0, backgroundColor: 'rgba(255,160,160.0.90)', elevation: 3 }}
    // textStyle={{ color: 'rgba(255,100,255,1)' }} 
  />
  );
  }

  handleBackButton = () => {
      BackHandler.exitApp();
  }

  render() {
    return (
      <Wallpaper>     
      
        {/* <ImageBackground
          style={{ flex: 0.4 }}
          resizeMode='cover'
          source={require('./logo.png')}
          blurRadius={40}
        >       */}
          {/* <Header 
            name="AddressBookOnline" 
            style={{ flex: this.state.flex, backgroundColor: this.state.backgroundColor }} 
            textStyle={{ color: 'rgba(255,160,160,0.80)', fontSize: this.state.size }}
            /> */}
            <Logo />
            
            {this.renderError()}
        {/* </ImageBackground> */}
        {/* <View style={{ flex: this.state.flexv, justifyContent: this.state.justify }}> */}
        {/* <ImageBackground
          style= {{ }}
          resizeMode='cover'
          source={require('./logo.png')}
          blurRadius={80}
        > */}
          {/* <CardView style={{ backgroundColor: 'rgba(52, 52, 52, 0)', borderWidth: 0, elevation: 0 }}> */}
          <CardView style={{ borderWidth: 0, justifyContent: 'center', alignItems: 'center', elevation: 0 }}>
           <CardSection style={{ backgroundColor: 'rgba(52, 52, 52, 0)', elevation: 0, borderWidth: 0, margin: 8, padding: 0 }}> 
           <UserInput
           placeholder='Email'
           source={usernameImg}
           returnKeyType={'next'}
           value={this.props.email}
           onChangeText={this.onEmailChange.bind(this)}
           
           />
          </CardSection> 
             <CardSection style={{ backgroundColor: 'rgba(52, 52, 52, 0)', elevation: 0, borderWidth: 0, margin: 8, padding: 2 }}>
           <UserInput
           secureTextEntry
           source={passwordImg}
           placeholder="Password" 
           returnKeyType={'done'}
           value={this.props.password}
           onChangeText={this.onPasswordChange.bind(this)}
           />
         </CardSection> 
            <CardSection style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}>    
         {this.renderButton()}
        </CardSection>
        </CardView>
      
      {/* </CardView> */}
     {/* </ImageBackground> */}
     {/* </View> */}
     </Wallpaper>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 12,
    alignSelf: 'center',
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 10,
    padding: 8
  }
};

const mapStatetoProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading
  };
};

export default connect(mapStatetoProps, { 
  emailChanged, passwordChanged, loginUser })(LoginForm);
