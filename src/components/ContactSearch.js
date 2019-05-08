import React, { Component } from 'react';
import _ from 'lodash';
import { CardView, CardSection } from './common';
import { TextInput, View, FlatList, LayoutAnimation
, UIManager, TouchableHighlight } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { contactsFetch, contactUpdate } from './actions';
import ContactView from './ContactView';

class ContactSearch extends Component {

    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(false);
        LayoutAnimation.easeInEaseOut();
    }
    
    componentWillMount() {
        this.props.contactsFetch();
        this.props.contactUpdate({ prop: 'search', value: ' ' });
    
    }

    renderRow(contact, search) {
        //  if (contact.name == search) {
        //     return <ContactView contact={contact} />; 
        //  }
      const name = contact.name.toUpperCase();
      search = search.toUpperCase();
      if (search !== '') {  
      if (name.indexOf(search) > -1) {
            return <ContactView contact={contact} false={false} />;
        } else {
            return null;
        }
    }
    return null;
    }

  render() {
    return (
        <View style={{ flex: 1 }}>
        <CardView 
            style={{
            justifyContent: 'center', alignItems: 'center', backgroundColor: '#3b5998', flexDirection: 'row', marginLeft: 0, marginTop: 0, marginRight: 0
            }} 
        >
            <CardSection style={{ flex: 1, backgroundColor: '#3b5977' }}>
            <TouchableHighlight
            onPress={() => Actions.contactList({ type: 'reset' })}
            underlayColor='rgba(0,0,0,0)'
            style={{ width: 45, backgroundColor: '#3b5998' }}
            >
            <CardSection style={{ backgroundColor: '#3b5998', marginRight: 10, marginTop: 6 }}>  
            <Icons 
             name="arrow-left" 
             size={16}
             color='#ddd' 
             style={{ alignSelf: 'center' }}
            />
            </CardSection>
            </TouchableHighlight>
              <TextInput
                    style={{ backgroundColor: '#3b5998', flex: 1, color: '#fff' }}
                    onChangeText={value =>
                        this.props.contactUpdate({ prop: 'search', value })
                        }
                    placeholder='Search...'
                    placeholderTextColor='#ddd'
                    underlineColorAndroid='#ddd'
                    autoFocus
              />
          </CardSection>
      </CardView>
    <View style={{ flex: 1, backgroundColor: '#ffffff' }} >
                <FlatList
                    data={this.props.contacts}
                    //data to render in list
                    renderItem={({ item }) => (
                        //Single Item in list
                        this.renderRow(item, this.props.search)
                    )}
                />
     </View>
    </View>
    );
  }
}

const mapStatetoProps = state => {
    const { search } = state.contactForm;
    const contacts = _.map(state.contacts, (val, uid) => {
        return { ...val, uid };
    });
    
    return { search, contacts };
};

export default connect(mapStatetoProps, 
    { contactsFetch, contactUpdate })(ContactSearch);
