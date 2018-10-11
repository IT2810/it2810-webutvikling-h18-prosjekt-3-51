import React, { Component } from 'react';
import { View, Text, Button, TextInput, KeyboardAvoidingView, AsyncStorage } from "react-native";
import InputField from "../components/InputField";
import DatePicker from "react-native-datepicker";
import moment from "moment";

class AddEditEvent extends Component {
  static navigationOptions = {
    title: 'Add/edit event',
  };

  constructor(props) {
    super(props);
    // when we get an existing event fed in (editing!)
    if (this.props.navigation.state.params.event) {
      e = this.props.navigation.state.params.event
      this.state = {
        title: e.title,
        date: moment(e.date),
        startTime: moment(e.startTime),
        endTime: moment(e.endTime),
        desc: e.desc,
        buttonEnabled: true,
        eventExists: true
      }
    } else {
      this.state = {
        title: "",
        date: moment().format("YYYY-MM-DD"),
        startTime: moment().minutes(0).seconds(0),
        endTime: moment().minutes(0).seconds(0).add(30, "minutes"),
        desc: "",
        buttonEnabled: false,
        eventExists: false
      }
    }
    this.checkIfValid = this.checkIfValid.bind(this);
    this.saveEvent = this.saveEvent.bind(this);
  }

  checkIfValid() {
    // todo: check if all necessary fields are filled for event saving
    return
  }

  async saveEvent() {
    try {
      const value = await AsyncStorage.getItem("events"); // fetch all events, should come as a JSON-array
      let allEvents = value ? JSON.parse(value) : [] // parse it to an array or create a new array in case there was none
      allEvents.push({title: this.state.title, 
                    date: this.state.date,
                    startTime: this.state.startTime,
                    endTime: this.state.endTime,
                    desc: this.state.desc,
                    taskDone: false})
      await AsyncStorage.setItem("events", JSON.stringify(allEvents))
    } catch (error) {
      console.error("Error when saving event " + error)
    }
  }

  async deleteCurrentEvent() {    
    try {
      const value = await AsyncStorage.getItem("events"); // fetch all events, should come as a JSON-array
      if (!value) {
        console.log("Tried deleting event but no events exist")
        return
      }
      let allEvents = JSON.parse(value)
      console.log("Pre  deletion: " + allEvents)
      allEvents.filter(event => event.title == this.state.title && event.date == this.state.date) // naive filtering, deletes all events with the same title and date as the current state suggests
      console.log("post deletion:" + allEvents)
      await AsyncStorage.setItem("events", JSON.stringify(allEvents))
    } catch (error) {
      console.error("Error when deleting event " + error)
    }
  }

  async debugEvents() {
    try {
      const value = await AsyncStorage.getItem("events"); // fetch all events, should come as a JSON-array
      let allEvents = value ? JSON.parse(value) : [] // parse it to an array or create a new array in case there was none
      console.log("value:")
      console.log(value)
      console.log("allEvents:")
      console.log(allEvents)
    } catch (error) {
      console.error("Error when debugging event " + error)
    }
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    const labelStyle = { fontSize: 20, margin: 15 }
    const flexStyle = { flexDirection: "row", justifyContent: "center" }
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"} enabled>
        <View style={flexStyle}>
          <Text style={labelStyle}>Title</Text>
          <InputField
            placeholder={"Your title"}
            value={this.state.title ? this.state.title : null}
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
            onDateChange={(time) => { this.setState({ startTime: time }) }}
          />
          <Text style={labelStyle}>End time</Text>
          <DatePicker
            mode="time"
            format="HH:mm"
            date={this.state.endTime}
            minuteInterval={10}
            onDateChange={(time) => {
              if (moment(this.state.startTime) > moment(time)) {
                this.setState({ endTime: this.state.startTime })
              } else {
                this.setState({ endTime: time })
              }
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
          value={this.state.desc ? this.state.desc : null}
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
            onPress={this.debugEvents}
          />
          <Button
            title="Cancel"
            onPress={() => goBack()}
          />
          <Button
            title="Add event"
            onPress={() => {this.saveEvent(); goBack()}}
          />
          {this.state.eventExists && <Button
            title="Delete event"
            onPress={this.saveEvent}
          />}
        </View>

      </KeyboardAvoidingView>
    );
  }
}

export default AddEditEvent;