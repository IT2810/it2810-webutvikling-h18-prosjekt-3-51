import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Switch } from "react-native";
import moment from "moment";

const notDoneStyle = {fontSize: 12, padding: 15, backgroundColor: "#FFAAAA", flexGrow: 1}
const doneStyle = {fontSize: 12, padding: 15, backgroundColor: "#AAFFAA", flexGrow: 1}

class EventEntry extends Component {

  constructor(props) {
    super(props);
    this.startTime = props.event.startTime;
    this.title = props.event.title;
    this.taskDone = props.event.taskDone;
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
      <View style={{flexDirection: "row"}}>
        <Text style={this.taskDone ? doneStyle : notDoneStyle}> {this.startTime} {this.title}</Text>
        <Switch value={this.taskDone} onValueChange={(value) => {this.taskDone = value; this.props.eventSwitch(this.props.event, value)}}></Switch>
        </View>
      </TouchableOpacity>
    );
  }
}

export default EventEntry;