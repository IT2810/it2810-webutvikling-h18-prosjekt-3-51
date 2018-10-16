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
    this.state = {taskDone: this.props.navigation.state.params.event.taskDone}
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    const labelStyle = {fontSize: 20, margin: 15}
    const flexStyle = {flexDirection: "row", justifyContent: "center" }
    const event = this.props.navigation.state.params.event;
    return (
      <View style={{flex: 1}} behavior={"padding"} enabled>
        <View style={flexStyle}>
          <Text style={labelStyle}>{event.title}</Text>
        </View>
        <View style={flexStyle}>
          <Text style={labelStyle}>Date: {moment(event.date).format("YYYY-MM-DD")}</Text>
        </View>
        <View style={flexStyle}>
          <Text style={labelStyle}>Start time: {event.startTime}</Text>
          <Text style={labelStyle}>End time: {event.endTime}</Text>
        </View>
        <Text style={{
          textAlignVertical: "top", 
          // android only!
          flexGrow: 1, margin: 5, padding: 10, height:50, fontSize: 20,
          backgroundColor: "white"}}
          >{event.desc}</Text>
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
            onPress={() => navigate("AddEvent", {event: event})}
          />
        </View>
      </View>
    );
  }
}

export default EventInfoScreen;