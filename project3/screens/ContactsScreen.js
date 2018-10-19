import React, { Component } from 'react';
import store from 'react-native-simple-store';
import { Container, Header, Content, List, ListItem, Text, Button, Right, Left} from 'native-base';

export default class Contacts extends Component {
  static navigationOptions = {
    title: 'Contacts',
  };

  constructor(props) {
    super(props);
    this.refreshScreen = this.refreshScreen.bind(this);
    this.state = {
      isLoading: true,
      contactList: [],
    }
  }

  async componentDidMount() {
    await this.refreshScreen();
    const didFocusSub = this.props.navigation.addListener(
      'didFocus',
      payload => {
        (async () => this.refreshScreen())();
      }
    );

     /*
     let cont = [];
     await store.get('contacts').then(contacts => {
       contacts.forEach(c => cont.push(
         <ListItem>
           <Text>{`${c.first_name} ${c.last_name}`}</Text>
           <Text note>{`${c.phone_number}`}</Text>
         </ListItem>
       )).then(this.setState(storedContacts: cont));
     });
     */
  }

  async refreshScreen() {
    await store.get('contacts').then((res) => {
      if(!res) {
        return null;
      }
	   this.setState({ contactList: res });
   })
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    const sortedContacts = this.state.contactList.sort((a,b) => (a.last_name > b.last_name) ? 1 : ((b.last_name > a.last_name) ? -1 : 0));
    const listOfContacts = sortedContacts.map((item) => {
      return(
            <ListItem button={true} onPress={() => {
              navigate('ViewContact', {item: item})
            }}>
              <Text>{`${item.first_name} ${item.last_name}`}</Text>
              <Text>   </Text>
              <Text note>{`${item.phone_number}`}</Text>
            </ListItem>
          )
        });

    return (
      <Container>
        <Header>
          <Left style={{ paddingBottom: 20 }}>
            <Button onPress={() => store.delete('contacts')}><Text>Delete all</Text></Button>
          </Left>
          <Right style={{ paddingBottom: 20 }}>
            <Button onPress={() => navigate('AddContact')}><Text>New Contact</Text></Button>
          </Right>
        </Header>
        <Content>
          <List>
            {listOfContacts}
          {/*
            <ListItem>
              <Text>Simon Mignolet</Text>
            </ListItem>
            <ListItem>
              <Text>Nathaniel Clyne</Text>
            </ListItem>
            <ListItem>
              <Text>Dejan Lovren</Text>
            </ListItem>
            */}
          </List>
        </Content>
      </Container>
    );
  }
}
