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
  }

  async refreshScreen() {
    await store.get('contacts').then((res) => {
      if(!res) {
        this.setState({ contactList: [] });
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
            <ListItem key={`${item.first_name}${item.last_name}`} button={true} onPress={() => {
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
            <Button onPress={async () => {store.delete('contacts'); this.refreshScreen();}}><Text>Delete all</Text></Button>
          </Left>
          <Right style={{ paddingBottom: 20 }}>
            <Button onPress={() => navigate('AddContact')}><Text>New Contact</Text></Button>
          </Right>
        </Header>
        <Content>
          <List>
            {listOfContacts}
          </List>
        </Content>
      </Container>
    );
  }
}
