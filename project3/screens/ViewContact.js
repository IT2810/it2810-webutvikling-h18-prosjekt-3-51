import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  Button,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import store from 'react-native-simple-store';
import {labelStyle, flexStyle, buttonRowStyle} from "../constants/Styles";
import InputField from "../components/InputField.js";

export default class ViewContact extends Component {
  static navigationOptions = {
    title: 'View contact',
  }

  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      phone_number: "",
    }
  }

  componentDidMount() {
    let e = this.props.navigation.state.params.item
    this.setState({
      first_name: e.first_name,
      last_name: e.last_name,
      phone_number: e.phone_number,

    })
  }

  render() {

    return(
      <ScrollView style={styles.container}>
        <Text style={styles.desc_text}>First Name:</Text>
        <Text style={styles.dynamic_text}>{this.state.first_name} </Text>
        <View style={styles.divider} />
        <Text style={styles.desc_text}>Last Name:</Text>
        <Text style={styles.dynamic_text}>{this.state.last_name} </Text>
        <View style={styles.divider} />
        <Text style={styles.desc_text}>Phone Number:</Text>
        <Text style={styles.dynamic_text}>{this.state.phone_number} </Text>
        <View style={styles.divider} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  desc_text: {
    paddingTop: 12,
    paddingLeft: 12,
    fontSize: 16,
    color: 'darkgrey',
  },
  dynamic_text: {
    paddingLeft: 12,
    fontSize: 26,
    paddingBottom: 10,
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }
});
