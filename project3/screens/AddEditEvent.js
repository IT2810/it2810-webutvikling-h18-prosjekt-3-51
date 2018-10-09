import React, { Component } from 'react';
import { View, Text, Button, TextInput, KeyboardAvoidingView } from "react-native";
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
        buttonEnabled: true
      }
    } else {
      this.state = {
        title: "",
        date: moment().format("YYYY-MM-DD"),
        startTime: moment().minutes(0).seconds(0),
        endTime: moment().minutes(0).seconds(0).add(30, "minutes"),
        desc: "",
        buttonEnabled: false
      }
    }
    this.checkIfValid = this.checkIfValid.bind(this);
  }

  checkIfValid() {
    // todo: check if all necessary fields are filled for event saving
    return
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    const labelStyle = { fontSize: 20, margin: 15 }
    const flexStyle = { flexDirection: "row", justifyContent: "center" }
    const buttonStyle = { flexGrow: 1, padding: 15 }
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"} enabled>
        <View style={flexStyle}>
          <Text style={labelStyle}>Title</Text>
          <InputField placeholder={"Your title"} value={this.state.title ? this.state.title : null} multiline={true} onChangeText={(text) => { this.setState({ title: text }) }} />
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
            title="Debug"
            onPress={() => console.warn("Result: " + JSON.stringify(this.state))}
          />
          <Button
            title="Cancel"
            onPress={() => goBack()}
          />
          <Button
            title="Add event"
            enabled={this.state.buttonEnabled}
            // TODO: implement asyncstorage
            onPress={() => alert("Result: " + JSON.stringify(this.state))}
          />
        </View>

      </KeyboardAvoidingView>
    );
  }
}

export default AddEditEvent;