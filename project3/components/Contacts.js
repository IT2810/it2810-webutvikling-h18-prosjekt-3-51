import React from 'react';
import {
  Text,
  View,
  AsyncStorage,
  FlatList,
  StyleSheet,
} from 'react-native';
import { ContactsToArray } from '../utils/ConvertContactList.js';

export default class Contacts extends React.Component {
  constructor(props) {
    super(props)
    this.setContacts();
    this.state = {
      isLoading: true,
      contactListObj: [],
      contactList: [],
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('contacts').then((token1) => {
      this.setState({ contactList: token1 })
    }).then((token2) => {
      this.setState({ isLoading: false });
    });
    console.log('Contacts got');
//    console.log(contactList);
    console.log(this.state.isLoading);
  }

  setContacts = async() => {
    try {
      await AsyncStorage.setItem('contacts', '{"key": "Dave"}');//, {"key": "James"}');
      console.log('Contacts set');
    } catch (error) {
      // Error saving data
    }
  }


  getContacts = async () => {
    let contactListTemp = "";
    try {
      contactListTemp = await AsyncStorage.getItem('contacts');
      if (contactListTemp !== null) {
        // We have data!!
        console.log(contactListTemp);
      }
   } catch (error) {
     // Error retrieving data
   }
   return(
     contactListTemp
   )
  }


/*
  getContacts() {
    return [{key: 'Dave'}];
  }
*/

  render() {
    if (this.state.isLoading) {
      console.log('Loading');
      return(
        <View><Text>Loading...</Text></View>
      )
    }
    console.log('Not loading');
    console.log(this.state.contactList);
    this.setState({ contactListObj: JSON.parse(this.state.contactList) });
    console.log(this.state.contactListObj);
    return (
      <View style={styles.container}>
        <FlatList
          data={JSON.parse('{"key": "Dave"}')}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
