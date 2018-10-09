import React, { Component } from 'react';
import { View, Text, Button, TextInput, KeyboardAvoidingView } from "react-native";
import moment from "moment";

class EventInfoScreen extends Component {
  static navigationOptions = {
    title: "Event details",
  };

  constructor(props) {
    super(props);
    // todo: somehow update stuff here
    this.state = {taskDone: this.props.navigation.state.params.taskDone}
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    const labelStyle = {fontSize: 20, margin: 15}
    const flexStyle = {flexDirection: "row", justifyContent: "center" }
    return (
      <View style={{flex: 1}} behavior={"padding"} enabled>
        <View style={flexStyle}>
          <Text style={labelStyle}>{this.props.navigation.state.params.title}</Text>
        </View>
        <View style={flexStyle}>
          <Text style={labelStyle}>Date: {moment(this.props.navigation.state.params.date).format("YYYY-MM-DD")}</Text>
        </View>
        <View style={flexStyle}>
          <Text style={labelStyle}>Start time: {moment(this.props.navigation.state.params.startTime).format("HH:mm")}</Text>
          <Text style={labelStyle}>End time: {moment(this.props.navigation.state.params.endTime).format("HH:mm")}</Text>
        </View>
        <Text style={{
          textAlignVertical: "top", 
          // android only!
          flexGrow: 1, margin: 5, padding: 10, height:50, fontSize: 20,
          backgroundColor: "white"}}
          >{this.props.navigation.state.params.desc}</Text>
        <View style={{flexDirection: "row", justifyContent: "space-around", alignItems: "center", padding:15}}>
          <Button
            title="debug props"
            onPress={() => console.warn("Result: " + JSON.stringify(this.props))}
          />
          <Button
          title="Back"
          onPress={() => goBack()}
          />
          <Button
            title="Edit event"
            // TODO: implement asyncstorage
            onPress={() => navigate("AddEvent",{event: {title: "test event", date: moment(), 
            startTime: moment(), 
            endTime: moment().add(1, "hours"), taskDone: false, desc: "Our fantastic event that will eventually work"}})}
          />
        </View>
      </View>
    );
  }
}

export default EventInfoScreen;