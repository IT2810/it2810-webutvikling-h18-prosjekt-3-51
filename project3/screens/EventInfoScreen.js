import React, { Component } from 'react';
import { View, Text, Button, TextInput, KeyboardAvoidingView } from "react-native";
import moment from "moment";
import store from "react-native-simple-store";
import {labelStyle, flexStyle, buttonRowStyle} from "../constants/Styles"

class EventInfoScreen extends Component {
  static navigationOptions = {
    title: "Event details",
  };

  constructor(props) {
    super(props);
    this.state = {taskDone: this.props.navigation.state.params.event.taskDone}
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
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
          flexGrow: 1, margin: 5, padding: 10, height:50, fontSize: 12,
          backgroundColor: "white"}}
          >{event.desc}</Text>
        <View style={buttonRowStyle}>
          {/* <Button
            title="debug props"
            onPress={() => console.warn("Result: " + JSON.stringify(this.props))}
          /> */}
          <Button
          title="Back"
          onPress={() => goBack()}
          />
          <Button
            title="Edit event"
            // TODO: implement asyncstorage
            onPress={() => navigate("AddEvent", {event: event})}
          />
          <Button
            title="Delete event"
            onPress={() => {store.get("events").then((events) => {
              const result = events.filter(evt => evt.title != event.title && moment(evt.date).startOf("day") != moment(event.date).startOf("day"))
              return store.save("events", result)
            }); goBack()}}
          />
        </View>
      </View>
    );
  }
}

export default EventInfoScreen;