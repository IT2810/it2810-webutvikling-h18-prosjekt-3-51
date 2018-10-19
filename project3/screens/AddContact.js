import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  Button,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import store from 'react-native-simple-store';
import {labelStyle, flexStyle, buttonRowStyle} from "../constants/Styles";
import InputField from "../components/InputField.js";

export default class AddContact extends Component {
  static navigationOptions = {
    title: 'Add contact',
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

  }

  render() {
    const { goBack } = this.props.navigation;
    const disabledButton = (<TouchableOpacity disabled={false}>
      <Text>Add contact</Text>
    </TouchableOpacity>)
    const addButton = (<Button
            title="Add contact"
            onPress={() => {store.push("contacts", {
              first_name: this.state.first_name,
              last_name: this.state.last_name,
              phone_number: this.state.phone_number,
            }); goBack()}}
          />)

    return(
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"} enabled>
        <View style={flexStyle}>
          <InputField
            placeholder={"First Name"}
            value={this.state.first_name}
            onChangeText={(text) => { this.setState({ first_name: text }) }}
          />
        </View>
        <View style={flexStyle}>
          <InputField
            placeholder={"Laste Name"}
            value={this.state.last_name}
            onChangeText={(text) => { this.setState({ last_name: text }) }}
          />
        </View>
        <View style={flexStyle}>
          <InputField
            placeholder={"Phone Number"}
            value={this.state.phone_number}
            onChangeText={(text) => { this.setState({ phone_number: text }) }}
          />
        </View>
        <View style={buttonRowStyle}>
        {/*
          <Button
            title="Debug State"
            onPress={() => console.warn("Current state: " + JSON.stringify(this.state))}
          />
          <Button
            title="Debug Storage"
            onPress={() => {store.get("events").then((events) => {console.log(events)})}}
          />
          <Button
            title="Cancel"
            onPress={() => goBack()}
          />
          */}
          {this.state.last_name ? (addButton) : (disabledButton)}
          {/*
          {this.state.eventExists && <Button
            title="Delete event"
            onPress={() => {store.get("events").then((events) => {
              const result = events.filter(event => event.title != this.state.title && moment(event.date).startOf("day") != moment(this.state.date).startOf("day"))
              return store.save("events", result)
            }); goBack(null); goBack(null)}}
          />}
          */}
        </View>
      </KeyboardAvoidingView>
    )
  }
}
