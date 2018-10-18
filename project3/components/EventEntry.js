import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import moment from "moment";

const notDoneStyle = {fontSize: 20, margin: 15, backgroundColor: "#FFAAAA"}
const doneStyle = {fontSize: 20, margin: 15, backgroundColor: "#AAFFAA"}

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
        <Text style={this.taskDone ? doneStyle : notDoneStyle}> {this.startTime} {this.title}</Text>
      </TouchableOpacity>
    );
  }
}

export default EventEntry;