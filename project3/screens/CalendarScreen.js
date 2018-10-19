
import React, { Component } from 'react';
import { View, Text, Button, AsyncStorage } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import moment from "moment";
import store from "react-native-simple-store"
import {labelStyle, flexStyle, buttonRowStyle} from "../constants/Styles"

class CalendarScreen extends Component {

  static navigationOptions = {
    title: 'Calendar',
  };

  constructor(props) {
    super(props);
    this.state = { events: {} }
    this.refreshEvents = this.refreshEvents.bind(this);

  }

  async componentDidMount() {
    // Subscribe to didFocus events and refresh the calendar (when returning from a different screen)
    // this makes sure dates get marked with a dot when events are added to them
    const didFocusSub = this.props.navigation.addListener(
      'didFocus',
      payload => {
        (async () => this.refreshEvents())();
      }
    );
    // refresh the events the first time anyways
    await this.refreshEvents()
  }

  async refreshEvents() {
    // refreshes the events by fetching from asyncstorage and creating an object to feed into markedDates
    try {
      const value = await AsyncStorage.getItem("events"); // fetch all events, should come as a JSON-array
      events = value ? JSON.parse(value) : [] // parse it to an array or create a new array in case 
      let markedDates = {}
      Object.values(events).map(event => { markedDates[event.date] = { marked: true } })
      this.setState({ events: markedDates })
    } catch (error) {
      console.error("Error when refreshing events " + error)
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Calendar
          markedDates={this.state.events}
          monthFormat={"yyyy MM"}
          hideDayNames={false}
          showWeekNumbers={true}
          onDayPress={(day) => {navigate("ViewDay", {date: day.dateString})}}
        />
        <View style={buttonRowStyle}>
          <Button
            title="Add event"
            onPress={() =>
              navigate("AddEvent", {})}
          />
          {/* <Button
            title="Refresh events"
            onPress={this.refreshEvents}
          /> */}
          {/* <Button
            title="Delete all events"
            onPress={() => {store.delete("events")}}
          /> */}
        </View>
      </View>
    );
  }

}

export default CalendarScreen;
