import React, { Component } from 'react';
import { View, Text, Button, TextInput, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import InputField from "../components/InputField";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import saveEvent from "../utils/EventStorer.js";
import store from "react-native-simple-store"

class AddEditEvent extends Component {
  static navigationOptions = {
    title: 'Add/edit event',
  };

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      date: moment().format("YYYY-MM-DD"),
      startTime: moment().minutes(0).seconds(0).format("HH:mm"),
      endTime: moment().minutes(0).seconds(0).add(30, "minutes").format("HH:mm"),
      desc: "",
      eventExists: false
    }
  }

  componentDidMount() {
    if (this.props.navigation.state.params.dayDate) {
      this.setState({date: this.props.navigation.state.params.dayDate})
    }
    if (this.props.navigation.state.params.event) {
      e = this.props.navigation.state.params.event
      this.setState({
        title: e.title,
        date: e.date,
        startTime: e.startTime,
        endTime: e.endTime,
        desc: e.desc,
        eventExists: true
      })
    }
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    const labelStyle = { fontSize: 20, margin: 15 }
    const flexStyle = { flexDirection: "row", justifyContent: "center" }
    // the disabled is touchable but does not do anything, so it is effectively disabled anyways
    const disabledButton = (<TouchableOpacity disabled={false}>
      <Text>Add event</Text>
    </TouchableOpacity>) 
    const saveButton = (<Button
      title="Save event"
      onPress={() => {store.get("events").then((events) => {
              const result = events.filter(event => event.title != this.state.title && moment(event.date).startOf("day") != moment(this.state.date).startOf("day"))
              return store.save("events", result)
            }).then(() => {store.push("events", {title: this.state.title, 
              date: this.state.date,
              startTime: this.state.startTime,
              endTime: this.state.endTime,
              desc: this.state.desc,
              taskDone: false})}); goBack()}}
      />) 
    const addButton = (<Button
            title="Add event"
            onPress={() => {store.push("events", {title: this.state.title, 
                    date: this.state.date,
                    startTime: this.state.startTime,
                    endTime: this.state.endTime,
                    desc: this.state.desc,
                    taskDone: false}); goBack()}}
          />)

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"} enabled>
        <View style={flexStyle}>
          <Text style={labelStyle}>Title</Text>
          <InputField
            placeholder={"Your title"}
            value={this.state.title}
            onChangeText={(text) => { this.setState({ title: text }) }}
          />
        </View>
        <View style={flexStyle}>
          <Text style={labelStyle}>Date</Text>
          <DatePicker
            mode="date"
            date={this.state.date}
            format="YYYY-MM-DD"
            onDateChange={(date) => { this.setState({ date: date }) }}
          />
        </View>
        <View style={flexStyle}>
          <Text style={labelStyle}>Start time</Text>
          <DatePicker
            mode="time"
            format="HH:mm"
            date={this.state.startTime}
            minuteInterval={10}
            onDateChange={(time) => {this.setState({ startTime: time}) }}
          />
          <Text style={labelStyle}>End time</Text>
          <DatePicker
            mode="time"
            format="HH:mm"
            date={this.state.endTime}
            minuteInterval={10}
            onDateChange={(time) => {this.setState({ endTime: time })
            }}
          />
        </View>
        <TextInput style={{
          textAlignVertical: "top",
          // android only!
          flexGrow: 1, margin: 5, padding: 10, height: 50, fontSize: 20,
          backgroundColor: "white"
        }}
          placeholder="Description..."
          value={this.state.desc}
          multiline={true}
          onChangeText={(text) => { this.setState({ desc: text }) }}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", padding: 15 }}>
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
          {this.state.title ? (this.state.eventExists ? (saveButton) : (addButton)) : (disabledButton)}
          {this.state.eventExists && <Button
            title="Delete event"
            onPress={() => {store.get("events").then((events) => {
              const result = events.filter(event => event.title != this.state.title && moment(event.date).startOf("day") != moment(this.state.date).startOf("day"))
              return store.save("events", result)
            }); goBack(null); goBack(null)}}
          />}
        </View>

      </KeyboardAvoidingView>
    );
  }
}

export default AddEditEvent;